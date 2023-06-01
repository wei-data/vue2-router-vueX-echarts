<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <HelloWorld/>
      </el-aside>
      <el-container>
        <el-header>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) of $route.matched" :key="index+1">
              <router-link  :to="item.path" style="font-size:14px">
                {{ item.meta.title }}
              </router-link>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="individual">
            {{title.account}}
            <router-link to="/Home/IndividualCenter"><el-avatar :size="40" :src="circleUrl"></el-avatar></router-link>
            <el-button slot="reference" @click="showConfirm">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data () {
    return {
      circleUrl: JSON.parse(localStorage.getItem('info')).imgUrl,
      title: JSON.parse(localStorage.getItem('info'))
    }
  },
  methods: {
    showConfirm () {
      this.$confirm('你确定要退出登录吗？', '提示', {
        confirmButtonText: '确定退出', // 确认按钮的文字
        cancelButtonText: '取消', // 取消按钮的文字
        type: 'warning' // 确认框的类型
      }).then(() => {
        // 用户点击了 "确认" 按钮
        // 执行提交操作
        this.$message.success('退出成功')
        // 跳转至登录页面
        this.$router.push({
          path: '/LogIn'
        })
        // 清除token值
        localStorage.removeItem('token')
      }).catch(() => {
        // 用户点击了 "取消" 或关闭了弹
        // 不进行任何操作
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-aside{
  height: 100vh;
}
.el-header{
  height: 56px;
  background: white;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  box-sizing: border-box;
  align-items: center;
}
.el-main {
  background: #f0f2f5;
  padding: 20px;
  box-sizing: border-box;
}
.individual {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 170px;
}
</style>
