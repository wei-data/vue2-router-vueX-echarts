<template>
  <div class="orderStatistics">
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
  name: 'OrderStatistics',
  data () {
    return {
      value: JSON.stringify(['2019-10-01 00:00:00', '2019-10-10 00:00:00']),
      dataA: []
    }
  },
  methods: {
    // 请求后端有问题
    async PorEcharts () {
      const data = await this.$http.get('/order/ordertotal', {
        params: {
          data: this.value
        }
      })
      console.log(data)
    },
    async charts () {
      axios.defaults.beseURL = ''
      const { data } = await axios.get('/json/tsconfig.json')
      console.log(data)
      // axios.defaults.beseURL = 'http://127.0.0.1:5000'
    }
  },
  // created () {
  //   this.charts()
  // },
  async mounted () {
    const { data: { list } } = await axios.get('/json/tsconfig.json')
    this.dataA = list
    // 初始化 echarts 实例
    const myChart = this.$echarts.init(this.$refs['my-chart'])
    window.addEventListener('resize', function () {
      myChart.resize()
    })
    // 配置项和数据
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: this.dataA.legend
      },
      xAxis: [
        {
          type: 'category',
          data: this.dataA.xAxis,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml'
            }
          },
          data: this.dataA.seriesOne
        },
        {
          name: 'Precipitation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' ml'
            }
          },
          data: this.dataA.seriesTwo
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' °C'
            }
          },
          data: this.dataA.temperature
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.orderStatistics{
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background: white
}
</style>
