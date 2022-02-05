<template>
  <!-- 增加修改 -->
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>物料管理变更信息</b>
    </a-divider>
    <a-form-model ref="form" :model="form">
      <a-form-model-item label="项目id" prop="projId">
        <a-input v-model="form.projId" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="变更单号" prop="materialNo">
        <a-input v-model="form.materialNo" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="状态:0:入库,1:出库" prop="materialStatus">
        <a-input v-model="form.materialStatus" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="变更数量" prop="num">
        <a-input v-model="form.num" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="修改时间" prop="updateTime">
        <a-input v-model="form.updateTime" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="说明:简单的摘要信息，如：因物料老化报损" prop="remark">
        <a-input v-model="form.remark" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-input v-model="form.handler" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="经办人id" prop="handlerId">
        <a-input v-model="form.handlerId" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="预留字段1" prop="reserveOne">
        <a-input v-model="form.reserveOne" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="预留字段2" prop="reserveTwo">
        <a-input v-model="form.reserveTwo" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="预留字段3" prop="reserveThree">
        <a-input v-model="form.reserveThree" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="费用报销日期" prop="createTime">
        <a-input v-model="form.createTime" placeholder="请输入" />
      </a-form-model-item>
      <a-form-model-item label="删除状态 0. 正常 1. 删除" prop="delFlag">
        <a-input v-model="form.delFlag" placeholder="请输入" />
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

export default {
  name: 'CreateSubForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      formTitle: '增加',
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
      open: false
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
    handleAdd () {
      this.open = true
      this.reset()
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$emit('add', this.form)
      this.open = false
    }
  }
}
</script>
