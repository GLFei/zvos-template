<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <zv-table :table="table" ref="dataTable">
          <div slot="ctrl-button"></div>
          <el-button slot="ctrl-button-after" type="primary" @click="showExportDialog=true" v-if="authority.export">导出</el-button>
        </zv-table>
      </div>
    </div>
    <zv-dialog-export :showExportDialog.sync="showExportDialog" @on-export-current="doExport('0')" @on-export-allpage="doExport('1')"></zv-dialog-export>
  </div>
</template>

<script>
import api from "./api";
import pageMixin from "@/mixins/pageMixin";

export default {
  name: "SimLog",
  mixins: [pageMixin],
  data() {
    return {
      menuKey: "test_log",
      showExportDialog: false,
      table: {
        api: api.fetchSimlogList,
        localColumnsKey: "table_columns_SimLog",
        query: { logTypeId: 1 },
        searchData: [
          {
            type: "input",
            model: "simNo",
            placeholder: "请输入SIM卡号"
          }
        ],
        customSearchData: [
          {
            title: "SIM卡号",
            type: "input",
            model: "simNo",
            placeholder: "SIM卡号"
          },
          {
            title: "操作菜单",
            type: "select",
            model: "menuId",
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
            title: "操作人",
            type: "input",
            model: "inputMan",
            placeholder: "操作人"
          },
          {
            title: "操作时间",
            type: "dateSection",
            model: "",
            modelName: ["inputTimeStart", "inputTimeEnd"]
          },
          {
            title: "操作内容",
            type: "input",
            model: "content",
            placeholder: "操作内容"
          }
        ],
        columns: [
          {
            title: "SIM卡号",
            key: "simNo",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "操作菜单",
            key: "menuText",
            minWidth: "150",
            showTooltip: true
          },
          {
            title: "操作按钮",
            key: "resourceText",
            minWidth: "120",
            showTooltip: true
          },
          {
            title: "操作人",
            key: "inputMan",
            minWidth: "100",
            showTooltip: true
          },
          {
            title: "操作时间",
            key: "inputTime",
            minWidth: "150",
            showTooltip: true
          },
          {
            title: "操作内容",
            key: "content",
            minWidth: "200",
            showTooltip: true
          }
        ]
      }
    };
  },
  methods: {
    /**
     * @Author:谢姣
     * @Desc: 导出数据
     */
    doExport(index) {
      this.showExportDialog = false;
      let query = this.table.query;
      query.pageNo = this.table.pagination.pageNo;
      query.pageSize = this.table.pageSize;
      /**
       * @Author:谢姣
       * @Desc: 导出当前页
       */
      if (index == "0") {
        api.simLogPage(query);
        /**
         * @Author:谢姣
         * @Desc: 导出全部
         */
      } else if (index == "1") {
        api.simLogAll(query);
      }
    }
  },
  mounted() {
    // if (!this.$commFunc.getPowerByNameId(this.authority, 'select')) {
    //   this.$router.push('/noauth')
    // }
    //获取菜单下拉框
    this.$api.menutreeList({}).then(res => {
      let list = res.data.data.items;
      list.forEach(a => {
        if (a.menuText == "SIM卡管理") {
          let option = a.children.map(obj => {
            return {
              value: obj.menuId,
              label: obj.menuText
            };
          });
          this.$set(this.table.customSearchData[1], "option", option);
        }
      });
    });
  },
  computed: {
    // ...mapState('authority', {
    //   authority: state => state.authority[menuKey],
    // })
  }
};
</script>

<style scoped>
</style>