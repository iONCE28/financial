<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="借款金额" prop="amount">
        <a-input v-model="form.amount" placeholder="请输入借款金额"/>
      </a-form-model-item>
      <a-form-model-item label="归还金额" prop="returnAmount">
        <a-input v-model="form.returnAmount" placeholder="请输入归还金额"/>
      </a-form-model-item>
      <a-form-model-item label="冲销金额" prop="reimbursement">
        <a-input v-model="form.reimbursement" placeholder="请输入冲销金额"/>
      </a-form-model-item>
      <a-form-model-item label="借款人" prop="borrower">
        <a-input v-model="form.borrower" placeholder="请输入借款人"/>
      </a-form-model-item>
      <a-form-model-item label="借款人id" prop="borrowerId">
        <a-input v-model="form.borrowerId" placeholder="请输入借款人id"/>
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
import {getReportLoan, addReportLoan, updateReportLoan} from '@/api/system/ReportLoan'

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        amount: null,
        returnAmount: null,
        reimbursement: null,
        borrower: null,
        borrowerId: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        amount: [
          {required: true, message: '借款金额不能为空', trigger: 'blur'}
        ],
        returnAmount: [
          {required: true, message: '归还金额不能为空', trigger: 'blur'}
        ],
        reimbursement: [
          {required: true, message: '冲销金额不能为空', trigger: 'blur'}
        ],
        borrower: [
          {required: true, message: '借款人不能为空', trigger: 'blur'}
        ],
        borrowerId: [
          {required: true, message: '借款人id不能为空', trigger: 'blur'}
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
        amount: null,
        returnAmount: null,
        reimbursement: null,
        borrower: null,
        borrowerId: null
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
      const amount = row ? row.amount : ids
      getReportLoan(amount).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.amount !== undefined && this.form.amount !== null) {
            updateReportLoan(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addReportLoan(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
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
