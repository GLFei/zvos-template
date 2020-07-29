<template>
    <div class="zv-page" id="page-forget-password">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>忘记密码</h3>
                <span class="auth-header-sublink">
                    <div class="text-btn-group-auth">
                            <el-button-group>
                               <!-- <el-button type="text" @click="toUrl('register')">注册</el-button>-->
                                <el-button type="text" @click="toUrl('login')">登陆</el-button>
                            </el-button-group>
                        </div>

                </span>

            </div>
            <div class="auth-form-wrapper" @keyup.enter="submitForm('ruleForm')">
                <el-row class="auth-form-notice">
                    <i class="el-icon-message"></i>
                    <hr/>
                    <el-col :span="24">请输入您的手机号码，进行密码重置</el-col>
                </el-row>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"   class="zv-form-auth">
                    <el-form-item  prop="telNumber">
                        <div>
                            <el-input placeholder="手机号码" v-model="ruleForm.telNumber">
                                <template slot="prepend">+86</template>
                            </el-input>
                        </div>
                    </el-form-item>
                    <el-form-item   prop="captchaCode">
                        <el-col :span="16">
                            <el-input placeholder="验证码" v-model="ruleForm.captchaCode"></el-input>
                        </el-col>
                        <el-col :span="7" :offset="1">
                           <!-- <el-button type="primary" style="width:100%;">图形验证码</el-button>-->
                           <!-- <img src="http://10.39.52.225:8101/base/v1/sms.graph?token=${}">-->

                           <img :src="captcha" class="verify-image" @click="setCaptcha">
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button class='btn-auth-submit'  type="primary" @click="submitForm('ruleForm')"  >提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapActions}  from 'vuex'
    import Tips from "@/utils/utils/Tips";
    import validator from './registionValidator'
    // import tokenService from "@/utils/services/token_service"
    import { BaseUrl } from "@/main_config"
    export default {
        name:"ForgetPassword",
        data() {

            return {
                captcha:"",
                uuid:'',
                ruleForm: {
                    telNumber:'',
                    captchaCode:''

                },
                rules: {
                    telNumber:[
                        { validator: validator.validatePhone, trigger: 'blur'}
                    ],
                    captchaCode:[
                        { required: true, message: '请输入图形验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '图形验证码位数不正确', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            ...mapActions(['setTelNumber']),

            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },

            submitForm(formName) {
                let vm = this;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$post("base/v1/sms.graph",{
                            bizType:"pwd_reset",
                            phone: vm.ruleForm.telNumber,
                            code: vm.ruleForm.captchaCode,
                            token:vm.uuid
                        }).then(res=>{
                            if(res.status==200){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    vm.setTelNumber(vm.ruleForm.telNumber);
                                    vm.toUrl("sendSmsCode")
                                }else{
                                    // 响应错误
                                    Tips.notify({
                                        type: "error",
                                        title: '错误',
                                        message: _data.msg
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
            },

            setCaptcha(){
                let vm = this;
                //用于生成uuid
                function _S4() {
                    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
                }
                function _guid() {
                    return (_S4()+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+"-"+_S4()+_S4()+_S4());
                }
                ///let _token = tokenService.getToken();
               // this.verifyImage=
                //let _imageUrl=`${BaseUrl}/base/v1/sms.graph?token=${_token}`;
                vm.uuid = _guid();
                let _imageUrl=`${BaseUrl}/base/v1/sms.graph?token=${vm.uuid}`;
                let image=new Image();
                image.src=_imageUrl;
                this.captcha=_imageUrl;
                image=undefined;
            }
        },
        mounted() {
            this.setCaptcha();
        }
    }
</script>

<style lang="less" scoped >
    #page-forget-password{
        .verify-image{
            height:33px;
            float:right;
        }
    }
</style>