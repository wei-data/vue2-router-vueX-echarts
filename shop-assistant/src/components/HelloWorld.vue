<template>
  <div class="navigation">
      <div class="logo">
        <img src="@/../public/img/logo.png" alt="111">
      </div>
      <el-menu
        :default-active="active"
        :default-openeds="opened"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        router
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/Home/index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>后台首页</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/Home/OrderManagement">
          <i class="el-icon-menu"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="商品管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/Home/ProList">
            <i class="el-icon-setting"></i>
            <span slot="title">商品列表</span>
          </el-menu-item>
          <el-menu-item index="/Home/ProAdd">
            <i class="el-icon-setting"></i>
            <span slot="title">商品添加</span>
          </el-menu-item>
          <el-menu-item index="/Home/ProClassification">
            <i class="el-icon-setting"></i>
            <span slot="title">商品分类</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/Home/shopManagement">
          <i class="el-icon-setting"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>
        <el-submenu index="账户管理">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>账户管理</span>
          </template>
          <el-menu-item index="/Home/AccountList">
            <i class="el-icon-setting"></i>
            <span slot="title">账户列表</span>
          </el-menu-item>
          <el-menu-item index="/Home/AddAccount">
            <i class="el-icon-setting"></i>
            <span slot="title">添加账号</span>
          </el-menu-item>
          <el-menu-item index="/Home/ChangePassword">
            <i class="el-icon-setting"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="销售统计">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item index="/Home/ProStatistics">
            <i class="el-icon-setting"></i>
            <span slot="title">商品统计</span>
          </el-menu-item>
          <el-menu-item index="/Home/OrderStatistics">
            <i class="el-icon-setting"></i>
            <span slot="title">订单统计</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navigationA',
  data () {
    return {
      opened: [],
      active: '/Home/index'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {
    // 把对应的路由的地址赋给导航栏高亮的配置::default-active
    this.active = this.$route.path
    if (this.$route.meta.module) {
      // 把对应的路由的地址赋给导航栏展开的配置::default-opened
      this.opened = [`${this.$route.meta.module}`]
      console.log(this.$route.meta.module)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.navigation {
  height: 100vh;
  background: #545c64;
  .logo {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 45px;
      width: 45px;
    }
  }
  ::v-deep .el-submenu .el-menu-item {
    min-width: 0;
    padding: 0!important;
  }
}
</style>
