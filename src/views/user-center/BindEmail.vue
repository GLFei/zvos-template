<template>
    <div class="zv-page page-usercenter" id="page-bind-email">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>{{step[stepIndex].title}}</h3>

            </div>
            <div class="auth-form-wrapper ">
                <div class="step-index-wrapper">
                    <el-steps :active="stepIndex" finish-status="success" align-center>
                        <el-step >
                            <h5 class="step-index-title" slot="title">{{step[0].title}}</h5>
                        </el-step>
                        <el-step >
                            <h5 class="step-index-title" slot="title">{{step[1].title}}</h5>
                        </el-step>
                        <el-step>
                            <h5 class="step-index-title" slot="title">{{step[2].title}}</h5>
                        </el-step>
                    </el-steps>
                </div>
                <div class="step-start-wrapper" v-show="stepStart==false" >
                    <label>为确认是您本人操作,请选择验证方式完成身份验证:</label>
                    <div class="step-start clearfix">
                        <h5 class="pull-left">通过手机验证<em>请确保您的手机处于可用状态</em></h5>
                        <el-button class="pull-right" @click="setStepStart" type="primary">立即验证</el-button>
                    </div>
                </div>

                <el-form  status-icon  :model="verifyForm" :rules="rule"  label-position="left" ref="verifyForm" class="zv-form-auth" v-show="stepStart==true && stepIndex==0"  label-width="72px">
                    <el-row class="auth-form-notice">
                        <el-col :span="24">手机验证,用户<em class="zv-text-blue">{{userInfo.name || userInfo.login}}</em>,为确认是您本人操作，请完成以下验证：</el-col>
                    </el-row>
                    <el-form-item  label="手机号码" >
                        <div>
                            <span class="zv-text-blue">{{userInfo.telNumber}}</span>
                        </div>
                    </el-form-item>

                    <el-form-item label="验证码"  prop="msgCode">
                        <div>
                            <el-col :span="16">
                                <el-input placeholder="短信验证码"  v-model="verifyForm.msgCode">
                                </el-input>
                            </el-col>
                            <el-col class="line" :span="1">&nbsp;</el-col>
                            <el-col :span="7">
                                <el-button type="primary" @click="sendSmsCode" :disabled="veriBtnDisabled" style="width:100%;">{{veriBtn}}<em v-if='veriBtnDisabled'>s</em></el-button>

                            </el-col>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button  type="primary" @click="verifyPhone"  class="zv-btn-lg" >确定</el-button>
                    </el-form-item>

                </el-form>

                <el-form  status-icon  :model="emailForm" :rules="rule"  label-position="left"  ref="emailForm" class="zv-form-auth" v-show="stepIndex==1"  label-width="100px">

                    <el-form-item  label="邮箱"   prop="email">
                        <div>
                            <el-col :span="16">
                                <el-input placeholder="请输入邮箱" v-model="emailForm.email">
                                </el-input>
                            </el-col>
                            <el-col class="line" :span="1">&nbsp;</el-col>
                            <el-col :span="7">
                                <el-button type="primary" @click="sendMailCode" :disabled="mailVeriBtnDisabled" style="width:100%;">{{mailVeriBtn}}</el-button>
                            </el-col>
                        </div>
                    </el-form-item>

                    <el-form-item label="验证码"  prop="mailCode">
                        <div>
                            <el-input placeholder="请输入验证码"  v-model="emailForm.mailCode">
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button  type="primary" @click="updateEmail"  class="zv-btn-lg">确定</el-button>
                    </el-form-item>
                </el-form>

                <el-form class="zv-form-auth" v-show="stepIndex==2">
                    <div class="form-info">
                        <h5>
                            <span>修改成功，您的email绑定为{{emailForm.email}}，<a class="zv-text-btn"  @click="toUrl('usercenter')">返回账户信息</a></span>
                        </h5>
                    </div>
                    <!--   <el-form-item>
                           <el-button  class='btn-auth-submit'  type="primary" @click="reLogin">登陆账号</el-button>
                       </el-form-item>-->
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import pageMixin from "@/mixins/pageMixin";  
    import { mapState }  from 'vuex'
    import Tips from "@/utils/utils/Tips";

    export default {
        name: "BindEmail",
        mixins: [pageMixin],
        data:function(){
            return {
                stepStart: false,
                step:[
                    {title:"验证身份"},
                    {title:"修改邮箱"},
                    {title:"修改完成"}
                ],
                stepIndex:0,
                timeCount: 30,
                mailTimeCount: 30,
                veriBtn:"获取验证码",
                veriBtnDisabled:false,

                mailVeriBtn:"获取验证码",
                mailVeriBtnDisabled:false,

                verifyForm: {
                    msgCode:''
                },

               emailForm:{
                    email: '',
                    mailCode: '',
                },

                rule: {
                    msgCode:[
                        /*{ validator:validator.validateMsgCode, trigger:'change' }*/
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '短信验证码位数不正确', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }

                    ],
                    mailCode: [
                        { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '邮箱验证码位数不正确', trigger: 'blur' }
                    ],

                }

            }
        },
        computed: {
            ...mapState({
                hasLogin: state => state.login
            }),
            ...mapState('userInfo',{
                userInfo: state=> state,
            })

        },

        methods:{
            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },
            setStepStart(){
                this.stepStart=true;
                window.console.log(this.stepStart)
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
            resetMailCountDown() {
                this.mailVeriBtnDisabled = false;
                this.mailVeriBtn = '发送验证码';
            },
            mailCountDownStart() {
                var vm = this;
                vm.mailVeriBtnDisabled = true;
                vm.mailVeriBtn = vm.mailTimeCount;
                let _countDown = function () {
                    if (vm.mailVeriBtn == 0) {
                        vm.resetMailCountDown();
                        return;
                    } else {
                        setTimeout(function () {
                            vm.mailVeriBtn -= 1;
                            _countDown()
                        }, 1000)
                    }
                }
                _countDown();
            },

            sendSmsCode(){
                let vm=this;

                if(vm.veriBtnDisabled==true){
                    return false;
                }

                vm.$post('base/v1/sms.code',{
                    bizType: 'pwd_reset',
                    phone: vm.userInfo.telNumber
                }).then(
                    res =>{
                        if(res.status==200){
                            let _data=res.data;
                            if(_data.code=='0000'){
                                Tips.notify({
                                    type: "success",
                                    title: '短信成功',
                                    message: '请查看短信验证码'
                                });
                                this.countDownStart();
                            }else{
                                Tips.notify({
                                    type: "error",
                                    title: '短信发送失败',
                                    message: '请稍后再试'
                                });
                            }
                        }else{
                            window.console.log('error!!');
                            return false;
                        }
                    }
                )//end then cb;
            },
            verifyPhone(){
                // this.stepIndex = 1;
                let vm=this;
                vm.$refs['verifyForm'].validate((valid) => {
                    if (valid) {
                        vm.$post('base/v1/dynamic.valid',{
                            dynaCode:vm.verifyForm.msgCode,
                            bizType:'pwd_reset',
                            userId:vm.userInfo.id,
                            refNo:vm.userInfo.telNumber
                        }).then(res=>{
                            if(res.status==200 || res.status==201){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    vm.stepIndex = 1;

                                }else{
                                    // 响应错误
                                    window.console.log(_data.code)
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
            sendMailCode(){
                let vm=this;

                if(vm.mailVeriBtnDisabled==true){
                    return false;
                }

                // vm.$refs['emailForm'].validateField('email',(errors,fields)=> {
                vm.$refs['emailForm'].validateField('email',(errors)=> {
                    if (errors) {
                        return false;
                    }else{
                        vm.$post('user/v1/account/mail.bind',{
                            mail: vm.emailForm.email
                        }).then(
                            res =>{
                                window.console.log(res)
                                if(res.status==200){
                                    let _data=res.data;
                                    if(_data.code=='0000'){
                                        window.console.log("-----------------------------------")
                                        Tips.notify({
                                            type: "success",
                                            title: '邮件发送成功',
                                            message: '请查看邮箱验证码'
                                        });
                                        vm.mailCountDownStart();
                                    }else{
                                        Tips.notify({
                                            type: "error",
                                            title: '邮件发送失败',
                                            message: '请稍后再试'
                                        });
                                    }
                                }else{
                                    window.console.log('error!!');
                                    return false;
                                }
                            }
                        )//end then cb;
                    }
                });



            },
            updateEmail(){
                let vm=this;
                vm.$refs['emailForm'].validate((valid) => {
                    if (valid) {
                        vm.$get('user/v1/auth/mail.confirm',{
                            key:vm.emailForm.mailCode
                        }).then(res=>{
                            if(res.status==200 || res.status==201){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    vm.stepIndex = 2;
                                }else{
                                    // 响应错误
                                    window.console.log(_data.code)
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
            }

        }
    }
</script>

<style lang="less" scoped>
    @import './usercenter.less';

</style>