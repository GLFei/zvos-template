  <template>
  <el-select
    ref="selectOption"
    :value="valueTitle"
    @visible-change="visibleChange"
    :style="{'width': width}"
    :clearable="clearable"
    :disabled="disabled"
    @clear="clearHandle"
    :placeholder="placeholderText"
  >
    <el-option :value="valueTitle" :label="valueTitle">
      <el-tree
        ref="selectTree"
        :accordion="accordion"
        :data="options"
        :props="props"
        :node-key="props.value"
        :default-expanded-keys="defaultExpandedKey"
        :expand-on-click-node="noSelectParent"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>

  <script>
export default {
  props: {
    /* 配置项 */
    props: {
      type: Object,
      default: () => {
        return {
          value: "unitId", // ID字段名
          label: "unitName", // 显示名称
          children: "children" // 子级字段名
        };
      }
    },
    /* 选项列表数据 */
    options: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return [];
      }
    },
    /* 值 */
    value: {
      type: [Number, String],
      default: () => {
        return null;
      }
    },
    /* 可清空选项 */
    clearable: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    /* 自动收起 */
    accordion: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    /* 关联的key值 */
    relationKey: {
      type: String,
      default: () => {
        return null;
      }
    },
    width: {
      type: String,
      default: () => {
        return "auto";
      }
    },
    placeholderText: {
      type: String,
      default: () => {
        return "请选择";
      }
    },
    /** 不可选父级节点, 默认false可选 */
    noSelectParent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      valueId: this.value, // 初始值
      valueTitle: null,
      defaultExpandedKey: []
    };
  },
  created() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.refresh();
        this.$emit("getValue", this.valueId, this.relationKey, false);
      }, 100);
    });
  },
  watch: {
    value() {
      setTimeout(() => {
        this.refresh();
      }, 100);
    },
    options() {
      setTimeout(() => {
        this.refresh();
      }, 100);
    }
  },
  methods: {
    visibleChange(visible) {
      if (!visible) return;
      setTimeout(() => {
        this.scrollTop();
      }, 0);
    },
    scrollTop() {
      let scrollbar = this.$refs.selectOption.$children[1].$children[0].wrap;
      scrollbar.scrollTop = 0;
    },
    refresh() {
      this.valueId = this.value;
      this.initHandle();
    },
    // 初始化值
    initHandle() {
      if (this.valueId) {
        if (this.$refs.selectTree.getNode(this.valueId)) {
          this.valueTitle = this.$refs.selectTree.getNode(this.valueId).data[
            this.props.label
          ]; // 初始化显示
          this.$refs.selectTree.setCurrentKey(this.valueId); // 设置默认选中
          this.defaultExpandedKey = [this.valueId]; // 设置默认展开
          // this.$emit('getValue',this.valueId, this.relationKey)
        } else {
          this.valueTitle = null;
          //this.valueId = null
          this.defaultExpandedKey = [];
          this.$refs.selectTree.setCurrentKey(""); // 设置默认选中
          // this.$emit('update:value', null)
        }
      } else {
        this.valueTitle = null;
        this.defaultExpandedKey = [];
        this.$refs.selectTree.setCurrentKey("");
      }
    },
    // 切换选项
    handleNodeClick(node) {
      if (node.subList && this.noSelectParent) {
        return;
      }
      this.valueTitle = node[this.props.label];
      this.valueId = node[this.props.value];
      this.$emit("update:value", this.valueId);
      this.$emit("getValue", this.valueId, this.relationKey, true);
      this.$emit("change", this.valueId, this.relationKey, true);
      //this.defaultExpandedKey = []
      this.$refs.selectOption.blur();
    },
    // 清除选中
    clearHandle() {
      this.valueTitle = null;
      if (this.valueTitle) {
        this.$set(this.valueTitle, null);
      }
      this.valueId = null;
      this.defaultExpandedKey = [];
      this.$refs.selectTree.setCurrentKey(null); // 设置默认选中
      this.$emit("update:value", null);
      this.$emit("getValue", this.valueId, this.relationKey, true);
      this.$emit("change", this.valueId, this.relationKey, true);
    }
  }
};
</script>

  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #3ae2c4;
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
