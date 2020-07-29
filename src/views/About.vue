<template>
  <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :headers='headers'
          :multiple="false"
          name="files"
          :on-change="handleChange"
          :file-list="fileList3">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>
<script>
  import { BaseUrl } from "@/main_config"
  import tokenService from '@/utils/services/token_service'
  import pageMixin from "@/mixins/pageMixin";
  const _token =tokenService.getToken();
  const headers={
    'x-access-token':`Bearer ${_token}`,
    'Authorization':`Bearer ${_token}`,
    //'Content-Type':'multipart/form-data'
  }

  const baseUrl=BaseUrl;
  export default {
    mixins: [pageMixin],   
    data() {
      return {
        uploadUrl:baseUrl+'/device/v1/update.batch',
        headers: headers,
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      }
    }
  }
</script>
