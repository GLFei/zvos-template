<template>
  <div class="zv-page">
    <div class="zv-content">
      <div class="zv-block">
        <div class="warp">
          <div class="home-row" v-if="showStatistics">
            <div class="el-h2">
              概况统计
              <!-- <span class="tip" v-show="tipShow">
                这里统计的是实际的智能设备，非终端
                <i class="el-icon-close" @click="tipShow = false"></i>
              </span>-->
            </div>
            <!-- <div class="home-data-search">
              <zv-tree-select :value.sync="unitId" :options="unitData" :width="'220px'"></zv-tree-select>
              <el-button style="margin-left: 10px;" @click="getStatisticsData">查询</el-button>
            </div>-->

            <el-row class="device-data-wrap" type="flex">
              <el-col
                class="item"
                :span="8"
                v-for="(item, index) in deviceDataPart1"
                :key="index"
                @click.native="goWorkingList(item.deviceStatus, index)"
              >
                <div class="item-l">
                  <img :src="item.icon" alt />
                  <span>{{item.name}}</span>
                </div>
                <div class="item-r">{{item.value}} 台</div>
              </el-col>
            </el-row>
          </div>
          <div class="home-row visited-list-wrap">
            <h2>最近访问</h2>
            <el-row type="flex" class="visited-list-ul" v-if="visitedPageList.length">
              <el-col
                class="visited-list-li"
                :span="4"
                v-for="item in visitedPageList"
                :key="item.menuEnText"
                @click.native="goVisitedPage(item.url)"
              >{{ item.menuText }}</el-col>
            </el-row>
          </div>
          <div class="home-row link">
            <h2>
              关联平台
              <div
                class="upload"
                @click="showMoreLinks"
                v-if="linkList.length > 2 && !showMoreFlag"
              >
                更多
                <i class="el-icon-arrow-right"></i>
              </div>
            </h2>
            <div v-if="!showMoreFlag">
              <a
                v-for="(item,index) in linkList.filter((it,ind) => ind < 2)"
                :key="index"
                :href="item.link"
                target="_blank"
              >
                <img :src="item.imgSrc" :title="item.name" />
              </a>
            </div>
            <template v-else>
              <div v-for="line in Math.ceil(linkList.length/2)" :key="line">
                <a
                  v-for="(item,index) in linkList.filter((_, ind)=>ind===(2*line-2)||ind===(2*line-1))"
                  :key="index"
                  :href="item.link"
                  target="_blank"
                >
                  <img :src="item.imgSrc" :title="item.name" />
                </a>
              </div>
            </template>
          </div>
          <div class="home-row doc">
            <h2>
              帮助文档
              <div class="upload" @click="uploadDialog" v-if="authority.help_file_add">
                上传
                <i class="el-icon-arrow-right"></i>
              </div>
            </h2>
            <el-row class="home-file-list" type="flex">
              <el-col :span="6" class="item-box" v-for="(item, index) in helpList" :key="index">
                <div class="item-box-inner">
                  <div class="title zv-text-blue" @click="download(item.url,item.attType)">{{item.title}}</div>
                  <div class="txt">{{item.content}}</div>
                  <div class="btns">
                    <span @click="doDel(item.id)" v-if="authority.help_file_del">删除</span>
                    <span @click="doEdit(item.id)" v-if="authority.help_file_edit">编辑</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <!-- 上传文档弹窗 -->
    <zv-dialog :showDialog.sync="showDialog" width="470px" title="上传文档" @close-dialog="closeDialog">
      <div slot="content">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="文档标题：" prop="title">
            <el-input v-model="form.title" maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="文档说明：" prop="content">
            <el-input type="textarea" v-model="form.content" maxlength="200" show-word-limit></el-input>
          </el-form-item>
          <el-upload
            class="upload-demo"
            :action="action"
            :data="uploadData"
            name="files"
            :file-list="fileList"
            accept="image/png, application/pdf"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="handleChange"
            :on-remove="handleFileRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form>
      </div>
      <div slot="btns">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="doSubmit">保存</el-button>
      </div>
    </zv-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import menuConfig from "@/config/menuConfig";
import moment from "moment";
import pageMixin from "@/mixins/pageMixin";
import httpService from "@/utils/services/http_service";
import homeApi from "./homeApi";
// import HomeBarChart from "../components/HomeBarChart";
import _ from "lodash";
import Tips from "@/utils/utils/Tips";
const HOME_ZVOS_URL = window[process.env.VUE_APP_PAGE_CONFIG].zvosHomeUrl;
const HOME_AM_URL = window[process.env.VUE_APP_PAGE_CONFIG].amHomeUrl;
const FORM = {
  title: null,
  content: null,
  url: null
};
export default {
  name: "Home",
  mixins: [pageMixin],
  // components: {
  //   HomeBarChart
  // },
  data() {
    let vm = this;
    return {
      menuKey: "home_page",
      showMoreData: false, // 是否显示更多统计数据
      echartDataInited: false, // echart图表数据是否加载
      unitData: [], //机构下拉数据
      timeValue: "",
      timer: null,
      visitedPageList: [],
      form: vm.$_.cloneDeep(FORM),
      showDialog: false,
      unitId: "", // 机构id
      action: null,
      fileList: [],
      helpList: [],
      company: [],
      tipShow: true,
      uploadData: {
        type: 0.2
      },
      maxValue: null,
      deviceDataOri: [
        {
          icon: require("@/static/images/home_page/home_icon1.png"),
          dataKey: "total",
          value: "",
          name: "接入设备"
        },
        {
          icon: require("@/static/images/home_page/online.png"),
          dataKey: "online",
          value: "",
          name: "在线",
          deviceStatus: "onlineStatus_1"
        },
        {
          icon: require("@/static/images/home_page/working.png"),
          dataKey: "working",
          value: "",
          name: "工作中",
          deviceStatus: "workingStatus_1"
        }
      ],
      deviceDataList: [],
      echartDataGroup: [],
      rules: {
        title: [{ required: true, message: "请输入文档标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入文档说明", trigger: "blur" }
        ]
      },
      linkList: [
        {
          link: HOME_ZVOS_URL,
          name: "云谷工业互联网平台",
          imgSrc: require("@/static/images/home_page/home-link1.jpg")
        },
        {
          link: HOME_AM_URL,
          name: "农机大脑",
          imgSrc: require("@/static/images/home_page/home-link2.jpg")
        }
      ],
      showMoreFlag: false
    };
  },
  computed: {
    ...mapState("userInfo", {
      userInfo: state => state
    }),
    showStatistics() {
      return this.authority.show_statistics;
    },
    deviceDataPart1() {
      return this.deviceDataList.filter((item, index) => index <= 3);
    },

    deviceDataPart2() {
      return this.deviceDataList.filter((item, index) => index > 3);
    }
  },

  methods: {
    startTimer() {
      this.stopTimer();
      this.timeValue = moment(new Date()).format("YYYY-MM-DD（ddd）HH:mm:ss");
      this.timer = setTimeout(this.startTimer, 1000);
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    showDataToggle() {
      this.showMoreData = !this.showMoreData;
    },
    getStatisticsData() {
      if (this.unitId) {
        this.getDeviceStatistics();
        // this.getEchartsData();
      }
    },
    async getDeviceStatistics() {
      let res = await homeApi.getDeviceStatistics({
        unitId: this.unitId
      });

      let resData = res.data.data;
      let tempArr = [];
      this.deviceDataOri.forEach(item => {
        let tempObj = this.$_.cloneDeep(item);
        tempObj.value = resData[tempObj.dataKey] || 0;
        tempArr.push(tempObj);
      });
      this.deviceDataList = tempArr;
    },
    goWorkingList(deviceStatus, index) {
      // 第一个跳转到设备列表页
      if (index == 0) {
        this.$router.push("/equipment/managelist?refreshTm=" + refreshTm);
        return
      }
      let paramStr = "";
      if (deviceStatus) {
        paramStr = "&deviceStatus=" + deviceStatus;
      }
      let refreshTm = new Date().getTime();
      let goPageUrl =
        "/equipmentmonitoring/workinglist?refreshTm=" + refreshTm + paramStr;
      this.$router.push(goPageUrl);
    },
    async getEchartsData() {
      let res = await homeApi.getEchartsData({
        unitId: this.unitId
      });
      let echartDataOri = res.data.data;
      this.maxValue = this.getEchartMaxValue(echartDataOri);
      var tempArr = [];
      for (var i = 0; i < echartDataOri.length; i += 6) {
        let tempObj = {};
        tempObj.items = echartDataOri.slice(i, i + 6);
        tempObj.guid = this.generateUUID();
        tempArr.push(tempObj);
      }
      this.echartDataGroup = tempArr;
      setTimeout(() => {
        this.echartDataInited = true;
      }, 100);
      window.console.log(this.echartDataGroup);
    },
    getEchartMaxValue(ecData) {
      let retVal = null;
      let unsortArr = [];
      ecData.forEach(item => {
        let arr = Object.values(item.vehicleCount);
        unsortArr = unsortArr.concat(arr);
      });
      window.console.log(unsortArr);
      let tempVal = _.max(unsortArr);
      retVal = parseInt(tempVal + tempVal * 0.1);
      return retVal;
    },
    async getVisitedPageList() {
      let flatMenuArr = this.flatMenuDataFunc(menuConfig.children);
      let res = await homeApi.getVisitedPageList();
      let resData = res.data.data;
      resData.forEach(item => {
        let url = "";
        let findIndex = flatMenuArr.findIndex(
          subItem => subItem.code == item.menuEnText
        );
        if (findIndex > -1) {
          url = flatMenuArr[findIndex].url;
        }
        item.url = url;
      });
      this.visitedPageList = resData;
    },
    goVisitedPage(url) {
      window.console.log("uuuuuuuuuuuu");
      window.console.log(url);
      let refreshTm = new Date().getTime();
      let pageUrl = url + "?refreshTm=" + refreshTm;
      this.$router.push(pageUrl);
    },
    download(url, attType) {
      httpService.download(url, {}, { mimeType: attType });
    },
    getHelpFileList() {
      this.$get("/app/user/v1/attachment.list").then(res => {
        console.log('res', res)
        this.helpList = res.data.data;
      });
    },
    flatMenuDataFunc(originMenuArr) {
      let retArr = [];
      originMenuArr.forEach(item => {
        retArr.push({
          code: item.code,
          url: item.url
        });
        if (item.children) {
          const tempArr = this.flatMenuDataFunc(item.children);
          if (tempArr.length >= 1) {
            retArr = [...retArr, ...tempArr];
          }
        }
      });
      return retArr;
    },
    handleAvatarSuccess(res, file) {
      let that = this;
      if (res.code == "0000") {
        Tips.message({
          message: "文档上传成功！" + file.name,
          type: "success"
        });
        that.form.url = res.data;
        that.form.attType = file.raw.type;
      } else {
        Tips.message({
          message: "上传失败！",
          type: "error"
        });
      }
    },

    // handleFileRemove(file, fileList) {
    handleFileRemove() {
      window.console.log("rrrrrrrrrrrrr");
      this.form.url = "";
    },

    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "application/pdf" || file.type === "image/png";
      if (!isJPG) {
        Tips.message({ message: "上传文档只能是 PDF,PNG格式!", type: "error" });
      }
      return isJPG;
    },
    doSubmit() {
      let that = this;
      that.$refs.form.validate(async valid => {
        if (!valid) return;
        if (!that.form.url) {
          Tips.message({
            message: "请先上传文档！",
            type: "error"
          });
          return;
        }
        if (that.type == "add") {
          this.$post("/app/user/v1/attachment.save", that.form).then(res => {
            if (res.data.code == "0000") {
              Tips.message({
                message: "保存成功！",
                type: "success"
              });
              that.getHelpFileList();
              that.showDialog = false;
            } else {
              Tips.message({
                message: "保存失败！",
                type: "error"
              });
            }
          });
        } else {
          this.$put("/app/user/v1/attachment.edit", that.form).then(res => {
            if (res.data.code == "0000") {
              Tips.message({
                message: "保存成功！",
                type: "success"
              });
              that.getHelpFileList();
              that.showDialog = false;
            } else {
              Tips.message({
                message: "保存失败！",
                type: "error"
              });
            }
          });
        }
      });
    },
    doDel(id) {
      this.$confirm("是否要删除此文档！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$delete("/app/user/v1/attachment.delete", { id: id }).then(
            res => {
              if (res.data.code == "0000") {
                Tips.message({ message: "删除成功！", type: "success" });
                this.getHelpFileList();
              }
            }
          );
        })
        .catch(() => {});
    },
    doEdit(id) {
      this.type = "edit";
      this.$get("/app/user/v1/attachment.get", { id: id }).then(res => {
        this.form = res.data.data;
        this.fileList = [{ name: res.data.data.url }];
        this.showDialog = true;
      });
    },
    uploadDialog() {
      this.type = "add";
      this.showDialog = true;
      this.form.url = null;
      this.form.title = null;
      this.form.content = null;
      this.fileList = [];
    },
    closeDialog() {
      this.$refs.form.clearValidate();
    },
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
    },
    generateUUID() {
      function _S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      function _guid() {
        return (
          _S4() +
          _S4() +
          "-" +
          _S4() +
          "-" +
          _S4() +
          "-" +
          _S4() +
          "-" +
          _S4() +
          _S4() +
          _S4()
        );
      }
      return _guid();
    },
    // 关联平台 查看更多
    showMoreLinks() {
      this.showMoreFlag = true;
    }
  },
  created() {
    this.action =
      window[process.env.VUE_APP_PAGE_CONFIG].baseUrl + "/file/v1/upload";
    this.deviceDataList = this.$_.cloneDeep(this.deviceDataOri);
    moment.locale("zh-cn");
    this.startTimer();
    this.getVisitedPageList();
    this.getHelpFileList();
  },
  mounted() {
    window.console.log(this.userInfo);
    this.unitId = this.userInfo.unitId;
    if (this.showStatistics) {
      //获取机构下拉列表
      // this.$api.getUnitTree({}).then(res => {
      //   this.unitData = res.data.data.items;
      // });
      this.getStatisticsData();
    }
  },
  beforeDestroy() {
    this.stopTimer();
  }
};
</script>
<style lang="less" scoped>
.warp {
  .home-row {
    border-bottom: 1px solid #cacaca;
    padding-bottom: 20px;
    margin-bottom: 20px;
    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
      margin-bottom: 0;
    }
    h2 {
      font-size: 14px;
      .upload {
        margin-top: 0;
        float: right;
        font-size: 12px;
        color: #3ae2c4;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
  .el-h2 {
    font-size: 14px;
    margin-bottom: 5px;
    .tip {
      display: inline-block;
      padding: 6px 10px;
      font-size: 12px;
      background: #ecfaf8;
      border: 1px solid #cceee7;
      color: #34b5b5;
    }
  }
  .device-data-wrap {
    padding-top: 10px;
    .item {
      border: 1px solid #cacaca;
      padding: 20px;
      display: flex;
      font-size: 12px;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        border: 1px solid #aaa;
      }
      &:last-child {
        margin-right: 0;
      }
      .item-l {
        flex: 1;
        display: flex;
        align-items: center;
        img {
          display: block;
          width: 30px;
          margin-right: 16px;
        }
      }
    }
  }
  .echart-box {
    margin-top: 12px;
    .echart-head {
      font-size: 12px;
      padding: 10px 20px;
      background: #f5f5f5;
      display: flex;
      span {
        margin-right: 50px;
      }
      span::before {
        content: "";
        display: inline-block;
        width: 22px;
        height: 6px;
        vertical-align: 1px;
        margin-right: 10px;
      }
      span:nth-of-type(1):before {
        background: #00b1ff;
      }
      span:nth-of-type(2):before {
        background: #00e6c3;
      }
      span:nth-of-type(3):before {
        background: #9b80ce;
      }
      span:nth-of-type(4):before {
        background: #f08fc8;
      }
      div {
        flex: 1;
        text-align: right;
      }
    }
  }

  .toggle-data-wrap {
    padding-top: 15px;
  }
  .toggle-data-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    cursor: pointer;
    span {
      font-size: 12px;
      margin-right: 5px;
    }
  }
  .visited-list-wrap {
    .visited-list-ul {
      margin-top: 13px;
    }

    .visited-list-li {
      background: #f3f3f3;
      text-align: center;
      color: #333;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background: #00e3be;
      }
    }
  }
  .link {
    div {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      a {
        width: 50%;
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
  }
  .doc {
    .home-file-list {
      flex-wrap: wrap;
      padding-top: 10px;
      margin: 0 -5px;
      .item-box {
        padding: 5px;
        .item-box-inner {
          padding: 20px 14px 15px;
          border: 1px solid #cacaca;
          font-size: 12px;
        }

        .title {
          cursor: pointer;
          margin-bottom: 10px;
        }
        .txt {
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .btns {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          span {
            cursor: pointer;
            width: 49%;
            padding: 10px 0;
            color: #3ae2c4;
            text-align: center;
            background: #f6f6f6;
          }
          span:hover {
            background: #49e2c4;
            color: #fff;
          }
        }
      }
      .item-box:hover {
        border-color: #49e2c4;
      }
    }
  }
}
/deep/.el-dialog {
  .el-form-item__error {
    left: 95px !important;
  }
  .el-form-item {
    margin-bottom: 18px !important;
  }
  .el-form-item__label {
    line-height: 32px !important;
  }
  .el-input {
    width: 320px !important;
  }
  .el-textarea {
    display: block;
    .el-textarea__inner {
      min-height: 100px !important;
      width: 320px !important;
    }
    .el-input__count {
      bottom: 2px;
      right: 30px;
    }
  }
}
</style>
