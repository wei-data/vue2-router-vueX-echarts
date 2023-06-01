<template>
<div class="chart">
  <div ref="my-chart" style="width: 100%;height:100%;"></div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LineChart',
  computed: {
    ...mapState(['echarts'])
  },
  mounted () {
    // 初始化 echarts 实例
    const myChart = this.$echarts.init(this.$refs['my-chart'])
    window.addEventListener('resize', function () {
      myChart.resize()
    })
    // 配置项和数据
    const option = {
      title: {
        text: '数据统计',
        top: 40,
        left: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['订单', '销售额', '注册人数', '管理员人数'],
        top: 50
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '20%',
        bottom: '5%',
        containLabel: true
      },
      // 右上角的下载图标
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.echarts.xData
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: true
        }
      },
      series: [
        {
          name: '订单',
          type: 'line',
          stack: 'Total',
          data: this.echarts.amountData,
          color: '#c53e3a'
        },
        {
          name: '注册人数',
          type: 'line',
          stack: 'Total',
          data: this.echarts.orderData,
          color: '#6aa6ad'
        },
        {
          name: '管理员人数',
          type: 'line',
          stack: 'Total',
          data: this.echarts.amountData,
          color: '#d48265'
        },
        {
          name: '销售额',
          type: 'line',
          stack: 'Total',
          data: this.echarts.orderData,
          color: '#394e5c'
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。.
    myChart.setOption(option)
  }
}
</script>

<style scoped>
.chart {
  height: 650px;
  width: 100%;
  background: white;
  margin-top: 30px;
}
</style>
