<template>
  <el-container class="zv-layout test">
    <div class="loading" v-if="loading" v-loading.fullscreen.lock="loading"></div>

    <el-header height="44px">
      <top-bar :top-bar-click="topBarClick"></top-bar>
    </el-header>
    <el-container>
      <sidebar :width="sliderWidth"></sidebar>
      <el-container>
        <tags-view></tags-view>
        <el-main id="el-main" v-if="dataInited">
          <!-- <div id="nav">
                        <router-link to="/home">Home</router-link> |
                        <router-link to="/">About</router-link>
          </div>-->
          <transition name="fade-transform" mode="out-in">
            <!--   <router-view/>-->
            <!-- <router-view :key="key" /> -->

            <keep-alive>
              <!--使用keep-alive会将页面缓存-->
              <router-view v-if="$route.meta.keepAlive != false" :key="key"></router-view>
            </keep-alive>

            <!--<keep-alive :include="cachedViews">-->
            <!---->
            <!--</keep-alivekeepkeep>-->
          </transition>
          <router-view v-if="$route.meta.keepAlive == false" :key="key"></router-view>
          <!--<div class="test">test</div>-->
        </el-main>
        <el-footer style="height: 42px;">
          <copy-right></copy-right>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import moment from "moment";
import pageMixin from "@/mixins/pageMixin";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import tokenService from "@/utils/services/token_service";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CopyRight from "../../components/CopyRight";
import TagsView from "./TagsView";
import Tips from "@/utils/utils/Tips";
//import eventBus from "@/utils/services/event_service"
// import httpService from "@/utils/services/http_service";

export default {
  name: "Layout",
  mixins: [pageMixin],
  components: { Sidebar, TopBar, CopyRight, TagsView },

  data() {
    return {
      loading: false,
      width: 200,
      dataInited: false
    };
  },
  computed: {
    ...mapState({
      hasLogin: state => state.login
    }),
    ...mapState("userInfo", {
      userInfo: state => state
      // username:state=>state.login
    }),
    ...mapGetters(["getMenuCollapse"]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
    sliderWidth() {
      let retWidth = 200;
      if (this.getMenuCollapse) {
        retWidth = 56;
      }
      return retWidth;
    }
  },
  methods: {
    ...mapMutations("userInfo", []),
    ...mapMutations("authority", ["SET_AUTHORITY"]),
    ...mapActions(["logout"]),
    ...mapActions("userInfo", ["setUserInfo"]),
    ...mapActions("authority", ["setAuthority"]),
    ...mapActions(["delAllViews"]),

    toggle(isSidebarOpen) {
      if (isSidebarOpen) {
        this.width = 200;
      } else {
        this.width = 56;
      }
    },
    toUrl(name, params) {
      this.$router.push({
        name: name,
        params: params
      });
    },
    topBarClick(type) {
      let vm = this;
      if (type == "logout") {
        // vm.logout();
        // vm.$store.dispatch("delAllViews");
        vm.$post("/app/user/v1/userLoginOut").then(function(res) {
          if (res.status == 200) {
            let _data = res.data;
            if (_data.code == "0000") {
              vm.logout();
              vm.setAuthority({});
              vm.delAllViews();
            }
          }
        });
      } else if (type == "account") {
        vm.toUrl("usercenter");
      } else if (type == "verify") {
        vm.toUrl("usercenter");
      }
    },
    async fetchData() {
      let vm = this;
      let res = await vm.$get(
        "app/user/v1/user/getUser",
        {},
        { loading: false }
      );
      if (res.status == 200) {
        let data = res.data;
        if (data.code == "0000") {
          // if (data.data) {
          //     sessionStorage.setItem('userInfo', JSON.stringify(data.data))
          // }
          let tempData = Object.assign({}, data.data, {
            userName: data.data.loginName,
            id: data.data.userId
          });
          vm.setUserInfo(tempData);
          let expireDate = data.data.expireDate;
          let diffDays = moment(expireDate).diff(moment(), "day");
          // 如果到期日期小于等于30，弹出提示框
          if (diffDays <= 30) {
            Tips.message({ message: "账号将于" + diffDays + "天后失效", type: "warning" });
          }
        } else if (data.code == 401) {
          //todo:判断网路错误 or 未登陆
          // 响应错误
          Tips.notify({
            type: "error",
            title: "请重新登陆",
            message: data.msg,
            onClose() {
              vm.toUrl("login");
            }
          });
        } else {
          Tips.notify({
            type: "error",
            title: "获取用户信息失败",
            message: data.msg
          });
        }
      } else {
        window.console.log("error get account!");
        return false;
      }
    },
    fetchMenuList() {
      let vm = this;
      return vm.$get("app/user/v1/basMenu/getUserMenu").then(function(res) {
        window.console.log(res);
        if (res.status == 200) {
          let data = res.data;
          window.console.log('UserMenu', data);
          if (data.code !== "0000") {
            Tips.notify({
              type: "error",
              title: "获取用户菜单失败",
              message: data.msg
              /* onClose(){
                                     vm.toUrl("login");
                                 }*/
            });
          }
        } else {
          window.console.log("error get account!");
          return false;
        }
      });
    },

    fetchAuthority(next) {
      let vm = this;
      vm.$get("user/v1/res/functions", {}).then(function(res) {
        if (res.status == 200) {
          let data = res.data;
          if (data.code == "0000") {
            window.console.log('Authority', data);
            vm.setAuthority(data.data);

            next();
            //eventBus.$emit("authorityFetched")
          } else if (data.code == "GW.360") {
            //todo:判断网路错误 or 未登陆
            // 响应错误
            Tips.notify({
              type: "error",
              title: "请重新登陆",
              message: data.msg,
              onClose() {
                vm.toUrl("login");
              }
            });
          } else {
            Tips.notify({
              type: "error",
              title: "获取用户权限信息失败",
              message: data.msg
              /* onClose(){
                                     vm.toUrl("login");
                                 }*/
            });
          }
        } else {
          window.console.log("error get account!");
          return false;
        }
      });
    }
  },

  async created() {
    /**
     * 王荣08/06注释，用户信息接口没做好
     *
     *
     */
    let _token = tokenService.getToken();
    if (!_token) {
      window.console.log("no token");
      this.$router.push({
        name: "login"
      });
    } else {
      await this.fetchData()
      this.dataInited = true
    }
  }
};
</script>

<style lang="scss">
.test {
  background-color: $bg;
}
</style>

<style lang="less" scoped>
@import "../../static/less/theme.less";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: @zvBlue;
      }
    }
  }

  .el-container {
    width: 100%;
  }

  .el-footer {
    padding: 0;
    // background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 42px;
  }
  .el-header {
    padding: 0;
    color: #333;
    z-index: 999;
    // background-color: @zvBlue;
    background-color: #121416;
    //box-shadow: 0px 3px 10px 0px rgba(33, 33, 33, 0.08);
  }
  .el-footer {
    // background-color: #eee;
    border-top: solid 1px #ddd;
  }

  .el-main {
    flex-basis: calc(100vh - 150px);
    padding: 0;
    color: #333;
  }

  & > .el-container {
    margin-bottom: 0;
    height: 100vh;
  }
}
</style>
