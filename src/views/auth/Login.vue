<template>
  <div class="zv-login">
    <div class="zv-login-header">
      <div class="zv-login-header-title"></div>
    </div>
    <div class="zv-login-content">
      <div class="zv-login-left">
        <div
          class="zv-login-left-copyright"
        >Copyright © 2019 中联重科股份有限公司 All rights reserved.技术支持:中科云谷</div>
      </div>
      <div class="zv-login-right">
        <div class="zv-login-title">用户登录</div>
        <div class="zv-login-form" @keyup.enter="submitForm('loginForm')">
          <div class="zv-login-form-title">账号登录</div>
          <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">
            <el-form-item class="zv-login-form-item" prop="loginName">
              <el-input
                class="zv-login-form-input"
                v-model.trim="loginForm.loginName"
                placeholder="请输入您的账号"
              ></el-input>
              <i class="zv-icon-login-user2 zv-login-form-icon"></i>
            </el-form-item>
            <el-form-item class="zv-login-form-item" prop="userPwd">
              <el-input
                class="zv-login-form-input"
                type="password"
                v-model.trim="loginForm.userPwd"
                autocomplete="off"
                show-password
                placeholder="请输入您的密码"
              ></el-input>
              <i class="zv-icon-login-password zv-login-form-icon"></i>
            </el-form-item>
            <el-form-item>
              <el-button
                style="width: 100%;margin-top: 30px;height: 40px;font-size: 15px;"
                @click="submitForm('loginForm')"
                type="primary"
              >登录</el-button>
            </el-form-item>
          </el-form>
          <div style="color: #8B8B8B;line-height: 1.4em" class="zv-login-form-tips">
            为了更好的用户体验，我们建议您使用
            <a :href="chromeDownloadUrl" style="color: #2a64c7;">Chrome浏览器</a>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码弹窗 -->
    <template v-if="modifyPwdDialog">
      <zv-dialog
        title="修改密码"
        :modal-append-to-body="false"
        :showDialog.sync="modifyPwdDialog"
        width="400px"
      >
        <div slot="content">
          <el-form class="form" :model="form" :rules="rules" ref="form" label-width="140px">
            <el-form-item label="原密码：" prop="userPwd">
              <el-input v-model.trim="form.userPwd" type="password" placeholder="请输入原密码"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="userPwd1">
              <el-input v-model.trim="form.userPwd1" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码：" prop="confirmpwd">
              <el-input v-model.trim="form.confirmpwd" type="password" placeholder="请确认新密码"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="btns">
          <el-button @click="modifyPwdDialog=false">取消</el-button>
          <el-button type="primary" @click="modifyPwd">保存</el-button>
        </div>
      </zv-dialog>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import tokenService from "@/utils/services/token_service";
import Tips from "@/utils/utils/Tips";
import { BaseUrl } from "@/main_config";

export default {
  name: "Login",
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
      chromeDownloadUrl:
        BaseUrl + "/file/v1.1/static/download/google_chrome_77.0.3865.90",
      redirectUrl: "",
      loginForm: {
        loginName: "",
        userPwd: ""
      },
      loginRules: {
        loginName: [
          { required: true, message: "请输入用户名或者手机", trigger: "blur" }
        ],
        userPwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },

      // 修改密码弹窗
      modifyPwdDialog: false,
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
        ],
        loginName: [
          { required: true, message: "请输入用户名或者手机", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["SET_LOGIN"]),
    ...mapActions(["setLogin", "setCompanyList"]),
    ...mapActions(["delAllViews"]),
    toUrl(name, params) {
      this.$router.push({
        name: name,
        params: params
      });
    },
    submitForm(formName) {
      let vm = this;
      vm.$refs[formName].validate(valid => {
        if (valid) {
          let _url = "/app/user/v1/login";
          // let _nameKey = "loginName";
          let params = this.$_.cloneDeep({
            loginName: vm.loginForm.loginName,
            userPwd: this.$md5(vm.loginForm.userPwd)
          });
          vm.$post(_url, params).then(res => {
            if (res.status == 200) {
              let _data = res.data;
              if (_data.code == "0000") {
                vm.delAllViews();
                tokenService.setToken(_data.data);
                vm.setLogin(true);
                Tips.notify({
                  message: "登录成功！",
                  type: "success",
                  title: "登录成功"
                });

                vm.$router.push("/home");

                /** 王荣08/06注释 暂不做初始密码校验和修改
                this.$api.commonSelectList({ dicId: "203626" }).then(res => {
                  let _initPwd = res.data.data.some(obj => {
                    return obj.dicname === this.$md5(vm.loginForm.userPwd);
                  });
                  if (_initPwd) {
                    Tips.notify({ message: "请先修改默认密码", type: "warning", title: "温馨提示", duration: 3000 });
                    this.showDialog();
                  } else {
                    Tips.notify({ message: "登陆成功！", type: "warning", title: "登陆成功" });
                    vm.$router.push("/home");
                  }
                });
                */
              }
            }
          });
        }
      });
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
      Tips.message({ message: data.data, type: "success" });
      this.modifyPwdDialog = false;
    }
  },
  mounted() {
    this.redirectUrl = this.$route.query.redirect || "";
  }
};
</script>

<style lang='sass'>
  .zv-login
    width: 100%
    height: 100%
    font-size: $font-normal
    &-header
      width: 100%
      height: 44px
      background: #131416 url("../../assets/images/logo.png") 16px 10px no-repeat
      &-title
        color: #FFF
        height: 44px
        line-height: 44px
        padding-left: 147px
    .zv-login-content
      display: flex
      height: calc(100% - 44px)
      .zv-login-left
        position: relative
        flex: 1
        height: 100%
        background: url("../../assets/images/login_bg.jpg") left top no-repeat
        background-size: cover
        &-copyright
          width: 100%
          position: absolute
          left: 0
          bottom: 20px
          color: #FFF
          text-align: center
      .zv-login-right
        width: 440px
        height: 100%
        background: #FFF
        padding: 80px 40px 24px
        .zv-login-title
          margin-bottom: 40px
          font-size: 28px
          color: #333
    &-form
      &-title
        line-height: 44px
        height: 44px
        border-bottom: 1px solid #eee
        margin-bottom: 40px
      &-item.el-form-item--small.el-form-item
        margin-bottom: 25px
        position: relative
      &-input
       .el-input__inner
        // width: 100% !important
        border: none
        border-bottom: 1px solid #E0E0E0
        -webkit-border-radius: 0
        -moz-border-radius: 0
        border-radius: 0
        // padding-bottom: 10px
        padding-left: 60px
      &-icon
        position: absolute
        left: 0
        top: 50%
        transform: translate(0,-50%)
        font-size: 18px
        width: 18px
        height: 18px
    &-submit
      width: 100%
      margin-top: 20px
      background: $zvBlue
      color: #FFF
    &-submit:hover
      background: $zvBlueLighter
      color: #FFF
</style>
