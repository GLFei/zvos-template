<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <zv-table :table="table">
          <div slot="ctrl-button"></div>
          <el-button slot="ctrl-button-after" type="primary" @click="showExportDialog=true"  v-if="authority.export">导出</el-button>
        </zv-table>
      </div>
    </div>
    <zv-dialog-export :showExportDialog.sync="showExportDialog" @on-export-current="doExport('0')" @on-export-allpage="doExport('1')"></zv-dialog-export>
  </div>
</template>
<script>
import api from "./api";
import pageMixin from "@/mixins/pageMixin";

// import { mapState } from "vuex";
// const menuKey = "userlog";

export default {
  name: "List",
  mixins: [pageMixin],
  data() {
    const vm = this;
    return {
      menuKey: "user_opt_log",
      showExportDialog: false,
      table: {
        api: api.fetchSystemLogList,
        localColumnsKey: "table_columns_systemlog",
        query: {
          unitId: vm.$store.state.userInfo.unitId
        },
        searchData: [
          {
            type: "input",
            model: "content",
            placeholder: "请输入操作内容"
          }
        ],
        customSearchData: [
          {
            title: "所属机构",
            type: "tree",
            model: "unitId",
            api: this.$api.getUnitTree
          },
          {
            title: "负责区域",
            type: "select",
            model: "regionId",
            api: this.$api.regionList,
            keyValueName: ["id", "name"]
          },
          {
            title: "操作菜单",
            type: "select",
            model: "menuId",
            // api: this.$api.menutreeList,
            relationKey: "resourceId"
          },
          {
            title: "操作按钮",
            type: "select",
            model: "resourceId",
            relationApi: this.$api.getMenuButton,
            queryKey: "menuId",
            keyValueName: ["menuId", "menuText"]
          },
          {
            title: "关键字",
            type: "input",
            model: "loginName",
            placeholder: "操作人账号/姓名"
          },
          {
            title: "操作时间",
            type: "dateSection",
            model: "",
            modelName: ["logTimeStart", "logTimeEnd"]
          }
        ],
        columns: [
          {
            title: "账号",
            key: "loginName",
            minWidth: "120"
            // showTooltip: true
          },
          {
            title: "所属机构",
            key: "unitName",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "所属大区",
            key: "regionName",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "操作时间",
            key: "logTime",
            minWidth: "140",
            showTooltip: true,
            render(h, ctx) {
              return h(
                "span",
                ctx.row.logTime ? ctx.row.logTime.substring(0, 19) : "--"
              );
            }
          },
          {
            title: "操作菜单",
            key: "parentName", // "menuText",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "操作按钮",
            key: "menuText", // "resourceText",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "IP地址",
            key: "optIp",
            minWidth: "110",
            showTooltip: true
          },
          {
            title: "操作内容",
            minWidth: "150",
            key: "content",
            showTooltip: true
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @Author:刘紫瑶
     * @Desc:  导出数据
     */
    doExport(index) {
      this.showExportDialog = false;
      let query = this.table.query;
      query.pageNo = this.table.pagination.pageNo;
      query.pageSize = this.table.pageSize;
      if (index == "0") {
        api.fetchSystemLogPage(query);
      } else if (index == "1") {
        api.fetchSystemLogALL();
      }
    }
  },
  mounted() {
    // if (!this.$commFunc.getPowerByNameId(this.authority, "select")) {
    //   this.$router.push("/noauth");
    // }
    this.$api.menutreeList({}).then(res => {
      let list = res.data.data.items;
      list.forEach(a => {
        if (a.menuText == "用户管理") {
          let option = a.children.map(obj => {
            return {
              value: obj.menuId,
              label: obj.menuText
            };
          });
          this.$set(this.table.customSearchData[2], "option", option);
        }
      });
    });
  },
  computed: {
    // ...mapState("authority", {
    //   authority: state => state.authority[menuKey]
    // })
  }
};
</script>

<style scoped>
</style>