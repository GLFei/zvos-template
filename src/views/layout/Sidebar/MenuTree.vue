<template>
  <div class="menu-tree">
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      :collapse="collapse"
      unique-opened
    >
      <!--  <menu-item :model="model"  :parent-index="''+index" v-for="(model, index) in menuModel.children"></menu-item>-->
      <menu-item
        :model="model"
        v-show="model.isShow"
        :parent-index="''+index"
        v-for="(model, index) in menuModel.children"
        :key="index"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import path from 'path'
import MenuItem from "./MenuItem";
import Tips from "@/utils/utils/Tips";

export default {
  name: "MenuTree",
  components: {
    MenuItem
  },
  props: {
    menuModel: {
      type: Object,
      required: true
    },
    collapse: Boolean,
    defaultOpeneds: Array,
    defaultActive: String
  },

  data() {
    return {
      routerArr: [],
      isCollapse: false
    };
  },

  methods: {
    getRouterArr(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name,
          meta: { ...route.meta }
        })
        if (route.children) {
          const tempTags = this.getRouterArr(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    toUrl(name, params) {
      this.$router.push({
        name: name,
        params: params
      });
    },
    handleOpen(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      window.console.log(key, keyPath);
    },
    handleSelect(path) {
      let findIndex = this.routerArr.findIndex(item => item.path == path)
      if (findIndex > -1) {
        let vtViews = this.$store.state.tagsView.visitedViews
        let findIndex2 = vtViews.findIndex(item => item.path == path)
        if (findIndex2 > -1 || vtViews.length < 10) {
          let pageName = this.routerArr[findIndex].name
          this.$router.push({
            name: pageName,
            query: {
              refreshTm: (new Date()).getTime()
            }
          })
        } else {
          Tips.message({ message: "最多只能打开10个选项卡!" })
        }
      }
    }
  },

  created() {
    this.routerArr = this.getRouterArr(this.$router.options.routes);
  }
};
</script>

<style lang="less">
@import "../../../static/less/theme.less";
/* .el-menu-vertical-demo:not(.el-menu--collapse) {
         width: 200px;
         min-height: 400px;
     }*/

.menu-tree .el-menu {
  background-color: transparent;
  border: 0;
  overflow: hidden;
  .el-menu-item {
    display: flex;
    align-items: center;
    color: @zvFontGrey;
    font-size: 12px;
    &:hover,
    &:focus,
    &.is-active {
      color: #fff;
      background-color: @zvBlue;
    }
    &:hover {
      color: #fff;
      background-color: #3d3e48;
    }
    & i {
      margin-right: 25px;
      color: #fff;
    }

    &.el-submenu__title:hover {
      background: none;
    }
  }
  .el-submenu {
    color: @zvFontGrey;

    &:hover {
      // border-left-color:@zvBlue;
      color: #fff;
    }

    &.is-opened,
    &.is-active {
      /* background-color:@zvGrey;*/
      background-color: #333333;
    }

    &.is-active {
      & > .el-submenu__title {
        color: #fff;
        background-color: @zvBlue;
        &:hover {
          background-color: @zvBlue;
        }
      }
    }

    &:focus {
      // background-color:@zvBlue;
      // border-left-color:@zvBlue;
    }

    .el-menu-item {
      position: relative;
      padding-left: 62px !important;
      border-left: 0;
      background: none;
      color: #999;
      &:hover {
        background: #3d3e48;
      }
      &.is-active {
        color: #fff;
        &:before {
          background-color: #01E6C3;
        }
      }

      &:before {
        content: "";
        position: absolute;
        color: #999;
        top: 50%;
        left: 24px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #999;
        margin-top: -3px;
      }
    }

    .el-submenu__title {
      /*  color: #fff;*/
      display: flex;
      align-items: center;
      color: @zvFontGrey;
      font-size: 12px;
      &:hover,
      &:focus,
      &.active {
        color: #fff;
        // background-color: @zvGrey;
        background: none;
        background-color: #3d3e48;
      }

      .el-icon-arrow-down {
        color: #fff;
        font-size: 13px;
        right: 10px;
      }
    }
    & i {
      margin-right: 25px;
      color: #fff;
    }
  }

  .el-menu-item,
  .el-submenu {
    width: 200px;
    overflow: hidden;
  }

  &.el-menu--collapse {
    width: 56px;
    .el-menu-item,
    .el-submenu {
      width: 56px;
      .zv-icon {
        margin-right: 0;
      }
    }

    .el-menu-item {
      .el-tooltip {
        display: flex !important;
        vertical-align: middle;
        align-items: center;
      }
    }
  }
}

.el-menu.el-menu--popup{
  background: #333333;
  margin: 0;
  min-width: 150px;
  box-shadow: none;
  border-radius: 0;
  .el-menu-item {
    position: relative;
    color: #999;
    padding-left: 30px !important;
    padding-right: 10px;
    font-size: 12px;
    height: 46px;
    line-height: 46px;
    &:before {
      content: "";
      position: absolute;
      color: #999;
      top: 50%;
      left: 13px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #999;
    }

    &:hover {
      background: #3d3e48;
    }
    &.is-active {
      background: none;
      color: #fff;
      &:before {
        background: #01E6C3;
      }
    }
  }
}
</style>
