<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group
          v-model="collect"
          size="mini"
          @change="loadImages(1)"
        >
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
            size="mini"
            type="success"
            @click="dialogUploadVisible = true"
        >上传素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :xs="12"
          :sm="6"
          :md="6"
          :lg="4"
          v-for="(img, index) in images"
          :key="index"
          class="image-item"
        >
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          >
          </el-image>
          <div class="image-action">
            <i
              :class="{
                'el-icon-star-on': img.is_collected,
                'el-icon-star-off': !img.is_collected
              }"
              @click="onCollect(img)"
            ></i>
            <i class="el-icon-delete-solid"></i>
          </div>
        </el-col>
      </el-row>
      <!-- 数据分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="page"
        @current-change="onPageChange">
      </el-pagination>
    </el-card>
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true">
      <el-upload
        class="upload-demo"
        drag
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :show-file-list="false"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload_text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload-tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  getImages,
  collectImage
} from '@/api/image'

export default {
  name: 'ImageIndex',
  props: {},
  components: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 默认查询全部素材列表
      images: [], // 图片素材列表
      dialogUploadVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0, // 总页数大小
      pageSize: 20, // 每页大小
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    // 页面初始化加载第 1 页数据
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page = 1) {
      // 重置高亮页码，防止数据和页码不对应
      this.page = page
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onUploadSuccess () {
      // 关闭对话框
      this.dialogUploadVisible = false
      // 更新素材列表
      this.loadImages(this.page)

      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },
    onPageChange (page) {
      // console.log(page)
      this.loadImages(page)
    },
    onCollect (img) {
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
      })
    }
  }
}
</script>

<style lang='less' scoped>
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.image-item {
  position: relative;
}
.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
</style>
