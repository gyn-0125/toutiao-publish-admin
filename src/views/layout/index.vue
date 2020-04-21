<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="200px">
      <app-aside class="aside-menu" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <app-header />
      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'

export default {
  name: 'LayoutIndex',
  props: {},
  components: {
    AppAside,
    AppHeader
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='less' scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #ccc;
  .aside-menu {
    height: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.main {
  background-color: #e9eef3;
}
</style>
