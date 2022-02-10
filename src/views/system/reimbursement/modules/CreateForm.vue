<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入项目id"/>
      </a-form-model-item>
      <a-form-model-item label="合同ID" prop="contractId">
        <a-input v-model="form.contractId" placeholder="请输入合同ID"/>
      </a-form-model-item>
      <a-form-model-item label="结算项目id" prop="resultProjId">
        <a-input v-model="form.resultProjId" placeholder="请输入结算项目id"/>
      </a-form-model-item>
      <a-form-model-item label="费用报销单据编号" prop="reimbursementNo">
        <a-input v-model="form.reimbursementNo" placeholder="请输入费用报销单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="预算科目ID" prop="budgetId">
        <a-input v-model="form.budgetId" placeholder="请输入预算科目ID"/>
      </a-form-model-item>
      <a-form-model-item label="关联单位" prop="affiliatedUnit">
        <a-input v-model="form.affiliatedUnit" placeholder="请输入关联单位"/>
      </a-form-model-item>
      <a-form-model-item label="关联单位id" prop="affiliatedUnitId">
        <a-input v-model="form.affiliatedUnitId" placeholder="请输入关联单位id"/>
      </a-form-model-item>
      <a-form-model-item label="关联个人" prop="affiliatedPerson">
        <a-input v-model="form.affiliatedPerson" placeholder="请输入关联个人"/>
      </a-form-model-item>
      <a-form-model-item label="关联个人id" prop="affiliatedPersonId">
        <a-input v-model="form.affiliatedPersonId" placeholder="请输入关联个人id"/>
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
      <a-form-model-item label="代办标识0：无代办；1：代办。默认0" prop="agencyLogo">
        <a-input v-model="form.agencyLogo" placeholder="请输入代办标识0：无代办；1：代办。默认0"/>
      </a-form-model-item>
      <a-form-model-item label="费用部门" prop="expenseDept">
        <a-input v-model="form.expenseDept" placeholder="请输入费用部门"/>
      </a-form-model-item>
      <a-form-model-item label="摘要" prop="abstract">
        <a-input v-model="form.abstract" placeholder="请输入内容" type="textarea" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="报销金额" prop="reimbAmt">
        <a-input v-model="form.reimbAmt" placeholder="请输入报销金额"/>
      </a-form-model-item>
      <a-form-model-item label="发票张树" prop="invoiceNum">
        <a-input v-model="form.invoiceNum" placeholder="请输入发票张树"/>
      </a-form-model-item>
      <a-form-model-item label="发票影像：存文件路径" prop="image">
        <file-upload v-model="form.image" type="image"></file-upload>
      </a-form-model-item>
      <a-form-model-item label="上传时间" prop="uploadTime">
        <a-date-picker style="width: 100%" v-model="form.uploadTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付" prop="payType">
        <a-select placeholder="请选择支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付" v-model="form.payType">
          <a-select-option value="">请选择字典生成</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="报销支付账户名称" prop="reimbPayName">
        <a-input v-model="form.reimbPayName" placeholder="请输入报销支付账户名称"/>
      </a-form-model-item>
      <a-form-model-item label="报销支付账户开户行" prop="reimbPayBank">
        <a-input v-model="form.reimbPayBank" placeholder="请输入报销支付账户开户行"/>
      </a-form-model-item>
      <a-form-model-item label="报销支付账户号码" prop="reimbPayNo">
        <a-input v-model="form.reimbPayNo" placeholder="请输入报销支付账户号码"/>
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
import {getReimbursement, addReimbursement, updateReimbursement} from '@/api/system/reimbursement'

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
        reimbursementNo: null,
        budgetId: null,
        affiliatedUnit: null,
        affiliatedUnitId: null,
        affiliatedPerson: null,
        affiliatedPersonId: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        agencyLogo: null,
        expenseDept: null,
        abstract: null,
        reimbAmt: null,
        invoiceNum: null,
        image: null,
        uploadTime: null,
        payType: null,
        reimbPayName: null,
        reimbPayBank: null,
        reimbPayNo: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          {required: true, message: '项目id不能为空', trigger: 'blur'}
        ],
        contractId: [
          {required: true, message: '合同ID不能为空', trigger: 'blur'}
        ],
        resultProjId: [
          {required: true, message: '结算项目id不能为空', trigger: 'blur'}
        ],
        reimbursementNo: [
          {required: true, message: '费用报销单据编号不能为空', trigger: 'blur'}
        ],
        budgetId: [
          {required: true, message: '预算科目ID不能为空', trigger: 'blur'}
        ],
        handler: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        handlerId: [
          {required: true, message: '经办人id不能为空', trigger: 'blur'}
        ],
        expenseDept: [
          {required: true, message: '费用部门不能为空', trigger: 'blur'}
        ],
        abstract: [
          {required: true, message: '摘要不能为空', trigger: 'blur'}
        ],
        reimbAmt: [
          {required: true, message: '报销金额不能为空', trigger: 'blur'}
        ],
        invoiceNum: [
          {required: true, message: '发票张树不能为空', trigger: 'blur'}
        ],
        image: [
          {required: true, message: '发票影像：存文件路径不能为空', trigger: 'blur'}
        ],
        uploadTime: [
          {required: true, message: '上传时间不能为空', trigger: 'blur'}
        ],
        payType: [
          {required: true, message: '支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付不能为空', trigger: 'change'}
        ],
        reimbPayName: [
          {required: true, message: '报销支付账户名称不能为空', trigger: 'blur'}
        ],
        reimbPayBank: [
          {required: true, message: '报销支付账户开户行不能为空', trigger: 'blur'}
        ],
        reimbPayNo: [
          {required: true, message: '报销支付账户号码不能为空', trigger: 'blur'}
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
        reimbursementNo: null,
        budgetId: null,
        affiliatedUnit: null,
        affiliatedUnitId: null,
        affiliatedPerson: null,
        affiliatedPersonId: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        agencyLogo: null,
        expenseDept: null,
        abstract: null,
        reimbAmt: null,
        invoiceNum: null,
        image: null,
        uploadTime: null,
        payType: null,
        reimbPayName: null,
        reimbPayBank: null,
        reimbPayNo: null
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
      getReimbursement(id).then(response => {
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
            updateReimbursement(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addReimbursement(this.form).then(response => {
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
