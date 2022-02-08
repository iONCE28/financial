<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="结算项目id" prop="projId" >
        <a-input v-model="form.projId" placeholder="请输入结算项目id" />
      </a-form-model-item>
      <a-form-model-item label="结算项目名称" prop="projName" >
        <a-input v-model="form.projName" placeholder="请输入结算项目名称" />
      </a-form-model-item>
      <a-form-model-item label="结算金额" prop="projAmt" >
        <a-input v-model="form.projAmt" placeholder="请输入结算金额" />
      </a-form-model-item>
      <a-form-model-item label="收付款周期：比如：三月、半年、一年" prop="colpayCycle" >
        <a-input v-model="form.colpayCycle" placeholder="请输入收付款周期：比如：三月、半年、一年" />
      </a-form-model-item>
      <a-form-model-item label="收付款条件" prop="colpayCondition" >
        <a-input v-model="form.colpayCondition" placeholder="请输入收付款条件" />
      </a-form-model-item>
      <a-form-model-item label="收付款金额" prop="colpayAmt" >
        <a-input v-model="form.colpayAmt" placeholder="请输入收付款金额" />
      </a-form-model-item>
      <a-form-model-item label="收付款过期时间" prop="colpayExpireTime" >
        <a-date-picker style="width: 100%" v-model="form.colpayExpireTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="结算账户名称" prop="accountName" >
        <a-input v-model="form.accountName" placeholder="请输入结算账户名称" />
      </a-form-model-item>
      <a-form-model-item label="结算账户开户行" prop="openBank" >
        <a-input v-model="form.openBank" placeholder="请输入结算账户开户行" />
      </a-form-model-item>
      <a-form-model-item label="结算账户" prop="account" >
        <a-input v-model="form.account" placeholder="请输入结算账户" />
      </a-form-model-item>
      <a-form-model-item label="删除状态 0. 正常 1. 删除" prop="delFlag" v-if="formType === 1">
        <a-input v-model="form.delFlag" placeholder="请输入删除状态 0. 正常 1. 删除" />
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
import { getResult, addResult, updateResult } from '@/api/system/result'

export default {
  name: 'CreateForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        projName: null,
        projAmt: null,
        colpayCycle: null,
        colpayCondition: null,
        colpayAmt: null,
        colpayExpireTime: null,
        accountName: null,
        openBank: null,
        account: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          { required: true, message: '结算项目id不能为空', trigger: 'blur' }
        ],
        projName: [
          { required: true, message: '结算项目名称不能为空', trigger: 'blur' }
        ],
        projAmt: [
          { required: true, message: '结算金额不能为空', trigger: 'blur' }
        ],
        colpayCycle: [
          { required: true, message: '收付款周期：比如：三月、半年、一年不能为空', trigger: 'blur' }
        ],
        colpayCondition: [
          { required: true, message: '收付款条件不能为空', trigger: 'blur' }
        ],
        colpayAmt: [
          { required: true, message: '收付款金额不能为空', trigger: 'blur' }
        ],
        colpayExpireTime: [
          { required: true, message: '收付款过期时间不能为空', trigger: 'blur' }
        ],
        accountName: [
          { required: true, message: '结算账户名称不能为空', trigger: 'blur' }
        ],
        openBank: [
          { required: true, message: '结算账户开户行不能为空', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '结算账户不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
  },
  created () {
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    onClose () {
      this.open = false
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        projName: null,
        projAmt: null,
        colpayCycle: null,
        colpayCondition: null,
        colpayAmt: null,
        colpayExpireTime: null,
        accountName: null,
        openBank: null,
        account: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      }
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      this.formType = 1
      this.open = true
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate (row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getResult(id).then(response => {
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
            updateResult(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addResult(this.form).then(response => {
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