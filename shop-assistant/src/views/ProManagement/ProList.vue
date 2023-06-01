<template>
  <div class="list">
    <h2>商品列表</h2>
    <el-table
      :data="tableData.slice((currPage-1)*pageSize, currPage*pageSize)"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品id">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <span>{{ props.row.imgUrl }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="name">
      </el-table-column>
      <el-table-column
        label="商品分类"
        prop="category">
      </el-table-column>
      <el-table-column
        label="商品价格"
        prop="price">
      </el-table-column>
      <el-table-column
        label="商品图片">
        <template slot-scope="data">
          <img :src="data.imgUrl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        label="商品描述"
        prop="goodsDesc">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-form class="edit" ref="from">
              <el-form-item label="商品名称"><el-input v-model="from.name" l placeholder="请输入内容"></el-input></el-form-item>
              <el-form-item label="商品分类"><el-input v-model="from.category" l placeholder="请输入内容"></el-input></el-form-item>
              <el-form-item label="商品价格"><el-input v-model="from.price" l placeholder="请输入内容"></el-input></el-form-item>
              <el-form-item label="商品图片地址"><el-input v-model="from.imgUrl" l placeholder="请输入内容"></el-input></el-form-item>
              <el-form-item label="商品描述"><el-input v-model="from.goodsDesc" l placeholder="请输入内容"></el-input></el-form-item>
              <el-form-item><el-button type="primary" @click="edit(scope.row.id, from)">确认编辑</el-button></el-form-item>
            </el-form>
            <el-button type="primary" size="small" slot="reference" class="btn">编辑</el-button>
          </el-popover>
          <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="page"
      :current-page="currPage"
      :page-sizes="[3, 5, 10, 15]"
      background
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ProList',
  data () {
    return {
      tableData: [],
      currPage: 1,
      pageSize: 9,
      loading: true,
      visible: false,
      from: {
        name: '',
        category: '',
        price: '',
        imgUrl: '',
        goodsDesc: '',
        id: ''
      }
    }
  },
  methods: {
    // 获取列表数据并赋予到tableData中
    async list () {
      console.log(this.$http)
      const { data: { data: list } } = await this.$http.get('/goods/list', {
        params: {
          currentPage: '1',
          pageSize: '1000000'
        }
      })
      console.log(list)
      // 给列表数据赋给本地变量
      this.tableData = list
    },
    handleSizeChange (val) {
      console.log(val)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(val)
      this.currPage = val
    },
    // 编辑对话框
    async edit (id, from) {
      this.visible = false
      const state = await this.$http.post('/goods/edit', {
        id,
        name: this.from.name,
        category: this.from.category,
        price: this.from.price,
        imgUrl: this.from.imgUrl,
        goodsDesc: this.from.goodsDesc
      })
      if (state.data.code === 0) {
        this.$message({
          message: '成功的修改了这条数据',
          type: 'success'
        })
        await this.list()
      } else {
        this.$message.error('错了哦，请重试')
      }
      // this.$refs[from].resetFields()
    },
    // 删除数据
    handleDelete (index, row) {
      // console.log(index, row)
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(async () => {
        loading.close()
        const { data: { code: del } } = await this.$http.get('/goods/del', { params: { id: row.id } })
        if (del === 0) {
          await this.list()
        }
      }, 500)
    }
  },
  mounted () {
    this.list()
  }
}
</script>

<style scoped lang="scss">
.list {
  padding: 0 20px;
  box-sizing: border-box;
  background: white;
  height: 100%;
  h2 {
    text-align: left;
    font-weight: 500;
    padding: 20px;
    box-sizing: border-box;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.page{
  margin-top: 40px;
}
.el-table {
  height: 650px;
  overflow-y: scroll;
}
.demo-table-expand[data-v-d612967c] {
  padding: 0 50px;
  box-sizing: border-box;
}
.el-table::before{
  height: 0;
}
.edit {
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  .el-form-item {
    display: flex;
    justify-content: right;
    .btn{
      padding: 9px 15px;
    }
  }
}
</style>
