<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img
        class="cover-image"
        ref="cover-image"
        :src="value"
      >
      <el-dialog
        title="选择封面"
        :visible.sync="dialogVisible"
        append-to-body
      >
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first">
            <image-list
              :is-show-add="false"
              :is-show-action="false"
              is-show-selected
              ref="image-list"
            />
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <label for="file">
              <img
                width="100"
                ref="preview-image"
                class="file-image"
              >
            </label>
            <input
              id="file"
              type="file"
              ref="file"
              @change="onFileChange"
              hidden
            >
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="dialogVisible = false"
          >取 消</el-button>
          <el-button
            type="primary"
            @click="onCoverConfirm"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/image/components/image-list'

export default {
  name: 'UploadCover',
  // props: ['cover-image'],
  props: ['value'],
  components: {
    ImageList
  },
  data () {
    return {
      activeName: 'second',
      dialogVisible: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 图片预览
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
      // 防止用户选择同一个文件不出发 change 事件
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      if (this.activeName === 'second') {
        const file = this.$refs.file.files[0]
        if (!file) {
          this.$message('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          // console.log(res)
          // 关闭弹出层
          this.dialogVisible = false
          // 展示上传的图片
          this.$refs['cover-image'].src = res.data.data.url
          // 将图片地址发送给父组件
          // this.$emit('update-cover', res.data.data.url)
          this.$emit('input', res.data.data.url)
        })
      } else if (this.activeName === 'first') {
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择图片')
          return
        }
        this.dialogVisible = false
        this.$emit('input', imageList.images[selected].url)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.cover-wrap {
  float: left;
  margin-right: 10px;
  width: 150px;
  height: 120px;
  background: url('./pic_bg.png') no-repeat 50%;
  opacity: 0.3;
  border: 1px dashed #ccc;
  .cover-image {
      width: 100%;
      height: 100%;
  }
}
.file-image {
  margin-left: 230px;
  width: 200px;
  height: 180px;
  // border: 1px border #ccc;
  background: url('./pic_bg.png') no-repeat 50%;
  opacity: 0.3;
  border: 1px dashed #ccc;
}
</style>
