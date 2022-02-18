<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
       <a-form-model-item label="关联项目" prop="projId">
       <a-select placeholder="项目" v-model="form.projId" style="width: 100%" allow-clear>

          <a-select-option :value="item.id" v-for="item in projList" :key="item.id">
            {{ item.name }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
      <a-form-model-item label="预算科目" prop="budgetId">
        <a-tree-select
          v-model="form.budgetId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="budgetOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
          @change="change"
        >
        </a-tree-select>
        </a-form-model-item>
      <!-- <a-form-model-item label="科目名称" prop="name">
        <a-select placeholder="请选择科目名称" v-model="form.name">
          <a-select-option value="">请选择字典生成</a-select-option>
        </a-select>
      </a-form-model-item> -->
      <a-form-model-item label="预算属性" prop="attribute">
        <a-select placeholder="请选择预算属性" v-model="form.attribute" style="width: 100%" allow-clear>
          <a-select-option value="收入科目">收入科目</a-select-option>
          <a-select-option value="支出科目">支出科目</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="预算金额" prop="amount">
        <a-input v-model="form.amount" placeholder="请输入预算金额"/>
      </a-form-model-item>
      <a-form-model-item label="说明" prop="interpretation">
        <a-input v-model="form.interpretation" placeholder="请输入内容" type="textarea" allow-clear/>
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
import {listAll} from '@/api/system/proj'
import { treeselect,getbudget } from '@/api/system/budget'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      budgetOptions: [{
        id: 0,
        label: '',
        children: []
      }],
      replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
      projList: [],
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
        attribute: null,
        budgetId:null,
        projName:''
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          {required: true, message: '关联项目不能为空', trigger: 'change'}
        ],
        budgetId: [
          {required: true, message: '预算科目不能为空', trigger: 'change'}
        ],
        name: [
          {required: true, message: '科目名称不能为空', trigger: 'change'}
        ],
        amount: [
          {required: true, message: '预算金额不能为空', trigger: 'blur'}
        ],
       attribute: [
          {required: true, message: '预算属性不能为空', trigger: 'blur'}
        ],
        interpretation: [
          {required: true, message: '说明不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  filters: {},
  created() {
    this.listpro()
    this.getTreeselect()
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    change(value) {
     getbudget(value).then(res=> {
     if(res.data.subType === "0") {
   this.form.attribute = "收入科目"
  } else if(res.data.subType === "1") {
       this.form.attribute = "支出科目"
    }
      })
    },
    getTreeselect () {
      treeselect().then(response => {
        this.budgetOptions = response.data
      })
    },
    listpro() {
      listAll().then(res => {
       this.projList = res.data
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
        name: null,
        amount: null,
        interpretation: null,
        updateTime: null,
        projId: null,
        attribute: null,
        budgetId:null,
        projName:''
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
