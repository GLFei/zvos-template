<template>
  <div class="zv-topbar">
    <div class="zv-topbar-wrapper">
      <div
        class="zv-topbar-nav-toggle"
        @click="toggleSidebar"
        :class="{ 'open': !getMenuCollapse }"
      >
        <i class="zv-icon zv-icon-toggle"></i>
      </div>
      <div class="zv-topbar-logo">
        <em class="zv-logo" :style="'background-image: url(' + zvLogoUrl + ');'"></em>
      </div>
      <!-- <div class="zv-topbar-logo-title">农机大脑物联应用</div> -->
      <!-- <div class="zv-topbar-logo-title">中联重科物联网平台</div> -->
      <div class="zv-topbar-logo-title">{{ zvLogoTitle }}</div>
    </div>
    <!--toolbar-wrapper-->
    <div class="zv-topbar-menu">
      <!-- <div class="zv-search-wrapper" :class="{'focus':searchBarFocus}">
                <el-input
                        placeholder="全局搜索，请输入关键字"
                        suffix-icon="el-icon-search"
                        @focus="setSearchBarFocus('focus')"
                        @blur="setSearchBarFocus('blur')"
                        v-model="globalSearch">
                </el-input>
      </div>-->
      <div
        class="el-dropdown"
        @click="$router.push('/usercenter?refreshTm=' + (new Date()).getTime())"
      >
        <a class="zv-topbar-user-info" style="float:left;">
          <i class="zv-icon zv-icon-login-user"></i>
        </a>
        <span>{{ showUserName }}</span>
      </div>
      <div class="zv-topbar-menu-wrapper">
        <!--<div class="zv-topbar-menu-link">-->
        <!--&lt;!&ndash;<a href="#"><i class="el-icon-bell"></i></a>&ndash;&gt;-->
        <!--<a><i class="zv-icon zv-icon-msg"></i></a>-->
        <!--</div>-->
        <!--<div class="zv-topbar-menu-link">-->
        <!--&lt;!&ndash;<a href="#"><i class="el-icon-question"></i></a>&ndash;&gt;-->
        <!--<a><i class="zv-icon zv-icon-help"></i></a>-->
        <!--</div>-->
        <!-- <div title="修改密码" class="zv-topbar-menu-link">
                    <a href="#"><i class="el-icon-question"></i></a>
                    <a @click="showDialog">
                        <i class="zv-icon zv-icon-setting"></i>
                    </a>
        </div>-->
        <div title="注销" class="zv-topbar-menu-link">
          <a @click="topBarClick('logout')">
            <i class="zv-icon zv-icon-logout"></i>
          </a>
        </div>
        <div title="关于" class="zv-topbar-menu-link">
          <a @click="aboutDialogVisible = true">
            <i class="zv-icon zv-icon-help"></i>
          </a>
        </div>
      </div>
      <!--<el-dropdown  @command="handleCommand">
                <a class="zv-topbar-user-info"  style="float:left;">

                    <i class="el-icon-caret-left"></i>
                    <span>{{ userInfo.username || "测试用户" }}</span>
                </a>

                <el-dropdown-menu slot="dropdown" class="top-bar-dropdown-menu">
                    <el-dropdown-item command="account">账号信息</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
                </el-dropdown-menu>

      </el-dropdown>-->
      <!--<a class="zv-topbar-user-info" href="#">登录</a>-->
    </div>
    <!--toolbar-menu-->

    <zv-dialog
      title="版本号"
      class="zv-about-dialog"
      :modal-append-to-body="false"
      :showDialog.sync="aboutDialogVisible"
      width="460px"
    >
      <div slot="content" style="text-align:center;margin-bottom:90px;">
        <div style="margin-bottom:22px;">
          <img
            src="@/static/images/icons/icon_zlogo.png"
            style="width:80px;height:80px;"
            alt="图片无法加载"
          />
        </div>
        <div style="margin-bottom:12px;">
          <img
            src="@/static/images/icons/icon_zoomlion.png"
            style="width:148px;height:20px;"
            alt="“图片无法加载"
          />
        </div>
        <div style="font-size:16px;margin-bottom:12px;">{{zvLogoTitle}}</div>
        <div style="font-size:12px;">{{version}}</div>
      </div>
      <div slot="foot">
        <div
          style="font-size:12px;text-align:center;margin-bottom:5px;"
        >Copyright©2019-2020 ZValley OS. All Rights Reserved. 中科云谷版权所有</div>
      </div>
    </zv-dialog>

    <zv-dialog
      title="修改密码"
      :modal-append-to-body="false"
      :showDialog.sync="modifyPwdDialog"
      width="400px"
    >
      <div slot="content">
        <el-form class="form" :model="form" :rules="rules" ref="form" label-width="140px">
          <el-form-item label="原密码：" prop="userPwd">
            <el-input v-model="form.userPwd" type="password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码：" prop="userPwd1">
            <el-input v-model="form.userPwd1" type="password" placeholder="请输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码：" prop="confirmpwd">
            <el-input v-model="form.confirmpwd" type="password" placeholder="请确认新密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="btns">
        <el-button @click="modifyPwdDialog=false">取消</el-button>
        <el-button type="primary" @click="modifyPwd">保存</el-button>
      </div>
    </zv-dialog>
  </div>
</template>

<script>
import { Version } from "@/main_config";
import pageMixin from "@/mixins/pageMixin";
import { mapState, mapGetters, mapActions } from "vuex";
import Tips from "@/utils/utils/Tips";
export default {
  name: "TopBar",
  mixins: [pageMixin],
  props: {
    // userInfo: Object,
    topBarClick: Function
  },
  computed: {
    ...mapState("userInfo", {
      userInfo: state => state
      // username:state=>state.login
    }),

    ...mapGetters(["getMenuCollapse"]),

    showUserName() {
      let retStr = "测试用户[系统管理员]";
      if (this.userInfo.userName) {
        retStr = this.userInfo.userName + "[" + this.userInfo.roleName + "]";
      }

      return retStr;
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.userPwd1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      aboutDialogVisible: false,
      version: Version,
      modifyPwdDialog: false, // 修改密码弹窗是否展现
      searchBarFocus: false,
      globalSearch: "",
      zvLogoUrl: "",
      zvLogoTitle: "",
      form: {
        userPwd: "",
        userPwd1: "",
        confirmpwd: ""
      },
      rules: {
        userPwd: { required: true, message: "请输入原密码", trigger: "blur" },
        userPwd1: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { min: 8, message: "密码长度不小于8位", trigger: "blur" },
          {
            pattern: /(?=.*[a-z])(?=.*\d)(?=.*[#@!~%^&*])[a-z\d#@!~%^&*]+/i,
            message: "需字母、数字、特殊字符的组合",
            trigger: "blur"
          }
        ],
        confirmpwd: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["setMenuCollapse"]),
    setSearchBarFocus(status) {
      if (status == "focus") {
        this.searchBarFocus = true;
      } else {
        this.searchBarFocus = false;
      }
    },
    toggleSidebar() {
      this.setMenuCollapse(!this.getMenuCollapse);
    },
    handleCommand(command) {
      this.topBarClick(command, {});
    },
    // 展现修改密码弹窗
    showDialog() {
      for (let o in this.form) {
        this.form[o] = "";
      }
      this.modifyPwdDialog = true;
    },
    // 修改密码
    async modifyPwd() {
      await this.$refs.form.validate();
      let obj = this.$_.cloneDeep(this.form);
      obj.userPwd = this.$md5(obj.userPwd); //MD5
      obj.userPwd1 = this.$md5(obj.userPwd1); //MD5
      delete obj.confirmpwd;

      let res = await this.$put("/user/v1/modifypwd", obj);
      let data = res.data;
      Tips.message({
        type: "success",
        message: data.data
      });
      this.topBarClick("logout");
    }
  },

  async created() {
    this.$api.getUserUnit().then(res => {
      let data = res.data;
      if (data.code == "0000") {
        this.zvLogoUrl =
          data && data.data && data.data.logo
            ? data.data.logo
            : require("@/assets/images/zoomlion-logo-new.png");
        this.zvLogoTitle =
          data && data.data && data.data.expound
            ? data.data.expound
            : "中联重科物联网平台";
      }
    });
  }
};
</script>

<style lang="less">
@import "../../../static/less/theme.less";
.zv-topbar {
  display: flex;
  .zv-topbar-wrapper {
    display: flex;
    padding-left: 13px;
    position: relative;
    flex-basis: 400px;
    height: 44px;
    align-items: center;
    /*
            background-color:#00413d;
            color:#fff;
            border-bottom:solid 1px #00352f;
            */
    .zv-topbar-nav-toggle {
      flex-basis: 44px;
      /*border-right:solid 1px #00352f;*/
      cursor: pointer;
      position: relative;
      margin-right: 10px;
      &:hover {
        color: @zvBlue;
      }
      &:after {
        content: "";
        position: absolute;
        top: 6px;
        right: 0;
        height: 20px;
        width: 1px;
        background: #414345;
      }
      i {
        // position: absolute;
        // top:50%;
        // margin-top:-20px;
        // left:15px;

        /* -webkit-transition: transform .2s;
                    -moz-transition: transform .2s;
                    -ms-transition: transform .2s;
                    -o-transition: transform .2s;
                    transition: transform .2s;
                    -webkit-transform: rotate(-90deg);
                    -moz-transform: rotate(-90deg);
                    -ms-transform: rotate(-90deg);
                    -o-transform: rotate(-90deg);
                    transform: rotate(-90deg);*/
      }
      &.open {
        i {
          /* -webkit-transform: rotate(0);
                        -moz-transform: rotate(0);
                        -ms-transform: rotate(0);
                        -o-transform: rotate(0);
                        transform: rotate(0);*/
        }
      }
    }
    .zv-topbar-logo {
      padding: 0 10px;
      display: flex;
      .zv-logo {
        display: block;
        position: relative;
        width: 114px;
        height: 15px;
        // background-image: url("../../../assets/images/zoomlion-logo-new.png");
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
      }
    }

    .zv-topbar-logo-title {
      padding-left: 10px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .zv-topbar-menu {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;

    .zv-search-wrapper {
      margin-right: 20px;
      align-self: flex-start;

      flex-basis: 300px;

      -webkit-transition: flex-basis 0.25s;
      -moz-transition: flex-basis 0.25s;
      -ms-transition: flex-basis 0.25s;
      -o-transition: flex-basis 0.25s;
      transition: flex-basis 0.25s;

      &.focus {
        flex-basis: 420px;
      }

      .el-input {
        input {
          margin-top: 10px;
          padding-right: 45px;
          height: 40px;
          border: solid 1px @zvBlue;
          border-radius: 0;
          background-color: #3c4044;
          color: #fff;
          font-size: 14px;

          &:focus {
            outline: solid 2px @zvBlue;
            outline-offset: -2px;
          }
        }
        .el-input__suffix {
          top: -2px;
          right: 15px;
        }
        .el-input__icon {
          font-size: 24px;
          color: #fff;
        }
      }
    }

    .zv-topbar-user-info {
      .zv-figure {
        display: inline-block;
        margin-right: 10px;
        float: left;
        width: 26px;
        height: 26px;
        border-radius: 100%;
        overflow: hidden;

        background-color: @zvBlue;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      span {
        margin-right: 6px;
        color: #fff;
        margin-left: 6px;
      }

      &:hover {
        span {
          color: rgba(255, 255, 255, 0.65);
        }
      }
    }

    .el-dropdown {
      margin-top: 7px;
      line-height: 30px;
      height: 30px;
      margin-right: 10px;
      padding-right: 20px;
      position: relative;
      cursor: pointer;
      span {
        margin-right: 6px;
        color: #fff;
      }
      //   &:hover {
      //     span {
      //       color: rgba(255, 255, 255, 0.65);
      //     }
      //   }
      &:before {
        content: "";
        position: absolute;
        background: #414345;
        width: 1px;
        height: 20px;
        top: 5px;
        right: 0;
      }
    }

    a {
      color: #fff;
      text-decoration: none;
      padding: 0 10px;
      i.el-icon-caret-left {
        -webkit-transition: transform 0.2s;
        -moz-transition: transform 0.2s;
        -ms-transition: transform 0.2s;
        -o-transition: transform 0.2s;
        transition: transform 0.2s;
      }
      &:hover,
      &:focus {
        color: #fff;

        i.el-icon-caret-left {
          -webkit-transform: rotate(-90deg);
          -moz-transform: rotate(-90deg);
          -ms-transform: rotate(-90deg);
          -o-transform: rotate(-90deg);
          transform: rotate(-90deg);
        }
      }

      &.zv-topbar-user-info {
        position: relative;
        top: 7px;
      }
    }

    .zv-topbar-menu-wrapper {
      display: flex;
      padding-right: 10px;
      .zv-topbar-menu-link {
        flex-basis: 40px;
        width: 40px;
        font-size: 26px;
        text-align: center;
        position: relative;
        height: 100%;
        cursor: pointer;
        a {
          display: block;
          padding: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}

.top-bar-dropdown-menu {
  margin-right: -6px !important;
  margin-top: -4px !important;
  min-width: 120px !important;

  /*background-color:@zvBlack!important;*/
  /* border:0 !important;*/
  border-radius: 0 !important;
  text-align: center !important;
  .popper__arrow {
    display: none;
  }

  .el-dropdown-menu__item:not(.is-disabled):hover,
  .el-dropdown-menu__item:focus {
    background-color: #fff;
    color: @zvBlue;
  }

  .el-dropdown-menu__item--divided {
    border-top: solid 1px #d8dce5;
    &:before {
      content: "";
      height: 6px;
      display: block;
      margin: 0 -20px;
      background-color: transparent;
    }
  }

  .popper__arrow {
    display: none !important;
  }
}
</style>

<style lang="less" scoped>
/deep/.zv-about-dialog .dialog {
  .dep-form .title-block {
    display: block;
    font-size: 14px;
    text-align: center;
    padding-top: 13px;
    padding-bottom: 13px;
    border-bottom: none;
    .title {
      font-size: 14px;
      text-align: center;
    }
    .el-icon-close {
      float: right;
      font-size: 14px;
      color: #333;
    }
  }
  .btns {
    border-top: none !important;
    padding-top: 0 !important;
  }
}
</style>
  
