<!--公用组件：通用导出Excel弹出框组件
    /**
    * @desc 组件描述
    * @date 2019年5月20日15:32:00
    * @param {Boolean} [showExportDialog]    - 控制显示隐藏
    */
-->
<template>
  <div>
    <el-dialog
      class="dialog"
      width="350px"
      :visible.sync="showExportDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="dep-form">
        <div class="title-block">
          <p class="title">导出</p>
          <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="zv-loading-content" v-if="asyncALLExport">
          <div class="zv-loading-icon"></div>
          <div class="zv-loading-text">
            <div>正在导出，请稍等...</div>
            <div>
              <span>如果关闭此页可在</span>
              <span class="zv-link-text" @click="toDownloadList">下载内容</span>
              <span>查看下载链接</span>
            </div>
          </div>
        </div>
        <div class="content" v-else>
          <div class="item" @click="$emit('on-export-current')">
            <div class="icon-block">
              <img src="../../assets/images/currentpage.png" />
            </div>
            <span class="tips">导出当前页</span>
          </div>
          <div class="item" @click="$emit('on-export-allpage')">
            <div class="icon-block">
              <img src="../../assets/images/allpage.png" />
            </div>
            <span class="tips">导出所有页</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ZvDialogExport",
  props: {
    showExportDialog: {
      type: Boolean,
      default() {
        return false;
      }
    },
    asyncALLExport: {
      type: Boolean,
      default() {
        return false;
      }
    },
    asyncExportDialog: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  methods: {
    close() {
      this.$emit("update:showExportDialog", false);
      if (this.asyncALLExport) {
        this.$emit("update:asyncALLExport", false);
      }
    },

    toDownloadList() {
      this.close();
      this.$router.push("/download-manage/download-list");
    }
  }
};
</script>

<style lang="sass" scoped>
    .dialog
        /deep/ .el-dialog
            border-radius: 0
            background: $text-area-gray
        /deep/ .el-dialog__body
            padding: 0 0 5px 0
        /deep/ .el-dialog__header
            display: none
        .dep-form
            border-radius: 10px
            padding-bottom: 10px
            .title-block
                padding: 0 15px
                // line-height: 46px
                border-bottom: 1px solid $border
                .el-icon-close
                    float: right
                    width: 30px
                    height: 30px
                    line-height: 30px
                    margin-top: 8px
                    // border: 1px solid $border
                    border-radius: 3px
                    text-align: center
                    cursor: pointer
                    @include btn-opacity()
                .title
                    display: inline-block
                    //background: #05b3ef
                    color: #333
            //border-radius: 10px 10px 0 0
            .content
                height: 130px
                border: 1px solid #ddd
                margin: 10px 20px
                @include hor-center-center
                .item
                    cursor: pointer
                    padding: 24px
                    display: inline-block
                    .tips
                        font-size: $font-normal
                        color: $light-black
                    .icon-block
                        @include ver-center-center
                        border-radius: 5px
                        margin: 0 auto 5px
                        width: 40px
                        height: 40px
                        background: $zvBlue
            .zv-loading-content
                height: 130px
                margin: 10px 20px
                @include hor-center-center

</style>