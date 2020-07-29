<template>
  <div id="zv-table">
    <zv-searchbar
      ref="outSearch"
      v-if="table.searchData && table.searchData.length"
      :origin-query="table.query"
      :search-data="table.searchData"
      :local-columns-key="table.localColumnsKey"
      @on-search-change="search(table)"
    >
      <template slot="queryAfter">
        <el-button
          type="primary"
          v-if="table.customSearchData"
          @click="showCustomSearchDialog = true"
          style="float:left;"
        >自定义搜索</el-button>
        <slot name="customSearchAfter"></slot>
      </template>
      <span slot="customHeader">
        <el-button type="primary" v-if="table.localColumnsKey" @click="showDialog = true">自定义列表</el-button>
        <slot name="ctrl-button-after"></slot>
      </span>
      <span slot="after">
        <slot name="ctrl-button"></slot>
      </span>
    </zv-searchbar>

    <el-table
      ref="searchTable"
      style="width: 100%"
      :height="tableHeight"
      tooltip-effect="dark"
      :data="table.data"
      :row-key="table.treeProps ? table.treeProps['id'] : ''"
      :default-expand-all="table.defaultExpandAll"
      :tree-props="table.treeProps"
      v-loading="table.loading"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255,.4)"
      element-loading-custom-class="el-loading-mask-table"
      @select="handleSelect"
      @selection-change="handleSelectionChange"
      @select-all="handleSelectAll"
    >
      <el-table-column v-if="!table.hideOrder" :min-width="82" label="序号" fixed="left">
        <template
          slot-scope="scope"
        >{{(scope.$index + 1) + (table.pagination.pageNo - 1) * table.pageSize}}</template>
      </el-table-column>
      <el-table-column
        type="selection"
        :min-width="82"
        v-if="table.columns.some(t => t.type === 'selection')"
      ></el-table-column>
      <template v-for="column in columnsIsVisible">
        <el-table-column
          v-if="!column.colHide"
          :key="column.key"
          :type="column.type"
          :label="column.title"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :align="column.align || 'left'"
          :render-header="column.renderHeader"
          :show-overflow-tooltip="column.showTooltip && !['inputMan', 'sendMan'].includes(column.key)"
        >
          <template v-if="column.type !== 'selection'" slot-scope="scope">
            <cell
              v-if="column.render"
              :column="column"
              :row="scope.row"
              :index="scope.$index"
              :render="column.render"
            ></cell>
            <span v-else>
              <span v-if="column.filter">{{$filters[column.filter](scope.row[column.key])}}</span>
              <span
                v-else-if="column.enumType"
              >{{enums[column.enumType].getName(scope.row[column.key])}}</span>
              <template
                v-else-if="['inputMan', 'sendMan'].includes(column.key) && scope.row[column.key +'Name']"
              >
                <el-tooltip
                  style="align-items:flex-start;"
                  placement="top-start"
                  :content="scope.row[column.key +'Name']"
                >
                  <span>{{scope.row[column.key]}}</span>
                </el-tooltip>
              </template>
              <template v-else-if="column.key == 'loginName' && scope.row['loginTrueName']">
                <el-tooltip
                  style="align-items:flex-start;"
                  placement="top-start"
                  :content="scope.row['loginTrueName']"
                >
                  <span>{{scope.row[column.key]}}</span>
                </el-tooltip>
              </template>
              <span v-else>{{scope.row[column.key] || (scope.row[column.key] === 0 ? 0 : '--')}}</span>
            </span>
          </template>
        </el-table-column>
      </template>

      <div slot="empty">
        <div v-if="table.loading"></div>
        <div v-else-if="table.isShowResultNone && !hasSearched">{{table.showResultText}}</div>
        <div v-else>暂无数据</div>
      </div>
    </el-table>

    <el-pagination
      class="pagination"
      v-if="table.pagination"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.pagination.total"
      :current-page.sync="table.pagination.pageNo"
      @size-change="handleSizeChange"
      @current-change="search(table)"
    ></el-pagination>

    <zv-dialog width="700px" title="自定义列表" :showDialog.sync="showDialog">
      <div slot="content">
        <div class="custom-dialog-list">
          <div class="custom-dialog-list-left">
            <p class="content-title">请选择</p>
          </div>
          <div class="custom-dialog-list-right">
            <el-checkbox-group v-model="selectedCheckList">
              <template v-for="(column, idx) in table.columns">
                <el-checkbox
                  :key="idx"
                  :label="column.key"
                  v-if="column.key && !column.notShow"
                >{{column.title}}</el-checkbox>
              </template>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div slot="btns">
        <el-button @click="showDialog=false">取消</el-button>
        <el-button type="primary" @click="columnsSure">确定</el-button>
      </div>
    </zv-dialog>

    <zv-dialog
      :width="table.searchDialogWidth ? table.searchDialogWidth : '500px'"
      title="自定义搜索"
      :showDialog.sync="showCustomSearchDialog"
    >
      <div slot="content">
        <zv-searchbar
          search-type="custom"
          :origin-query="table.query"
          ref="customSearch"
          :search-data="table.customSearchData"
          :showCustomSearchDialog="showCustomSearchDialog"
        ></zv-searchbar>
      </div>
      <div slot="btns">
        <el-button @click="showCustomSearchDialog=false">取消</el-button>
        <el-button type="primary" @click="customSearchClick">确定</el-button>
      </div>
    </zv-dialog>
    <zv-dialog
      class="dialog-terminal"
      width="400px"
      title="查询终端"
      :showDialog.sync="showTerminalDialog"
    >
      <div slot="content">
        <div class="dialog-terminal-line" v-if="showTerminalTag">
          <el-tag closable @close="handleClose">请选择待查询的终端编号，仅支持单个终端的查询。</el-tag>
        </div>
        <div
          class="dialog-terminal-line dialog-terminal-item"
          v-for="item in terminalList"
          :key="item.terminalNo"
        >
          {{item.terminalNo}}
          <el-button
            class="terminal__btn"
            size="medium"
            type="text"
            @click="chooseTerminal(item)"
          >查询</el-button>
        </div>
      </div>
    </zv-dialog>
  </div>
</template>

<script>
import cell from "./cell";
import lodash from "../../utils/tools/lodash";
import Tips from "@/utils/utils/Tips";

export default {
  components: {
    cell
  },
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  // watch: {
  //   'checkList': function () {
  //     if (this.selectedCheckList.length > 0) {
  //       this.search(this.table)
  //     }
  //   }
  // },
  computed: {
    columnsIsVisible() {
      let columns = this.table.columns.filter(
        t =>
          t.type !== "selection" &&
          (this.checkList.indexOf(t.key) > -1 || !t.key)
      );
      return columns;
    }
  },
  data() {
    return {
      showDialog: false,
      showCustomSearchDialog: false,
      showTerminalDialog: false,
      terminalList: [],
      checkList: [],
      selectedCheckList: [],
      clonedTableQuery: {},
      // header:44 tabs:44 block-padding:15+15 search:15+32 pagination:15+28 content-bottom:15 footer:42
      // 44 - 44 - 30 - 47 -15-28 - 42 -15
      hasSearched: false, // 是否点击过查找
      tableHeight: (() => {
        let tabH = this.table.extraHeight || 266;
        let height = document.documentElement.clientHeight - tabH - 1;
        height = this.table.hidePagination ? height + 43 : height;
        return height < 300 ? 300 : height;
      })(),
      showTerminalTag: true
    };
  },

  methods: {
    customSearchClick() {
      // this.$refs.customSearch.setResultParams();
      this.search(this.table);
      this.showCustomSearchDialog = false;
    },

    //刷新查询表格数据
    selectRow(rows) {
      if (rows == null) {
        return;
      }
      if (!Object.prototype.toString.call(rows) === "[object Array]") {
        rows = [rows];
      }
      rows.forEach(row => {
        this.$refs.searchTable.toggleRowSelection(row, true);
      });
    },

    //刷新查询表格数据
    refresh() {
      this.search(this.table);
    },

    //查询表格数据
    async search(table, extraQuery) {
      if (table.resetTable) {
        // 重新请求时,清空列表
        this.$set(table, "data", []);
        table.pagination.total = 0;
      }
      if (this.$refs.customSearch) {
        this.$refs.customSearch.setResultParams();
        let query = this.$_.cloneDeep(this.$refs.customSearch.query);
        Object.keys(query).forEach(key => {
          this.$refs.outSearch.query[key] = query[key];
        });
      } else if (this.$refs.outSearch) {
        this.$refs.outSearch.setResultParams();
      }

      if (table && table.api) {
        if (
          table.localColumnsKey == "table_columns_dynamic_pass_log" ||
          table.localColumnsKey == "table_columns_analysis_work_time" ||
          table.localColumnsKey == "table_columns_analysis_work_time_period"
        ) {
          if (!table.query.startTime && !table.query.endTime) {
            Tips.message({ message: "查询时间不能为空" });
            return false;
          }
          if (!table.query.iotId) {
            Tips.message({
              message: "查询" + table.searchData[0].placeholder + "不能为空"
            });
            // this.hasSearched = false; //如果需要清空还显示就放开注释
            return false;
          }
        }
        /*
        // 当前告警列表
        if (table.localColumnsKey == "table_columns_alarm_list") {
          if (!table.query.vehicleNo) {
            Tips.message({
              message: "查询" + table.searchData[0].placeholder + "不能为空"
            });
            // this.hasSearched = false; //如果需要清空还显示就放开注释
            return false;
          }
        }
        */
        // 工况列表查询条件
        if (table.localColumnsKey == "table_columns_workinglist") {
          let dsQuery = table.query.deviceStatus;
          table.query = Object.assign(table.query, {
            lockStatus: null,
            onlineStatus: null,
            workingStatus: null
          });
          if (dsQuery) {
            let s = dsQuery.split("=");
            let s0 = s[0],
              s1 = s[1];
            window.console.log("qqqqqqqqqqqqqqqq");
            table.query[s0] = s1;
            window.console.log(table.query);
          }
        }
        // 额外查询条件
        if (extraQuery) {
          table.query = Object.assign(table.query, extraQuery);
        }

        table.loading = true;

        let query = lodash.cloneDeep(table.query) || {};
        if (!table.hidePagination) {
          query.pageNo = table.pagination.pageNo;
          query.pageSize = table.pageSize;

          // query.index = "0";
          // query.page = table.pagination.pageNo;
          // query.rows = table.pageSize;
        }
        Object.keys(query).forEach(function(key) {
          if (!query[key] && query[key] !== 0) {
            delete query[key];
          }
        });
        try {
          let res = await table.api(query);
          const { data, code, msg } = res.data;
          if (code === "0000") {
            if (data instanceof Array) {
              this.$set(table, "data", data);
              if (table.customerPagination) {
                table.pagination.total = table.data.length;
                let tableData = this.customerPaginationPage(data, table);
                this.$set(table, "data", tableData);
              } else {
                table.pagination.total = table.data.length;
                let tableData = this.customerPaginationPage(data, table);
                this.$set(table, "data", tableData);
              }
            } else {
              this.$set(table, "data", data.items);
              table.pagination.total = data.total;
              // this.$set(table, "data", data.rows);
              // table.pagination.total = data.total;
            }
          } else {
            if (code === "APP.DEVICE.039") {
              // 添加设备下多终端的选择
              this.showTerminalDialog = true;
              this.terminalList = data;
            } else if (code === "PWD.003" || code === "PWD.004") {
              Tips.message({
                type: "error",
                message: msg
              });
            } else if (code === "APP.DEVICE.408") {
              Tips.notify({
                type: "warning",
                title: "提醒",
                message: "请缩小筛选范围"
              });
            } else {
              Tips.notify({
                type: "error",
                title: "错误",
                message: msg
              });
            }
          }
        } catch (e) {
          // console.log(e)
        }
        table.loading = false;
        this.$nextTick(this.handlePageTurned);
        this.hasSearched = true;
      }
    },
    /**
     * @Desc 修改iotId参数， 查询设备日志 会先查询终端，根据选择终端查询日志
     */
    chooseTerminal(item) {
      this.showTerminalDialog = false;
      this.search(this.table, { terminalNo: item.terminalNo });
    },
    customerPaginationPage(data, table) {
      let arr = data.filter((number, index) => {
        return (
          index < table.pageSize * table.pagination.pageNo &&
          index >= table.pageSize * (table.pagination.pageNo - 1)
        );
      });
      return arr;
    },
    handlePageTurned() {
      this.$emit("on-page-turned", this.table.data);
    },

    handleSelect(selection, row) {
      this.$emit("on-select", selection, row);
    },

    handleSelectionChange(val) {
      this.$emit("on-selection-change", val);
    },

    handleSelectAll(val) {
      this.$emit("on-select-all", val);
    },

    handleSizeChange(val) {
      this.table.pageSize = val;
      this.search(this.table);
    },

    columnsSure() {
      this.showDialog = false;
      this.checkList = this.$_.cloneDeep(this.selectedCheckList);
      this.search(this.table);
      localStorage.setItem(
        this.table.localColumnsKey,
        JSON.stringify(this.selectedCheckList)
      );
      // 修改自定义列表 清空再增加后的样式问题
      let tableHeight =
        this.tableHeight ==
        document.documentElement.clientHeight -
          (this.table.extraHeight || 266 - 1)
          ? this.tableHeight - 1
          : document.documentElement.clientHeight -
            (this.table.extraHeight || 266 - 1);
      this.setTableHeight(tableHeight < 300 ? 300 : tableHeight);
    },

    init() {
      let localCols = localStorage.getItem(this.table.localColumnsKey);
      if (localCols) {
        let localColsArr = JSON.parse(localCols);
        this.checkList = localColsArr;
        this.selectedCheckList = this.$_.cloneDeep(localColsArr);
      } else {
        let origin = this.table.columns
          .filter(e => !e.optional)
          .map(e => e.key);
        this.checkList = origin;
        this.selectedCheckList = this.$_.cloneDeep(origin);
      }

      this.$set(this.table, "pageSize", 10);
      this.$set(this.table, "pageNo", 1);
      this.$set(this.table, "loading", false);
      this.$set(this.table, "data", []);
      if (!this.table.hidePagination) {
        this.$set(this.table, "pagination", {
          pageNo: 1,
          total: 0
        });
      }
      if (!this.table.hasOwnProperty("autoLoading") || this.table.autoLoading) {
        this.search(this.table);
      }
    },

    initRefresh() {
      this.$set(this.table, "query", this.$_.cloneDeep(this.clonedTableQuery));
      if (this.$refs.outSearch) {
        this.$refs.outSearch.clearQuery();
      }
      if (this.$refs.customSearch) {
        this.$refs.customSearch.clearQuery();
      }
      this.init();
    },
    setTableHeight(val) {
      this.tableHeight = this.table.hidePagination ? val + 43 : val;
    },
    windowResize() {
      window.onresize = () => {
        let height =
          document.documentElement.clientHeight -
          (this.table.extraHeight || 266 - 1);

        this.setTableHeight(height < 300 ? 300 : height);
      };
    },
    handleClose() {
      this.showTerminalTag = false;
    }
  },

  created() {
    this.clonedTableQuery = this.$_.cloneDeep(this.table.query);
    this.init();
  },
  mounted() {
    this.windowResize();
  }
};
</script>

<!--@formatter:off-->
<style lang='sass' scoped>
    .pagination
        padding: $primaryGap
        padding-bottom: 0
        text-align: right
    /deep/ .el-checkbox
      margin-right: 30px
      margin-left: 0 !important
    .cell
      .el-tooltip
        @include ver-center-center
      img
        cursor: pointer
        width: 20px
        height: 20px
      .el-button--small
        padding-top: 0
        padding-bottom: 0
        line-height: 21px
    .el-button.terminal__btn
      margin: 0 10px 10px 0
</style>

<style lang="scss">
.el-table tr td.is-hidden > *,
.el-table tr th.is-hidden > * {
  visibility: initial;
}
.custom-dialog-list {
  display: flex;
}

.custom-dialog-list-left {
  padding-top: 8px;
  width: 56px;
  p {
    margin: 0;
    font-size: 12px;
    color: #999;
  }
}

.custom-dialog-list-right {
  flex: 1;
  .el-checkbox-group {
    line-height: auto;
  }

  .el-checkbox {
    margin-right: 0;
    margin-bottom: 15px;
    font-weight: normal;
  }

  .el-checkbox__label {
    min-width: 130px;
    font-size: 12px;
  }
}

.el-loading-mask.el-loading-mask-table {
  .el-loading-spinner {
    margin-top: -14px;
    i {
      color: #333;
      font-size: 20px;
    }
  }

  .el-loading-text {
    color: #333;
    font-size: 12px;
  }
}
#zv-table {
  .dialog-terminal {
    .dialog-terminal-line {
      border-radius: 0;
      width: 356px;
      .el-tag {
        font-size: 14px;
      }
      .el-button.terminal__btn {
        margin: 0;
      }
    }
    .dialog-terminal-item {
      margin-top: 5px;
      border: 1px solid #c9c9c9;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .dialog-terminal-item + .dialog-terminal-item {
      margin-top: 0px;
      border-top: initial;
    }
    .btns {
      display: none;
    }
  }
  .el-table--group::after,
  .el-table--border::after,
  .el-table::before {
    z-index: 4;
  }
}
</style>
