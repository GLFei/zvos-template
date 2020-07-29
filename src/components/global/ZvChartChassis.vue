<template>
  <div id="chartId" style="width:500px;height:400px;border: 1px solid #efefef;padding:10px" />
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    yAxisName: {
      type: String,
      default() {
        return "";
      }
    }
  },
  mounted() {
    this.initechart();
  },
  watch: {
    data(newData) {
      this.setOptions();
    }
  },
  methods: {
    initechart() {
      this.echart = echarts.init(this.$el);
      this.setOptions();
    },
    setOptions() {
      let symbolSize = 10;
      this.echart.setOption({
        title: {
          text: this.yAxisName,
          textStyle: {
            fontSize: 14,
            fontStyle: "normal",
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            var data = params.data || [0, 0];
            return "X轴" + data[0].toFixed(1) + "，Y轴" + data[1].toFixed(1);
          },
          backgroundColor: "#FFF",
          padding: [2, 8, 2, 8],
          extraCssText: "box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);",
          textStyle: {
            color: "#4bedd2"
          }
        },
        grid: {
          left: "-36px",
          bottom: "6px",
          containLabel: true
        },
        xAxis: {
          min: 0,
          max: 3.5,
          splitNumber: 6,
          name: "X轴",
          type: "value",
          scale: true,
          gridIndex: 0,
          nameTextStyle: {
            color: "#888"
          },
          axisTick: {
            show: false,
            xAxisIndex: 0
          },
          axisLine: {
            show: true,
            onZro: true,
            lineStyle: {
              color: "#F7F7F7",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            show: true,
            formatter: function(value, index) {
              if (value === 0) {
                return value.toFixed(0);
              } else {
                return value.toFixed(1);
              }
            },
            textStyle: {
              color: "#888"
            }
          },
          splitLine: {
            show: true,
            scale: true,
            lineStyle: {
              color: ["#F7F7F7"],
              width: 2,
              type: "solid"
            }
          }
        },
        yAxis: {
          name: "Y轴",
          min: 0,
          max: 3.5,
          type: "value",
          nameTextStyle: {
            color: "#888"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#F7F7F7",
              width: 1 //这里是为了突出显示加上的
            }
          },
          axisLabel: {
            show: true,
            formatter: function(value, index) {
              if (value === 0) {
                return;
              } else {
                return value.toFixed(1);
              }
            },
            textStyle: {
              color: "#888"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#F7F7F7"],
              width: 2,
              type: "solid"
            }
          }
        },
        series: [
          {
            id: "chartChassis",
            type: "scatter",
            smooth: true,
            symbolSize: symbolSize,
            data: this.data,
            itemStyle: {
              normal: {
                color: "#F9F9F9",
                borderColor: "#00ebc2",
                borderWidth: 2
              }
            }
          }
        ]
      });
    }
  }
};
</script>

