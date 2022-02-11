<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目id" prop="projId" >
        <a-input v-model="form.projId" placeholder="请输入项目id" />
      </a-form-model-item>
      <a-form-model-item label="采购的单据单号" prop="materialNo" >
        <a-input v-model="form.materialNo" placeholder="请输入采购的单据单号" />
      </a-form-model-item>
      <a-form-model-item label="物料名称" prop="name" >
        <a-input v-model="form.name" placeholder="请输入物料名称" />
      </a-form-model-item>
      <a-form-model-item label="物料单位" prop="unit" >
        <a-input v-model="form.unit" placeholder="请输入物料单位" />
      </a-form-model-item>
      <a-form-model-item label="物料型号" prop="type" >
        <a-input v-model="form.type" placeholder="请输入无聊单位" />
<!--        <a-select placeholder="请选择物料型号" v-model="form.type">-->
<!--          <a-select-option value="" >请选择字典生成</a-select-option>-->
<!--        </a-select>-->
      </a-form-model-item>
      <a-form-model-item label="物料初期余额" prop="initAmt" >
        <a-input v-model="form.initAmt" placeholder="请输入物料初期余额" />
      </a-form-model-item>
<!--      <a-form-model-item label="预留字段1" prop="reserveOne" >-->
<!--        <a-input v-model="form.reserveOne" placeholder="请输入预留字段1" />-->
<!--      </a-form-model-item>-->
<!--      <a-form-model-item label="预留字段2" prop="reserveTwo" >-->
<!--        <a-input v-model="form.reserveTwo" placeholder="请输入预留字段2" />-->
<!--      </a-form-model-item>-->
<!--      <a-form-model-item label="预留字段3" prop="reserveThree" >-->
<!--        <a-input v-model="form.reserveThree" placeholder="请输入预留字段3" />-->
<!--      </a-form-model-item>-->
<!--      <a-form-model-item label="删除状态 0. 正常 1. 删除" prop="delFlag" v-if="formType === 1">-->
<!--        <a-input v-model="form.delFlag" placeholder="请输入删除状态 0. 正常 1. 删除" />-->
<!--      </a-form-model-item>-->
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
import { getMng, addMng, updateMng } from '@/api/material/mng'
import SubTable from './SubTable'

export default {
  name: 'CreateForm',
  props: {
  },
  components: {
    SubTable
  },
  data () {
    return {
      loading: false,
      subList: [],
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        materialNo: null,
        name: null,
        unit: null,
        type: null,
        initAmt: null,
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
  mounted () {
  },
  methods: {
    onClose () {
      this.open = false
      this.subList = []
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
      this.subList = []
    },
    // 表单重置
    reset () {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        materialNo: null,
        name: null,
        unit: null,
        type: null,
        initAmt: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      }
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      this.formType = 1
      this.open = true
      this.formTitle = '添加'
    },
    /** 新增子项操作 */
    handleAddsysMaterialUpdate (row) {
      this.subList.push(row)
    },
    /** 删除子项操作 */
    handleDeletesysMaterialUpdate (index, indexs) {
      if (index !== undefined) {
        this.subList.splice(index, 1)
        return
      }
      indexs.forEach(item => {
        this.subList.splice(item, 1)
      })
    },
    /** 修改按钮操作 */
    handleUpdate (row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getMng(id).then(response => {
        this.form = response.data
        // this.subList = response.data.sysMaterialUpdateList
        this.subList = []
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.sysMaterialUpdateList = this.subList
          if (this.form.id !== undefined && this.form.id !== null) {
            updateMng(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addMng(this.form).then(response => {
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
