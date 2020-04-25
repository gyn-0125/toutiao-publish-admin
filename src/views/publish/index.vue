<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">发布文章</a></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticlesChannels,
  addArticle,
  getArticle
} from '@/api/article'

export default {
  name: 'PublishIndex',
  props: {},
  components: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面
          type: 0, // 文章类型
          images: [] // 封面图片的地址
        },
        channel_id: null
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    // 发布和修改用同一个组件，判断
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    loadChannels () {
      getArticlesChannels().then((res) => {
        this.channels = res.data.data.channels
      })
    },
    onPublish (draft = false) {
      addArticle(this.article, draft).then(res => {
        this.$message({
          message: '发布成功',
          type: 'success'
        })
      })
    },
    loadArticle () {
      // console.log('loadArticle')
      // 请求获取数据
      getArticle(this.$route.query.id).then(res => {
        // 模板绑定显示
        this.article = res.data.data
      })
    }
  }
}
</script>

<style lang='less' scoped></style>
