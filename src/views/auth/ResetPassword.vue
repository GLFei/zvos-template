<template>
    <div class="zv-page" id="page-reset-password">
        <div class="auth-wrapper">
            <div class="auth-wrapper-header">
                <h3>重设密码</h3>
            </div>

            <div class="auth-form-wrapper"  @keyup.enter="submitForm('ruleForm')">
                <el-row class="auth-form-notice">
                    <i class="el-icon-message"></i>
                    <hr/>
                    <el-col :span="24">请重新输入密码</el-col>
                </el-row>

                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"   class="zv-form-auth">
                    <el-form-item  prop="smsCode">
                        <el-input type="text" v-model="ruleForm.smsCode" placeholder="手机验证码"></el-input>
                    </el-form-item>

                    <el-form-item  prop="pass">
                        <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button class='btn-auth-submit' type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState}  from 'vuex'
    import Tips from "@/utils/utils/Tips";
    // import validator from './registionValidator'

    export default {
        name:"ForgetPassword",
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
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    smsCode:''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    smsCode:[
                        /*{ validator:validator.validateMsgCode, trigger:'change' }*/
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                        { min: 4, max: 6, message: '短信验证码位数不正确', trigger: 'blur' }
                    ]
                }
            };
        },
        computed: {
            ...mapState([
                'telNumber'
            ])
        },
        methods: {
            toUrl(name,params){
                this.$router.push({
                    name:name,
                    params:params
                })
            },
            submitForm(formName) {
                let vm=this;
                vm.$refs[formName].validate((valid) => {
                    if (valid) {
                        vm.$post('user/v1/auth/account/retrieve-password',{
                            dynaCode:vm.ruleForm.smsCode,
                            password:vm.ruleForm.pass,
                            telNumber:vm.telNumber
                        }).then(res=>{
                            if(res.status==200){
                                let _data=res.data;
                                if(_data.code=='0000'){
                                    // 响应错误
                                    Tips.notify({
                                        type: "success",
                                        title: '密码重置成功',
                                        message: '请登陆系统',
                                        onClose:()=>{
                                            vm.toUrl('re-login')
                                        }
                                    });
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
            }
        }
    }
</script>

<style lang="less" scoped >

</style>