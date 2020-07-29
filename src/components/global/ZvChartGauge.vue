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
  </div>
</template>

<script>
  import echarts from 'echarts'
  let gaugeOption = {
    tooltip : {
      formatter: "{b} : {c}"
    },
    toolbox: {
      show : true,
      feature : {
        mark : {show: true},
        //restore : {show: true},
        //saveAsImage : {show: true}
      }
    },
    series : [
      {
        //name:'业务指标',
        type:'gauge',
        splitNumber: 10,       // 分割段数，默认为5
        min: -40,
        max: 100,
        axisLine: {            // 坐标轴线
          lineStyle: {       // 属性lineStyle控制线条样式
            color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']],
            width: 8
          }
        },
        axisTick: {            // 坐标轴小标记
          splitNumber: 10,   // 每份split细分多少段
          length :12,        // 属性length控制线长
          lineStyle: {       // 属性lineStyle控制线条样式
            color: 'auto'
          }
        },
        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: 'auto'
          }
        },
        splitLine: {           // 分隔线
          show: true,        // 默认显示，属性show控制显示与否
          length :30,         // 属性length控制线长
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: 'auto'
          }
        },
        pointer : {
          width : 5
        },
        title : {
          show : true,
          offsetCenter: [0, '-30%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            fontWeight: 'bolder',
            fontSize: 14,
          }
        },
        detail : {
          formatter:'{value}',
          offsetCenter: [0, '60%'],       // x, y，单位px
          textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
            color: 'auto',
            fontSize: 20,
            fontWeight: 'bolder'
          }
        },
        data:[{value: 50, name: ''}]
      }
    ]
  };
  export default {
    name: "ZvChartGauge",
    props: {
      data: {
        type: String,
        default() {
          return '0'
        }
      },
      title: {
        type: String,
        default() {
          return '加载中'
        }
      },
      unit: {
        type: String,
        default() {
          return ''
        }
      },
      min: {
        type: Number,
        default() {
          return 0
        }
      },
      max: {
        type: Number,
        default() {
          return 100
        }
      }
    },
    data() {
      return {
        chart: null
      }
    },
    methods: {
      drawGauge() {
        let option = gaugeOption
        this.chart = echarts.init(this.$refs.gauge,'walden')
        option.series[0].min = this.min
        option.series[0].max = this.max
        option.series[0].data[0].value = (parseFloat(this.data)>100?parseFloat(this.data)/100.0:parseFloat(this.data)).toFixed(2) - 0
        option.series[0].data[0].name = parseFloat(this.data)>100? ('x100 ' + this.unit):this.unit
        option.tooltip.formatter = this.title + "<br />{c} {b}"
        this.chart.setOption(option, true);
      }
    },
    mounted() {
      this.drawGauge()
    }
  }
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
      color: $zvDarkGrey
      position: absolute
      /*用transform向左（上）平移它自己宽度（高度）的50%，也就达到居中效果了*/
      transform: translate(-50%, -50%)
      left: 50%
      top: 85%
      text-align: center
      display: inline-block
      font-size: 12px
      background-color: #efefef
      padding: 8px
</style>