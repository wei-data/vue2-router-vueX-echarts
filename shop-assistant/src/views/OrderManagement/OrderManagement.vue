<template>
 <div class="order">
   <el-row>
     <el-col :span="6">
       <p>订单号</p>
       <el-input
         placeholder="订单号"
         v-model="orderNo"
         clearable>
       </el-input>
     </el-col>
     <el-col :span="5">
       <p>收货人</p>
       <el-input
         placeholder="收货人"
         v-model="consignee"
         clearable>
       </el-input>
     </el-col>
     <el-col :span="5">
       <p>手机号</p>
       <el-input
         placeholder="手机号"
         v-model="phone"
         clearable>
       </el-input>
     </el-col>
     <el-col :span="6">
       <p>手机号</p>
       <el-select v-model="orderState" clearable placeholder="请选择">
         <el-option
           v-for="item in options"
           :key="item.value"
           :label="item.label"
           :value="item.value">
         </el-option>
       </el-select>
     </el-col>
     <el-col :span="8">
       <p>选择时间</p>
         <el-date-picker
           v-model="date"
           type="daterange"
           format="yyyy-MM-dd HH:mm:ss"
           value-format="yyyy-MM-dd HH:mm:ss"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
         </el-date-picker>
     </el-col>
     <el-col :span="2">
       <el-button type="primary" @click="request">查询</el-button>
     </el-col>
   </el-row>
   <TableA></TableA>
 </div>
</template>

<script>
import { mapMutations } from 'vuex'
import TableA from '@/views/OrderManagement/Table.vue'
export default {
  name: 'OrderManagement',
  components: {
    TableA
  },
  computed: {
    ...mapMutations(['proList'])
  },
  data () {
    return {
      orderNo: '',
      consignee: '',
      phone: '',
      orderState: '',
      date: '',
      options: [{
        value: '已受理',
        label: '已受理'
      }, {
        value: '派送中',
        label: '派送中'
      }, {
        value: '已完成',
        label: '已完成'
      }]
    }
  },
  methods: {
    async request () {
      const { data: { data } } = await this.$http.get('/order/search', {
        params: {
          currentPage: 1,
          pageSize: 1000000,
          orderNo: this.orderNo,
          consignee: this.consignee,
          phone: this.phone,
          orderState: this.orderState,
          date: this.date
        }
      })
      console.log(data)
      this.$store.commit('proList', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.order{
  background: white;
  height: 100%;
}
.el-row{
  padding-top: 30px;
}
.el-col {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-bottom: 20px;
  p {
    width: 130px;
  }
  ::v-deep .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 450px;
  }
}
</style>
