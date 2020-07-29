<template>
    <div class="zv-page page-usercenter" id="page-bind-cellphone">
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
                <div class="step-start-wrapper" v-show="stepStart==false">
                    <label>为确认是您本人操作,请选择验证方式完成身份验证:</label>
                    <div class="step-start clearfix">
                        <h5 class="pull-left">通过手机验证<em>请确保您的手机处于可用状态</em></h5>
                        <el-button class="pull-right" @click="setStepStart" type="primary">立即验证</el-button>
                    </div>
                </div>

                <el-form  status-icon  :model="verifyForm" :rules="rule"   label-position="left"  ref="verifyForm" class="zv-form-auth" v-show="stepStart==true && stepIndex==0" label-width="72px">
                    <el-row class="auth-form-notice">
                        <el-col :span="24">手机验证,用户<em class="zv-text-blue">{{userInfo.name || userInfo.login}}</em>,为确认是您本人操作，请完成以下验证：</el-col>
                    </el-row>
                    <el-form-item  label="手机号码" >
                        <div>
                           <span class="zv-text-blue">{{userInfo.telNumber}}</span>
                        </div>
                    </el-form-item>

                    <el-form-item label="验证码" prop="msgCode">
                        <div>
                            <el-col :span="16">
                                <el-input placeholder="短信验证码"  v-model="verifyForm.msgCode">
                                </el-input>
                            </el-col>
                            <el-col class="line" :span="1">&nbsp;</el-col>
                            <el-col :span="7">
                                <el-button type="primary" @click="sendSmsCode(userInfo.telNumber)" :disabled="veriBtnDisabled" style="width:100%;">{{veriBtn}}<em v-if='veriBtnDisabled'>s</em></el-button>

                            </el-col>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button  type="primary" @click="verifyPhone"  class="zv-btn-lg">确定</el-button>
                    </el-form-item>
                </el-form>

                <el-form   :model="phoneForm" :rules="rule" label-position="left"  status-icon  ref="updateCellphoneForm" class="zv-form-auth" v-show="stepIndex==1" label-width="100px">

                    <el-form-item  label="手机号" prop="telNumber" >
                        <div>
                            <el-input placeholder="手机号码" v-model="phoneForm.telNumber">
                                <template slot="prepend">+86</template>
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item label="验证码"  prop="msgCode">
                        <div>
                            <el-col :span="16">
                                <el-input placeholder="短信验证码" v-model="phoneForm.msgCode">
                                </el-input>
                            </el-col>
                            <el-col class="line" :span="1">&nbsp;</el-col>
                            <el-col :span="7">
                                <el-button type="primary" @click="sendSmsCode(phoneForm.telNumber)" :disabled="veriBtnDisabled" style="width:100%;">{{veriBtn}}<em v-if='veriBtnDisabled'>s</em></el-button>

                            </el-col>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-button  type="primary" @click="updatePhone"  class="zv-btn-lg">确定</el-button>
                    </el-form-item>
                </el-form>

                <el-form class="zv-form-auth" v-show="stepIndex==2">
                    <div class="form-info">
                        <h5>
                            <span>修改成功，您的手机号码绑定为{{phoneForm.telNumber}}，<a class="zv-text-btn"  @click="toUrl('usercenter')">返回账户信息</a></span>
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
    import { mapState, mapActions}  from 'vuex'
    import Tips from "@/utils/utils/Tips";

    export default {
        name: "BindCellphone",
        mixins: [pageMixin],
        data:function(){

            let validatePhone = (rule, value, callback)=>{
                //if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone)))
                if (!value || value =='') {
                    callback(new Error('手机号码不能为空'));
                }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){
                    callback(new Error('请输入正确的手机号码'));
                }else{
                    callback();
                }
            };

            return {
                stepStart: false,
                step:[
                    {title:"验证身份"},
                    {title:"修改手机"},
                    {title:"修改完成"}
                ],
                stepIndex:0,

                timeCount: 30,
                veriBtn:"获取验证码",
                veriBtnDisabled:false,

                verifyForm: {
                    msgCode:''
                },

                phoneForm:{
                    msgCode:'',
                    telNumber:''
                },

                rule: {
                    msgCode:[
                        /*{ validator:validator.validateMsgCode, trigger:'change' }*/
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '短信验证码位数不正确', trigger: 'blur' }
                    ],
                    telNumber:[
                        { validator: validatePhone, trigger: 'blur'}
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
            ...mapActions('userInfo',[
                'updateUserInfo',
            ]),

            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },

            setStepStart(){
              this.stepStart=true;
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
                    if (vm.veriBtn <= 0) {
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

            fetchSmsCode(telNumber){
                let vm = this;
                vm.$post('base/v1/sms.code',{
                    bizType: 'phone_reset',
                    phone: telNumber
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
            sendSmsCode(telNumber){
                let vm=this;

                if(vm.stepIndex==1){
                    vm.$refs['updateCellphoneForm'].validateField('telNumber',(errors)=> {
                        if (errors) {
                            return false;
                        }else{
                            vm.fetchSmsCode(telNumber);
                        }
                    });
                }else{
                    vm.fetchSmsCode(telNumber);
                }


            },
            verifyPhone(){
                let vm=this;
                vm.$refs['verifyForm'].validate((valid) => {
                    if (valid) {
                        vm.$post('base/v1/dynamic.valid',{
                            dynaCode:vm.verifyForm.msgCode,
                            bizType: 'phone_reset',
                            userId:vm.userInfo.id,
                            refNo:vm.userInfo.telNumber
                        }).then(res=>{
                            if(res.status==200 || res.status==201){
                                let _data=res.data;
                                if(_data.code=='0000'){

                                    if(vm.veriBtn>0){
                                        vm.veriBtn=0;
                                    }
                                    vm.stepIndex = 1;
                                    //vm.resetCountDown();
                                   /* setTimeout(function(){
                                        vm.stepIndex = 1;
                                        //vm.resetCountDown();
                                    },1000)*/

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
            updatePhone(){
                //todo:更新手机号码后，前端store要同步更新userInfo信息。
                let vm=this;
                window.console.log("--------------------------")
               vm.$refs['updateCellphoneForm'].validate((valid) => {
                    if (valid) {
                        vm.$post('user/v1/account/phone.reset',{
                            dynaCode:vm.phoneForm.msgCode,
                            phone:vm.phoneForm.telNumber
                        }).then(res=>{
                            if(res.status==200 || res.status==201){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    //set store user Info
                                    vm.updateUserInfo({
                                        telNumber:vm.userInfo.telNumber
                                    });
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