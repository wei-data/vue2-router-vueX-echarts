<template>
<div class="change">
  <H2>修改密码</H2>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
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
  name: 'ChangePassword',
  components: {
    H2
  },
  data () {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空！！！'))
      }
      setTimeout(async () => {
        console.log(value)
        // 发起旧密码对比
        const { data: { code } } = await this.$http.get('/users/checkoldpwd', {
          params: {
            oldPwd: value
          }
        })
        // ？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？？
        if (code !== '00') {
          callback(new Error('密码不是原密码，请从新输入密码'))
        } else {
          callback()
        }
      }, 1000)
    }
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        // 新密码
        checkPass: '',
        // 原密码
        age: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await this.$http.post('/users/editpwd', {
            newPwd: this.ruleForm.checkPass
          })
          if (data.code === 0) {
            this.$message.success('修改成功')
            const loading = this.$loading({
              lock: true,
              text: '正在修改中',
              spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 1)'
            })
            setTimeout(() => {
              loading.close()
              localStorage.removeItem('token')
              localStorage.removeItem('pass')
              this.$router.push({
                path: '/LogIn'
              })
            }, 2000)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.change {
  width: 100%;
  height: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box
}
</style>
