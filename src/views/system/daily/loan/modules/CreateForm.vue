<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目" prop="projId">
        <a-select placeholder="请选择项目" v-model="form.projId" @select="handleProj">
          <a-select-option :value="item.id" v-for="item in projsList" :key="item.id">
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
      <a-form-model-item label="结算项目" prop="resultContractId">
        <a-select placeholder="请选择项目" v-model="form.resultContractId" @select="handleProj">
          <a-select-option :value="item.id" v-for="item in projsList" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="个人借款单据编号" prop="resultContractNo">
        <a-input v-model="form.resultContractNo" placeholder="请输入个人借款单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="个人借款类别" prop="loanType">
        <a-select placeholder="请选择个人借款类别" v-model="form.loanType">
          <a-select-option :value="0" :key="0">支付借款</a-select-option>
          <a-select-option :value="2" :key="2">报销借款</a-select-option>
          <a-select-option :value="3" :key="3">归还借款</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="借款人" prop="borrower">
        <a-select v-model="form.borrower" placeholder="请选择借款人" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接内部员工接口</a-select-option>
          <a-select-option value="1"> #todo 对接内部员工接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <!--      <a-form-model-item label="借款人id：关联个人ID支持费用报销的联查预付款~" prop="borrowerId">-->
      <!--        <a-input v-model="form.borrowerId" placeholder="请输入借款人id：关联个人ID支持费用报销的联查预付款~"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="个人借款事由摘要" prop="abstracted">
        <a-input v-model="form.abstracted" placeholder="请输入内容" type="textarea" allow-clear/>
      </a-form-model-item>

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="个人借款发生金额" prop="amount">
            <a-input v-model="form.amount" type="number" placeholder="请输入个人借款发生金额"/>

          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="金额大写" prop="amountCheck">
            <a-input disabled v-model="form.amountCheck" placeholder="请输入个人借款发生金额"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="支付账户" prop="payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择支付账户" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接支付账户接口</a-select-option>
          <a-select-option value="1"> #todo 对接支付账户接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="冲销状态" prop="writeoffStatus">
        <a-radio-group v-model="form.writeoffStatus" button-style="solid">
          <a-radio-button value="0">未冲销</a-radio-button>
          <a-radio-button value="1">已冲销</a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注"/>
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-select v-model="form.handler" placeholder="请选择经办人" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接内部员工接口</a-select-option>
          <a-select-option value="1"> #todo 对接内部员工接口</a-select-option>
        </a-select>
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
import {addLoan, getLoan, updateLoan} from '@/api/system/loan'
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
      projsList: [],
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        contractId: null,
        resultContractId: null,
        resultContractNo: null,
        loanType: null,
        borrower: null,
        borrowerId: null,
        abstracted: null,
        amount: null,
        amountCheck: null,
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
          {required: true, message: '项目ID不能为空', trigger: 'blur'}
        ],
        resultContractNo: [
          {required: true, message: '个人借款单据编号不能为空', trigger: 'blur'}
        ],
        loanType: [
          {required: true, message: '0：支付借款，2：报销借款，3：归还借款不能为空', trigger: 'change'}
        ],
        borrower: [
          {required: true, message: '借款人:对内借款，借款人从内部人员中取不能为空', trigger: 'blur'}
        ],
        borrowerId: [
          {required: true, message: '借款人id：关联个人ID支持费用报销的联查预付款~不能为空', trigger: 'blur'}
        ],
        amount: [
          {required: true, message: '个人借款发生金额不能为空', trigger: 'blur'}
        ],
        payAccount: [
          {required: true, message: '支付账户不能为空', trigger: 'blur'}
        ],
        writeoffStatus: [
          {required: true, message: '冲销状态0：未冲销；1：已冲销不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  filters: {},
  created() {
    projsByUser().then(response => {
      this.projsList = response;
    })
  },
  computed: {},
  watch: {
    "form.amount": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.form.amountCheck = capitalAmount(newVal)
        }
      },
      immediate: true
    },
  },
  mounted() {
  },
  methods: {
    handleProj(value) {
      this.queryParam.projId = value;
      contractSByProj(value).then(response => {
        this.contractsList = response;
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
        projId: null,
        contractId: null,
        resultContractId: null,
        resultContractNo: null,
        loanType: null,
        borrower: null,
        borrowerId: null,
        abstracted: null,
        amount: null,
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
      getLoan(id).then(response => {
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
            updateLoan(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addLoan(this.form).then(response => {
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
