<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <zv-table :table="table" ref="dataTable">
          <div slot="ctrl-button">
            <el-button type="primary" @click="doAdd()" v-if="authority.add">新增</el-button>
          </div>
          <el-button slot="ctrl-button-after" type="primary" @click="showExportDialog=true" v-if="authority.export">导出</el-button>
        </zv-table>
      </div>
    </div>
    <zv-dialog-export :showExportDialog.sync="showExportDialog" @on-export-current="doExport('0')" @on-export-allpage="doExport('1')"></zv-dialog-export>
    <zv-dialog width="400px" :title="isEditMode ? '修改角色' : '新增角色' " v-if="showDialog" :showDialog.sync="showDialog"
    @close-dialog="closeDialog">
      <div slot="content">
        <el-form ref="form" label-width="140px" :model="roles" :rules="rules" status-icon>
          <!-- <el-form-item label="角色类型：" prop="roleTypeId">
            <el-select v-model="roles.roleTypeId">
              <el-option v-for="item in rolesSelect" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="角色名称：" prop="roleName">
            <el-input v-model.trim="roles.roleName"></el-input>
          </el-form-item>
          <el-form-item label="所属机构：" prop="unitId">
            <zv-tree-select :value.sync="roles.unitId" :options="unitData"></zv-tree-select>
          </el-form-item>
          <el-form-item label="所属大区：" prop="regionId">
            <el-select v-model="roles.regionId">
              <el-option v-for="item in regionSelect" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色描述：" >
            <el-input v-model="roles.remark"></el-input>
          </el-form-item>
          <el-form-item label="通用角色：" >
            <el-select v-model="roles.currency">
              <el-option v-for="item in $enums.RoleGeneral.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="技术调试：">
            <el-select v-model="roles.sign" clearable>
              <el-option v-for="item in $enums.technologyDebugSign.list" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
        </el-form>
      </div>
      <div slot="btns">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="doSubmit">保存</el-button>
      </div>
    </zv-dialog>
    <!-- :visible.sync="dialogVisible" -->
    <!-- 权限分配弹窗 -->
    <zv-dialog width="700px" title="权限分配"  v-if="showQxDialog"  :showDialog.sync="showQxDialog">
      <div slot="content">
        <tree-transfer
          :title="title"
          :from_data='fromData'
          :to_data='toData'
          :defaultProps="defaultProps"
          :defaultTransfer="defaultTransfer"
          :defaultCheckedKeys="defaultCheckedKeys"
          @addBtn='add'
          @removeBtn='remove'
          :mode='Qxmode'
          pid="parentId"
          node_key="menuId"
          height='540px' filter >
          </tree-transfer>
      </div>
      <div slot="btns">
          <el-button @click="showQxDialog = false">取消</el-button>
          <el-button type="primary" @click="QxSubmit">保存</el-button>
        </div>
    </zv-dialog>
  </div>
</template>
<script>

// eslint-disable-next-line no-unused-vars
 /* eslint-disable */
import api from "./api";
import pageMixin from "@/mixins/pageMixin";
import treeTransfer from 'el-tree-transfer'
import { mapState } from "vuex";
import { type } from 'os';
import Tips from "@/utils/utils/Tips";
const menuKey = "role";

const ROLES = {
  currency: 0,
  regionId: null,
  remark: null,
  roleName: null,
  roleTypeId: null,
  unitId: null,
  sign: null
};

export default {
  name: "Roles",
  mixins: [pageMixin],
  /**
   * 该页面没有用到props, 权限分配会修改roleId,与此处冲突
   */
  // props: {
  //   dialogVisible: Boolean,
  //   handleSubmit: Function,
  //   handleCancel: Function,
  //   roleId: [String, Number],
  //   roleName: String
  //   // modelData:Array,
  // },
  data() {
    const vm = this;
    return {
      roleId: null,
      menuKey:'role_list',
      defaultProps: {
        children: "children",
        label: "menuText"
      },
      showQxDialog:false,
      filterText: "",
      id: "",
      data: [],
      roleSelected: [],
      powerOptions: [],
      showPowerDialog: false,
      showExportDialog: false,
      unitData: [],
      showDialog: false,
      title:["选择功能", "已选功能"],
      table: {
        api: api.GetRolesList,
        localColumnsKey: "table_columns_roles",
        query: {},
        searchData: [
          {
            type: "input",
            model: "roleName",
            placeholder: "请输入角色名称"
          }
        ],
        columns: [
          {
            title: "角色名称",
            key: "roleName",
            minWidth:"150",
            showTooltip: true
          },
          {
            title: "所属机构",
            key: "unitName",
            minWidth:"120"
          },
          {
            title: "所属大区",
            key: "regionName",
            minWidth: "120"
          },
          {
            title: "创建时间",
            showTooltip:true,
            key: "inputTime",
            minWidth:"140"
          },
          {
            title: "创建账号",
            key: "inputMan",
            minWidth:"120",
          },
          {
            title: "角色描述",
            key: "remark",
            minWidth:"150",
            showTooltip: true
          },
          {
            title: "是否通用",
            key: "currency",
            minWidth: "80",
            render(h, ctx) {
              if(ctx.row.currency == '0'){
                var label = '否';
              }else{
                var label = '是'
              }
              return h(
                "span", label
              );
            }
          },
          {
            title: "操作",
            fixed: "right",
            minWidth:"180",
            render(h, ctx) {
              const jurisdictionBtn = h(
                "el-button",
                {
                  attrs: {
                    type: "text"
                  },
                  on: {
                    click: vm.doJurisdiction.bind(this, ctx.row.roleId)
                  }
                },
                "权限分配"
              );
              const editBtn = h(
                "el-button",
                {
                  attrs: {
                    type: "text"
                  },
                  on: {
                    click: vm.doEdit.bind(this, ctx.row)
                  }
                },
                "修改"
              );
              const deleteBtn = h(
                "el-button",
                {
                  attrs: {
                    type: "text"
                  },
                  on: {
                    click: vm.doDelete.bind(this, ctx.row)
                  }
                },
                "删除"
              );
              let arr = [];
              if (vm.authority.modify) {
                arr.push(editBtn);
              }
              if (vm.authority.delete) {
                arr.push(deleteBtn);
              }
              if (vm.authority.permission_assignment) {
                arr.push(jurisdictionBtn);
              }
              return h("span", arr);
            }
          }
        ]
      },
      rules: {
        roleTypeId: {
          required: true,
          message: "请选择角色类型",
          trigger: "change"
        },
        roleName: {
          required: true,
          message: "请输入角色名称",
          trigger: "blur"
        },
        unitId: {
          required: true,
          message: "请选择所属机构",
          trigger: "change"
        },
        regionId: {
          required: true,
          message: "请选择所属大区",
          trigger: "change"
        },
        currency: {
          required: true,
          message: "请选择通用角色",
          trigger: "change"
        }
      },
      roles: vm.$_.cloneDeep(ROLES),
      mode: null,
      Qxmode:'transfer',
      regionSelect: [],
      rolesSelect: [],
      fromData:[],
      toData:[],
      defaultCheckedKeys:[],
      defaultTransfer:true
    };
  },
  computed: {
    // ...mapState("authority", {
    //   authority: state => state.authority[menuKey]
    // }),
    isEditMode() {
      return this.mode === "edit";
    }
  },
  methods: {
    //导出数据
    doExport(index) {
      this.showExportDialog = false;
      let query = this.$_.cloneDeep(this.table.query);
      //导出当前页
      if (index === "0") {
        query.pageNo = this.table.pagination.pageNo;
        query.pageSize = this.table.pageSize;
        api.RolesConfigPage(query);
      }
      //导出全部
      if (index === "1") {
        api.RolesConfigAll(query);
      }
    },
    // 新增
    doAdd() {
      this.mode = "add";
      this.showDialog = true;
      this.roles = this.$_.cloneDeep(ROLES);
      this.roles.unitId = this.$store.state.userInfo.unitId;
    },
    // 修改
    doEdit(row) {
      this.mode = "edit";
      // this.unitData.label = row.unitName
      // this.roles.currency = row.currency+""
      this.showDialog = true;
      this.roles = this.$_.cloneDeep(row);
    },
    // 删除
    doDelete(row) {
      this.$confirm("确定要删除 [" + row.roleName + "] ？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showClose: false,
        type: "warning"
      })
        .then(() => {
          api
            .RolesDelete({
              id: row.roleId
            })
            .then(() => {
              Tips.message({ message: "删除成功", type: "success" });
              this.$refs.dataTable.refresh();
            });
        })
        .catch();
    },
    // 保存
    doSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        if (this.isEditMode) {
          let temp = this.$_.cloneDeep(this.roles);
          delete temp.dicName;
          delete temp.delState;
          delete temp.inputMan;
          delete temp.inputTime;
          delete temp.loginName;
          delete temp.pinyIn;
          delete temp.regName;
          delete temp.unitName;
          await api.RolesUpdate(temp);
        } else {
          this.roles.currency = Number(this.roles.currency);
          await api.RolesAdd(this.roles);
        }
        this.showDialog = false;
        Tips.message({ message: `角色${this.isEditMode ? "编辑" : "新增"}成功`, type: "success" });
        this.$refs.dataTable.refresh();
      });
    },
    QxSubmit() {
      var query = [];
      this.toData.forEach(a => {
        query.push(a.menuId);
        if(a.children){
          a.children.forEach(b => {
            query.push(b.menuId);
            if(b.children){
              b.children.forEach(c => {
                query.push(c.menuId);
              })
            }else{
              query.push(b.menuId);
            }
          })
        }else{
          query.push(a.menuId);
        }
      });
      var r = [];
      for(var i = 0, l = query.length; i<l; i++){
        for(var j = i + 1; j < l; j++)
          if(query[i] == query[j]) j == ++i;
          if(query[i].menuId == undefined){
            var obj = {}
            obj.menuId = query[i];
            r.push(obj);
          }else{
            r.push(query[i]);
          }
      }
      var roleId = this.roleId ;
      if(r.length <= 0){
        Tips.message({ message: "未执行分配操作！", type: "warning" });
        this.showQxDialog = false;
        return;
      }
      api.fetchRolesUpdatauthority({basRoleMenus:r,roleId:roleId}).then(res=>{
        if(res.data.code == '0000'){
          this.showQxDialog = false;
          Tips.message({ message: "分配成功", type: "success" });
        }
      })
    },
    // 保存
    doSubmit() {
      this.$refs.form.validate(async valid => {
        if (!valid) return;
        if (this.isEditMode) {
          let temp = this.$_.cloneDeep(this.roles);
          delete temp.dicName;
          delete temp.delState;
          delete temp.inputMan;
          delete temp.inputTime;
          delete temp.loginName;
          delete temp.pinyIn;
          delete temp.regName;
          delete temp.unitName;
          await api.RolesUpdate(temp);
        } else {
          this.roles.currency = Number(this.roles.currency);
          await api.RolesAdd(this.roles);
        }
        this.showDialog = false;
        Tips.message({ message: `角色${this.isEditMode ? "编辑" : "新增"}成功`, type: "success" });
        this.$refs.dataTable.refresh();
      });
    },
    closeDialog() {
      this.$refs.form.clearValidate();
    },
    // 权限分配
    async doJurisdiction(roleId) {
      this.roleId = roleId;
      this.toData = [];
      let res = await api.fetchRoleIdGetlist({});
      let listres = await api.fetchRoleIdGetmenulist({id:roleId})
      let fromData = res.data.data.items;
      let toData = listres.data.data.items;
      this.defaultCheckedKeys = [];
      toData.forEach(element => {
        this.defaultCheckedKeys.push(element.menuId);
      });
      this.fromData = fromData;
      //this.toData = toData;
      this.showQxDialog = true;
    },
    handleClose() {
      this.cancel();
    },
    // 监听穿梭框组件添加
    add(fromData,toData,obj){
      this.obj = obj;
      this.toData = toData;
    },
    // 监听穿梭框组件移除
    remove(fromData,toData,obj){
      this.obj = obj;
      this.toData = toData;
    }
  },
  mounted() {
    // if (!this.$commFunc.getPowerByNameId(this.authority, "select")) {
    //   this.$router.push("/noauth");
    // }
    this.$api.regionList({}).then(res => {
      this.regionSelect = res.data.data.items;
    });
    this.$api.rolesList({}).then(res => {
      this.rolesSelect = res.data.data.items;
    });
    //获取机构下拉列表
    this.$api.getUnitTree({}).then(res => {
      this.unitData = res.data.data.items;
    });
  },
  components:{ treeTransfer },
  created(){
    this.table.columns[this.table.columns.length - 1 ].colHide = !(this.authority.modify || this.authority.delete || this.authority.permission_assignment)
  }
};
</script>

<style lang="less">
@import "../../static/less/theme.less";
#dialog-add-role-user {
  .zv-dialog-content {
    .flex-mixin();
    .col-left {
      padding: 0;
      border: solid 1px #ebeef5;
      flex-basis: 48%;
    }
    .col-center {
      flex-basis: 2%;
    }
    .col-right {
      padding: 0;

      border: solid 1px #ebeef5;
      flex-basis: 48%;
    }
    .col-title {
      padding: 0 15px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      background-color: #f5f7fa;
      border-bottom: solid 1px #ebeef5;
      h5 {
        font-weight: normal;
        font-size: 15px;
      }
      em {
        color: @zvFontGrey;
        font-size: 12px;
      }
    }
    .user-search {
      padding: 15px;
    }
  }

  .role-tree {
    height: 300px;
    overflow: hidden;
    overflow-y: auto;
    .el-checkbox {
      &.is-disabled {
        display: none !important;
      }
    }
    .tree-node {
      .item-addon {
        color: @zvBlue;
        font-size: 12px;
      }
    }
  }
}
</style>
