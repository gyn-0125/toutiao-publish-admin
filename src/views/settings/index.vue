<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form
            ref="user-form"
            :model="user"
            :rules="formRules"
            label-width="80px"
          >
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="onUpdateUser"
                :loading="updateProfileLoading"
              >保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
          <label for="file">
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            hidden
            ref="file"
            @change="onFileChange"
          >
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @close="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'

export default {
  name: 'SettingsIndex',
  props: {},
  components: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false,
      previewImage: '', // 预览图片
      cropper: null,
      updatePhotoLoading: false, // 更新用户头像loading状态
      updateProfileLoading: false,
      formRules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onUpdateUser () {
      this.$refs['user-form'].validate(async valid => {
        if (!valid) {
          return
        }
        // console.log('submit!')
        // 表单验证
        // 验证通过提交表单
        // 开启loading状态
        this.updateProfileLoading = true
        const { name, intro, email } = this.user
        await updateUserProfile({
          name,
          intro,
          email
        })
        // this.user = res.data.data
        // console.log(res)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        // 关闭loading状态
        this.updateProfileLoading = false
        // 发布通知、用户信息已修改
        globalBus.$emit('update-user', this.user)
      })
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 处理图片预览
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 展示弹出层，预览用户选择
      this.dialogVisible = true
      // 解决选择相同文件不出发change事件
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      const image = this.$refs['preview-image']
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1
        // cropBoxMovable: false
      })
    },
    onDialogClosed () {
      // 对话框关闭，销毁裁切器
      // this.cropper.destory()
    },
    onUpdatePhoto () {
      this.updatePhotoLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(async file => {
        const fd = new FormData()
        fd.append('photo', file)
        await updateUserPhoto(fd)
        // console.log(res)
        // 关闭对话框
        this.dialogVisible = false
        // 直接把裁切结果的文件对象转为 blob 数据本地预览
        this.user.photo = window.URL.createObjectURL(file)
        this.updatePhotoLoading = false
        this.$message({
          type: 'success',
          message: '更新头像成功'
        })
        globalBus.$emit('update-user', this.user)
      })
    }
  }
}
</script>

<style lang='less' scoped>
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}

</style>
