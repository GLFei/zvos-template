<template>
    <div class="zv-page" id="page-re-login">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>忘记密码</h3>
            </div>
            <div class="auth-form-wrapper">

                <el-form status-icon  ref="ruleForm"   class="zv-form-auth">
                   <div class="form-info">
                       <h5>
                           <i class="el-icon-mobile-phone"></i><span>已发送短信到您的手机</span>
                       </h5>
                       <span>验证码已经发送到你的手机（{{ telNumber }}),如没收到，<el-button  type="text"  @click="sendSmsCode">点此重发</el-button></span>
                   </div>

                    <el-form-item>
                        <el-button  class='btn-auth-submit'  type="primary" @click="toUrl('resetPassword')" >重置密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState}  from 'vuex'
    import Tips from "@/utils/utils/Tips";
    export default {
        name:"SendSmsCode",
        data() {
            return {
            };
        },
        computed: {
            ...mapState([
                'telNumber'
            ])
        },
        methods: {
            sendSmsCode(){
                let vm=this;
                vm.$post('base/v1/sms.code',{
                    bizType: 'pwd_reset',
                    phone: vm.telNumber
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
            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },
        }
    }
</script>

<style lang="less" scoped >
    @import "../../static/less/theme.less";
    #page-re-login{
        .form-info{
            text-align: center;
            h5{
                font-size:16px;
                color:@zvBlue;
                i{
                    font-size:20px;
                    margin-right:10px;
                }
            }
            & > span{
                display: block;
                margin:15px 0;
                font-size:12px;
                color:#757575;
            }
        }
    }
</style>