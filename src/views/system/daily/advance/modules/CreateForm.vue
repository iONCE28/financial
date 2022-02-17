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
        <a-select placeholder="请选择项目" v-model="form.resultProjId">
          <a-select-option :value="item.id" v-for="item in projs" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="预付账款单据编号" prop="advanceNo">
        <a-input v-model="form.advanceNo" placeholder="请输入预付账款单据编号"/>
      </a-form-model-item>
      <a-form-model-item label="预付账款类别" prop="advanceType">
        <a-radio-group v-model="form.advanceType" button-style="solid">
          <a-radio-button value="0">协议支付</a-radio-button>
          <a-radio-button value="1">预付退回</a-radio-button>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="预付账款付款方" prop="advancePayer">
        <a-select v-model="form.advancePayer" placeholder="请选择预付账款收款方" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接支付账户接口</a-select-option>
          <a-select-option value="1"> #todo 对接支付账户接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <!--      <a-form-model-item label="预付账款付款方id" prop="advancePayId">-->
      <!--        <a-input v-model="form.advancePayId" placeholder="请输入预付账款付款方id"/>-->
      <!--      </a-form-model-item>-->
      <a-form-model-item label="预付账款收款方" prop="advanceColer">
        <a-select v-model="form.advanceColer" placeholder="请选择预付账款收款方" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接支付账户接口</a-select-option>
          <a-select-option value="1"> #todo 对接支付账户接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <!--      <a-form-model-item label="预付账款收款方id" prop="advanceColId">-->
      <!--        <a-input v-model="form.advanceColId" placeholder="请输入预付账款收款方id"/>-->
      <!--      </a-form-model-item>-->

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="预付账款发生金额" prop="advanceAmt">
            <a-input v-model="form.advanceAmt" type="number" placeholder="请输入预付账款发生金额"/>

          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="金额大写" prop="advanceAmtCheck">
            <a-input disabled v-model="form.advanceAmtCheck" placeholder="请输入预付账款发生金额"/>

          </a-form-model-item>
        </a-col>
      </a-row>

      <a-form-model-item label="预付账款发生日期" prop="advanceOpenTime">
        <a-date-picker style="width: 100%" v-model="form.advanceOpenTime" format="YYYY-MM-DD" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="支付账户" prop="payAccount">
        <a-select v-model="form.payAccount" placeholder="请选择支付账户" style="width: 100%" allow-clear>
          <a-select-option value="0"> #todo 对接支付账户接口</a-select-option>
          <a-select-option value="1"> #todo 对接支付账户接口</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="账户开户行" prop="depAmt">
            <a-input disabled v-model="form.depAmt" placeholder="请选择支付账户"/>

          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="账户号码" prop="depAmtCheck">
            <a-input disabled v-model="form.depAmtCheck" placeholder="请选择支付账户"/>

          </a-form-model-item>
        </a-col>
      </a-row>


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
        <a-select v-model="form.handler" placeholder="请选择押金经办人" style="width: 100%" allow-clear>
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
import {addAdvance, getAdvance, updateAdvance} from '@/api/system/advance'
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
        resultProjId: null,
        advanceNo: null,
        advanceType: null,
        advancePayer: null,
        advancePayId: null,
        advanceColer: null,
        advanceColId: null,
        advanceAmt: null,
        advanceAmtCheck: null,
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
          {required: true, message: '项目不能为空', trigger: 'blur'}
        ],
        contractId: [
          {required: true, message: '合同不能为空', trigger: 'blur'}
        ],
        resultProjId: [
          {required: true, message: '结算项目不能为空', trigger: 'blur'}
        ],
        advanceNo: [
          {required: true, message: '预付账款单据编号不能为空', trigger: 'blur'}
        ],
        advanceType: [
          {required: true, message: '预付账款类别不能为空', trigger: 'change'}
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
    projsByUser().then(response => {
      this.projs = response;
    })
  },
  computed: {},
  watch: {
    "form.advanceAmt": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.form.advanceAmtCheck = capitalAmount(newVal)
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
