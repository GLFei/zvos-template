<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.name"
        :class="getTagClass(tag)"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        {{ tag.title }}
        <span
          v-if="!tag.meta.affix"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        />
        <span v-else class="el-icon-close" style="visibility: hidden; width: 0;"></span>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li
        v-if="!(selectedTag.meta&&selectedTag.meta.affix)"
        @click="closeSelectedTag(selectedTag)"
      >关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
      <li @click="closeRightTags(selectedTag)">关闭右侧</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
//import { generateTitle } from '@/utils/i18n'
import path from "path";
import Sortable from "sortablejs";

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      sortableIns: null
    };
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews;
    },
    routes() {
      return this.$store.state.permission.routes;
    }
  },


  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    getTagClass(route) {
      let retClassArr = []
      if (route.name != 'home') {
        retClassArr.push('tag-item-sortable')
      }
      if (route.path == this.$route.path) {
        retClassArr.push('active')
      }
      return retClassArr.join(' ')
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      // const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      const affixTags = (this.affixTags = this.filterAffixTags(
        this.$router.options.routes
      ));
      let localTags = [];
      let localCachedViews = sessionStorage.getItem("am_cached_views");
      if (localCachedViews) {
        localTags = JSON.parse(localCachedViews);
      }
      for (const tag of affixTags.concat(localTags)) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("addView", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("addView", this.$route);
        this.$nextTick(() => {
          this.initSortable()
        })
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch("updateVisitedView", this.$route);
            }
            break;
          }
        }
      });
    },
    refreshSelectedTag(view) {
      this.$store.dispatch("delCachedView", view).then(() => {
        // const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            name: view.name,
            params: {
              needRefresh: true
            },
            query: Object.assign({}, view.query, {
              refreshTm: new Date().getTime()
            })
          });
        });
      });
    },
    closeSelectedTag(view) {
      this.$store.dispatch("delView", view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews);
        }
      });
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch("delOthersViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeRightTags() {
      this.$router.push(this.selectedTag);
      this.$store.dispatch("delRightViews", this.selectedTag).then(() => {
        this.moveToCurrentTag();
      });
    },
    closeAllTags() {
      this.$store.dispatch("delAllViews").then(({ visitedViews }) => {
        // if (this.affixTags.some(tag => tag.path === view.path)) {
        //   return
        // }
        this.toLastView(visitedViews);
      });
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        // You can set another route
        this.$router.push("/");
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105;
      // const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth; // container width
      const maxLeft = offsetWidth - menuMinWidth; // left boundary
      //const left = e.clientX - offsetLeft + 15 // 15: margin right
      const left = e.clientX + 15;

      if (left > maxLeft) {
        this.left = maxLeft;
      } else {
        this.left = left;
      }

      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    initSortable() {
      if (!this.sortableIns) {
        let that = this
        let tagsWrapDom =  document.querySelector('.tags-view-container .el-scrollbar__view')
        this.sortableIns = Sortable.create(tagsWrapDom, {
          animation: 180,
          delay: 0,
          draggable: ".tag-item-sortable",
          onEnd: evt => {
            if (evt.oldIndex == evt.newIndex) {
              return false;
            }
            let cloneViews = [].concat(that.visitedViews)
            cloneViews[evt.newIndex] = cloneViews.splice(evt.oldIndex, 1, cloneViews[evt.newIndex])[0]
            that.$store.dispatch("setViews", cloneViews);
          }
        });
      }
    }
  },
  mounted() {
    this.initTags();
    this.addTags();
  },
  watch: {
    $route() {
      window.console.log("router----");
      this.addTags();
      this.moveToCurrentTag();
    },
    visible(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#app {
  .tags-view-container {
    height: 44px;
    // width: 100%;
    line-height: initial;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
    /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);*/
    z-index: 998;
    /* margin: 0 30px 0 15px; */
    margin: 0 15px;
    .tags-view-wrapper {
      padding-top: 12px;
      .tags-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 32px;
        line-height: 30px;
        border: 1px solid #e2e2e2;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        color: #333;
        background-color: #f5f5f5;
        padding: 0 8px;
        padding-left: 12px;
        font-size: 12px;
        margin-left: 2px;
        /*margin-top: 4px;*/
        &:first-child {
          margin-left: 5px;
        }
        &:last-child {
          margin-right: 5px;
        }
        &.active {
          background: #fff;
          // color: #8b8b8b;
          border-bottom-color: #fff;
          /*  &::before {
              content: '';
              background: #fff;
              display: inline-block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              position: relative;
              margin-right: 2px;
            }*/
        }
      }
    }
    .contextmenu {
      margin: 0;
      background: #fff;
      z-index: 2999;
      position: absolute;
      list-style-type: none;
      padding: 5px 0;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
      li {
        margin: 0;
        padding: 7px 16px;
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
//reset element css of el-icon-close
#app {
  .tags-view-wrapper {
    .el-scrollbar__view {
      // border-bottom: 1px solid #e2e2e2;
    }
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        color: #666;
        &:before {
          /*transform: scale(.6);*/
          display: inline-block;
          vertical-align: -2px;
        }
        &:hover {
          // background-color: #b4bccc;
          color: #333;
        }
      }
    }
  }
}
</style>
