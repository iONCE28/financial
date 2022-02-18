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
        <a-select  v-model="form.materialStatus" style="width: 100%" allow-clear>
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
       <a-form-model-item label="经办人" prop="handler">
           <a-input v-model="form.handler" placeholder="请输入"/>
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
            确定
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
import {getUpdate} from '@/api/material/update'
import {listStatus} from "@/api/material/status";
import { treeselect } from '@/api/system/dept'
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
        deptId:null
      },
      // 1增加,2修改
    //   formType: 1,
      open: false,
      typeList: []
    }
  },
  filters: {},
  created() {
    listStatus().then(response => {
      this.typeList = response.rows
    }),
    treeselect().then(response => {
        this.deptOptions = response.data
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
    },
    submitForm() {
        this.open = false
    },

    //详情
    handleDetail(row, ids) {
      const id = row ? row.id : ids
      getUpdate(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '详情'
      })
    },
  }
}
</script>
