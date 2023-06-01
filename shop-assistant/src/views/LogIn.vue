<template>
  <div class="logIn">
    <div class="box">
      <el-form :model="form" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item>
          <el-input prefix-icon="el-icon-user-solid" v-model="form.inputA" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('numberValidateForm')">主要按钮</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LogIn',
  data () {
    return {
      form: {
        inputA: '',
        password: ''
      }
    }
  },
  methods: {
    async info () {
      const { data } = await axios.get('/users/info')
      console.log(data)
      this.$store.state.individual = data
      localStorage.setItem('info', JSON.stringify(data))
    },
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          console.log(this.form)
          const { data } = await this.$http.post('/users/checkLogin', {
            account: this.form.inputA,
            password: this.form.password
          })
          console.log(data)
          console.log(data.code)
          if (data.code === 0) {
            const dataA = {
              token: data.token,
              name: this.form.inputA
            }
            localStorage.setItem('token', JSON.stringify(dataA))
            // ...........................................................................................................................
            // 密码加密至存储到cookie值里
            // const alphabet = this.form.password
            // console.log(alphabet)
            // const arr = []
            // const passwordMap = new Map();
            // [...alphabet].forEach((char, index) => {
            //   const nextChar = alphabet[(index + 3) % alphabet.length]
            //   console.log(nextChar)
            //   arr.push(nextChar)
            //   passwordMap.set(char, nextChar)
            // })
            // window.cookie(arr.join(''))
            // ...........................................................................................................................
            await this.$router.push('/Home')
            await this.info()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.logIn {
  height: 100vh;
  width: 100vw;
  background: url("@/../public/img/bg.png") 100%;
  //background: #2d3a4b;
  .box {
    width: 450px;
    height: 300px;
    padding: 20px;
    //background: aquamarine;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    .el-input{
      margin-bottom: 30px;
    }
    .el-button{
      width: 100%;
    }
  }
}

::v-deep .el-input__icon{
  font-size: 18px;
}
</style>
