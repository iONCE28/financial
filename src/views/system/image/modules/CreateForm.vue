<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="关联项目" prop="projId">
       <a-select placeholder="项目" v-model="form.projId" style="width: 100%" allow-clear>
          <a-select-option :value="item.id" v-for="item in projList" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="影像文件" prop="image">
        <a-upload
          :file-list="fileList"
          :customRequest="handleUploadone"
          :before-upload="beforeUploadone"
          @change="handleChange"
          :multiple="true">
          <a-button type="primary"> <a-icon type="upload"/>文件上传</a-button>
          <a-icon :type="loading"/>
        </a-upload>
      </a-form-model-item>
      <a-form-model-item label="影像类别" prop="type">
        <a-select placeholder="请选择影像类别" v-model="form.type" style="width: 100%" allow-clear>
          <a-select-option :value="item.typeNo.toString()" v-for="item in Imagetype" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="影像标签" prop="label">
        <a-input v-model="form.label" placeholder="请输入影像标签"/>
      </a-form-model-item>
      <div class="bottom-control">
        <a-space>
          <a-button type="primary" @click="submitForm">
            保存
          </a-button>
          <a-button type="dashed" @click="cancel">
            取消
          </a-button>
        </a-space>
      </div>
    </a-form-model>
  </a-drawer>
</template>

<script>
import {addImagemng, getImagemng, updateImagemng} from '@/api/system/imagemng'
import {listImagetype} from "@/api/system/imagetype";
import {uploadCover} from "@/api/system/upload";
import {listAll} from '@/api/system/proj'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      fileList:[],
      loading: false,
      formTitle: '',
      projList: [],
      // 表单参数
      form: {
        id: null,
        projId: null,
        image: null,
        type: null,
        label: null,
        operator: null,
        operatorId: null,
        uploadTime: null,
        updateTime: null,
        projName: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          {required: true, message: '关联项目不能为空', trigger: 'blur'}
        ],
        image: [
          {required: true, message: '影像文件:存文件地址不能为空', trigger: 'blur'}
        ],
        type: [
          {required: true, message: '影像类别不能为空', trigger: 'change'}
        ],
        operator: [
          {required: true, message: '操作人不能为空', trigger: 'blur'}
        ],
        operatorId: [
          {required: true, message: '操作人员ID不能为空', trigger: 'blur'}
        ],
        uploadTime: [
          {required: true, message: '文件上传时间不能为空', trigger: 'blur'}
        ]
      },
      Imagetype: []
    }
  },
  filters: {},
  created() {
    listImagetype().then(response => {
      this.Imagetype = response.rows
    })
    this.listpro()
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    listpro() {
      listAll().then(res => {
       this.projList = res.data
      })
    },
    handleChange (info) {
      let fileList = [...info.fileList]
      fileList = fileList.slice(-1)
      this.fileList = fileList
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.loading = false
      }
    },
    // 文件上传相关
    handleUploadone (file) {
      this.formData = file.file
      const progress = { percent: 1 }
      const speed = 100 / (file.file.size / 65000)// 上传速度
      const intervalId = setInterval(() => {
        // 控制进度条防止在未上传成功时进度条达到100
        if (progress.percent < 100) {
          progress.percent += speed// 控制进度条速度

          file.onProgress(progress)// onProgress接收一个对象{ percent: 进度 }在进度条上显示
        } else if ((progress.percent === 99)) {
          progress.percent++
        } else if (progress.percent > 100) {
          file.onSuccess(file)
          clearInterval(intervalId)
        }
      }, 100)
      const formData = new FormData()
      formData.append('file', file.file)
      // formData.append('noticeId', this.id)
      uploadCover(formData).then(res => {
        console.log('进入了方法')
        this.$notification.success({
          message: '上传成功'
        })
        setTimeout(() => {
          this.form.image = res.data.url
          // this.form.noticeId = this.id
          // this.imagesUrl = res.data.url
        }, 0)
        file.onSuccess(res, file.file)
      }).catch(function (error) {
        // 由网络或者服务器抛出的错误
        console.log(error.toString())
        // alert(error.toString())
      })
    },

    onClose() {
      this.open = false
      this.$refs['form'].resetFields()
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.$refs['form'].resetFields()
      this.reset()
    },
    // 表单重置
    reset() {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        image: null,
        type: null,
        label: null,
        operator: null,
        operatorId: null,
        uploadTime: null,
        updateTime: null,
        projName: null
      }
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      this.formType = 1
      this.open = true
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate(row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getImagemng(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined && this.form.id !== null) {
            updateImagemng(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.fileList = []
              this.open = false
              this.$refs['form'].resetFields()
              this.$emit('ok')
            })
          } else {
            addImagemng(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
               this.fileList = []
              this.open = false
              this.$refs['form'].resetFields()
              this.$emit('ok')
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
