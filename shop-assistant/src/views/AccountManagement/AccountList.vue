<template>
<div class="list">
  <H2>账户列表</H2>
    <el-table
      ref="multipleTable"
      :data="tableData.slice((currPage-1)*pageSize, currPage*pageSize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="100">
      </el-table-column>
      <el-table-column
        label="账号"
        width="200">
        <template slot-scope="scope">{{ scope.row.account }}</template>
      </el-table-column>
      <el-table-column
        prop="userGroup"
        label="用户组"
        width="200">
      </el-table-column>
      <el-table-column
        prop="ctime"
        label="创建时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        label="操作"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="dialogVisible = true">编辑</el-button>
          <el-dialog
            title="修改账号与用户组"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <div class="ipt">
              <span>账号</span>
              <el-input v-model="edit.account"></el-input>
            </div>
            <div class="ipt">
              <span>用户组</span>
              <el-input v-model="edit.userGroup"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(scope.$index, scope.row)">确 定</el-button>
            </span>
          </el-dialog>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currPage"
        :page-sizes="[5, 2, 3, 4]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
      <div class='btn'>
        <el-button type="danger" @click="batchDelA">批量删除</el-button>
        <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
      </div>
</div>
</template>

<script>
import H2 from '@/components/H2'
export default {
  name: 'AccountList',
  components: {
    H2
  },
  data () {
    return {
      dialogVisible: false,
      edit: {
        account: '',
        userGroup: ''
      },
      // 初始时显示第几页
      currPage: 1,
      // 每一页展示多少条
      pageSize: 5,
      // 数据源
      tableData: [],
      //   批量删除
      batchDel: ''
    }
  },

  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 编辑事件
    async handleEdit (index, row) {
      console.log(index, row)
      const { data } = await this.$http.post('/users/edit', {
        id: row.id,
        account: this.edit.account,
        userGroup: this.edit.userGroup
      })
      if (data.code === 0) {
        this.$message.success('修改成功')
        await this.data()
        this.dialogVisible = false
      } else {
        this.$message.error('输入框不能为空')
      }
    },
    // 删除事件
    async handleDelete (index, row) {
      console.log(index, row)
      await this.$http.get('/users/del', {
        params: {
          id: row.id
        }
      })
      this.tableData = this.tableData.filter(item => item.id !== row.id)
      this.$message.success('删除成功')
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 复选框变化时调用
    handleSelectionChange (val) {
      const arr = []
      val.forEach(item => {
        arr.push(item.id)
      })
      this.batchDel = JSON.stringify(arr)
      console.log(this.batchDel)
    },
    // 获取数据赋给变量tableData
    async data () {
      // 解构赋值给data
      const { data: { data } } = await this.$http.get('/users/list', {
        params: {
          currentPage: 1,
          pageSize: 10000
        }
      })
      // 赋给变量
      this.tableData = data
      console.log(data)
    },
    // 绑定
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currPage = val
    },
    // eslint-disable-next-line vue/no-dupe-keys
    async batchDelA () {
      await this.$http.get('/users/batchdel', {
        params: {
          ids: this.batchDel
        }
      })
      this.$message.success('批量删除成功')
      await this.data()
    }
  },
  mounted () {
    // 页面初始化时展示数据
    this.data()
  }
}
</script>

<style scoped lang="scss">

.list {
  width: 100%;
  height: 100%;
  background: white;
  padding: 0 20px;
  box-sizing: border-box
}
.page{
  margin-top: 20px
}
.btn {
  margin-top: 20px;
  display: flex;
  .el-button{
    margin-left: 20px
  }
}
.ipt {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .el-input{
    width:80%
  }
}
</style>
