<template>
  <div class="zv-area">
    <el-cascader
      v-model="nativeValue"
      :options="nativeOptions"
      :props="{ checkStrictly: true }"
      @change="handleChange"
    ></el-cascader>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mapJson: "../../static/json/map.json",
      nativeValue: this.value,
      nativeOptions: []
    };
  },
  props: {
    /* 值 */
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /* 选项列表数据 */
    options: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return [];
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
    }
  },
  methods: {
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this;
      axios
        .get(this.mapJson)
        .then(function(response) {
          if (response.status == 200) {
            var data = response.data;
            for (let key in data) {
              if (key.match(/0000$/)) {
                // 省
                that.nativeOptions.push({
                  value: key, // data[key], //key,
                  label: data[key],
                  children: []
                });
              } else if (key.match(/00$/)) {
                // 市
                let provinceLen = that.nativeOptions.length - 1;
                provinceLen = provinceLen < 0 ? 0 : provinceLen;
                that.nativeOptions[provinceLen].children.push({
                  value: key, // data[key], //key,
                  label: data[key],
                  children: []
                });
              } else {
                // 区
                let provinceLen = that.nativeOptions.length - 1;
                provinceLen = provinceLen < 0 ? 0 : provinceLen;
                let cityLen = that.nativeOptions[provinceLen].children.length - 1;
                cityLen = cityLen < 0 ? 0 : cityLen;
                that.nativeOptions[provinceLen].children[cityLen].children.push({
                  value: key, // data[key], //key,
                  label: data[key]
                });
              }
            }
          } else {
            window.console.log(response.status);
          }
        })
        .catch(function(error) {
          window.console.log(typeof +error);
        });
    },
    handleChange(value) {
      this.$emit("seleteCity", value, this.valueId, this.relationKey);
    }
  },
  mounted() {
    if (this.options && this.options.length) {
      this.nativeOptions = this.options
    } else {
      this.getCityData();
    }
    this.nativeValue = JSON.parse(JSON.stringify(this.value));
  }
};
</script>