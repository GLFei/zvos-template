<!--公用组件：弹出框组件
    /**
    * @desc 组件描述
    * @date 2019年5月20日15:32:00
    * @param {String} [title]    - 标题
    * @param {String} [width]    - 弹出框宽度
    * @param {Boolean} [showDialog]    - 是否显示弹出框
    * @param {Boolean} [showMark] - 是否显示下面的必填项tips
    * @param {Boolean} [showBtns] - 是否显示下面的确定或取消按钮
    * @param {Boolean} [modalAppendToBody] - 遮罩层是否插入至 body 元素上
    */
-->
<template>
  <div>
    <el-dialog
      :width="width"
      class="dialog"
      :class="extraClass"
      :visible.sync="showDialog"
      v-if="showDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :modal-append-to-body="modalAppendToBody"
      :append-to-body="appendToBody"
      @close="$emit('close-dialog')"
    >
      <div class="dep-form">
        <div class="title-block">
          <p class="title">{{title}}</p>
          <i class="el-icon-close" v-if="isdebug" @click="$emit('close')"></i>
          <i class="el-icon-close" v-else @click="$emit('update:showDialog', false)"></i>
        </div>
        <div class="content">
          <slot name="content"></slot>
        </div>
        <div class="mark-block" v-if="showMark" v-show="false">
          <span class="color-red mr5">*</span>
          <span>开头的项目为必填项目</span>
        </div>
        <div class="btns" v-show="showBtns">
          <slot name="btns"></slot>
        </div>
        <div class="foot">
          <slot name="foot"></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ZvDialog",
  props: {
    title: {
      type: String,
      default() {
        return null;
      }
    },
    width: {
      type: String,
      default() {
        return "540px";
      }
    },
    extraClass: {
      type: String,
      default: ''
    },
    showDialog: {
      type: Boolean,
      default() {
        return false;
      }
    },
    isdebug: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showMark: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showBtns: {
      type: Boolean,
      default() {
        return true;
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default() {
        return true;
      }
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showDialog(val) {
      if (!val) {
        this.$emit('close-dialog');
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  .dialog
    /deep/ .el-dialog
      border-radius: 0
      background: #fff

    /deep/ .el-dialog__body
      padding: 0 0 5px 0

    /deep/ .el-dialog__header
      display: none

    .btns
      border-top: 1px solid $border
      //text-align: center
      padding-right: 20px
      text-align: right
      padding-top: 10px

      /deep/ .el-button
        padding: 8px 22px

      /deep/ .el-button--default

    .dep-form
      border-radius: 10px
      padding-bottom: 10px

      .title-block
        padding: 15px
        padding-left: 20px
        // line-height: 46px
        border-bottom: 1px solid $border
        display: flex
        justify-content: space-between
        align-items: center

        .el-icon-close
          // border: 1px solid $border
          text-align: center
          cursor: pointer
          color: #ccc;
          font-size: 24px;

        .title
          display: inline-block
          //background: #05b3ef
          color: #333
          font-size: 16px
          margin: 0
      //border-radius: 10px 10px 0 0
      .content
        padding: 20px 20px 10px
        overflow: auto
        /deep/ .el-form
          .el-form-item
            margin-bottom: 16px
          .el-form-item__label
            line-height: 24px
          .el-textarea__inner
            width: 160px
          .el-input
            width: 160px
            &__inner
              height: 28px
              line-height: 28px

        /deep/ .el-checkbox-group
          line-height: 30px

        .content-title
          height: 30px
          line-height: 30px

      .mark-block
        background: #ddd
        padding: $primaryGap 0 $primaryGap $primaryGap
  .device_dialog .dialog .el-dialog .dep-form .content
    /deep/ .el-form
      .el-textarea__inner
        // width: 190px !important
        width: 190px
      .el-input
        // width: 190px !important
        width: 190px
  .dialog.p-t-10
    .dep-form
      .content
        padding-top: 10px
</style>
