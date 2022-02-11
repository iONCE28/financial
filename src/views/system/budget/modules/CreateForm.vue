<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="上级科目" prop="parentNo">
        <a-tree-select
          v-model="form.parentNo"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="budgetOptions"
          placeholder="请选择"
          :replaceFields="{children:'children', title:'subjectName', key:'id', value: 'id' }"
          tree-default-expand-all
        >
        </a-tree-select>
      </a-form-model-item>
      <a-form-model-item label="科目名称" prop="subjectName">
        <a-input v-model="form.subjectName" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="排序" prop="subNo">
        <a-input-number v-model="form.subNo" :min="0" style="width: 100%"/>
      </a-form-model-item>
      <a-form-model-item label="科目类别：" prop="subType">
        <a-select placeholder="请选择" v-model="form.subType">
          <a-select-option value="0">收入科目</a-select-option>
            <a-select-option value="1">支出科目</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="status">
        <a-radio-group v-model="form.status" button-style="solid">
          <a-radio-button v-for="(d, index) in statusOptions" :key="index" :value="d.dictValue">{{ d.dictLabel }}</a-radio-button>
        </a-radio-group>
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

import { getbudget, addbudget, updatebudget } from '@/api/system/budget'

export default {
  name: 'CreateForm',
  props: {
    statusOptions: {
      type: Array,
      required: true
    },
    budgetOptions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: undefined,
        parentNo: undefined,
        subjectName: undefined,
        subNo: 0,
        status: '0',
        subType: '0'
      },
      open: false,
      rules: {
        parentNo: [{ required: true, message: '上级科目不能为空', trigger: 'blur' }],
        subjectName: [{ required: true, message: '科目名称不能为空', trigger: 'blur' }],
        subNo: [{ required: true, message: '排序不能为空', trigger: 'blur' }],
      }
    }
  },
  filters: {
  },
  created () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    onClose () {
      this.open = false
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.form = {
        id: undefined,
        parentNo: undefined,
        subjectName: undefined,
        subNo: 0,
        status: '0',
        subType: '0'
      }
    },
     /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      if (row !== undefined) {
        this.form.parentNo = row.id
      }
      this.open = true
      this.formTitle = '添加科目'
      this.$emit('select-tree')
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset()
      const id = row.id
      getbudget(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改科目'
      })
      this.$emit('select-tree', row)
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updatebudget(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addbudget(this.form).then(response => {
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
