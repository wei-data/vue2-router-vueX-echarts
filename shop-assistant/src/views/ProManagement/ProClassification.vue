<template>
<div class="classification">
<!--  商品分类-->
  <h2>商品分类 <el-button type="primary" @click="dialogVisible = true">添加分类</el-button></h2>
<!--  对话框区域-->
  <el-dialog
    title="添加分类"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-input v-model="add.cateName"></el-input>
    <el-tooltip>
      <el-switch
        v-model="add.state"
        active-color="#13ce66"
        inactive-color="#ff4949"
        :active-value="1"
        :inactive-value="0">
      </el-switch>
    </el-tooltip>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addClassification">确 定</el-button>
    </span>
  </el-dialog>

<!--  表格区域-->
  <el-table
    :data="tableData.slice((currPage-1)*pageSize, currPage*pageSize)"
    style="width: 100%; height: 600px; overflow-y: scroll; margin-bottom: 20px">
    <el-table-column
      label="序号"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="商品分类"
      width="300">
      <template slot-scope="scope">
        <!-- 编辑状态下显示 -->
        <el-input
          v-if="isShow[scope.$index]"
          type="text"
          size="mini"
          clearable
          v-model.trim="scope.row.cateName"
        />
        <!-- 展示状态下显示 -->
        <span v-if="!isShow[scope.$index]">{{ scope.row.cateName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="是否启用"
      width="250">
      <template slot-scope="scope">
<!--        开关控件-->
        <el-tooltip :content="'Switch value: ' + scope.row.state" placement="top">
          <el-switch
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0">
          </el-switch>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="操作">
<!--      操作控件-->
      <template slot-scope="scope">
        <el-button
          v-if="isShow[scope.$index]"
          size="mini"
          type="success"
          icon="el-icon-check"
          @click="handelCheck(scope.$index, scope.row)"
        />
        <el-button
          v-if="!isShow[scope.$index]"
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index)"
        />
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currPage"
    background
    :page-sizes="[10, 4, 6, 20]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableData.length">
  </el-pagination>
</div>
</template>

<script>

export default {
  name: 'ProClassification',
  data () {
    return {
      // 接受数据源
      tableData: [],
      // 是否显示添加分类对话框
      dialogVisible: false,
      // 控制参数表格输入显示
      isShow: [],
      //   添加商品数据
      add: {
        // 状态
        state: true,
        // 分类标题数据
        cateName: ''
      },
      // 分页
      pageSize: 10,
      currPage: 1
    }
  },
  methods: {
    // 添加分类时，如果取消添加就弹出此框确认关闭
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          // 执行退出函数
          done()
        })
        .catch(_ => {
        })
    },
    // 修改事件
    /**
     * @description: 编辑单行数参数
     * @return void
     * @param index
     */
    handleEdit (index) {
      console.log(index, 1)
      this.$set(this.isShow, index, true)
    },

    /**
     * @description: 保存单行参数
     * @return void
     * @param index
     * @param row
     */
    async handelCheck (index, row) {
      console.log(row)
      const { data: { code: edit } } = await this.$http.post('/goods/editcate', {
        id: row.id,
        cateName: row.cateName,
        state: row.state
      })
      console.log(edit)
      this.$set(this.isShow, index, false)
      if (edit === 0) {
        this.$message.success('更改成功')
        await this.data()
      } else {
        this.$message.error('需要打开开关才能更改')
      }
    },
    // 确认成功
    submit (index, row) {
      console.log(index, row)
      this.flag = !this.flag
    },
    // 点击删除按钮执行函数
    async handleDelete (row) {
      // 发送一个删除的请求
      await this.$http.get('/goods/delcate', {
        params: {
          id: row.id
        }
      })
      // 发出请求给一个提示语
      this.$message.success('删除成功')
      // 过滤掉删除的那一条数据
      this.tableData = this.tableData.filter(item => item.id !== row.id)
    },
    // 获取列表数据并赋予到tableData中
    async data () {
      // 获取数据
      const { data: { data } } = await this.$http.get('/goods/catelist', {
        params: {
          currentPage: 1,
          pageSize: 11515151
        }
      })
      // 给列表数据赋给本地变量
      this.tableData = data
      console.log(data)
    },
    // 添加商品
    async addClassification () {
      this.dialogVisible = false
      // 获取数据
      const { data } = await this.$http.post('/goods/addcate', {
        cateName: this.add.cateName,
        state: this.add.state
      })
      console.log(data)
      // 判断是否成功
      if (data.code === 0) {
        // 创建一个加载动画
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // 做一个定时器来结束此动画
        setTimeout(async () => {
          loading.close()
          // 从新调用数据来成功显示出数据
          await this.data()
          // 给你个添加成功的动画
          this.$message.success('需要打开开关才能添加成功哦！！')
        }, 500)
      } else if (data.code === 5001) {
        // 如果参数错误执行一个提示的警报语
        this.$message.error('需要打开开关才能添加成功哦！！')
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currPage = val
    }
  },
  mounted () {
    // 初始化时获取数据
    this.data()
  }
}
</script>

<style scoped>
h2 {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-weight: 500;
  text-align: left;
  border-bottom: 1px solid #d3d9e1;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}
.classification {
  width: 100%;
  height: 100%;
  background: white;
  padding: 0 20px;
  box-sizing: border-box;
}
::v-deep .el-table::before{
  height: 0;
}
</style>
