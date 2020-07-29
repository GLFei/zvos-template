<template>
    <div class="zv-page" id="page-re-login">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>重新登陆</h3>
            </div>
            <div class="auth-form-wrapper" @keyup.enter="reLogin"  >

                <el-form status-icon ref="ruleForm"   class="zv-form-auth">
                   <div class="form-info">
                       <h5>
                           <i class="el-icon-message"></i><span>重设密码成功</span>
                       </h5>
                       <span>你现在可以用新密码登陆了</span>
                   </div>

                    <el-form-item>
                        <el-button  class='btn-auth-submit'  type="primary" @click="reLogin"  >登陆账号</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions}  from 'vuex'
    import tokenService from "@/utils/services/token_service"
    export default {
        name:"ForgetPassword",
        data() {
            return {
            };
        },
        methods: {
            ...mapActions('userInfo',[
                'logout'
            ]),
            reLogin(){
                //todo:这里考虑后端发请求，后端删除token
                this.logout();
                tokenService. removeToken();
                 this.toUrl('login')
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