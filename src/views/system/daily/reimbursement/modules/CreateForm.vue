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
      <a-form-model-item label="结算项目" prop="resultProjId">
        <a-select placeholder="请选择项目" v-model="form.resultProjId" @select="handleProj">
          <a-select-option :value="item.id" v-for="item in projsList" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
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
      <!--      <a-form-model-item label="关联单位id" prop="affiliatedUnitId">-->
      <!--        <a-input v-model="form.affiliatedUnitId" placeholder="请输入关联单位id"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="关联个人" prop="affiliatedPerson">
        <a-input v-model="form.affiliatedPerson" placeholder="请输入关联个人"/>
      </a-form-model-item>
      <!--      <a-form-model-item label="关联个人id" prop="affiliatedPersonId">-->
      <!--        <a-input v-model="form.affiliatedPersonId" placeholder="请输入关联个人id"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注"/>
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-input v-model="form.handler" placeholder="请输入经办人"/>
      </a-form-model-item>
      <!--      <a-form-model-item label="经办人id" prop="handlerId">-->
      <!--        <a-input v-model="form.handlerId" placeholder="请输入经办人id"/>-->
      <!--      </a-form-model-item>-->

      <a-form-model-item label="代办标识" prop="agencyLogo">

        <a-radio-group v-model="form.agencyLogo" default-value="0" button-style="solid">
          <a-radio-button :value="0" default>无代办</a-radio-button>
          <a-radio-button :value="1">代办</a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="费用部门" prop="expenseDept">
        <a-input v-model="form.expenseDept" placeholder="请输入费用部门"/>
      </a-form-model-item>
      <a-form-model-item label="摘要" prop="abstract">
        <a-input v-model="form.abstract" placeholder="请输入内容" type="textarea" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="报销金额" prop="reimbAmt">
        <a-input v-model="form.reimbAmt" type="number" placeholder="请输入报销金额"/>
      </a-form-model-item>
      <a-form-model-item label="发票张树" prop="invoiceNum">
        <a-input v-model="form.invoiceNum" placeholder="请输入发票张树"/>
      </a-form-model-item>
      <a-form-model-item label="发票影像" prop="image">
        <file-upload v-model="form.image" type="image"></file-upload>
      </a-form-model-item>
      <a-form-model-item label="上传时间" prop="uploadTime">
        <a-date-picker style="width: 100%" v-model="form.uploadTime" format="YYYY-MM-DD" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="支付类别" prop="payType">
        <a-select placeholder="请选择支付类别" v-model="form.payType">
          <a-select-option :value="0">支付账户</a-select-option>
          <a-select-option :value="1">支付报销</a-select-option>
          <a-select-option :value="2">冲销借款</a-select-option>
          <a-select-option :value="3">冲销预付</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="报销支付账户名称" prop="reimbPayName">
        <a-select v-model="form.reimbPayName" placeholder="请选择支付账户" style="width: 100%" allow-clear
                  @change="payAccountChange">
          <a-select-option :value="item.accountName" :key="item.id" v-for="(item,index) in PayaccountList">
            {{ item.accountName }}
          </a-select-option>
        </a-select>
        <!--        <a-input v-model="form.reimbPayName" placeholder="请输入报销支付账户名称"/>-->
      </a-form-model-item>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="账户开户行" prop="reimbPayBank">
            <a-input disabled v-model="form.reimbPayBank" placeholder="请选择支付账户"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="账户号码" prop="reimbPayNo">
            <a-input disabled v-model="form.reimbPayNo" placeholder="请选择支付账户"/>
          </a-form-model-item>
        </a-col>
      </a-row>
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
import {addReimbursement, getReimbursement, updateReimbursement} from '@/api/system/reimbursement'
import {projsByUser} from "@/api/system/proj";
import {contractSByProj} from "@/api/system/contract";
import {listSysPayaccount} from "@/api/system/SysPayaccount";

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      PayaccountList: [],
      contractsList: [],
      projsList: [],
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
        agencyLogo: 0,
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
          {required: true, message: '项目不能为空', trigger: 'blur'}
        ],
        contractId: [
          {required: true, message: '合同不能为空', trigger: 'blur'}
        ],
        resultProjId: [
          {required: true, message: '结算项目不能为空', trigger: 'blur'}
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
          {required: true, message: '支付类别不能为空', trigger: 'change'}
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
    projsByUser().then(response => {
      this.projsList = response;
    })
    listSysPayaccount().then(response => {
      this.PayaccountList = response.rows;
    })
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    payAccountChange(value) {
      for (let i = 0; i < this.PayaccountList.length; i++) {
        if (this.PayaccountList[i].accountName == value) {
          this.form.reimbPayBank = this.PayaccountList[i].accountBank
          this.form.reimbPayNo = this.PayaccountList[i].accountPhone
        }
      }
    },
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
        agencyLogo: 0,
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
