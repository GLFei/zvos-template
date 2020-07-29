<template>
    <div class="zv-page" id="page-login">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>注册账号</h3>
                <span class="auth-header-sublink">已有账号，<el-button type="text" @click="toUrl('login')">快捷登陆<i class="el-icon-arrow-right"></i></el-button></span>
            </div>

            <div class="auth-form-wrapper" @keyup.enter="submitForm('ruleForm')">
                <el-form :model="ruleForm" status-icon :rules="rule" ref="ruleForm" class="zv-form-auth">
                    <el-form-item  prop="username">
                        <el-input v-model="ruleForm.username" placeholder="用户(字母或数字)，且以字母开头"></el-input>
                    </el-form-item>

                    <el-form-item  prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
                    </el-form-item>

                    <el-form-item prop="telNumber">
                        <div>
                            <el-input placeholder="手机号码" v-model="ruleForm.telNumber">
                                <template slot="prepend">+86</template>
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item prop="msgCode">
                        <div>
                            <el-input placeholder="短信验证码" v-model="ruleForm.msgCode">
                                <template slot="append">
                                    <el-button type="primary" @click="getMsgCode('ruleForm')" :disabled="veriBtnDisabled">{{veriBtn}}<em v-if='veriBtnDisabled'>s</em></el-button>
                                </template>
                            </el-input>
                        </div>
                    </el-form-item>


                    <el-form-item style="margin-bottom:0;">
                        <el-button class='btn-auth-submit' type="primary" @click="submitForm('ruleForm')" >注册</el-button>
                     <!--   <el-button @click="resetForm('ruleForm')">重置</el-button>-->
                    </el-form-item>

                    <el-form-item>
                        <el-row style="margin-top:10px;" align="middle">
                            <el-col :span="8" style="line-height: 22px;">
                                <el-checkbox name="agree" label="阅读并同意" class="checkbox-agreement" v-model="agree"></el-checkbox>
                            </el-col>

                            <el-col :span="16">
                                <div class="agreement-wrapper">
                                    <el-button class="zv-text-btn" type="text" @click="showAgreementDialog('serviceDialogVisible')">《ZValley OS开放平台服务条款》</el-button>
                                    <el-button class="zv-text-btn" type="text" @click="showAgreementDialog('privacyDialogVisible')">《ZValley OS开放平台服务条款》</el-button>
                                </div>
                            </el-col>

                        </el-row>


                    </el-form-item>


                </el-form>
            </div>
        </div>

        <el-dialog
                title="ZValley OS开放平台服务条款"
                :visible.sync="serviceDialogVisible"
                width="30%"
                :before-close="handleClose('serviceDialogVisible')" class="zl-dialog">
            <div class="zl-dialog-wrapper agreement-dialog">
                <div class="zl-dialog-header">《ZValley OS开放平台服务条款》</div>
                <div class="zl-dialog-content">

                </div>
            </div>
           <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="serviceDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="serviceDialogVisible = false">确 定</el-button>
          </span>-->
        </el-dialog>

        <el-dialog
                title="ZValley OS开放平台个人信息保护政策"
                :visible.sync="privacyDialogVisible"
                width="30%"
                :before-close="handleClose('privacyDialogVisible')">
            <div class="zl-dialog-wrapper agreement-dialog">
              <!--  <div class="zl-dialog-header">《ZValley OS开放平台个人信息保护政策》</div>-->
                <div class="zl-dialog-content">
                    ZValley OS开放平台个人信息保护政策
                    ZValley OS开放平台个人信息保护政策
                </div>
            </div>
         <!--   <span slot="footer" class="dialog-footer">
                <el-button @click="serviceDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="serviceDialogVisible = false">注册</el-button>
          </span>-->
        </el-dialog>

    </div>
</template>

<script>
    import validator from './registionValidator'
    import Tips from "@/utils/utils/Tips";
    export default {
        name:"Login",
        data() {
            let validatePass=(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };

             let validatePass2 =(rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                privacyDialogVisible:false,
                serviceDialogVisible:false,
                timeCount: 30,
                veriBtn:"获取验证码",
                veriBtnDisabled:false,

                agree:true,

                ruleForm: {
                    username:'',
                    pass: '',
                    checkPass: '',
                    telNumber: '',
                    msgCode:''
                },
                rule: {
                    username: [
                        { validator: validator.validateUserName, trigger: 'blur' }
                    ],
                    pass: [
                        { min: 6,max:20, message: '请输入6-20位密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    telNumber:[
                        { validator: validator.validatePhone, trigger: 'blur'}
                    ],
                    msgCode:[
                        /*{ validator:validator.validateMsgCode, trigger:'change' }*/
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '短信验证码位数不正确', trigger: 'blur' }
                    ]

                }
            };
        },
        methods: {
            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },
            handleClose(){
                window.console.log("handle close")
            },
            showAgreementDialog(dialog){
                this[dialog]=true;
            },

            resetCountDown() {
                this.veriBtnDisabled = false;
                this.veriBtn = '发送验证码';
            },
            countDownStart() {
                var vm = this;
                vm.veriBtnDisabled = true;
                vm.veriBtn = vm.timeCount;
                var _countDown = function () {
                    if (vm.veriBtn == 0) {
                        vm.resetCountDown();
                        return;
                    } else {
                        setTimeout(function () {
                            vm.veriBtn -= 1;
                            _countDown()
                        }, 1000)
                    }
                }
                _countDown();
            },

            getMsgCode(formName){
                let vm = this;
                if(vm.veriBtnDisabled==true){
                    return false;
                }

                vm.$refs[formName].validateField('telNumber',(errors)=>{
                    if(!errors ){
                        vm.$post('base/v1/sms.code',{
                            bizType: 'user_reg',
                            phone: vm.ruleForm.telNumber
                        }).then(
                            res =>{
                                if(res.status==200){
                                    let _data=res.data;
                                    if(_data.code=='0000'){
                                        this.countDownStart();
                                    }else{
                                        Tips.notify({
                                            title: "错误",
                                            message: _data.msg,
                                            type: "error"
                                        });
                                    }
                                }else{
                                    window.console.log('error submit!!');
                                    return false;
                                }
                            }
                        )//end then cb;
                    }
                })

            },
            submitForm(formName) {
                let vm=this;
               window.console.log(vm.agree);
                if(!vm.agree){
                    Tips.message({
                        type: "error",
                        message: "请阅读并同意平台服务条款"
                    });
                    return;
                }
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$post('user/v1/auth/register',{
                            dynaCode:vm.ruleForm.msgCode,
                            login: vm.ruleForm.username,
                            password:vm.ruleForm.pass,
                            telNumber:vm.ruleForm.telNumber
                        }).then(res=>{
                            if(res.status==200 || res.status==201){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    // 响应错误
                                    Tips.notify({
                                        title: '注册成功',
                                        message: '请登陆系统',
                                        type: "success",
                                        onClose: () => {
                                            window.console.log("login");
                                            vm.toUrl('login')
                                        }
                                    });


                                }else{
                                    // 响应错误
                                    window.console.log(_data.code)
                                    Tips.notify({
                                        title: '错误',
                                        message: _data.msg,
                                        type: 'error',
                                        onClose: () => {
                                            window.console.log("login");
                                            vm.toUrl('login')
                                        }
                                    });
                                }
                            }
                        })

                    } else {
                        window.console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },

    }
</script>

<style lang="less" scoped >
    #page-login{
        .checkbox-agreement{
            height:48px;
            line-height: 48px;

            /deep/ .el-checkbox__label{
                color: #333!important;
            }
        }
        .agreement-wrapper{
            text-align: right;
            line-height:22px;
            .zv-text-btn{
                padding:0;
                height:22px;
                line-height: 22px;
            }

        }
    }
</style>