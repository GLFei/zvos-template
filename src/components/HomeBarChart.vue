<template>
  <div class="home-chart-ins" ref="home-chart-ins"></div>
</template>

<script>
import * as echarts from "echarts";
import _ from "lodash";

const seriesDefaultOption = {
  z: 2,
  data: [],
  name: "",
  type: "bar",
  label: {

  },
  barGap: 0,
  large: false,
  zlevel: 0,
  emphasis: {
    label: {}
  },
  itemStyle: {},
  barWidth: 15,
  barMaxWidth: 40,
  barMinAngle: 0,
  progressive: 3000,
  barMinHeight: 0,
  largeThreshold: 400,
  legendHoverLink: true,
  coordinateSystem: "cartesian2d",
  progressiveChunkMode: "mod"
}

export default {
  name: "HomeBarChart",
  props: {
    chartData: Array,
    maxValue: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      echartInstance: null,
      optionOri: {
        grid: [
          {
            z: 0,
            top: "40px",
            left: "20px",
            show: false,
            right: "20px",
            bottom: "5px",
            zlevel: 0,
            borderColor: "#ccc",
            borderWidth: 1,
            containLabel: true,
          }
        ],
        color: ["#00b1ff", "#00e6c3", "#9b80ce", "#f08fc8"],
        title: [
          {
            z: 6,
            top: 0,
            left: 0,
            show: false,
            text: "未命名",
            right: null,
            bottom: null,
            target: "blank",
            zlevel: 0,
            itemGap: 10,
            padding: 5,
            subtext: "",
            subtarget: "blank",
            textStyle: {
              color: "#333",
              fontSize: 18,
              fontWeight: "bolder"
            },
            borderColor: "#ccc",
            borderWidth: 0,
            subtextStyle: {
              color: "#aaa"
            },
            backgroundColor: "rgba(0,0,0,0)"
          }
        ],
        calculable: true,
        xAxis: [
          {
            z: 0,
            data: [],
            name: "",
            show: true,
            type: "category",
            offset: 0,
            silent: false,
            zlevel: 0,
            inverse: false,
            nameGap: 15,
            tooltip: {
              show: false
            },
            axisLine: {
              show: true,
              onZero: true,
              symbol: ["none", "none"],
              lineStyle: {
                type: "solid",
                color: "#CBCBCB",
                width: 1
              },
              symbolSize: [10, 15],
              onZeroAxisIndex: null
            },
            axisTick: {
              show: false,
              inside: false,
              length: 5,
              interval: "auto",
              lineStyle: {
                width: 1
              },
              alignWithLabel: false
            },
            rangeEnd: null,
            axisLabel: {
              show: true,
              inside: false,
              interval: 1,
              margin: 8,
              rotate: 0,
              fontSize: 12,
              interval: 0,
              showMaxLabel: null,
              showMinLabel: null,
              color: "#333"
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: "solid",
                color: ["#687E88"],
                width: 1
              }
            },
            nameRotate: null,
            rangeStart: null,
            axisPointer: {},
            boundaryGap: true,
            nameLocation: "end",
            nameTruncate: {
              ellipsis: "...",
              maxWidth: null,
              placeholder: "."
            },
            triggerEvent: false,
            deduplication: null,
            nameTextStyle: {}
          }
        ],
        yAxis: [
          {
            z: 0,
            name: "",
            show: true,
            type: "value",
            offset: 0,
            silent: false,
            zlevel: 0,
            inverse: false,
            nameGap: 15,
            tooltip: {
              show: false
            },
            axisLine: {
              show: true,
              onZero: true,
              symbol: ["none", "none"],
              lineStyle: {
                type: "solid",
                color: "#D5D5D5",
                width: 1
              },
              symbolSize: [10, 15],
              onZeroAxisIndex: null
            },
            axisTick: {
              show: true,
              inside: false,
              length: 5,
              lineStyle: {
                width: 1,
                color: "#D5D5D5"
              }
            },
            rangeEnd: null,
            axisLabel: {
              show: true,
              inside: false,
              margin: 8,
              rotate: 0,
              fontSize: 12,
              showMaxLabel: null,
              showMinLabel: null,
              color: "#333"
            },
            splitArea: {
              show: false,
              areaStyle: {
                color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"]
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: ["#EAEAEA"],
                width: 1
              }
            },
            nameRotate: null,
            rangeStart: null,
            axisPointer: {},
            boundaryGap: [0, 0],
            splitNumber: 5,
            nameLocation: "end",
            nameTruncate: {
              ellipsis: "...",
              maxWidth: null,
              placeholder: "."
            },
            triggerEvent: false,
            nameTextStyle: {}
          }
        ],
        legend: [
          {
            x: "right",
            z: 4,
            top: 0,
            data: [],
            left: "right",
            show: false,
            align: "auto",
            right: null,
            bottom: null,
            orient: "vertical",
            zlevel: 0,
            itemGap: 10,
            padding: 5,
            tooltip: {
              show: false
            },
            selected: {},
            itemWidth: 25,
            textStyle: {
              color: "#333"
            },
            itemHeight: 14,
            borderColor: "#ccc",
            borderWidth: 0,
            borderRadius: 0,
            selectedMode: true,
            inactiveColor: "#ccc",
            backgroundColor: "rgba(0,0,0,0)"
          }
        ],
        series: [],
        useUTC: false,
        tooltip: [
          {
            z: 60,
            show: true,
            zlevel: 0,
            confine: false,
            padding: 10,
            trigger: "axis",
            enterable: false,
            hideDelay: 100,
            showDelay: 0,
            textStyle: {
              color: "#fff",
              fontSize: 14
            },
            triggerOn: "mousemove|click",
            renderMode: "auto",
            axisPointer: {
              axis: "auto",
              type: "shadow",
              animation: "auto",
              crossStyle: {
                type: "dashed",
                color: "#999",
                width: 1,
                textStyle: {}
              },
              animationEasingUpdate: "exponentialOut",
              animationDurationUpdate: 200
            },
            borderColor: "#333",
            borderWidth: 0,
            displayMode: "single",
            showContent: true,
            borderRadius: 4,
            extraCssText: "",
            backgroundColor: "rgba(50,50,50,0.7)",
            alwaysShowContent: false,
            transitionDuration: 0.4
          }
        ],
        animation: "auto",
        textStyle: {
          fontSize: 12,
          fontStyle: "normal",
          fontFamily: "sans-serif",
          fontWeight: "normal"
        },
        axisPointer: [
          {
            z: 50,
            link: [],
            show: "auto",
            snap: false,
            type: "line",
            label: {
              show: true,
              color: "#fff",
              margin: 3,
              padding: [5, 7, 5, 7],
              formatter: null,
              precision: "auto",
              shadowBlur: 3,
              borderColor: null,
              borderWidth: 0,
              shadowColor: "#aaa",
              backgroundColor: "auto"
            },
            value: null,
            handle: {
              icon:
                "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z",
              show: false,
              size: 45,
              color: "#333",
              margin: 50,
              throttle: 40,
              shadowBlur: 3,
              shadowColor: "#aaa",
              shadowOffsetX: 0,
              shadowOffsetY: 2
            },
            status: null,
            zlevel: 0,
            animation: null,
            lineStyle: {
              type: "solid",
              color: "#aaa",
              width: 1
            },
            triggerOn: null,
            shadowStyle: {
              color: "rgba(150,150,150,0.3)"
            },
            triggerTooltip: true,
            animationDurationUpdate: 200
          }
        ],
        progressive: 400,
        gradientColor: ["#f6efa6", "#d88273", "#bf444c"],
        animationEasing: "exponentialOut",
        backgroundColor: "rgba(255,255,255,0)",
        animationDuration: 1000,
        animationThreshold: 2000,
        hoverLayerThreshold: 3000,
        progressiveThreshold: 3000,
        animationEasingUpdate: "cubicOut",
        animationDurationUpdate: 300
      }
    }
  },
  methods: {
    setEchartOption() {
      let seriesTypes = [
        {
          text: "接入数量",
          key: "total"
        },
        {
          text: "在线数量",
          key: "online"
        },
        {
          text: "工作数量",
          key: "working"
        },
        {
          text: "已锁数量",
          key: "locked"
        }
      ]

      let seriesArr = []
      seriesTypes.forEach(item => {
        let seriesOption = _.cloneDeep(seriesDefaultOption);
        seriesOption.name = item.text
        seriesOption.data = this.chartData.map(subItem => subItem.vehicleCount[item.key])
        // seriesOption.data = [100, 90, 80, 70, 50, 20]
        seriesArr.push(seriesOption)
      })

      let customOption = {
        color: ["#37A2DA"],
        backgroundColor: "#fff",
        legend: [{
          data: seriesTypes.map(item => item.text)
        }],
        xAxis: [
          {
            max: 5,
            data: this.chartData.map(item => item.vehicleTypeName)
          }
        ],
        yAxis: [
          {
            max: this.maxValue,
            name: "（台）"
          }
        ],
        series: seriesArr
      }
      let chartOption = _.merge({}, this.optionOri, customOption)
      this.echartInstance.setOption(chartOption);
    },


  },
  mounted() {
    let vm = this;
    let chartDiv = vm.$refs["home-chart-ins"];
    vm.echartInstance = echarts.init(chartDiv);
    this.setEchartOption();
  }
}
</script>

<style lang="less" scoped>
  .home-chart-ins {
    width: 100%;
    height: 250px;
  }
</style>
