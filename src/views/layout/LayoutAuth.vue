<template>
  <el-container class="zv-layout zv-layout-auth">
    <div class="loading" v-if="loading" v-loading.fullscreen.lock="loading"></div>

    <!--<el-header>-->
    <!--<top-bar-auth></top-bar-auth>-->
    <!--</el-header>-->
    <el-container>
      <el-container>
        <!--<el-main>-->
        <router-view />
        <!--<div class="test">test</div>-->
        <!--</el-main>-->
        <!--<el-footer>-->
        <!--<copy-right></copy-right>-->
        <!--</el-footer>-->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import pageMixin from "@/mixins/pageMixin";
// import CopyRight from "../../components/CopyRight";
import TopBarAuth from "./TopBarAuth";
export default {
  name: "Layout",
  mixins: [pageMixin],
  components: {
    // CopyRight,
    TopBarAuth,
  },

  data() {
    return {
      loading: false,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      //do sth preset
    },
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  mounted() {
    let vm = this;
    setTimeout(function () {
      vm.loading = false;
    }, 200);
  },
};
</script>

<style lang="less" scoped>
@import "../../static/less/theme.less";
@import "../../static/less/common.less";
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

  .el-header,
  .el-footer {
    padding: 0;
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 42px;
  }
  .el-header {
    z-index: 999;
    //box-shadow: 0px 3px 10px 0px rgba(33, 33, 33, 0.08);
  }
  .el-footer {
    border-top: solid 1px #ddd;
  }

  .el-aside {
  }

  .el-main {
    color: #333;
  }

  & > .el-container {
    margin-bottom: 0;
    height: 100vh;
  }
}
</style>
