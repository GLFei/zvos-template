<!--公用组件：仪表盘图表组件
    /**
    * @desc 组件描述
    * @date 2019年5月20日15:32:00
    * @param {String} [data]    - 数值
    * @param {String} [title]    - 盘图表对应的名称
    * @param {String} [unit]    - 单位
    * @param {Number} [min] - 最小值
    * @param {Number} [max] - 最大值
    */
-->
<template>
  <div class="zv-components">
    <div class="gauge" ref="gauge"></div>
    <span class="title">{{title}}</span>
    <div class="bgc">
      <span class="data">{{chartValue}}</span>
      <span class="unit">{{unit}}</span>
    </div>
    <div></div>
  </div>
</template>

<script>
import echarts from "echarts";
let gaugeOption = {
  tooltip: {
    formatter: "{b} : {c}"
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true }
      //restore : {show: true},
      //saveAsImage : {show: true}
    }
  },
  series: [
    {
      name: "单仪表盘示例", // 系列名称,用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列。
      type: "gauge", // 系列类型
      radius: "80%", // 参数:number, string。 仪表盘半径,默认 75% ，可以是相对于容器高宽中较小的一项的一半的百分比，也可以是绝对的数值。
      center: ["50%", "55%"], // 仪表盘位置(圆心坐标)
      startAngle: 225, // 仪表盘起始角度,默认 225。圆心 正右手侧为0度，正上方为90度，正左手侧为180度。
      endAngle: -45, // 仪表盘结束角度,默认 -45
      clockwise: true, // 仪表盘刻度是否是顺时针增长,默认 true。
      min: 0, // 最小的数据值,默认 0 。映射到 minAngle。
      max: 2500, // 最大的数据值,默认 100 。映射到 maxAngle。
      splitNumber: 10, // 仪表盘刻度的分割段数,默认 10。

      axisLine: {
        // 仪表盘轴线(轮廓线)相关配置。
        show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
        lineStyle: {
          // 仪表盘轴线样式。
          color: [
            [0.35, "#00EBC2"],
            [0.85, "#00A2FF"],
            [1, "#FF5463"]
          ], //仪表盘的轴线可以被分成不同颜色的多段。每段的  结束位置(范围是[0,1]) 和  颜色  可以通过一个数组来表示。默认取值：[[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']]
          opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          width: 4, //轴线宽度,默认 30。
          shadowBlur: 0, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          shadowColor: "#fff" //阴影颜色。支持的格式同color。
        }
      },

      axisTick: {
        // 刻度(线)样式。
        show: true, // 是否显示刻度(线),默认 true。
        splitNumber: 5, // 分隔线之间分割的刻度数,默认 5。
        length: 8, // 刻度线长。支持相对半径的百分比,默认 8。
        lineStyle: {
          // 刻度线样式。
          color: "#999", //线的颜色,默认 #eee。
          opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          width: 1, //线度,默认 1。
          type: "solid", //线的类型,默认 solid。 此外还有 dashed,dotted
          shadowBlur: 10, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          shadowColor: "#fff" //阴影颜色。支持的格式同color。
        }
      },

      axisLabel: {
        // 刻度标签。
        show: false, // 是否显示标签,默认 true。
        distance: 5, // 标签与刻度线的距离,默认 5。
        color: "#fff", // 文字的颜色,默认 #fff。
        fontSize: 12, // 文字的字体大小,默认 5。
        formatter: "{value}" // 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
      },

      splitLine: {
        // 分隔线样式。
        show: true, // 是否显示分隔线,默认 true。
        length: 30, // 分隔线线长。支持相对半径的百分比,默认 30。
        lineStyle: {
          // 分隔线样式。
          color: "#999", //线的颜色,默认 #eee。
          opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
          width: 2, //线度,默认 2。
          type: "dashed", //线的类型,默认 solid。 此外还有 dashed,dotted
          shadowBlur: 0, //(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
          shadowColor: "#fff" //阴影颜色。支持的格式同color。
        }
      },

      pointer: {
        // 仪表盘指针。
        show: true, // 是否显示指针,默认 true。
        length: "70%", // 指针长度，可以是绝对数值，也可以是相对于半径的百分比,默认 80%。
        width: 5 // 指针宽度,默认 8。
      },

      itemStyle: {
        // 仪表盘指针样式。
        color: "auto", // 指针颜色，默认(auto)取数值所在的区间的颜色
        opacity: 1, // 图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
        borderWidth: 0, // 描边线宽,默认 0。为 0 时无描边。
        borderType: "dashed", // 柱条的描边类型，默认为实线，支持 'solid', 'dashed', 'dotted'。
        //borderColor: "#000",    // 图形的描边颜色,默认 "#000"。支持的颜色格式同 color，不支持回调函数。
        shadowBlur: 0 // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
        //shadowColor: "#fff",    // 阴影颜色。支持的格式同color。
      },

      emphasis: {
        // 高亮的 仪表盘指针样式
        itemStyle: {
          //高亮 和正常  两者具有同样的配置项,只是在不同状态下配置项的值不同。
        }
      },

      title: {
        // 仪表盘标题。
        show: true, // 是否显示标题,默认 true。
        offsetCenter: [0, "50%"], //相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
        color: "#8B8B8B", // 文字的颜色,默认 #333。
        fontSize: 20 // 文字的字体大小,默认 15。
      },

      detail: {
        // 仪表盘详情，用于显示数据。
        show: true, // 是否显示详情,默认 true。
        offsetCenter: [0, "50%"], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
        color: "#fff", // 文字的颜色,默认 auto。
        fontSize: 12, // 文字的字体大小,默认 15。
        backgroundColor: "#fff",
        width: 200
        // formatter: "{value}", // 格式化函数或者字符串
        // formatter: function(value) {
        //   return value
        // }
      },

      //   markPoint: {
      //     symbol: "circle",
      //     symbolSize: 8,
      //     data: [
      //       //跟你的仪表盘的中心位置对应上，颜色可以和画板底色一样
      //       { x: "center", y: "center", itemStyle: { color: "#FFF" } }
      //     ]
      //   },

      data: [{ value: "", name: "" }]
    }
  ]
};
export default {
  name: "ZvChartPanel",
  props: {
    data: {},
    title: {
      type: String,
      default() {
        return "加载中";
      }
    },

    name: {
      type: String,
      default() {
        return "加载中";
      }
    },
    // unit: {
    //   type: String,
    //   default() {
    //     return "";
    //   }
    // },
    min: {
      type: Number,
      default() {
        return 0;
      }
    },
    max: {
      type: Number,
      default() {
        return 2500;
      }
    }
  },
  data() {
    return {
      chart: null,
      chartValue: "0",
      unit: "",
      instanceChartOption: {}
    };
  },
  methods: {
    drawGauge() {
      let option = gaugeOption;
      this.chart = echarts.init(this.$refs.gauge, "walden");
      option.series[0].min = this.min;
      option.series[0].max = this.max;
      option.series[0].data[0].value =
        (parseFloat(this.chartValue) > 2500
          ? parseFloat(this.chartValue) / 2500.0
          : parseFloat(this.chartValue)
        ).toFixed(2) - 0;
      option.series[0].data[0].name =
        parseFloat(this.chartValue) > 2500 ? "x100 " : "";
      option.tooltip.formatter = this.title + "<br />{c} {b}";
      this.instanceChartOption = this.$_.cloneDeep(option);
      this.chart.setOption(option, true);
    }
  },
  mounted() {
    this.drawGauge();
  },
  watch: {
    data(val) {
      this.chartValue = (val || "").split(" ")[0] || "0";
      this.unit = (val || "").split(" ")[1] || "";
      this.instanceChartOption.series[0].data[0].value = this.chartValue;
      this.chart.setOption(this.instanceChartOption);
    }
  }
};
</script>

<style lang="sass" scoped>
  .zv-components
    //padding: 0 20px
    width: 280px
    height: 280px
    position: relative
    .gauge
      // border: 1px solid $zvBlue
      // border-radius: 5px
      width: 280px
      height: 280px
    .title
      font-weight: bold
      z-index: 9999
      color: #8B8B8B
      position: absolute
      /*用transform向左（上）平移它自己宽度（高度）的50%，也就达到居中效果了*/
      transform: translate(-50%, -50%)
      left: 50%
      top: 40%
      text-align: center
      display: inline-block
      font-size: 14px
      padding: 8px
    .bgc
      width: 105px;
      height: 30px;
      background-color: #F5F5F5;
      font-size: 14px;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8B8B8B;
      position: absolute;
      -webkit-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      left: 50%;
      top: 89%;
      span
        margin: 0 4px;

</style>
