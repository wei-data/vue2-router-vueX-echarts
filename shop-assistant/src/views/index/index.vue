<template>
  <div class="index">
    <el-row :gutter="24">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span class="el-icon-orange"></span>
          <div>
            <h3>总订单</h3>
            <p>{{series.total}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span class="el-icon-document"></span>
          <div>
            <h3>总订单</h3>
            <p>{{series.sales}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span class="el-icon-document-add"></span>
          <div>
            <h3>总订单</h3>
            <p>{{series.OrderNumber}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <span class="el-icon-potato-strips"></span>
          <div>
            <h3>总订单</h3>
            <p>{{series.todaySales}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <LineChart></LineChart>
  </div>
</template>

<script>
import LineChart from '@/views/index/LineChart.vue'
export default {
  name: 'indexA',
  components: {
    LineChart
  },
  data () {
    return {
      series: {
        total: 154,
        sales: 158,
        OrderNumber: 5488,
        todaySales: 5984
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  justify-content: center;
}
.bg-purple {
  padding: 30px;
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 70px;
  }
}
</style>
