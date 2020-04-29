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
            <el-col class="fans-item">
              <el-image class="fans-image"></el-image>
              <p>名字</p>
              <el-button>关注</el-button>
            </el-col>
          </el-row>
          <el-pagination
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
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

export default {
  name: 'FansIndex',
  props: {},
  components: {},
  data () {
    return {
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    // 初始化图表
    var myChart = echarts.init(this.$refs.main)
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option)
  },
  methods: {
    handleClick () {
      // console.log(tab, event)
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
</style>
