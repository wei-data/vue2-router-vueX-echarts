<template>
  <div class="proStatistics">
    <div>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary" style="margin-left: 10px">查询</el-button>
    </div>
    <div ref="my-chart" style="width: 100%;height:700px;margin-top: 20px;"></div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProStatistics',
  data () {
    return {
      value: '',
      dataA: []
    }
  },
  // async created () {
  //   const { data: { data } } = await axios.get('/json/tsconfig.json')
  //   console.log(data)
  //   this.dataA = data
  // },
  async mounted () {
    axios.defaults.baseURL = ''
    const { data: { data } } = await axios.get('/json/tsconfig.json')
    this.dataA = data
    // axios.defaults.beseURL = 'http://127.0.0.1:5000'
    // 初始化 echarts 实例
    const myChart = this.$echarts.init(this.$refs['my-chart'])
    window.addEventListener('resize', function () {
      myChart.resize()
    })
    // 配置项和数据
    const option = {
      title: {
        text: this.dataA.title
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: this.dataA.legend
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.dataA.xAxis
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.dataA.seriesOne
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.dataA.seriesTwo
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.dataA.seriesThree
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.dataA.seriesFour
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: this.dataA.seriesFive
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.proStatistics {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: white
}
</style>
