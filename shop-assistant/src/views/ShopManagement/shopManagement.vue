<template>
  <div class="shop">
    <h2>店铺管理 <el-button type="primary" @click="submitForm">保存</el-button></h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告" prop="desc" style="height: 100px">
        <el-input type="textarea" v-model="ruleForm.bulletin" style="height: 100%"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像" prop="region">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar" alt="">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片" required>
<!--        :file-list="ruleForm.pics"-->
        <el-upload
          action="http://localhost:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费用">
        <el-input v-model="ruleForm.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-input  v-model="ruleForm.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-input  v-model="ruleForm.score"></el-input>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="ruleForm.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="ruleForm.supports">
          <el-checkbox label="在线支付满28减5" name="type"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
          <el-checkbox label="特价饮品八折抢购" name="type"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="ruleForm.date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'shopManagement',
  data () {
    return {
      // 图片墙中的变量
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      // 提交中的数据
      ruleForm: {
        // 店铺名称
        name: '',
        // 公告
        bulletin: '',
        // 头像的地址
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellCount: '',
        supports: [],
        // 店铺图片0.3
        pics: [],
        date: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        minPrice: ''
      },
      rules: {
        // 条件提示（可有可无）
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // // 点击提交修改店铺信息
    async submitForm () {
      const { data } = await this.$http.post('/shop/edit', {
        id: 1,
        // 店铺名称
        name: this.ruleForm.name,
        // 公告
        bulletin: this.ruleForm.bulletin,
        // 头像的地址
        avatar: this.ruleForm.avatar,
        deliveryPrice: this.ruleForm.deliveryPrice,
        deliveryTime: this.ruleForm.deliveryTime,
        description: this.ruleForm.description,
        score: this.ruleForm.score,
        sellCount: this.ruleForm.sellCount,
        supports: this.ruleForm.supports,
        // 店铺图片
        pics: this.ruleForm.pics,
        date: this.ruleForm.date,
        minPrice: this.ruleForm.minPrice
      })
      console.log(data)
    },
    // 重置内容
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 图片地址付给变量imageUrl
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 店铺头像图片
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg' && 'image/png'
      // const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG
    },
    // 内置的一个删除图片的一个函数
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    // 内置地址赋值的函数
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 获取店铺的详细信息
    async form () {
      const { data: { data } } = await this.$http.get('/shop/info')
      this.ruleForm = data
      console.log(data)
    }
  },
  created () {
    // 初始化调用一次
    this.form()
  },
  mounted  () {
    // console.log(this.pics)
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
.shop {
  width: 100%;
  background: white;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-form {
  overflow-y: scroll;
  height: 700px
}
::v-deep .el-form-item__content{
  margin-left: 0!important
}
/*宽度限制*/
.el-form-item {
  width: 600px;
  display: flex
}
/*店铺头像的样式*/
::v-deep .el-textarea__inner{
  height: 100px
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/**/
</style>
