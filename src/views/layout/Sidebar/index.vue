<template>
  <el-aside
    class="main-sidebar zv-el-aside"
    :width="width+'px'"
    @mouseenter.native="mouseEnterEvent"
    @mouseleave.native="mouseLeaveEvent"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <menu-tree :default-active="$route.path" :menu-model="menuModel" :collapse="getMenuCollapse"></menu-tree>
    </el-scrollbar>
  </el-aside>
</template>

<script>
import MenuTree from "./MenuTree";
import tokenService from "@/utils/services/token_service";
import { mapGetters, mapActions } from "vuex";
import menuConfig from '@/config/menuConfig'

export default {
  components: {
    MenuTree
  },
  props: {
    width: Number
  },
  computed: {
    ...mapGetters(["getMenuCollapse"])
  },
  data() {
    return {
      menuModel: menuConfig,
      preCollapse: false,
      enterFlag: false
    };
  },
  methods: {
    ...mapActions(["setMenuCollapse"]),
    getPowerMenu(menulist, arr) {
      menulist.forEach(item => {
        item.isShow = true;
        if (item.hasOwnProperty("code")) {
          let tempArr = arr.filter(obj => {
            return obj.menuEnText === item.code;
          });
          if (!tempArr.length) {
            item.isShow = false;
          } else {
            if (item.children && tempArr[0].children) {
              this.getPowerMenu(item.children, tempArr[0].children);
            }
          }

          if (item.code == 'home_page') {
            item.isShow = true
          }
        }
      });
    },
    mouseEnterEvent() {
      if (this.enterFlag) {
        return;
      }
      this.enterFlag = true;
      this.preCollapse = this.getMenuCollapse;
      this.setMenuCollapse(false);
    },
    mouseLeaveEvent() {
      this.enterFlag = false;
      this.setMenuCollapse(this.preCollapse);
    }
  },
  created() {
    let _token = tokenService.getToken();
    if (!_token) {
      window.console.log("no token");
      this.$router.push({
        name: "login"
      });
    } else {
      let storeMC = localStorage.getItem('menuCollapse');
      if (storeMC) {
        let tempBool = storeMC === 'true'
        this.setMenuCollapse(tempBool)
      }
      this.$api.fetchRolesGetmenuList({}).then(res => {
        window.console.log('roleMenuList', res)
        if (res.data && res.data.code == "0000") {
          let resData = res.data.data.items || []
          this.getPowerMenu(menuConfig.children, resData);
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "../../../static/less/theme.less";
.main-sidebar.el-aside {
  width: 200px;
  background-color: @zvDarkGrey;
  // border-right: solid 1px #d8dce5;
  text-align: left;

  -webkit-transition: width 0.3s;
  -moz-transition: width 0.3s;
  -ms-transition: width 0.3s;
  -o-transition: width 0.3s;
  transition: width 0.3s;

  .el-scrollbar {
    height: calc(100vh - 44px);

    .scrollbar-wrapper {
      overflow-x: hidden;
    }
  }
}
</style>
