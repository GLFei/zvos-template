<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <zv-table :table="table" ref="dataTable">
          <div slot="ctrl-button">
            <el-button type="primary" @click="doAdd()" v-if="authority.add">新增</el-button>
            <el-button type="primary" @click="doMulAdd()" v-if="authority.batch_import">批量导入</el-button>
            <el-button type="primary" @click="doMulLogout()" v-if="authority.batch_logout">批量注销</el-button>
          </div>
          <el-button
            slot="ctrl-button-after"
            type="primary"
            @click="showExportDialog=true"
            v-if="authority.export"
          >导出</el-button>
        </zv-table>
      </div>
    </div>
    <zv-dialog-export
      :showExportDialog.sync="showExportDialog"
      @on-export-current="doExport('0')"
      @on-export-allpage="doExport('1')"
    ></zv-dialog-export>
    <zv-dialog
      width="410px"
      :title="isAddMode ? '新增SIM卡' : '修改SIM卡'"
      :showDialog.sync="showDialog"
      @close-dialog="closeDialog"
    >
      <div slot="content">
        <!--新增表单-->
        <el-form
          class="lrLayout-form"
          ref="form"
          label-width="140px"
          :model="sim"
          :rules="rules"
          label-position="top"
          status-icon="status-icon"
          v-if="isAddMode"
        >
          <el-form-item label="供应商：" prop="simSupplier">
            <el-select v-model="sim.simSupplier" @change="getSimSupplier" placeholder="请选择供应商">
              <el-option
                v-for="item in simSupplierNameSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡类型：" prop="simType">
            <el-select v-model="sim.simType" @change="getSimType" placeholder="请选择卡类型">
              <el-option
                v-for="item in simTypeSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="SIM卡号：" prop="simNo">
            <el-input
              v-model="sim.simNo"
              minlength="9"
              maxlength="13"
              @blur="getSIMInfo"
              placeholder="请输入SIM卡号"
            ></el-input>
          </el-form-item>
          <el-form-item label="IMSI：" prop="imsi">
            <el-input v-model="sim.imsi" maxlength="15" placeholder="请输入IMSI"></el-input>
          </el-form-item>
          <el-form-item v-if="sim.simType===200866" label="ICCID：" prop="iccid">
            <el-input v-model="sim.iccid" maxlength="20" placeholder="请输入ICCID"></el-input>
          </el-form-item>
          <el-form-item label="套餐类型：" prop="planType">
            <el-select v-model="sim.planType" @change="getPlanType" placeholder="请选择套餐类型">
              <el-option
                v-for="item in planTypeSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用机构" prop="unitId">
            <zv-tree-select
              :value.sync="sim.unitId"
              :options="unitData"
              @getValue="getUnitId"
              placeholder="请选择使用机构"
            ></zv-tree-select>
            <!--zv-cascader(:val.sync="sim.unitId" :cascader-data="unitData")-->
          </el-form-item>
          <el-form-item label="开卡时间：" prop="issueDate">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="sim.issueDate"
              placeholder="请输入开卡时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="运营商：" prop="simCarrier">
            <el-select v-model="sim.simCarrier" @change="getSimCarrier" placeholder="请选择运营商">
              <el-option
                v-for="item in simCarrierSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务密码：" prop="simSerPwd">
            <el-input v-model="sim.simSerPwd" placeholder="请输入服务密码"></el-input>
          </el-form-item>
        </el-form>
        <!--修改表单-->
        <el-form
          class="lrLayout-form"
          ref="form"
          label-width="140px"
          :model="sim"
          :rules="rules"
          label-position="top"
          status-icon="status-icon"
          v-else
        >
          <el-form-item label="SIM卡号：" prop="simNo">
            <el-input v-model="sim.simNo" minlength="9" maxlength="13" disabled></el-input>
          </el-form-item>
          <el-form-item label="供应商：" prop="simSupplier">
            <el-select v-model="sim.simSupplier" @change="getSimSupplier" placeholder="请选择供应商">
              <el-option
                v-for="item in simSupplierNameSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡类型：" prop="simType">
            <el-select v-model="sim.simType" @change="getSimType" placeholder="请选择卡类型">
              <el-option
                v-for="item in simTypeSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="IMSI：" prop="imsi">
            <el-input v-model="sim.imsi" maxlength="15" placeholder="请输入IMSI"></el-input>
          </el-form-item>
          <el-form-item v-if="sim.simType===200866" label="ICCID：" prop="iccid">
            <el-input v-model="sim.iccid" maxlength="20" placeholder="请输入ICCID"></el-input>
          </el-form-item>
          <el-form-item label="套餐类型：" prop="planType">
            <el-select v-model="sim.planType" @change="getPlanType" placeholder="请选择套餐类型">
              <el-option
                v-for="item in planTypeSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用机构" prop="unitId">
            <zv-tree-select
              :value.sync="sim.unitId"
              :options="unitData"
              @getValue="getUnitId"
              placeholder="请选择使用机构"
            ></zv-tree-select>
            <!--zv-cascader(:val.sync="sim.unitId" :cascader-data="unitData")-->
          </el-form-item>
          <el-form-item label="开卡时间：" prop="issueDate">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="sim.issueDate"
              placeholder="请输入开卡时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="运营商：" prop="simCarrier">
            <el-select v-model="sim.simCarrier" @change="getSimCarrier" placeholder="请选择运营商">
              <el-option
                v-for="item in simCarrierSelect"
                :key="item.dicId"
                :label="item.dicName"
                :value="item.dicId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="服务密码：" prop="simSerPwd">
            <el-input v-model="sim.simSerPwd" placeholder="请输入服务密码"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="btns">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doSubmit" :loading="isSubmitLoading">保存</el-button>
      </div>
    </zv-dialog>
    <zv-dialog
      width="410px"
      title="批量导入SIM卡"
      :showDialog.sync="showMulDialog"
      @close-dialog="closeDialog"
    >
      <div slot="content">
        <div>
          <span>按模板格式填写后上传，</span>
          <el-button size="mini" @click="downloadTemplate">下载Excel模板</el-button>
        </div>
        <label for="importDom" style="margin: 20px 0;display:block;">
          <span>上传模板：</span>
          <div class="btn-upload">
            <span class="el-icon-upload">上传模板</span>
          </div>
          <input
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="upload"
            id="importDom"
            ref="clearFile"
            type="file"
            hidden="hidden"
          />
          <span class="fileName" v-if="fileData">{{ fileData.name}}</span>
        </label>
      </div>
      <div slot="btns">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="doSubmit" :loading="isSubmitLoading">提交</el-button>
      </div>
    </zv-dialog>

    <!-- 批量注销 -->
    <zv-dialog width="410px" title="批量注销SIM卡" :showDialog.sync="showLogoutDialog">
      <div slot="content">
        <div>
          <span>按模板格式填写后上传，</span>
          <el-button size="mini" @click="downloadLogoutTemplate">下载Excel模板</el-button>
        </div>
        <label for="importDom" style="margin: 20px 0;display:block;">
          <span>上传模板：</span>
          <div class="btn-upload">
            <span class="el-icon-upload">上传模板</span>
          </div>
          <input
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="uploadLogout"
            id="importDom"
            ref="clearFile"
            type="file"
            hidden="hidden"
          />
          <span class="fileName" v-if="fileDataLogout">{{ fileDataLogout.name}}</span>
        </label>
      </div>
      <div slot="btns">
        <el-button @click="showLogoutDialog = false">取消</el-button>
        <el-button type="primary" @click="doSubmitLogout" :loading="isSubmitLoading">提交</el-button>
      </div>
    </zv-dialog>
  </div>
</template>

<script>
import api from "./api";
import pageMixin from "@/mixins/pageMixin";

import { mapState } from "vuex";
import Tips from "@/utils/utils/Tips";
import moment from "@/utils/utils/moment";

const SIM = {
  simNo: null,
  imsi: null,
  iccid: null,
  planType: null,
  issueDate: moment(new Date(), "YYYY-MM-DD"),
  simSerPwd: null,
  unitId: null,
  simType: null,
  simCarrier: null,
  simSupplier: null,
};

export default {
  name: "test_list",
  mixins: [pageMixin],
  data() {
    const validateSimSerPwd = (rule, value, callback) => {
      if (value) {
        let reg = /^\d+$/;
        if (!reg.test(value)) {
          callback(new Error("请输入数字密码"));
        }
      }
      callback();
    };
    const vm = this;
    return {
      menuKey: "test_list",
      fileData: null,
      fileDataLogout: null,
      activeName: "single",
      unitData: [], //机构下拉数据
      simType: "",
      showExportDialog: false,
      showDialog: false,
      showMulDialog: false,
      showLogoutDialog: false,
      isSubmitLoading: false,
      table: {
        api: api.fetchSimList,
        localColumnsKey: "table_columns_sim",
        query: {},
        searchData: [
          {
            type: "input",
            model: "simNo",
            placeholder: "SIM卡号",
          },
          {
            type: "select",
            model: "simType",
            placeholder: "SIM卡类型",
            api: vm.$api.getDicyBydicId,
            query: { pdicId: "200864" },
            keyValueName: ["dicId", "dicName"],
          },
        ],
        customSearchData: [
          {
            title: "注册时间",
            type: "dateSection",
            model: "",
            modelName: ["inputTimeStart", "inputTimeEnd"],
          },
          {
            title: "开卡时间",
            type: "dateSection",
            model: "",
            modelName: ["issueDateStart", "issueDateEnd"],
          },
          {
            title: "ICCID",
            type: "input",
            model: "iccid",
            placeholder: "请输入ICCID号",
          },
          {
            title: "使用机构",
            type: "tree",
            model: "unitId",
            api: this.$api.getUnitTree,
          },
          {
            title: "SIM卡状态",
            type: "select",
            model: "simStatusList",
            api: vm.$api.getDicyBydicId,
            multiple: true,
            query: { pdicId: "102001" },
            keyValueName: ["dicId", "dicName"],
          },
          {
            title: "套餐类型",
            type: "select",
            model: "planType",
            api: vm.$api.getDicyBydicId,
            query: { pdicId: "101001" },
            keyValueName: ["dicId", "dicName"],
          },
          {
            title: "注册人",
            type: "input",
            model: "inputMan",
            placeholder: "注册人",
          },
          {
            title: "供应商",
            type: "select",
            model: "simSupplier",
            api: vm.$api.getDicyBydicId,
            query: { pdicId: "201741" },
            keyValueName: ["dicId", "dicName"],
          },
          {
            title: "运营商",
            type: "select",
            model: "simCarrier",
            api: vm.$api.getDicyBydicId,
            query: { pdicId: "200882" },
            keyValueName: ["dicId", "dicName"],
          },
        ],
        columns: [
          {
            title: "SIM卡号",
            key: "simNo",
            minWidth: "120",
            showTooltip: true,
          },
          {
            title: "ICCID",
            key: "iccid",
            minWidth: "120",
            showTooltip: true,
            optional: true,
          },
          {
            title: "IMSI",
            key: "imsi",
            minWidth: "120",
            showTooltip: true,
            optional: true,
          },
          {
            title: "开卡时间",
            key: "issueDate",
            minWidth: "100",
            showTooltip: true,
          },

          {
            title: "使用机构",
            key: "unitName",
            minWidth: "120",
            showTooltip: true,
          },
          {
            title: "SIM卡状态",
            key: "simStatusName",
            minWidth: "100",
            showTooltip: true,
          },
          {
            title: "套餐类型",
            key: "planTypeName",
            minWidth: "150",
            showTooltip: true,
          },
          {
            title: "SIM卡类型",
            key: "simTypeName",
            minWidth: "80",
            showTooltip: true,
          },
          {
            title: "供应商",
            key: "simSupplierName",
            minWidth: "80",
            showTooltip: true,
          },
          {
            title: "运营商",
            key: "simCarrierName",
            minWidth: "80",
            showTooltip: true,
          },
          {
            title: "服务密码",
            key: "simSerPwd",
            minWidth: "80",
            showTooltip: true,
          },
          {
            title: "注册时间",
            key: "inputTime",
            minWidth: "150",
            showTooltip: true,
          },
          {
            title: "注册人",
            key: "inputMan",
            minWidth: "120",
            // showTooltip: true
          },
          {
            title: "标识备注",
            key: "simFlowRemark",
            minWidth: "160",
            showTooltip: true,
          },
          {
            title: "操作",
            fixed: "right",
            minWidth: "180",
            render(h, ctx) {
              let btnArr = [
                { name: "修改", method: "doEdit" },
                { name: "删除", method: "doDelete" },
                { name: "注销", method: "doLogout" },
              ];
              const [editBtn, delBtn, logoutBtn] = btnArr.map((i) => {
                return h(
                  "el-button",
                  {
                    attrs: {
                      type: "text",
                    },
                    on: {
                      click: vm[i.method].bind(this, ctx.row),
                    },
                  },
                  i.name
                );
              });
              let arr = [];
              vm.authority.modify && arr.push(editBtn);
              vm.authority.delete && arr.push(delBtn);
              if (ctx.row.simStatus !== 102202) {
                // 已经注销的不展示注销按钮
                vm.authority.sim_cancell && arr.push(logoutBtn);
              }
              return h("span", arr);
            },
          },
        ],
      },
      rules: {
        simNo: [
          {
            required: true, //是否必填
            message: "请输入SIM卡号", //规则
            trigger: "blur", //何事件触发
          },
          //可以设置双重验证标准
          {
            min: 9,
            max: 13,
            message: "请输入9~13位的SIM卡号",
            pattern: /^((1\d{8})|(1\d{9})|(1\d{10})|(1\d{11}|(1\d{12})|(1\d{13})))$/,
            trigger: "blur",
          },
        ],
        iccid: [
          { max: 20, message: "不能超过20位，请重新输入", trigger: "blur" },
          // { validator: this.validateIccid, trigger: "blur" }
        ],
        planType: {
          required: true,
          message: "请选择套餐类型",
          trigger: "change",
        },

        issueDate: {
          required: true,
          message: "请选择办卡时间",
          trigger: "change",
        },
        unitId: {
          required: true,
          message: "请选择办卡单位",
          trigger: "change",
        },
        simType: {
          required: true,
          message: "请选择SIM卡类型",
          trigger: "change",
        },
        simSupplier: {
          required: true,
          message: "请选择供应商",
          trigger: "change",
        },
        imsi: {
          max: 15,
          message: "不能超过15位，请重新输入",
          trigger: "blur",
        },
        simCarrier: {
          required: true,
          message: "请选择运营商",
          trigger: "change",
        },
        simSerPwd: [
          {
            max: 8,
            message: "不能超过8位，请重新输入",
            trigger: ["blur", "change"],
          },
          {
            validator: validateSimSerPwd,
            trigger: ["change", "blur"],
          },
        ],
      },
      sim: vm.$_.cloneDeep(SIM),
      mode: null,
      planTypeSelect: [], //获取套餐类型下拉框
      simTypeSelect: [], //获取SIM卡类型下拉框
      simCarrierSelect: [], //获取运营商下拉框
      simSupplierNameSelect: [], //获取供应商下拉框
    };
  },
  computed: {
    isAddMode() {
      return this.mode === "add";
    },
    ...mapState("userInfo", {
      userInfo: (state) => state,
    }),
  },
  methods: {
    // ICCID 必填校验
    validateIccid(rule, value, callback) {
      if (this.sim.simType !== 200866) {
        return callback();
      }

      if (!this.sim.iccid || !this.sim.iccid.trim()) {
        return callback(new Error("ICCID 不能为空"));
      }
      return callback();
    },
    // 获取SIM卡信息
    getSIMInfo() {
      let simNo = this.sim.simNo;
      let simType = this.sim.simType;
      let simSupplier = this.sim.simSupplier;
      this.setSimInfo();

      if (
        simNo &&
        simNo.trim() &&
        simType === 200866 &&
        simSupplier === 201746
      ) {
        return api.getSIMInfo({ simNo }).then((res) => {
          let info = res.data.data;
          this.setSimInfo(info.imsi, info.iccid);
        });
      }
    },

    // 设置 sim 卡信息
    setSimInfo(imsi, iccid) {
      this.sim = Object.assign(this.sim, {
        imsi: imsi || "",
        iccid: iccid || "",
      });
    },

    /**
     * @Author:谢姣
     * @Desc:获取套餐中文
     */
    getPlanType(id) {
      this.planTypeSelect.forEach((a) => {
        if (a.dicId == id) {
          this.sim.planTypeName = a.dicName;
        }
      });
    },
    /**
     * @Author:谢姣
     * @Desc:获取使用机构中文
     */
    getUnitId(id, formName) {
      formName = formName || "sim";
      this.setArr(this.unitData).forEach((a) => {
        if (a.unitId == id) {
          this[formName].unitName = a.unitName;
        }
      });
    },

    /**
     * @Author:谢姣
     * @Desc:获取卡类型中文
     */
    getSimType(id) {
      this.simTypeSelect.forEach((b) => {
        if (b.dicId == id) {
          this.sim.simTypeName = b.dicName;
        }
      });
      this.getSIMInfo();
    },
    /**
     * @Author:谢姣
     * @Desc:获取供应商中文
     */
    getSimSupplier(id) {
      this.simSupplierNameSelect.forEach((c) => {
        if (c.dicId == id) {
          this.sim.simSupplierName = c.dicName;
        }
      });
      this.getSIMInfo();
    },
    /**
     * @Author:谢姣
     * @Desc:获取运营商中文
     */
    getSimCarrier(id) {
      this.simCarrierSelect.forEach((d) => {
        if (d.dicId == id) {
          this.sim.simCarrierName = d.dicName;
        }
      });
    },
    /**
     * @Author:谢姣
     * @Desc:获取机构
     */
    setArr(arr, newArr) {
      newArr = newArr || [];
      arr.forEach((item) => {
        (item.unitId || item.unitId == 0) &&
          newArr.push({ unitId: item.unitId, unitName: item.unitName });
        item.children && this.setArr(item.children, newArr);
      });
      return newArr;
    },
    /**
     * @Author:谢姣
     * @Desc:导入
     */
    async upload(e) {
      if (e.target.files.length === 0) return;
      this.fileData = e.target.files[0];
    },
    /**
     * @Author:谢姣
     * @Desc:导出数据
     */
    doExport(index) {
      this.showExportDialog = false;
      let query = this.table.query;
      query.pageNo = this.table.pagination.pageNo;
      query.pageSize = this.table.pageSize;
      /**
       * @Author:谢姣
       * @Desc:导出当前页
       */
      if (index == "0") {
        api.simCardPage(query);
        /**
         * @Author:谢姣
         * @Desc:导出全部
         */
      } else if (index == "1") {
        api.simCardAll(query);
      }
    },
    /**
     * @Author:谢姣
     * @Desc:新增
     */
    doAdd() {
      this.mode = "add";
      this.isSubmitLoading = false;
      this.showDialog = true;
      this.showMulDialog = false;
      this.sim = this.$_.cloneDeep(SIM);
      this.activeName = "single";
      this.sim.unitId = this.userInfo.unitId;
      this.sim.simType = 200865;
      this.getSimType(200865);
      this.sim.simSupplier = 201746;
      this.getSimSupplier(201746);
      this.getUnitId(this.userInfo.unitId);
      setTimeout(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      }, 300);
      //  this.sim.unitId = this.unitData[0] ? this.unitData[0].unitId : "";
      // this.filename = null;
    },
    /**
     * @Author:谢姣
     * @Desc:批量导入
     */
    doMulAdd() {
      this.mode = "add";
      this.isSubmitLoading = false;
      this.showDialog = false;
      this.showMulDialog = true;
      this.sim = this.$_.cloneDeep(SIM);
      this.activeName = "multiple";
      this.sim.unitId = this.userInfo.unitId;
      this.getUnitId(this.userInfo.unitId);
      setTimeout(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      }, 300);
      //  this.sim.unitId = this.unitData[0] ? this.unitData[0].unitId : "";
      // this.filename = null;
    },
    /**
     * @Desc 批量注销
     */
    doMulLogout() {
      this.fileDataLogout = null;
      this.showLogoutDialog = true;
    },
    /**
     * @Desc 下载批量注销模板
     */
    async downloadLogoutTemplate() {
      await api.downloadSimLogout();
    },
    /**
     * @Desc 导入注销文件
     */
    async uploadLogout(e) {
      if (e.target.files.length === 0) return;
      this.fileDataLogout = e.target.files[0];
    },
    // 确认注销
    doSubmitLogout() {
      this.isSubmitLoading = true;
      if (!this.fileDataLogout) {
        Tips.message({
          message: "请先上传模板",
          type: "warning",
        });
        this.isSubmitLoading = false;
        return;
      }

      let formData = new FormData();
      formData.append("filename", this.fileDataLogout);

      api
        .BatchSimLogout(formData)
        .then((res) => {
          this.showLogoutDialog = false;
          if (res.data.code == "0000") {
            let errorNum = res.data.msg
              .substr(res.data.msg.indexOf("失败") + 2)
              .replace("条", "");
            if (errorNum == 0) {
              Tips.message({
                type: "success",
                message: res.data.msg,
              });
              this.isSubmitLoading = false;
              this.$refs.dataTable.refresh();
              return;
            } else {
              this.$refs.dataTable.refresh();
            }

            this.$confirm(res.data.msg + "，是否下载错误详情", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                api.downloadSimLogoutError({ key: res.data.data });
              })
              .catch(() => {
                this.isSubmitLoading = false;
                Tips.message({
                  type: "info",
                  message: "已取消",
                });
              });
          } else {
            Tips.message({
              type: "info",
              message: res.data.msg,
            });
          }
          this.isSubmitLoading = false;
          this.$refs.dataTable.refresh();
        })
        .catch(() => {
          this.isSubmitLoading = false;
        });
    },

    /**
     * @Author:谢姣
     * @Desc: 修改
     */
    doEdit(item) {
      this.mode = "edit";
      this.isSubmitLoading = false;
      this.showDialog = true;
      this.sim = Object.assign({}, SIM, item);

      this.sim.simSerPwd = this.sim.simSerPwd
        ? this.sim.simSerPwd + ""
        : this.sim.simSerPwd;
      setTimeout(() => {
        this.$refs.form && this.$refs.form.clearValidate();
      }, 300);
    },
    /**
     * @Author:谢姣
     * @Desc:  删除
     */
    doDelete(item) {
      if ([102002, 102003, 102202].indexOf(item.simStatus) === -1) {
        Tips.message({
          type: "warning",
          duration: 5000,
          message: "只有单卡（新卡）、单卡（旧卡）、已注销状态的SIM卡可删除！",
        });
        return false;
      }
      this.$confirm("是否确定删除SIM卡号： [" + item.simNo + "] ？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
        type: "warning",
      })
        .then(async () => {
          await api.SimDelete({ id: item.id }).then(() => {
            Tips.message({
              type: "success",
              message: "删除成功",
            });
            this.$refs.dataTable.refresh();
          });
        })
        .catch(() => {});
    },
    /**
     * @Author:谢姣
     * @Desc:  注销
     */
    doLogout(item) {
      if (item.simStatus === 102202) {
        Tips.message({
          type: "error",
          message: "该SIM卡号已注销",
        });
        this.$refs.dataTable.refresh();

        return;
      }
      if (item.simStatus === 102005 || item.simStatus === 102004) {
        this.$confirm(`SIM卡注销同时解除绑定关系，确定注销？`, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false,
          type: "warning",
        })
          .then(async () => {
            await api.SimLogout(item.simNo);
            Tips.message({
              type: "success",
              message: "注销成功",
            });
            this.$refs.dataTable.refresh();
          })
          .catch(() => {});
        return;
      }
      if (item.simStatus === 102002 || item.simStatus === 102003) {
        this.$confirm(`确认要注销此SIM卡吗？`, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false,
          type: "warning",
        })
          .then(async () => {
            await api.SimLogout(item.simNo);
            Tips.message({
              type: "success",
              message: "注销成功",
            });
            this.$refs.dataTable.refresh();
          })
          .catch(() => {});
        return;
      } else {
        this.$confirm(`确定注销SIM卡号： [${item.simNo} ] ？`, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          showClose: false,
          type: "warning",
        })
          .then(async () => {
            await api.SimLogout(item.simNo).then(() => {
              Tips.message({
                type: "success",
                message: "注销成功",
              });
              this.$refs.dataTable.refresh();
            });
          })
          .catch(() => {});
      }
    },
    async downloadTemplate() {
      await api.downloadModel();
    },
    /**
     * @Author:谢姣
     * @Desc:  保存
     */
    doSubmit() {
      if (this.isAddMode) {
        if (this.activeName === "single") {
          this.$nextTick(() => {
            this.isSubmitLoading = true;
            this.$refs.form.validate(async (valid) => {
              if (!valid) {
                this.isSubmitLoading = false;
                return;
              }

              api
                .SimAdd(this.sim)
                .then(() => {
                  this.showDialog = false;
                  Tips.message({
                    type: "success",
                    message: `SIM卡${this.isAddMode ? "新增" : "修改"}成功`,
                  });
                  this.isSubmitLoading = false;
                  this.$refs.dataTable.refresh();
                })
                .catch(() => {
                  this.isSubmitLoading = false;
                });
            });
          });
        } else {
          this.isSubmitLoading = true;
          if (!this.fileData) {
            Tips.message({
              message: "请先上传模板",
              type: "warning",
            });
            this.isSubmitLoading = false;
            return;
          }

          let formData = new FormData();
          formData.append("filename", this.fileData);
          /**
           * @Author:谢姣
           * @Desc: 上传模板拿到返回的模板地址 POST
           */

          api
            .BatchAdd(formData)
            .then((res) => {
              this.showMulDialog = false;
              if (res.data.code == "0000") {
                let errorNum = res.data.msg
                  .substr(res.data.msg.indexOf("失败") + 2)
                  .replace("条", "");
                if (errorNum == 0) {
                  Tips.message({
                    type: "success",
                    message: res.data.msg,
                  });
                  this.isSubmitLoading = false;
                  this.$refs.dataTable.refresh();
                  return;
                } else {
                  this.$refs.dataTable.refresh();
                }

                this.$confirm(res.data.msg + "，是否下载错误详情", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning",
                })
                  .then(() => {
                    api.importErrordetail({ key: res.data.data });
                  })
                  .catch(() => {
                    this.isSubmitLoading = false;
                    Tips.message({
                      type: "info",
                      message: "已取消",
                    });
                  });
              } else {
                Tips.message({
                  type: "info",
                  message: res.data.msg,
                });
              }
              this.isSubmitLoading = false;
              this.$refs.dataTable.refresh();
            })
            .catch(() => {
              this.isSubmitLoading = false;
            });
          this.showDialog = false;
        }
      } else {
        this.isSubmitLoading = true;
        this.$refs.form.validate(async (valid) => {
          if (!valid) {
            this.isSubmitLoading = false;
            return;
          }

          await api
            .SimUpdate(this.sim)
            .then(() => {
              Tips.message({
                type: "success",
                message: `SIM卡${this.isAddMode ? "新增" : "修改"}成功`,
              });
              this.showDialog = false;
              this.isSubmitLoading = false;
              this.$refs.dataTable.refresh();
            })
            .catch(() => {
              this.isSubmitLoading = false;
            });
        });
      }
    },
    closeDialog() {
      if (this.mode === "add" && this.$refs.clearFile) {
        this.$refs.clearFile.value = "";
      }
      this.fileData = null;
      this.$refs.form && this.$refs.form.resetFields();
      this.showDialog = false;
      this.showMulDialog = false;
    },
  },
  created() {
    this.table.columns[this.table.columns.length - 1].colHide = !(
      this.authority.modify ||
      this.authority.delete ||
      this.authority.sim_cancell
    );
    //获取机构下拉列表
    this.$api.getUnitTree({}).then((res) => {
      let unitDataArr = [];
      res.data.data.items.forEach((a) => {
        // if(a.unitId == this.userInfo.unitId){
        //   unitDataArr.push(a)
        // }
        unitDataArr.push(a);
      });
      this.unitData = unitDataArr;
    });
    //SIM卡类型
    this.$api.getDicyBydicId({ pdicId: "200864" }).then((res) => {
      this.simTypeSelect = res.data.data.items;
    });
    //套餐类型
    this.$api
      .getDicyBydicId({ pdicId: "101001", orderMethod: 1 })
      .then((res) => {
        this.planTypeSelect = res.data.data.items;
      });
    //供应商
    this.$api.getDicyBydicId({ pdicId: "201741" }).then((res) => {
      this.simSupplierNameSelect = res.data.data.items;
    });
    //运营商
    this.$api.getDicyBydicId({ pdicId: "200882" }).then((res) => {
      this.simCarrierSelect = res.data.data.items;
    });
  },
};
</script>

<style scoped lang="scss">
.lrLayout-form {
  .el-form-item {
    float: left;
    margin-bottom: 8px;
    /deep/ .el-form-item__label {
      padding: 0;
    }
  }
  .el-form-item:nth-child(2n) {
    margin-left: 10px;
  }
  .btn-upload {
    display: inline-block;
    border: 1px solid #dcdfe6;
    padding: 10px 15px;
    border-radius: 3px;
    margin-right: 5px;
  }
  .zv-download {
    color: $zvBlue;
  }
  .fileName {
    display: inline-block;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  /deep/.el-tabs__content {
    height: 367px;
  }
}
</style>
