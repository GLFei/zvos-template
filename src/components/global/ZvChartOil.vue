<template>
  <div id="chartId" style="width:200px;height:200px;" />
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    oildata:{
      type:String
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.initechart()
  },
  methods: {
    initechart() {
      this.echart = echarts.init(this.$el)
      this.setOptions()
    },
    setOptions(oildata) {
      this.echart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          icon: 'pin',
          orient: 'vertical',
          top: 'center',
          right: '200',
          data: ['累计油耗']
        },
        color: ['#e5f1db', '#00ebc2'],
        series: [
          {
            name: '燃油油位',
            type: 'pie',
            radius: ['50%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                position: 'center'
              }
            },
            data: [
              { value:oildata?100-oildata:100 , name: '剩余油量',
                label: {
                  normal: {
                    formatter: '\n\n油位百分比',
                    textStyle: {
                      color: '#666666',
                      fontSize: 12
                    }
                  }
                }
              }, { value:oildata?oildata:0, name: '累计油耗',
                label: {
                  normal: {
                    formatter: '{d}%\n',
                    textStyle: {
                      color: '#333333',
                      fontSize: 12,
                      fontWeight: '500'
                    }
                  }
                }
              }]
          }
        ]
      })
    }

  },
  watch:{
    oildata(val){
      this.setOptions(val)
    }
  }
}
</script>
