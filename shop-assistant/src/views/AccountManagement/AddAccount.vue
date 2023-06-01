<template>
<div class="add">
  <H2>添加账户</H2>
  <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="账号" prop="pass">
      <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="用户组" prop="age">
      <el-select v-model="ruleForm.userGroup" placeholder="请选择">
        <el-option
          label="超级管理员"
          value="超级管理员">
        </el-option>
        <el-option
          label="普通管理员"
          value="普通管理员">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import H2 from '@/components/H2'
export default {
  name: 'AddAccount',
  components: {
    H2
  },
  data () {
    return {
      ruleForm: {
        account: '',
        password: '',
        userGroup: ''
      }
    }
  },
  methods: {
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post('/users/add', {
            account: this.ruleForm.account,
            password: this.ruleForm.password,
            userGroup: this.ruleForm.userGroup
          })
          if (data.code === 0) {
            this.$message.success('添加成功')
          } else {
            this.$message.error('添加失败')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.add {
  height: 100%;
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box
}
.el-select{
  width: 100%
}
</style>
