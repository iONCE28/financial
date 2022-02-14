<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="科目名称" prop="name">
        <a-select placeholder="请选择科目名称" v-model="form.name">
          <a-select-option value="">请选择字典生成</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="预算金额" prop="amount">
        <a-input v-model="form.amount" placeholder="请输入预算金额"/>
      </a-form-model-item>
      <a-form-model-item label="说明" prop="interpretation">
        <a-input v-model="form.interpretation" placeholder="请输入内容" type="textarea" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入项目id"/>
      </a-form-model-item>
      <a-form-model-item label="预算属性" prop="attribute">
        <a-select placeholder="请选择预算属性" v-model="form.attribute" style="width: 100%" allow-clear>
          <a-select-option value="0">收入科目</a-select-option>
          <a-select-option value="1">支出科目</a-select-option>
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
import {addSysBudgetMng, getSysBudgetMng, updateSysBudgetMng} from '@/api/system/SysBudgetMng'

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
        name: null,
        amount: null,
        interpretation: null,
        updateTime: null,
        projId: null,
        attribute: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        name: [
          {required: true, message: '科目名称不能为空', trigger: 'change'}
        ],
        amount: [
          {required: true, message: '预算金额不能为空', trigger: 'blur'}
        ],
        interpretation: [
          {required: true, message: '说明不能为空', trigger: 'blur'}
        ], attribute: [
          {required: true, message: '不能为空', trigger: 'blur'}
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
        name: null,
        amount: null,
        interpretation: null,
        updateTime: null,
        projId: null,
        attribute: null
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
      getSysBudgetMng(id).then(response => {
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
            updateSysBudgetMng(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addSysBudgetMng(this.form).then(response => {
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
