<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="合同id" prop="contractId">
        <a-input v-model="form.contractId" placeholder="请输入合同id"/>
      </a-form-model-item>
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入项目id"/>
      </a-form-model-item>
      <a-form-model-item label="合同名称" prop="contractName">
        <a-input v-model="form.contractName" placeholder="请输入合同名称"/>
      </a-form-model-item>
      <a-form-model-item label="资金流水号" prop="colpayNo">
        <a-input v-model="form.colpayNo" placeholder="请输入资金流水号"/>
      </a-form-model-item>
      <a-form-model-item label="收款时间" prop="colpayTime">
        <a-date-picker style="width: 100%" v-model="form.colpayTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="收款金额" prop="colpayAmt">
        <a-input v-model="form.colpayAmt" placeholder="请输入收款金额"/>
      </a-form-model-item>
      <a-form-model-item label="收款说明" prop="colpayDec">
        <a-input v-model="form.colpayDec" placeholder="请输入收款说明"/>
      </a-form-model-item>
      <a-form-model-item label="收款来源" prop="colpaySource">
        <a-input v-model="form.colpaySource" placeholder="请输入收款来源"/>
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
import {addColpaydec, getColpaydec, updateColpaydec} from '@/api/system/colpaydec'

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
        contractId: null,
        projId: null,
        contractName: null,
        colpayNo: null,
        colpayTime: null,
        colpayAmt: null,
        colpayDec: null,
        colpaySource: null,
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
        colpayTime: [
          {required: true, message: '收款时间不能为空', trigger: 'blur'}
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
        contractId: null,
        projId: null,
        contractName: null,
        colpayNo: null,
        colpayTime: null,
        colpayAmt: null,
        colpayDec: null,
        colpaySource: null,
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
      getColpaydec(id).then(response => {
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
            updateColpaydec(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addColpaydec(this.form).then(response => {
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
