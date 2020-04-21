<template>
  <div class="header-container">
    <div>
      <i class="el-icon-s-fold"></i>
      <span>江苏传智播客科技教育有限公司</span>
    </div>
    <el-dropdown>
      <div class="avater-wrap">
        <img class="avater" :src="user.photo" alt="">
        <span>{{ user.name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人设置</el-dropdown-item>
        <el-dropdown-item>用户退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'

export default {
  name: 'AppHeader',
  props: {},
  components: {},
  data () {
    return {
      user: {} // 当前登录用户信息
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
        // console.log(res)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avater-wrap {
      display: flex;
      align-items: center;
      .avater {
         width: 30px;
         height: 30px;
         border-radius: 50%;
         margin-right: 10px;
      }
    }
}
</style>
