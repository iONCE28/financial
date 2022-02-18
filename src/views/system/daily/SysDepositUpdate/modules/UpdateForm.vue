<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">

      <a-row>
        <a-col :span="12">
          <a-form-model-item label="押金金额" prop="depAmt">
            <a-input v-model="form.depAmt" type="number" placeholder="请输入押金金额"/>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="押金金额大写" prop="depAmtCheck">
            <a-input disabled v-model="form.depAmtCheck" placeholder="请输入押金金额"/>

          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="押金日期" prop="depTime">
        <a-date-picker style="width: 100%" v-model="form.depTime" format="YYYY-MM-DD" allow-clear/>
      </a-form-model-item>

      <a-form-model-item label="备注" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入备注"/>
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
import {getSysDepositUpdate, addSysDepositUpdate, updateSysDepositUpdate} from '@/api/system/SysDepositUpdate'
import {capitalAmount} from "@/utils/util";
import moment from "moment";

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
        depId: null,
        depMaxType: null,
        depMinType: null,
        depAmt: null,
        depTime: null,
        depStatus: 0,
        remark: null,
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        depAmt: [
          {required: true, message: '押金金额不能为空', trigger: 'blur'}
        ], depTime: [
          {required: true, message: '发生日期不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  filters: {},
  created() {
  },
  computed: {},
  watch: {
    "form.depAmt": {
      handler(newVal, oldVal) {
        if (newVal != oldVal) {
          this.form.depAmtCheck = capitalAmount(newVal)
        }
      },
      immediate: true
    }
  },
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
      const depId = this.form.depId
      this.form = {
        id: null,
        depId: depId,
        depMaxType: null,
        depMinType: null,
        depAmt: null,
        depTime: null,
        depStatus: 0,
        remark: null,
      }
    },
    /** 新增按钮操作 */
    handleAdd(record) {
      this.reset()
      this.formType = 1
      this.open = true
      //押金编号
      this.form.depId = record.id
      this.formTitle = record.depMaxType == 1 ? "清退" : "退回"
    },
    /** 修改按钮操作 */
    handleUpdate(row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getSysDepositUpdate(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      if (this.form.depTime instanceof moment) {
        this.form.depTime = this.form.depTime.format("YYYY-MM-DD")
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined && this.form.id !== null) {
            updateSysDepositUpdate(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addSysDepositUpdate(this.form).then(response => {
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
