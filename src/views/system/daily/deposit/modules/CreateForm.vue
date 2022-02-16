<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目" prop="projId">
        <a-select placeholder="请选择项目" v-model="form.projId" @select="handleProj">
          <a-select-option :value="item.id" v-for="item in projs" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="合同" prop="contractId">
        <a-select placeholder="请选择合同" v-model="form.contractId">
          <a-select-option :value="item.id" v-for="item in contractsList" :key="item.id">
            {{ item.constractName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="结算项目" prop="resultProjId">
        <a-select placeholder="请输入结算项目" v-model="form.resultProjId">
          <a-select-option :value="item.id" v-for="item in projs" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="押金单据编号" prop="depNo">
        <a-input v-model="form.depNo" placeholder="请输入押金单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="押金收取方" prop="depCollecor">
        <a-input v-model="form.depCollecor" placeholder="请输入押金收取方"/>
      </a-form-model-item>
      <a-form-model-item label="押金支付方" prop="depPaior">
        <a-input v-model="form.depPaior" placeholder="请输入押金支付方"/>
      </a-form-model-item>
      <a-form-model-item label="押金内容" prop="depContent">
        <div id="depContent" name="depContent"></div>
      </a-form-model-item>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="押金金额" prop="depAmt">
            <a-input v-model="form.depAmt" type="number" placeholder="请输入押金金额"/>

          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="押金金额大写" prop="depAmtCheck">
            <a-input disabled v-model="form.depAmtCheck" placeholder="请输入押金金额"/>

          </a-form-model-item>
        </a-col>
      </a-row>


      <a-form-model-item label="押金经办人" prop="depHandler">
        <a-select v-model="form.depHandler" placeholder="请选择押金经办人" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接内部员工接口</a-select-option>
          <a-select-option value="1"> #todo 对接内部员工接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <!--      <a-form-model-item label="经办人id" prop="depHandlerId">-->
      <!--        <a-input v-model="form.depHandlerId" placeholder="请输入经办人id"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="押金收款账户" prop="depColAccount">
        <a-input v-model="form.depColAccount" placeholder="请输入押金收款账户"/>
      </a-form-model-item>
      <a-form-model-item label="押金支付账户" prop="depPayAccount">
        <a-input v-model="form.depPayAccount" placeholder="请输入押金支付账户"/>
      </a-form-model-item>
      <a-form-model-item label="押金收据编号" prop="depColNo">
        <a-input v-model="form.depColNo" placeholder="请输入押金收据编号"/>
      </a-form-model-item>
      <a-form-model-item label="押金收据影像" prop="depColImg">
        <a-upload
          :file-list="fileList"
          :customRequest="handleUploadone"
          :before-upload="beforeUploadone"
          @change="handleChange"
          :multiple="true">
          <a-button type="primary">
            <a-icon type="upload"/>
            文件上传
          </a-button>
          <a-icon :type="loading"/>
        </a-upload>
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
import {addDeposit, getDeposit, updateDeposit} from '@/api/system/deposit'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {uploadCover} from "@/api/system/upload";
import {capitalAmount} from "@/utils/util";
import {projsByUser} from "@/api/system/proj";
import {contractSByProj} from "@/api/system/contract";

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      contractsList: [],
      projs: [],
      fileList: [],
      loading: false,
      formTitle: '',
      depContentEditor: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        contractId: null,
        resultProjId: null,
        depNo: null,
        depCollecor: null,
        depPaior: null,
        depContent: null,
        depAmt: null,
        depAmtCheck: null,
        depHandler: null,
        depHandlerId: null,
        depColAccount: null,
        depPayAccount: null,
        depColNo: null,
        depColImg: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          {required: true, message: '项目不能为空', trigger: 'blur'}
        ],
        depNo: [
          {required: true, message: '押金单据编号不能为空', trigger: 'blur'}
        ],
        depCollecor: [
          {required: true, message: '押金收取方不能为空', trigger: 'blur'}
        ],
        depPaior: [
          {required: true, message: '押金支付方不能为空', trigger: 'blur'}
        ],
        depContent: [
          {required: true, message: '押金内容不能为空', trigger: 'blur'}
        ],
        depAmt: [
          {required: true, message: '押金金额不能为空', trigger: 'blur'}
        ],
        depHandler: [
          {required: true, message: '押金经办人不能为空', trigger: 'blur'}
        ],
        depHandlerId: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        depColAccount: [
          {required: true, message: '押金收款账户不能为空', trigger: 'blur'}
        ],
        depPayAccount: [
          {required: true, message: '押金支付账户不能为空', trigger: 'blur'}
        ],
        depColNo: [
          {required: true, message: '押金收据编号不能为空', trigger: 'blur'}
        ],
        depColImg: [
          {required: true, message: '押金收据影像不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  filters: {},
  created() {
    projsByUser().then(response => {
      this.projs = response;
    })
  },
  computed: {},
  watch: {
    "form.depAmt": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.form.depAmtCheck = capitalAmount(newVal)
        }
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    handleProj(value) {
      this.form.projId = value;
      contractSByProj(value).then(response => {
        this.contractsList = response;
      })
    },
    beforeUploadone() {

    },
    handleChange(info) {
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
    handleUploadone(file) {
      this.formData = file.file
      const progress = {percent: 1}
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
          this.form.depColImg = res.data.url
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
    openEditor() {
      this.$nextTick(() => {
        this.depContentEditor = new Vditor('depContent', {
          height: 360,
          toolbarConfig: {
            pin: true
          },
          cache: {
            enable: false
          },
          after: () => {
            let content = this.form.depContent
            if (content === undefined || content === null) {
              content = ''
            }
            this.depContentEditor.setValue(content)
          }
        })
      })
    },
    closeEditor() {
      this.noticeContentEditor.destroy()
    },
    onClose() {
      this.open = false
      this.closeEditor()
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
      this.closeEditor()
    },
    // 表单重置
    reset() {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        contractId: null,
        resultProjId: null,
        depNo: null,
        depCollecor: null,
        depPaior: null,
        depContent: null,
        depAmt: null,
        depHandler: null,
        depHandlerId: null,
        depColAccount: null,
        depPayAccount: null,
        depColNo: null,
        depColImg: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      }
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset()
      this.formType = 1
      this.open = true
      this.openEditor()
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate(row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getDeposit(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
        this.openEditor()
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.form.depContent = this.depContentEditor.getValue()
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined && this.form.id !== null) {
            updateDeposit(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.closeEditor()
              this.$emit('ok')
            })
          } else {
            addDeposit(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
              this.open = false
              this.closeEditor()
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
