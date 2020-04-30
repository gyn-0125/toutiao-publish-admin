<template>
  <div class="fans-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <el-row :gutter="10">
            <el-col
              class="fans-item"
              v-for="(fol, index) in follower"
              :key="index"
            >
              <el-image
                class="fans-image"
                :src="fol.photo"
              ></el-image>
              <p class="fans-id">{{ fol.name }}</p>
              <el-button
                type="primary"
                plain
                size="mini"
              >+关注</el-button>
            </el-col>
          </el-row>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalCount"
            :page-size="pageSize"
            :current-page.sync="page"
            @current-change="onPageChange"
          />
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div ref="main" style="width: 600px; height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getFollowers } from '@/api/followers'

export default {
  name: 'FansIndex',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'first',
      follower: [],
      totalCount: 0, // 总页数大小
      pageSize: 20, // 每页大小
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadFollowers(1)
  },
  mounted () {
    // 初始化图表
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {
    handleClick () {
      // console.log(tab, event)
    },
    loadFollowers (page = 1) {
      this.page = page
      getFollowers({
        page,
        per_page: this.pageSize // 每页数量
      }).then(res => {
        const results = res.data.data.results
        this.follower = results
        this.totalCount = res.data.data.total_count
        // console.log(results)
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.loadFollowers(page)
    }
  }
}
</script>

<style lang='less' scoped>
.fans-item {
  border: 1px dashed #ddd;
  width: 120px;
  height: 170px;
  text-align: center;
  padding: 10px 0;
  display: inline-block;
  margin-left: 5px;
  margin-right: 50px;
  margin-bottom: 15px;
}
.fans-image {
  display: block;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-left: 15px;
}
.fans-id {
  font-size: 12px;
}
</style>
