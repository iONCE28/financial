<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="物料id" prop="materialId">
        <a-input v-model="form.materialId" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="项目名称" prop="projName">
        <a-input v-model="form.projName" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="变更单号" prop="materialNo">
        <a-input v-model="form.materialNo" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="状态" prop="materialStatus">
        <a-select placeholder="请选择物料状态" v-model="form.materialStatus" style="width: 100%" allow-clear>

          <a-select-option :value="item.statusNo.toString()" v-for="item in typeList" :key="item.id">
            {{ item.name }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
      <a-form-model-item label="变更数量" prop="num">
        <a-input v-model="form.num" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="部门" prop="deptId">
        <a-tree-select
          v-model="form.deptId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="deptOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
          @change="change"
        >
        </a-tree-select>
        </a-form-model-item>
       <a-form-model-item label="经办人" prop="handlerId">
            <a-select placeholder="经办人" v-model="form.handlerId" style="width: 100%">
          <a-select-option :value="item.staffId" v-for="item in depts" :key="item.staffId">
            {{ item.staffName }}
          </a-select-option>

        </a-select>
      </a-form-model-item>
      <a-form-model-item label="经办人电话" prop="handlerPhone">
        <a-input v-model="form.handlerPhone" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-textarea v-model="form.remark" placeholder="请输入简单的摘要信息，如：因物料老化报损"/>
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
import {addUpdate, getUpdate, updateUpdate} from '@/api/material/update'
import {listStatus} from "@/api/material/status";
import { treeselect } from '@/api/system/dept'
import { listStaffdept } from '@/api/system/staff'
import { Modal } from 'ant-design-vue'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      loading: false,
      formTitle: '',
      replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
      deptOptions: [{
        id: 0,
        label: '',
        children: []
      }],
      depts: [],
      // 表单参数
      form: {
        id: null,
        projId: null,
        materialId: null,
        materialNo: null,
        materialStatus: null,
        num: null,
        updateTime: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        delFlag: '0',
        startAmt: null,
        handlerPhone: null,
        projName: null,
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        projId: [
          {required: true, message: '项目id不能为空', trigger: 'blur'}
        ],
        materialId: [
          {required: true, message: '物料id不能为空', trigger: 'blur'}
        ],
        materialNo: [
          {required: true, message: '变更单号不能为空', trigger: 'blur'}
        ],
        materialStatus: [
          {required: true, message: '状态不能为空', trigger: 'blur'}
        ],
        num: [
          {required: true, message: '变更数量不能为空', trigger: 'blur'}
        ],
        remark: [
          {required: true, message: '说明:简单的摘要信息，如：因物料老化报损不能为空', trigger: 'blur'}
        ],
        deptId: [
          {required: true, message: '部门不能为空', trigger: 'blur'}
        ],
        handlerId: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        handlerPhone: [
          { required: true, message: '经办人电话不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请正确填写手机号',
            trigger: 'blur'
          }
        ],
      },
      typeList: []
    }
  },
  filters: {},
  created() {
    console.log(this.form.materialId, "---")
    listStatus().then(response => {
      this.typeList = response.rows
    })
    this.getTreeselect()
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    change(value) {
      listStaffdept({deptId:value}).then(res => {
          this.depts = res
      })
    },
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
    reset(row,rows) {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        materialId: row,
        materialNo: null,
        materialStatus: null,
        num: null,
        updateTime: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        delFlag: '0',
        startAmt: null,
        handlerPhone: null,
        projName: rows
      }
    },
    /** 新增按钮操作 */
    handleAdd(row,rows) {
      console.log(row,rows)
      this.reset(row,rows)
      this.formType = 1
      this.open = true
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate(row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getUpdate(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
       Modal.confirm({
        title: '提示',
        content: '是否提交数据',
        onOk: () => {
          return this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined && this.form.id !== null) {
            updateUpdate(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addUpdate(this.form).then(response => {
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
        },
        onCancel () {}
      })
    }
  }
}
</script>
