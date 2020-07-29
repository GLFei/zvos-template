<template>
  <div class="home">
    <div class="header">个人中心</div>
    <div class="content">
      <el-tabs>
        <el-tab-pane label="账号信息">
          <el-form v-model="form" ref="form" :rules="rules" label-width="114px" label-position="left">
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :data="uploadData"
                :show-file-list="false"
                name="files"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img :src="imageUrl" v-if="imageUrl">
                <!-- <img v-else src="@/assets/images/default_tx.png" alt=""> -->
              </el-upload>
            </el-form-item>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="账号" >
                  <el-input type="text" disabled v-model="form.loginName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属机构">
                  <el-input type="text" disabled v-model="form.unitName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="角色名称">
                  <el-input type="text" disabled v-model="form.roleName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="负责大区">
                  <el-input type="text" disabled v-model="form.regionName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="机群名称">
                  <el-input type="text" disabled v-model="form.groupName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间">
                  <el-input type="text" disabled v-model="form.inputTime"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="到期时间">
                  <el-input type="text" disabled v-model="form.expireDate"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <el-tabs>
        <el-tab-pane label="可编辑信息">
          <el-form :model="info" label-width="114px" label-position="left">
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="info.trueName"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="登录密码">
                  <el-input type="password" v-model="info.userPwd"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="12">
                <el-form-item label="邮箱">
                  <el-input v-model="info.eMail"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机绑定">
                  <el-input  v-model="info.simNo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btns">
            <!-- <el-button >取消</el-button> -->
            <el-button type="primary" @click="doSubmit">保存</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Tips from "@/utils/utils/Tips";
const FORM = {
  loginName:null,
  unitName:null,
  roleName:null,
  regionName:null,
  inputTime:null,
  expireDate:null,
}
const INFO = {
  userName:null,
  userPwd:null,
  eMail:null,
  simNo:null,
}
export default {
  data() {
    let vm = this;
    return {
      imageUrl: "",
      info:vm.$_.cloneDeep(INFO),
      action:'',
      form:vm.$_.cloneDeep(FORM),
      unitData:[],
      uploadData:{
        type:0.1,
      },
      rules: {

      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(res.code == '0000'){
        this.info.photoUrl = res.data
        this.imageUrl = URL.createObjectURL(file.raw);
        this.doSubmit();
      }else{
        Tips.message({ message: "上传失败！", type: "error" });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        Tips.message({ message: "上传头像图片只能是 JPG,PNG格式!", type: "error" });
      }
      if (!isLt2M) {
        Tips.message({ message: "上传头像图片大小不能超过 2MB!", type: "error" });
      }
      return isJPG && isLt2M;
    },
    doSubmit(){
      if(this.info.userPwd == this.userPwd){
        this.info.userPwd = null
      }else{
        this.info.userPwd = this.$md5(this.info.userPwd)
      }
      this.$post('/app/user/v1/user/userInformationUpdate',(this.info)).then(res=>{
        if(res.data.code == '0000'){
          Tips.message({ message: "保存成功！", type: "success" });
          this.info.userPwd = this.userPwd
        }else{
          Tips.message({ message: "保存失败！", type: "error" });
        }
      })
    }
  },
  mounted(){
    this.action = window[process.env.VUE_APP_PAGE_CONFIG].baseUrl+'/file/v1/upload'
    setTimeout(()=>{
      this.$post('/app/user/v1/user/userInformation').then(res=>{
        let resData = res.data.data
        this.userPwd = res.data.data.userPwd
        window.console.log(this.userPwd);
        this.form = this.$_.cloneDeep(res.data.data)
        this.info = this.$_.cloneDeep(res.data.data)
        this.imageUrl = resData.photoUrl ? resData.photoUrl : require('@/assets/images/default_tx.png')
      })
    },500)
  },
  watch:{

  }
};
</script>
<style lang="sass" scoped>
.home
  background: #fff
  width: 98%
  margin: 20px auto 0
  border-radius: 5px
  .header
    padding: 20px
    border-bottom: 1px solid #c3c3c3
    font-size: 14px
  .content
    padding: 20px
.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .avatar-uploader .el-upload:hover
    border-color: #409EFF;
  .avatar-uploader-icon
    font-size: 28px;
    color: #8c939d;
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
  .avatar
    width: 178px;
    height: 178px;
    display: block;
/deep/ .el-form
  padding-left: 10px
  .el-input
    width: 300px
  .el-button
    float: right
  span.text
    font-size: 12px;
    color: #3ae2c4;
    float: right;
    i
      width: 16px;
      height: 16px;
      display: inline-block;
      background: #3ae2c4;
      border-radius: 16px;
      vertical-align: 2px;
      margin-right: 4px;
      color: #fff
      text-align: center
      line-height: 16px
/deep/ .el-upload--text
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    img
      display: block;
      width: 50px;
      height: 50px;
      object-fit: cover;
.btns
  display: table
  margin: 0 auto
</style>
