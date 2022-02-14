<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入项目名称" />
      </a-form-model-item>
      <a-form-model-item label="项目编号" prop="number">
        <a-input v-model="form.number" placeholder="请输入项目编号" />
      </a-form-model-item>
      <a-form-model-item label="项目性质：" prop="nature">
        <a-select v-model="form.nature" placeholder="请输入项目性质：" >
            <a-select-option value="0">新建</a-select-option>
            <a-select-option value="1">在建</a-select-option>
            <a-select-option value="2">维护</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="执行状态：" prop="status">
        <a-select placeholder="请选择" v-model="form.status">
          <a-select-option value="0">未开始</a-select-option>
            <a-select-option value="1">正在进行</a-select-option>
            <a-select-option value="2">已验收</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="项目文件" prop="file">
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
      <a-form-model-item label="场次" prop="showNum">
        <a-input v-model="form.showNum" placeholder="请输入场次" />
      </a-form-model-item>
      <a-form-model-item label="页数" prop="pageNum">
        <a-input v-model="form.pageNum" placeholder="请输入页数" />
      </a-form-model-item>
      <a-form-model-item label="集数" prop="setNum">
        <a-input v-model="form.setNum" placeholder="请输入集数" />
      </a-form-model-item>
      <a-form-model-item label="开机时间" prop="onTime">
        <a-date-picker style="width: 100%" v-model="form.onTime" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="关机时间" prop="offTime">
        <a-date-picker style="width: 100%" v-model="form.offTime" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="项目周期数：比如：三月、半年、一年" prop="cycle">
        <a-input v-model="form.cycle" placeholder="请输入项目周期数：比如：三月、半年、一年" />
      </a-form-model-item>
      <a-form-model-item label="投资方：甲方" prop="investor">
        <a-input v-model="form.investor" placeholder="请输入投资方：甲方" />
      </a-form-model-item>
      <a-form-model-item label="承接单位：乙方" prop="undertakor">
        <a-input v-model="form.undertakor" placeholder="请输入承接单位：乙方" />
      </a-form-model-item>
      <a-form-model-item label="部门" prop="departId">
        <a-tree-select
          v-model="form.departId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="deptOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
        >
        </a-tree-select>
        </a-form-model-item>
      <a-form-model-item label="负责人" prop="dutior">
        <a-input v-model="form.dutior" placeholder="请输入负责人" />
      </a-form-model-item>
      <a-form-model-item label="负责人职称" prop="dutiorTitle">
        <a-input v-model="form.dutiorTitle" placeholder="请输入负责人职称：监制、导演" />
      </a-form-model-item>
      <a-form-model-item label="负责人电话" prop="dutiorPhone">
        <a-input v-model="form.dutiorPhone" placeholder="请输入负责人电话" />
      </a-form-model-item>
      <a-form-model-item label="项目规模" prop="scale">
        <a-input v-model="form.scale" placeholder="请输入项目规模" />
      </a-form-model-item>
      <a-form-model-item label="摘要" prop="abstracts">
        <a-textarea
      v-model="form.abstracts"
      placeholder="摘要"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
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
  import {
    getProj,
    addProj,
    updateProj
  } from '@/api/system/proj'
import { treeselect } from '@/api/system/dept'
import { uploadCover } from '@/api/system/upload'
  export default {
    name: 'CreateForm',
    props: {
    },
    components: {},
    data() {
      return {
        deptOptions: [{
        id: 0,
        label: '',
        children: []
      }],
          replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
          statusList:["未开始","正在进行","已验收"],
        loading: false,
        formTitle: '',
        // 表单参数
        form: {
          id: null,
          name: null,
          number: null,
          nature: '0',
          status: '0',
          abstracts: null,
          file: null,
          showNum: null,
          pageNum: null,
          setNum: null,
          onTime: null,
          offTime: null,
          cycle: null,
          investor: null,
          undertakor: null,
          depart: null,
          dutior: null,
          dutiorTitle: null,
          dutiorPhone: null,
          createTime: null,
          updateTime: null,
          delFlag: '0',
          scale: null,
          uploadTime: null,
          createBy: null,
          updateBy: null
        },
        // 1增加,2修改
        formType: 1,
        open: false,
        rules: {
          name: [{
            required: true,
            message: '项目名称不能为空',
            trigger: 'blur'
          }],
          showNum: [{
            required: true,
            message: '场次不能为空',
            trigger: 'blur'
          }],
          pageNum: [{
            required: true,
            message: '页数不能为空',
            trigger: 'blur'
          }],
          setNum: [{
            required: true,
            message: '集数不能为空',
            trigger: 'blur'
          }],
          onTime: [{
            required: true,
            message: '开机时间不能为空',
            trigger: 'blur'
          }],
          offTime: [{
            required: true,
            message: '关机时间不能为空',
            trigger: 'blur'
          }],
          dutior: [{
            required: true,
            message: '负责人不能为空',
            trigger: 'blur'
          }],
          departId: [{
            required: true,
            message: '部门不能为空',
            trigger: 'blur'
          }],
          dutiorPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请正确填写手机号',
            trigger: 'blur'
          }
        ]

        }
      }
    },
    filters: {},
    created() {
      this.getTreeselect()
    },
    computed: {},
    watch: {},
    mounted() {},
    methods: {
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
            this.form.file = res.data.url
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
      /** 查询部门下拉树结构 */
    getTreeselect () {
      treeselect().then(response => {
        this.deptOptions = response.data
      })
    },
      onClose() {
        this.open = false
      },
      // 取消按钮
      cancel() {
        this.open = false
        this.reset()
      },
      // 表单重置
      reset() {
        this.formType = 1
        this.form = {
          id: null,
          name: null,
          number: null,
          nature: null,
          status: null,
          abstracts: null,
          file: null,
          showNum: null,
          pageNum: null,
          setNum: null,
          onTime: null,
          offTime: null,
          cycle: null,
          investor: null,
          undertakor: null,
          depart: null,
          dutior: null,
          dutiorTitle: null,
          dutiorPhone: null,
          createTime: null,
          updateTime: null,
          delFlag: null,
          scale: null,
          uploadTime: null,
          createBy: null,
          updateBy: null
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
        getProj(id).then(response => {
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
              updateProj(this.form).then(response => {
                this.$message.success(
                  '修改成功',
                  3
                )
                this.fileList = []
              this.fileListone = []
                this.open = false
                this.$emit('ok')
              })
            } else {
              addProj(this.form).then(response => {
                this.$message.success(
                  '新增成功',
                  3
                )
                this.fileList = []
              this.fileListone = []
                this.open = false
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