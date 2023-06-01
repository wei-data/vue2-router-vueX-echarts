<template>
  <div class="table">
    <el-table
      :data="tableData.slice((currPage-1)*pageSize, currPage*pageSize)"
      border
      max-height="580"
      style="width: 100%">
      <el-table-column
        fixed
        prop="orderNo"
        label="订单号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="下单时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="consignee"
        label="收货人"
        width="150">
      </el-table-column>
      <el-table-column
        prop="deliverAddress"
        label="配送地点"
        width="300">
      </el-table-column>
      <el-table-column
        prop="deliveryTime"
        label="送达时间"
        width="150">
      </el-table-column>
      <el-table-column
        prop="id"
        label="用户备注"
        width="150">
      </el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
        width="150">
      </el-table-column>
      <el-table-column
        prop="orderState"
        label="订单状态"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="">
          <el-button @click="centerDialogVisible = true" type="text" size="small">查看</el-button>
<!--          <el-dialog-->
<!--            title="提示"-->
<!--            :visible.sync="centerDialogVisible"-->
<!--            width="30%"-->
<!--            center>-->
<!--            <span>需要注意的是内容是默认不居中的</span>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--              <el-button @click="centerDialogVisible = false">取 消</el-button>-->
<!--              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>-->
<!--            </span>-->
<!--          </el-dialog>-->
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currPage"
      :page-sizes="[3, 5, 10, 15]"
      background
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
<!--    <p>{{this.$store.state.proList}}</p>-->
  </div>
</template>

<script>
export default {
  name: 'TableA',
  methods: {
    handleClick (row) {
      this.dialogVisible = false
      console.log(row)
    },
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currPage = val
    },
    // 弹框
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  data () {
    return {
      tableData: this.$store.state.proList || [],
      currPage: 1,
      pageSize: 10,
      centerDialogVisible: false
    }
  },
  mounted () {
  //   this.$store.commit('proList', this.$store.state.proList)
    this.$store.dispatch('proList')
    this.tableData = this.$store.state.proList
  }
}
</script>

<style scoped>
.table {
  padding: 20px;
  box-sizing: border-box;
}
.el-pagination{
  margin-top: 20px;
}
</style>
