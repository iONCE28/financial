<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="收/付款到期提醒方式" prop="type">
          <a-input v-model="form.type" placeholder="请输入收款金额" />
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
import {addSysPaycolType, getSysPaycolType, updateSysPaycolType} from '@/api/system/SysPaycolType'

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
        type: null,
        updateTime: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        type: [
          {required: true, message: '"收/付款到期提醒方式', trigger: 'change'}
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
      this.$refs['form'].resetFields()
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.$refs['form'].resetFields()
      this.reset()
    },
    // 表单重置
    reset() {
      this.formType = 1
      this.form = {
        id: null,
        type: null,
        updateTime: null
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
      getSysPaycolType(id).then(response => {
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
            updateSysPaycolType(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$refs['form'].resetFields()
              this.$emit('ok')
            })
          } else {
            addSysPaycolType(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
              this.open = false
              this.$refs['form'].resetFields()
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
