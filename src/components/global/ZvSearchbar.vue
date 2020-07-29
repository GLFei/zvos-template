<template>
  <div class="search-box" v-if="!$_.isEmpty(searchData)">
    <slot name="before" />
    <span class="ctrl-btn custom-btn">
      <slot name="customHeader" />
    </span>
    <span class="ctrl-btn">
      <slot name="after" />
    </span>
    <div
      class="form"
      :class="searchType == 'custom' ? 'style-custom' : '' "
      v-for="(item,idx) in searchDataIsVisible"
      :key="idx"
    >
      <div v-if="item.type === 'select'" class="select">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <el-select
          v-model="query[item.model]"
          :style="{'width': item.width}"
          filterable
          clearable
          :multiple="item.multiple"
          :collapse-tags="item.collapseTags"
          :loading="item.loading"
          :remote="item.remote"
          :remote-method="item.remote ? (keyWord) => selectSearch(keyWord, item) : null"
          :placeholder="item.placeholder"
          @change="emitSearchChange(item)"
          @clear="() => selectClear(item)"
        >
          <template
            v-for="(i,index) in (item.enumType ? $enums[item.enumType].allList() : item.option)"
          >
            <template v-if="index== 0 && !item.isFilterFirst">
              <el-option :label="i.label" :value="i.value" :key="i.value" />
            </template>
            <template v-if="index > 0">
              <el-option :label="i.label" :value="i.value" :key="i.value" />
            </template>
          </template>
        </el-select>
      </div>
      <div v-if="item.type === 'cascader'" class="cascader">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <el-cascader
          :style="{'width': item.width}"
          @change="(value) => cascaderChange(value,item)"
          v-model="item.model"
          :options="item.option"
          change-on-select
        />
      </div>
      <div v-if="item.type === 'dateSection'" class="date-section">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <el-date-picker
          class="date input"
          :style="{'width': item.width}"
          v-model="item.model"
          :type="item.isShowHMS?'datetimerange':'daterange'"
          align="center"
          unlink-panels
          @change="(value) => dateChange(value,item)"
          :start-placeholder="item.startTimeText || '开始日期'"
          :end-placeholder="item.endTimeText || '结束日期'"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
        />
      </div>
      <div v-if="item.type === 'date'" class="date">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <el-date-picker
          v-model="item.initialDate"
          :format="item.dateType === 'month' ? 'yyyy年MM月': 'yyyy-MM-dd'"
          class="date"
          :type="item.dateType"
          @change="(value) => dateSingeChange(value,item)"
          placeholder="选择时间"
        />
      </div>
      <div v-if="item.type === 'input'" class="input">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <!-- @keyup.enter.native="emitSearchChange" -->

        <el-input
          v-model.trim="query[item.model]"
          :style="{'width': item.width}"
          clearable
          :placeholder="item.placeholder"
          @clear="emitSearchChange"
          @keyup.enter.native="emitSearchChange"
        >
          <!-- <el-button
            v-if="searchType === 'normal'"
            @click="emitSearchChange"
            slot="append"
            icon="el-icon-search"
          ></el-button>-->
          <!--<i @click="$search(table)" slot="suffix" class="el-input__icon el-icon-search"></i>-->
        </el-input>
      </div>
      <div v-if="item.type === 'inputRemote'" class="input">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <el-autocomplete
          v-model.trim="item.value"
          :style="{'width': item.width}"
          filterable
          clearable
          :placeholder="item.placeholder"
          :fetch-suggestions="(key, cb) => querySearchAsync(key, cb, item)"
          @select="(value) => handleSelect(value, item)"
          @clear="() => handleClear(item)"
          @blur="() => handleBlur(item)"
        >
          <template slot-scope="{ item }">
            <div class="name">{{ item.value }}</div>
          </template>
        </el-autocomplete>
      </div>
      <div v-if="item.type === 'tree'" class="select">
        <span v-if="searchType === 'custom'" class="text">{{item.title}}</span>
        <span v-if="item.searchType === 'custom'" class="span-text">{{item.title}}</span>
        <zv-tree-select
          :options="item.option"
          :width="item.width || '220px'"
          :relationKey="item.relationKey"
          :value.sync="query[item.model]"
          :props="item.props"
          @change="onChangeVal"
          :placeholder-text="item.placeholder"
        ></zv-tree-select>
        <!--<zv-cascader :cascader-data="item.cascaderData" :val.sync="query[item.model]"-->
        <!--@on-change-val="onChangeVal"></zv-cascader>-->
      </div>
    </div>
    <el-button
      @click="emitSearchChange"
      type="primary"
      plain
      style="float: left;"
      v-if="searchType != 'custom'"
    >查询</el-button>
    <slot name="queryAfter" />
  </div>
</template>

<script>
import moment from "@/utils/utils/moment";

export default {
  props: {
    searchData: {
      type: Array,
      default() {
        return [];
      }
    },
    originQuery: {
      type: Object,
      default() {
        return {};
      }
    },
    searchType: {
      type: String,
      default() {
        return "normal";
      }
    },
    showCustomSearchDialog: {
      type: Boolean,
      default: false
    },
    localColumnsKey: {
      type: String,
      default: ""
    }
  },
  computed: {
    searchDataIsVisible() {
      return this.searchData.filter(t => {
        // 日期选择  清空不保存需要保留参数
        if (t.type === "dateSection") {
          if (this.initdatePicker && t.tempModel && t.tempModel.length) {
            this.$set(t, "model", t.tempModel);
          }
        }
        return !t.hide;
      });
    }
  },
  data() {
    function getPickerDate(num) {
      let date = new Date();
      let dateStr = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      const end = new Date(dateStr + " 23:59:59");
      const start = new Date(dateStr);
      start.setTime(
        new Date(new Date(dateStr).setMonth(new Date(dateStr).getMonth() - num))
      );
      return {
        start,
        end
      };
    }
    return {
      tempData: {},
      inputRemoteData: [],
      // inputRemoteModel: '',
      query: {},
      // 多选日期
      //date: [null, null],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一个月",
            onClick(picker) {
              // let date = new Date();
              // let dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
              // const end = new Date(dateStr + " 23:59:59");
              // const start = new Date(dateStr);
              // start.setTime(
              //   new Date(new Date(dateStr).setMonth(new Date(dateStr).getMonth() - 1))
              // );
              const { start, end } = getPickerDate(1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const { start, end } = getPickerDate(3);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const { start, end } = getPickerDate(6);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },

      // 日期选择  清空不保存需要保留参数
      initDatePickerTimer: 0,
      initdatePicker: false,
      initDateModel: false
    };
  },
  methods: {
    async onChangeVal(val, relationKeys, isSearch, isInit) {
      if (relationKeys) {
        let relationItemArr = relationKeys.split(",");
        relationItemArr.forEach(itemKey => {
          let relationItem = this.searchData.find(obj => {
            return obj.model === itemKey;
          });
          if (relationItem) {
            this.querySingleOptions(val, relationItem, isInit);
          }
        });
      }
      if (this.searchType === "normal" && isSearch) {
        this.$emit("on-search-change");
      }
    },
    // 获取关联的单个下拉框数据
    async querySingleOptions(val, relationItem, isInit) {
      if (relationItem && relationItem.relationApi) {
        this.$set(this.query, relationItem.model, null);
        let list = [];
        if (val) {
          let res = await relationItem.relationApi({
            [relationItem.queryKey]: val
          });
          let data = res.data.data.items;
          if (data instanceof Array) {
            list = data.map(obj => {
              return {
                value:
                  obj[
                    relationItem.keyValueName
                      ? relationItem.keyValueName[0]
                      : "id"
                  ],
                label:
                  obj[
                    relationItem.keyValueName
                      ? relationItem.keyValueName[1]
                      : "name"
                  ]
              };
            });
          } else {
            list = data.rows.map(obj => {
              return {
                value:
                  obj[
                    relationItem.keyValueName
                      ? relationItem.keyValueName[0]
                      : "id"
                  ],
                label:
                  obj[
                    relationItem.keyValueName
                      ? relationItem.keyValueName[1]
                      : "name"
                  ]
              };
            });
          }
        }
        this.$set(relationItem, "option", list);
        if (relationItem.relationKey) {
          let relationItemArr = relationItem.relationKey.split(",");
          relationItemArr.forEach(itemKey => {
            let relationSubItem = this.searchData.find(obj => {
              return obj.model === itemKey;
            });
            if (relationSubItem) {
              this.querySingleOptions(null, relationSubItem, isInit);
            }
          });
        }

        if (this.originQuery[relationItem.model] && isInit) {
          this.$set(
            this.query,
            relationItem.model,
            this.originQuery[relationItem.model]
          );
        }
      }
    },
    // doKeyUp(val) {
    doKeyUp() {
      this.setResultParams();
      this.$emit("on-search-change");
    },
    selectSearch(keyWord, item) {
      if (!item.remote) {
        return;
      }
      this.$set(item, "option", null);
      if (item.api && keyWord) {
        let key = item.remoteQuery;
        let params = {};
        params[key] = keyWord;
        item.api(params).then(res => {
          let data = null;
          if (res.data.data instanceof Array) {
            data = res.data.data;
          } else {
            data = res.data.data.items;
          }

          this.searchData.forEach(list => {
            if (
              list.type === "select" &&
              JSON.stringify(list.model) === JSON.stringify(item.model)
            ) {
              this.$set(
                item,
                "option",
                data.map(obj => {
                  let res = {};
                  res.value = obj[item.model];
                  let remoteLabel = item.remoteLabel;
                  for (let i = 0, l = remoteLabel.length; i < l; i++) {
                    if (
                      obj[remoteLabel[i]] &&
                      obj[remoteLabel[i]]
                        .toLowerCase()
                        .indexOf(keyWord.toLowerCase()) > -1
                    ) {
                      res.label = obj[remoteLabel[i]];
                      break;
                    }
                  }
                  return res;
                })
              );
            }
          });
        });
      }
    },
    selectClear(item) {
      // 参数不能为空，清空参数时，不请求查询接口
      if (item && item.required) {
        this.$set(this.query, "iotId", false);
      }
      // 清空参数时，支持远程搜索时清空下拉列表
      if (item && item.remote) {
        this.$set(item, "option", null);
      }
    },
    async emitSearchChange(item, isInit) {
      window.console.log("iiiiiiiiiiiiiii");
      // 告警内容用的name，如果换成id 这里就去掉
      if (item && item.model === "alarmTypeName") {
        let model = this.query[item.model];
        item.option.forEach(i => {
          if (i.value === model) {
            this.query[item.model] = i.label;
          }
        });
      }

      if (item && item.relationKey) {
        let relationItemArr = item.relationKey.split(",");
        relationItemArr.forEach(itemKey => {
          let relationItem = this.searchData.find(obj => {
            return obj.model === itemKey;
          });
          if (relationItem) {
            this.querySingleOptions(
              this.query[item.model],
              relationItem,
              isInit
            );
          }
        });
      }
      // 参数不能为空，清空参数时，不请求查询接口
      if (item && item.required) {
        this.$set(this.query, "iotId", true);
        return;
      }

      if (item && item.relationColumns) {
        item.relationColumns.forEach(i => {
          this.searchDataIsVisible.forEach(it => {
            if (it.model === i.model) {
              if (this.query[item.model] !== item.limitValue) {
                this.query[i.model] = "";
                delete it.type;
                // delete this.query[i.model]
                delete it.option;
              } else {
                it.type = i.type;
              }
            }
          });
        });
      }
      if (this.searchType === "normal") {
        this.setResultParams();
        this.$emit("on-search-change");
      }
    },
    setResultParams() {
      this.initDateModel = true;

      Object.keys(this.query).forEach(key => {
        this.originQuery[key] = this.query[key];
        // this.query[key] = null
      });
      // Object.keys(this.tempData).forEach(key => {
      Object.keys(this.tempData).forEach(() => {
        // this.tempData[key] = null
      });
    },
    onSelectClear(model) {
      this.query[model] = null;
      // this.emitSearchChange()
    },
    // cascader 值改变的时候
    cascaderChange(val, item) {
      if (val.length) {
        this.query[item.modelName[0]] = val[0];
        this.query[item.modelName[1]] = val[1];
      } else {
        this.query[item.modelName[0]] = null;
        this.query[item.modelName[1]] = null;
      }
      this.emitSearchChange();
    },
    // 日期选择控件切换的回调
    // dateChange(val, item, isInit) {
    dateChange(val, item) {
      if (val === null) {
        this.query[item.modelName[0]] = this.query[item.modelName[1]] = null;
      } else {
        if (item.noFormat) {
          if (val[0]) {
            this.query[item.modelName[0]] = val[0];
          }
          if (val[1]) {
            this.query[item.modelName[1]] = val[1];
          }
        } else {
          if (val[0]) {
            if (item.isShowHMS) {
              this.query[item.modelName[0]] = moment(val[0]);
            } else {
              this.query[item.modelName[0]] =
                moment(val[0], "YYYY-MM-DD ") +
                (item.shortDate ? "" : " 00:00:00");
            }
          }
          if (val[1]) {
            if (item.isShowHMS) {
              this.query[item.modelName[1]] = moment(val[1]);
            } else {
              this.query[item.modelName[1]] =
                moment(val[1], "YYYY-MM-DD ") +
                (item.shortDate ? "" : " 23:59:59");
            }
          }
        }
      }
      if (item.isShowHMS && val === null) {
        window.console.log("");
      } else if (
        item.hasOwnProperty("isFirstLoading") &&
        !item.isFirstLoading
      ) {
        item.isFirstLoading = true;
      } else {
        this.emitSearchChange();
      }
    },
    // 日期单选控件切换的回调
    dateSingeChange(val, item) {
      this.query[item.model] = moment(val);
      this.emitSearchChange();
    },
    initOptions() {
      this.searchData.forEach(async item => {
        // glf 添加是否自动加载 默认自动加载
        if (item.hasOwnProperty("autoLoading") && !item.autoLoading) {
          return;
        }
        if (item.api) {
          try {
            if (item.notInitSearch) return;
            this.$set(item, "loading", true);
            let query = this.$_.cloneDeep(item.query) || {};
            let res = await item.api(query);
            item.loading = false;
            let data = null;
            if (res.data.data instanceof Array) {
              data = res.data.data;
            } else {
              data = res.data.data.items;
            }
            // let data = res.data.data
            // if (data instanceof Array) {
            if (item.type === "tree") {
              this.$set(item, "option", data);
              if (
                (this.originQuery[item.model] ||
                  this.originQuery[item.model] === 0) &&
                item.relationKey
              ) {
                this.onChangeVal(
                  this.originQuery[item.model],
                  item.relationKey,
                  false,
                  true
                );
              }
            } else if (item.type === "select") {
              this.$set(
                item,
                "option",
                data.map(obj => {
                  return {
                    value: obj[item.keyValueName ? item.keyValueName[0] : "id"],
                    label:
                      obj[item.keyValueName ? item.keyValueName[1] : "name"]
                  };
                })
              );
              if (
                (this.originQuery[item.model] ||
                  this.originQuery[item.model] === 0) &&
                item.relationKey
              ) {
                this.emitSearchChange(item, true);
              }
            }

            // }
          } catch (e) {
            throw e;
          }
        }
      });
    },

    clearQuery() {
      this.query = {};
      for (let key in this.query) {
        let val = this.query[key];
        let dataType = typeof val;
        if (dataType == "string") {
          this.query[key] = "";
        } else if (dataType == "object") {
          if (Array.isArray(val)) {
            this.query[key] = [];
          } else {
            this.query[key] = {};
          }
        }
      }
    },
    // 处理input远程搜索显示
    querySearchAsync(queryString, cb, item) {
      if (!queryString) {
        return cb([]);
      }
      queryString = queryString.trim();
      this.querySearch(queryString, item).then(() => {
        cb(this.inputRemoteData);
      });
    },
    querySearch(keyWord, item) {
      if (item.api && keyWord) {
        let key = item.remoteQuery;
        let params = {};
        params[key] = keyWord;
        this.inputRemoteData = [];
        return item
          .api(params)
          .then(res => {
            let data = null;
            if (res.data.data instanceof Array) {
              data = res.data.data;
            } else {
              data = res.data.data.items;
            }
            data.forEach(obj => {
              let resObj = {};
              resObj.id = obj[item.model];
              if (
                this.searchData &&
                this.searchData[0] &&
                this.searchData[0].extraModel
              ) {
                resObj[this.searchData[0].extraModel] =
                  obj[this.searchData[0].extraModel];
              }
              let remoteLabel = item.remoteLabel;
              for (let i = 0, l = remoteLabel.length; i < l; i++) {
                if (
                  obj[remoteLabel[i]] &&
                  obj[remoteLabel[i]]
                    .toLowerCase()
                    .indexOf(keyWord.toLowerCase()) > -1
                ) {
                  resObj.value = obj[remoteLabel[i]];
                  break;
                }
              }
              this.inputRemoteData.push(resObj);
            });
            return res;
          })
          .catch(err => {
            return err;
          });
      }
    },
    handleSelect(value, item) {
      this.$set(this.query, "iotId", true);
      this.query[item.model] = value.id;
      if (
        this.searchData &&
        this.searchData.length &&
        this.searchData[0].extraModel
      ) {
        this.query[this.searchData[0].extraModel] =
          value[this.searchData[0].extraModel];
      }
      this.emitSearchChange(item);
    },
    handleClear(item) {
      this.$set(this.query, "iotId", false);
      this.query[item.model] = "";
    },
    handleBlur(item) {
      if (item.value) {
        this.$set(this.query, "iotId", true);
        this.query[item.model] = item.value;
        if (this.inputRemoteData.length) {
          let i = 0,
            l = this.inputRemoteData.length;
          for (; i < l; i++) {
            if (this.inputRemoteData[i].value === item.value) {
              this.query[item.model] = this.inputRemoteData[i].id;
              if (item.extraModel) {
                this.query[item.extraModel] = this.inputRemoteData[i][
                  item.extraModel
                ];
              }
              break;
            }
          }
        }
      } else {
        this.$set(this.query, "iotId", false);
        this.query[item.model] = "";
      }
    }
  },
  created() {
    this.query = this.$_.cloneDeep(this.originQuery);
    this.initOptions();

    // 日期选择  清空不保存需要保留参数
    this.initdatePicker = true;
    this.initDatePickerTimer = setTimeout(() => {
      this.initdatePicker = false;
      clearTimeout(this.initDatePickerTimer);
    }, 300);
  },
  mounted() {
    for (let i = 0; i < this.searchData.length; i++) {
      if (
        this.searchData[i].type === "dateSection" &&
        this.searchData[i].model
      ) {
        // glf 添加是否自动加载 默认自动加载
        if (
          !this.searchData[i].hasOwnProperty("autoLoading") ||
          this.searchData[i].autoLoading
        ) {
          this.dateChange(this.searchData[i].model, this.searchData[i]);
        }
      }
    }
  },
  watch: {
    // showCustomSearchDialog(e){
    //   if(e == false){
    //     this.searchData.forEach(a=>{
    //       if(a.modelName){
    //         this.query[a.modelName[0]] = null;
    //         this.query[a.modelName[1]] = null;
    //       }else{
    //         this.query[a.model] = null;
    //       }
    //     })
    //   }
    // }
  },
  beforeDestroy() {
    // 日期选择  清空不保存需要保留参数
    this.searchData.forEach(t => {
      if (t.type === "dateSection") {
        if (this.initDateModel) {
          t.tempModel = this.$_.cloneDeep(t.model);
        } else {
          if (!t.tempModel) {
            t.model = [];
          }
        }
      }
    });
  }
};
</script>

<style lang="sass" scoped>
  .search-box
    @include clearfix
    padding-bottom: 15px

    .ctrl-btn
      float: right
      //margin: $primaryGap 0 0
      display: inline-block

      /deep/ .el-button
        margin-left: 6px
        // padding: 8px 14px

    .custom-btn
      // margin-left: -6px

    .item
      margin-top: $primaryGap

    .text
      display: block
      margin-left: 5px
      margin-bottom: 5px
      font-size: $font-small
      font-weight: bold
      color: #666
    .span-text
      display: inline-block
      margin-right: 8px
      font-size: $font-small
      color: #828080
    .form
      float: left
      display: inline-block
      margin-right: 10px
      //margin-top: $primaryGap
      vertical-align: top

      .date
        width: 220px

      /deep/ .el-select
        width: 220px
        display: block

      .el-cascader
        width: 220px
        display: block

      .el-input
        width: 220px

    .form.style-custom
      margin-bottom: 8px;

</style>

<style lang="scss">
// .el-dialog__body {
//   .dep-form {
//     .search-box {
//       padding-bottom: 0;
//     }
//   }
// }
</style>
