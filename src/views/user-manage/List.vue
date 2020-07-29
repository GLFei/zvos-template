<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <zv-table :table="table" ref="dataTable"></zv-table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "./api";
import pageMixin from "@/mixins/pageMixin";
import Tips from "@/utils/utils/Tips";

export default {
  name: "List",
  mixins: [pageMixin],
  data() {
    const vm = this;
    return {
      menuKey: "user_list",
      table: {
        api: api.GetUserList,
        localColumnsKey: "table_columns_user",
        query: {},
        searchData: [
          {
            type: "input",
            model: "dimLoginNameOrTrueName",
            placeholder: "请输入账号/姓名"
          },
          {
            type: "select",
            model: "roleId",
            placeholder: "请选择角色名称"
          }
        ],
        columns: [
          {
            title: "账号",
            key: "loginName",
            minWidth:"150",
            showTooltip: true
          },
          {
            title: "姓名",
            key: "trueName",
            minWidth:"100",
            showTooltip: true
          },
          {
            title: "负责区域",
            key: "regionName",
            minWidth:"120",
            showTooltip: true
          },
          {
            title: "所属机构",
            key: "unitName",
            minWidth:"120",
            showTooltip: true
          },
          {
            title: "角色名称",
            key: "roleName",
            minWidth:"120",
            showTooltip: true
          },
          {
            title: "机群名称",
            key: "groupName",
            minWidth:"120",
            showTooltip: true
          },
          {
            title: "用户状态",
            key: "userStateName",
            minWidth:"80",
            showTooltip: true
          },
          {
            title: "到期时间",
            key: "expireDate",
            minWidth:"100",
            showTooltip: true
          },
          {
            title: "创建时间",
            key: "inputTime",
            minWidth:"140",
            showTooltip: true
          },
          {
            title: "创建账号",
            key: "inputMan",
            minWidth:"120",
            // showTooltip: true
          },
          {
            title: "最后登录时间",
            key: "latestLoginTime",
            minWidth:"140",
            showTooltip: true
          },
          {
            title: "登录次数",
            key: "loginCount",
            minWidth:"80",
            showTooltip: true
          }
        ]
      }
    };
  }
};
</script>

<style lang="sass" scoped>
  .lrLayout-form
    .el-form-item
      float: left
      margin-bottom: 8px

      /deep/ .el-form-item__label
        padding: 0

    .el-form-item:nth-child(2n)
      margin-left: 10px
</style>
