<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入"/>
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
      <a-form-model-item label="修改时间" prop="updateTime">
        <a-input v-model="form.updateTime" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="说明" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入简单的摘要信息，如：因物料老化报损"/>
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-input v-model="form.handler" placeholder="请输入"/>
      </a-form-model-item>
      <a-form-model-item label="经办人id" prop="handlerId">
        <a-input v-model="form.handlerId" placeholder="请输入"/>
      </a-form-model-item>
      <!--            <a-form-model-item label="预留字段1" prop="reserveOne">
                    <a-input v-model="form.reserveOne" placeholder="请输入" />
                  </a-form-model-item>
                  <a-form-model-item label="预留字段2" prop="reserveTwo">
                    <a-input v-model="form.reserveTwo" placeholder="请输入" />
                  </a-form-model-item>
                  <a-form-model-item label="预留字段3" prop="reserveThree">
                    <a-input v-model="form.reserveThree" placeholder="请输入" />
                  </a-form-model-item>-->
      <a-form-model-item label="费用报销日期" prop="createTime">
        <a-input v-model="form.createTime" placeholder="请输入"/>
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
        projId: null,
        materialId: null,
        materialNo: null,
        materialStatus: '0',
        num: null,
        updateTime: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        delFlag: null
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
        handler: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        handlerId: [
          {required: true, message: '经办人id不能为空', trigger: 'blur'}
        ],
        /*   reserveOne: [
             { required: true, message: '预留字段1不能为空', trigger: 'blur' }
           ],
           reserveTwo: [
             { required: true, message: '预留字段2不能为空', trigger: 'blur' }
           ],
           reserveThree: [
             { required: true, message: '预留字段3不能为空', trigger: 'blur' }
           ],*/
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
      const materialId = this.form.materialId
      this.form = {
        id: null,
        projId: null,
        materialId: materialId,
        materialNo: null,
        materialStatus: '0',
        num: null,
        updateTime: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
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
      getUpdate(id).then(response => {
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
    }
  }
}
</script>
