<template>
<div class="message">
  <H2>个人中心</H2>
  <p><span>管理员信息</span></p>
  <p><span>管理员ID: </span>{{list.id}}</p>
  <p><span>账号：</span>{{list.account}}</p>
  <p><span>用户组：</span>{{list.userGroup}}</p>
  <p><span>创建时间：</span>{{list.ctime|| '未捕捉'}}</p>
  <div class="Head"><span>管理员头像：</span><img :src="list.imgUrl" alt=""></div>
</div>
</template>

<script>
import H2 from '@/components/H2'
export default {
  name: 'IndividualCenter',
  components: {
    H2
  },
  data () {
    return {
      list: ''
    }
  },
  mounted () {
    this.list = JSON.parse(localStorage.getItem('info'))
  }
}
</script>

<style scoped lang="scss">
.message {
  height: 100%;
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box
}
p {
  text-align: left;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e5e1e1
}
.Head{
  text-align: left;
  margin-top: 30px;
  img{
  margin-left: 20px
  }
}
span {
  display: inline-block;
  width: 150px;
  margin-left: 30px
}
</style>
