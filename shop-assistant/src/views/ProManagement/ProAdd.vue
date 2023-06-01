<template>
<div class="add">
  <H2>添加商品</H2>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.category" placeholder="请选择活动区域">
        <el-option label="火锅" value="火锅"></el-option>
        <el-option label="盖浇饭" value="盖浇饭"></el-option>
        <el-option label="烧烤" value="烧烤"></el-option>
        <el-option label="西餐" value="西餐"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-input-number v-model="ruleForm.price" @change="handleChange" :min="1" label="描述文字"></el-input-number>
    </el-form-item>
    <el-form-item label="即时配送" prop="delivery">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:5000/goods/goods_img_upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="活动形式" prop="desc">
      <el-input style="width: 300px" type="textarea" v-model="ruleForm.goodsDesc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import H2 from '@/components/H2'

export default {
  name: 'ProAdd',
  components: {
    H2
  },
  data () {
    return {
      ruleForm: {
        name: '',
        category: '',
        price: '',
        imageUrl: '',
        goodsDesc: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post('/goods/add', {
            name: this.ruleForm.name,
            category: this.ruleForm.category,
            price: String(this.ruleForm.price),
            imgUrl: this.ruleForm.imageUrl,
            goodsDesc: this.ruleForm.goodsDesc
          })
          console.log(data.code)
          if (data.code === 0) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
              loading.close()
              // this.$message({
              //   message: '恭喜你，这是一条成功消息',
              //   type: 'success'
              // });
              this.$message.success('添加成功，至列表最后')
            }, 2000)
          } else {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setTimeout(() => {
              loading.close()
              // this.$message({
              //   message: '恭喜你，这是一条成功消息',
              //   type: 'success'
              // });
              this.$message.error('对不起，需要全部填入才能添加成功')
            }, 2000)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 价钱函数
    handleChange (value) {
      console.log(value)
    },
    // 重置函数
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.ruleForm.imageUrl)
    },
    beforeAvatarUpload (file) {
      //   // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      //   // if (!isJPG) {
      //   // this.$message.error('上传头像图片只能是 JPG 格式!')
      //   // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return file.name
    }
  }
}
</script>

<style scoped lang="scss">
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
.el-form-item{
  display: flex;
}
.add {
  height: 100%;
  width: 100%;
  background: white;
}
::v-deep .el-upload{
  border: 1px solid #dfe3e7;
}
</style>
