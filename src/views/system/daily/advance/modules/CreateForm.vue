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
      <a-form-model-item label="预付账款单据编号" prop="advanceNo">
        <a-input v-model="form.advanceNo" placeholder="请输入预付账款单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款类别0：协议支付，1：预付退回" prop="advanceType">
        <a-select placeholder="请选择预付账款类别0：协议支付，1：预付退回" v-model="form.advanceType">
          <a-select-option value="">请选择字典生成</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="预付账款付款方" prop="advancePayer">
        <a-input v-model="form.advancePayer" placeholder="请输入预付账款付款方"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款付款方id" prop="advancePayId">
        <a-input v-model="form.advancePayId" placeholder="请输入预付账款付款方id"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款收款方" prop="advanceColer">
        <a-input v-model="form.advanceColer" placeholder="请输入预付账款收款方"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款收款方id" prop="advanceColId">
        <a-input v-model="form.advanceColId" placeholder="请输入预付账款收款方id"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款发生金额" prop="advanceAmt">
        <a-input v-model="form.advanceAmt" placeholder="请输入预付账款发生金额"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款发生日期" prop="advanceOpenTime">
        <a-date-picker style="width: 100%" v-model="form.advanceOpenTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="支付账户" prop="payAccount">
        <a-input v-model="form.payAccount" placeholder="请输入支付账户"/>
      </a-form-model-item>
      <a-form-model-item label="冲销状态0：未冲销；1：已冲销" prop="writeoffStatus">
        <a-radio-group v-model="form.writeoffStatus" button-style="solid">
          <a-radio-button value="">请选择字典生成</a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注"/>
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-input v-model="form.handler" placeholder="请输入经办人"/>
      </a-form-model-item>
      <a-form-model-item label="经办人id" prop="handlerId">
        <a-input v-model="form.handlerId" placeholder="请输入经办人id"/>
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
import {addAdvance, getAdvance, updateAdvance} from '@/api/system/advance'

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
        id: null,
        projId: null,
        contractId: null,
        resultProjId: null,
        advanceNo: null,
        advanceType: null,
        advancePayer: null,
        advancePayId: null,
        advanceColer: null,
        advanceColId: null,
        advanceAmt: null,
        advanceOpenTime: null,
        payAccount: null,
        writeoffStatus: 0,
        remark: null,
        handler: null,
        handlerId: null,
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
        contractId: [
          {required: true, message: '合同id不能为空', trigger: 'blur'}
        ],
        resultProjId: [
          {required: true, message: '结算项目id不能为空', trigger: 'blur'}
        ],
        advanceNo: [
          {required: true, message: '预付账款单据编号不能为空', trigger: 'blur'}
        ],
        advanceType: [
          {required: true, message: '预付账款类别0：协议支付，1：预付退回不能为空', trigger: 'change'}
        ],
        advancePayer: [
          {required: true, message: '预付账款付款方不能为空', trigger: 'blur'}
        ],
        advancePayId: [
          {required: true, message: '预付账款付款方id不能为空', trigger: 'blur'}
        ],
        advanceColer: [
          {required: true, message: '预付账款收款方不能为空', trigger: 'blur'}
        ],
        advanceColId: [
          {required: true, message: '预付账款收款方id不能为空', trigger: 'blur'}
        ],
        advanceAmt: [
          {required: true, message: '预付账款发生金额不能为空', trigger: 'blur'}
        ],
        advanceOpenTime: [
          {required: true, message: '预付账款发生日期不能为空', trigger: 'blur'}
        ],
        payAccount: [
          {required: true, message: '支付账户不能为空', trigger: 'blur'}
        ],
        writeoffStatus: [
          {required: true, message: '冲销状态0：未冲销；1：已冲销不能为空', trigger: 'blur'}
        ],
        handler: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        handlerId: [
          {required: true, message: '经办人id不能为空', trigger: 'blur'}
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
        id: null,
        projId: null,
        contractId: null,
        resultProjId: null,
        advanceNo: null,
        advanceType: null,
        advancePayer: null,
        advancePayId: null,
        advanceColer: null,
        advanceColId: null,
        advanceAmt: null,
        advanceOpenTime: null,
        payAccount: null,
        writeoffStatus: 0,
        remark: null,
        handler: null,
        handlerId: null,
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
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate(row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getAdvance(id).then(response => {
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
            updateAdvance(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addAdvance(this.form).then(response => {
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
