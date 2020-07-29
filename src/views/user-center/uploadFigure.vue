<template>
    <div class="zv-modal" id="dialog-upload-figure">
        <el-dialog
                :visible.sync="dialogVisible"
                width="500px"
                height=""
                :close-on-click-modal="false"
                :before-close="handleClose" class="zv-dialog">
            <div slot="title" class="zv-dialog-header">
                <h5>修改头像</h5>

            </div>
            <div class="zv-dialog-wrapper" style="height:120px;">
                <div class="zv-dialog-content">
                    <div class="form-wrapper">
                        <div class="download-wrapper">
                            <span><label>从电脑中选择一张好图作为头像吧 </label></span>
                        </div>
                        <div class="upload-wrapper">
                            <span>
                             <!--  <label>上传模板:</label>-->
                             <el-upload
                                     ref="upload"
                                     :action="uploadUrl"
                                     :headers="headers"
                                     :limit="1"
                                     :on-success="uploadSuccess"
                                     :on-error="uploadError"
                                     :accept="'image/jpeg,image/jpg,image/png'"
                                     :before-upload="beforeAvatarUpload"
                                     name="file"
                                     :auto-upload="false"
                                             >
                                  <el-button slot="trigger" type="default" icon="el-icon-upload">上传头像</el-button>
                                 <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                              </el-upload>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
            <div slot="footer" class="zv-dialog-footer">
                <el-button type="default" @click="cancel">取消</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import pageMixin from "@/mixins/pageMixin";
    import { BaseUrl } from "@/main_config";
    import tokenService from "@/utils/services/token_service";
    import Tips from "@/utils/utils/Tips";

    const _token = tokenService.getToken();
    const headers = {
        "x-access-token": `Bearer ${_token}`,
        Authorization: `Bearer ${_token}`
        //'Content-Type':'multipart/form-data'
    };

    export default {
        name: "uploadFigure",
        mixins: [pageMixin],
        props:{
            dialogVisible:Boolean,
            handleSubmit: Function,
            handleCancel: Function,
            figureUrl:String,
        },
        data:()=>{
            return {
                id:'',
                headers: headers,
            }
        },
        computed:{
            uploadUrl(){
                window.console.log( BaseUrl + this.figureUrl);
                return  BaseUrl + this.figureUrl;
            }
        },
        methods:{
            submit(){
                window.console.log("submit-------")
                this.$refs.upload.submit();

            },
            cancel(){
                window.console.log("cancel-------")
                this.handleCancel();
            },

            beforeAvatarUpload(file) {
               // const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 < 500; //<512K

               /* if (!isJPG) {
                    Tips.message({ message: "上传头像图片只能是 JPG 格式!", type: "error" });
                }*/
                if (!isLt2M) {
                    Tips.message({ message: "上传头像图片大小不能超过 500kb !", type: "error" });
                }
                return  isLt2M;
            },

            uploadSuccess(response){
                let vm=this;
                Tips.message({
                    type: 'success',
                    message: "上传成功",
                    onClose: () => {
                        //vm.handleSubmit();  
                    }
                });
                vm.handleSubmit(response.data);
                this.$refs.upload.clearFiles();
            },
            uploadError(){
                Tips.message({ message: "上传失败，请稍后再试", type: "error" });
            },
            handleClose(){
                this.cancel();
            }
        },
        mounted() {

        }
    }
</script>

<style scoped lang="less">
    #dialog-upload-figure{
        .upload-wrapper{
            margin-top:10px;
            label{
                & +  div{
                    display: inline-block;
                    margin-left:10px;
                }
            }

        }

    }


</style>