<!--公用组件：左右数据展示表格组件
    /**
    * @desc 组件描述
    * @date 2019年5月20日15:32:00
    * @param {Array} [table]    - 数据源
    * @param {String} [title]    - 标题
    * @param {Number} [colsCnt]    - 每行展示几组数据.(一组等于表格2列)
    * @param {Boolean} [isShortLength] - 数值宽度是否 窄一些
    */
-->
<template>
  <div class="zv-simple-table">
    <div class="title-block">
      <template v-if="title">
        <span class="title">{{title}}</span>
        <div class="dash-line"></div>
      </template>
    </div>
    <div class="table-block" v-if="table.length > 0">
      <table class="table-content" border=0>
        <tr v-for="(item, index) in showTable" :key="index">
          <template v-for="(cols, colsindex) in item">
            <template v-if="cols === 'IS_HIDDEN_TD'">
              <td :class="[{'width80':isShortLength},{'width200':(!isShortLength && colsCnt > 1 && colsindex % 2 != 0)},{'td-hidden': true}]" :key="colsindex">
                <span></span>
              </td>
            </template>
            <template v-else>
              <td :title="cols" :class="[{'width80':isShortLength},{'width200':(!isShortLength && colsCnt > 1 && colsindex % 2 != 0)}]" :key="colsindex">
                <span v-html="cols"></span>
              </td>
            </template>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ZvSimpleTable",
  props: {
    /* 数据源 */
    table: {
      type: Array,
      default: () => {
        return [];
      }
    },
    title: {
      type: String,
      default: () => {
        return "";
      }
    },
    colsCnt: {
      type: Number,
      default: () => {
        return 2;
      }
    },
    isShortLength: {
      type: Boolean,
      default: () => {
        return false;
      }
    }
  },
  computed: {
    showTable() {
      let temp = [];
      let row = [];
      for (let i = 0; i < this.table.length; i++) {
        let obj = this.table[i];
        if (i % this.colsCnt === 0 && i > 0) {
          temp.push(row);
          row = [];
        }
        if (obj.isHidden === "IS_HIDDEN_TD") {
          row.push(obj.isHidden);
          row.push(obj.isHidden);
        } else {
          row.push(obj.name);
          row.push(obj.value);
        }
      }
      if (row.length > 0) {
        temp.push(row);
      }
      return temp;
    }
  }
};
</script>

<style lang="sass" scoped>
  .width200
    width: 200px
  .width80
    // width: 70px
    width: 12.5%
  .zv-simple-table
    background: white
    padding: 10px 20px
    .title-block
      @include hor-start-center
      height: 34px
      line-height: 34px
      .title
        font-size: 12px
      .dash-line
        flex: 1
        margin-left: 10px
        height: 1px
        width: 100%
        border-bottom: 1px dashed $zvBlue
    .table-block
      margin-bottom: 10px
      .table-content
        width: 100%
        border-collapse: separate
        border-spacing: 0px
        // border-top: 1px solid #ddd
        border-left: 1px solid #ddd
        tr
          //height: 32px
          &:nth-child(1) td
            border-top: 1px solid #ddd;
          .td-hidden
            visibility: hidden
          line-height: 1.2em
          td
            border-right: 1px solid #ddd
            border-bottom: 1px solid #ddd
            font-size: 13px
            padding: 8px 10px
            word-break: break-all
          td:nth-of-type(even)
            //width: 200px
            span
              @include text-overflow-twoLine
          td:nth-of-type(odd)
            max-width: 100px
            min-width: 100px
            width: 100px
            background: $table-header-gray

</style>