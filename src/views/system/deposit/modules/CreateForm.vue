<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入项目id"/>
      </a-form-model-item>
      <a-form-model-item label="合同id" prop="contractId">
        <a-input v-model="form.contractId" placeholder="请输入合同id"/>
      </a-form-model-item>
      <a-form-model-item label="结算项目id" prop="resultProjId">
        <a-input v-model="form.resultProjId" placeholder="请输入结算项目id"/>
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
      <a-form-model-item label="押金金额" prop="depAmt">
        <a-input v-model="form.depAmt" placeholder="请输入押金金额"/>
      </a-form-model-item>
      <a-form-model-item label="押金经办人" prop="depHandler">
        <a-input v-model="form.depHandler" placeholder="请输入押金经办人"/>
      </a-form-model-item>
      <a-form-model-item label="经办人id" prop="depHandlerId">
        <a-input v-model="form.depHandlerId" placeholder="请输入经办人id"/>
      </a-form-model-item>
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
        <a-input v-model="form.depColImg" placeholder="请输入押金收据影像"/>
      </a-form-model-item>
      <a-form-model-item label="预留字段1" prop="reserveOne">
        <a-input v-model="form.reserveOne" placeholder="请输入预留字段1"/>
      </a-form-model-item>
      <a-form-model-item label="预留字段2" prop="reserveTwo">
        <a-input v-model="form.reserveTwo" placeholder="请输入预留字段2"/>
      </a-form-model-item>
      <a-form-model-item label="预留字段3" prop="reserveThree">
        <a-input v-model="form.reserveThree" placeholder="请输入预留字段3"/>
      </a-form-model-item>
      <a-form-model-item label="删除状态 0. 正常 1. 删除" prop="delFlag" v-if="formType === 1">
        <a-input v-model="form.delFlag" placeholder="请输入删除状态 0. 正常 1. 删除"/>
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
import {getDeposit, addDeposit, updateDeposit} from '@/api/system/deposit'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
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
          {required: true, message: '项目id不能为空', trigger: 'blur'}
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
          {required: true, message: '经办人id不能为空', trigger: 'blur'}
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
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
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
