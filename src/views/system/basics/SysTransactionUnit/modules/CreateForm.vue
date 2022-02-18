<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="类别" prop="type">
        <a-select placeholder="请选择类别" v-model="form.type">
          <a-select-option :value="0">单位</a-select-option>
          <a-select-option :value="1">个人</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="来往名称" prop="name">
        <a-input v-model="form.name" placeholder="请输入来往名称"/>
      </a-form-model-item>
      <a-form-model-item label="往来部门" prop="deptId">
        <a-tree-select
          v-model="form.deptId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="deptOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
        >
        </a-tree-select>
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
import {addSysTransactionUnit, getSysTransactionUnit, updateSysTransactionUnit} from '@/api/system/SysTransactionUnit'
import { treeselect } from '@/api/system/dept'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      deptOptions: [{
        id: 0,
        label: '',
        children: []
      }],
          replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        type: null,
        name: null,
        updateTime: null,
        createTime: null,
        delFlag: null,
        deptId: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        type: [
          {required: true, message: '类别:0：单位，1：个人不能为空', trigger: 'change'}
        ],
        name: [
          {required: true, message: '来往名称不能为空', trigger: 'blur'}
        ],
        deptId: [{
            required: true,
            message: '部门不能为空',
            trigger: 'blur'
          }],
      }
    }
  },
  filters: {},
  created() {
    this.getTreeselect()
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    getTreeselect () {
      treeselect().then(response => {
        this.deptOptions = response.data
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
        type: null,
        name: null,
        updateTime: null,
        createTime: null,
        delFlag: null,
        deptId: null
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
      getSysTransactionUnit(id).then(response => {
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
            updateSysTransactionUnit(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addSysTransactionUnit(this.form).then(response => {
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
