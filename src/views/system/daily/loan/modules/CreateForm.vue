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
      <a-form-model-item label="单据编号" prop="resultContractNo">
        <a-input v-model="form.resultContractNo" placeholder="请输入个人借款单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="借款类别" prop="loanType">
        <a-select placeholder="请选择借款类别" v-model="form.loanType">
          <a-select-option :value="item.value" :key="item.value" v-for="(item) in loanTypeList ">{{
              item.label
            }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="借款人" prop="borrowerId">
        <a-select v-model="form.borrowerId" placeholder="请选择借款人" style="width: 100%" allow-clear
                  @change="handleBorrowerIdChange">
          <a-select-option :value="item.staffId" :key="item.staffId" v-for="(item,index) in StaffList"> {{
              item.staffName
            }}
          </a-select-option>
        </a-select>
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
      <a-form-model-item label="个人借款事由摘要" prop="abstracted">
        <a-input v-model="form.abstracted" placeholder="请输入内容" type="textarea" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="支付账户" prop="payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择支付账户" style="width: 100%" allow-clear
                  @change="payAccountChange">
          <a-select-option :value="item.id" :key="item.id" v-for="(item,index) in PayaccountList">
            {{ item.accountName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="账户开户行" prop="payAccountBank">
            <a-input disabled v-model="form.payAccountBank" placeholder="请选择支付账户"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="账户号码" prop="payAccountPhone">
            <a-input disabled v-model="form.payAccountPhone" placeholder="请选择支付账户"/>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注"/>
      </a-form-model-item>
      <!--      <a-form-model-item label="经办人" prop="handler">
              <a-select v-model="form.handler" placeholder="请选择经办人" style="width: 100%" allow-clear>
                <a-select-option value="0"> #todo 对接内部员工接口</a-select-option>
                <a-select-option value="1"> #todo 对接内部员工接口</a-select-option>
              </a-select>
            </a-form-model-item>-->

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
import {listStaff} from "@/api/system/staff";
import {listSysPayaccount} from "@/api/system/SysPayaccount";

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      PayaccountList: [],
      StaffList: [],
      loanTypeList: [
        {value: 0, label: "支付借款"},
        {value: 1, label: "报销借款"},
        {value: 2, label: "归还借款"},
      ],
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
          {required: true, message: '项目不能为空', trigger: 'blur'}
        ],
        resultContractNo: [
          {required: true, message: '单据编号不能为空', trigger: 'blur'}
        ],
        loanType: [
          {required: true, message: '借款类别', trigger: 'change'}
        ],
        borrower: [
          {required: true, message: '借款人', trigger: 'blur'}
        ],
        borrowerId: [
          {required: true, message: '借款人不能为空', trigger: 'blur'}
        ],
        amount: [
          {required: true, message: '借款发生金额不能为空', trigger: 'blur'}
        ],
        payAccount: [
          {required: true, message: '支付账户不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  filters: {},
  created() {
    projsByUser().then(response => {
      this.projsList = response;
    })
    listSysPayaccount().then(response => {
      this.PayaccountList = response.rows;
    })
    listStaff().then(response => {

      this.StaffList = response.rows;
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
    payAccountChange(value) {
      for (let i = 0; i < this.PayaccountList.length; i++) {
        if (this.PayaccountList[i].id == value) {
          this.form.payAccountBank = this.PayaccountList[i].accountBank
          this.form.payAccountPhone = this.PayaccountList[i].accountPhone
        }
      }
    },
    handleBorrowerIdChange(value) {
      for (let i = 0; i < this.StaffList.length; i++) {
        if (this.StaffList[i].staffId == value) {
          this.form.borrower = this.StaffList[i].staffName
        }
      }
    },
    handleProj(value) {
      this.form.projId = value;
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
