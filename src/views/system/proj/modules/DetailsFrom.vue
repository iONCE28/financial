<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="项目名称" prop="name">
        <a-input v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="项目编号" prop="number">
        <a-input v-model="form.number"/>
      </a-form-model-item>
      <a-form-model-item label="项目性质：" prop="nature">
        <a-select v-model="form.nature">
            <a-select-option value="0">新建</a-select-option>
            <a-select-option value="1">在建</a-select-option>
            <a-select-option value="2">维护</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="执行状态：" prop="status">
        <a-select placeholder="请选择" v-model="form.status">
          <a-select-option value="0">未开始</a-select-option>
            <a-select-option value="1">正在进行</a-select-option>
            <a-select-option value="2">已验收</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="场次" prop="showNum">
        <a-input v-model="form.showNum"/>
      </a-form-model-item>
      <a-form-model-item label="页数" prop="pageNum">
        <a-input v-model="form.pageNum"/>
      </a-form-model-item>
      <a-form-model-item label="集数" prop="setNum">
        <a-input v-model="form.setNum"/>
      </a-form-model-item>
      <a-form-model-item label="开机时间" prop="onTime">
        <a-date-picker style="width: 100%" v-model="form.onTime" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss" allow-clear />
      </a-form-model-item>
      <a-form-model-item label="关机时间" prop="offTime">
        <a-date-picker style="width: 100%" v-model="form.offTime" format="YYYY-MM-DD HH:mm:ss"
                       valueFormat="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="项目周期数" prop="cycle">
        <a-input v-model="form.cycle"/>
      </a-form-model-item>
      <a-form-model-item label="投资方" prop="investor">
        <a-input v-model="form.investor"/>
      </a-form-model-item>
      <a-form-model-item label="承接方" prop="undertakor">
        <a-input v-model="form.undertakor"/>
      </a-form-model-item>
      <a-form-model-item label="部门" prop="depart">
        <a-tree-select
          v-model="form.depart"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="deptOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
        >
        </a-tree-select>
        </a-form-model-item>
      <a-form-model-item label="负责人" prop="dutior">
        <a-input v-model="form.dutior"/>
      </a-form-model-item>
      <a-form-model-item label="负责人职称" prop="dutiorTitle">
        <a-input v-model="form.dutiorTitle"/>
      </a-form-model-item>
      <a-form-model-item label="负责人电话" prop="dutiorPhone">
        <a-input v-model="form.dutiorPhone"/>
      </a-form-model-item>
      <a-form-model-item label="项目规模" prop="scale">
        <a-input v-model="form.scale"/>
      </a-form-model-item>
      <a-form-model-item label="摘要" prop="abstracts">
        <a-textarea
      v-model="form.abstracts"
      placeholder="摘要"
      :auto-size="{ minRows: 3, maxRows: 5 }"
    />
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
  import {
    getProj,
  } from '@/api/system/proj'
  import { treeselect } from '@/api/system/dept'
  export default {
    name: 'CreateForm',
    props: {
    },
    components: {},
    data() {
      return {
          replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
          deptOptions: [{
        id: 0,
        label: '',
        children: []
      }],
          statusList:["未开始","正在进行","已验收"],
        loading: false,
        formTitle: '',
        // 表单参数
        form: {
          id: null,
          name: null,
          number: null,
          nature: '0',
          status: '0',
          abstracts: null,
          file: null,
          showNum: null,
          pageNum: null,
          setNum: null,
          onTime: null,
          offTime: null,
          cycle: null,
          investor: null,
          undertakor: null,
          depart: null,
          dutior: null,
          dutiorTitle: null,
          dutiorPhone: null,
          createTime: null,
          updateTime: null,
          delFlag: '0',
          scale: null,
          uploadTime: null,
          createBy: null,
          updateBy: null
        },
        open: false,
        rules: {
        }
      }
    },
    filters: {},
    created() {
        this.getTreeselect()
    },
    computed: {},
    watch: {},
    mounted() {},
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
          name: null,
          number: null,
          nature: null,
          status: null,
          abstracts: null,
          file: null,
          showNum: null,
          pageNum: null,
          setNum: null,
          onTime: null,
          offTime: null,
          cycle: null,
          investor: null,
          undertakor: null,
          depart: null,
          dutior: null,
          dutiorTitle: null,
          dutiorPhone: null,
          createTime: null,
          updateTime: null,
          delFlag: null,
          scale: null,
          uploadTime: null,
          createBy: null,
          updateBy: null
        }
      },
      handledetails(row, ids) {
        this.reset()
        const id = row ? row.id : ids
        getProj(id).then(response => {
          this.form = response.data
          this.open = true
          this.formTitle = '详情'
        })
      },
      submitForm() {
          this.open = false
      }
    }
  }
</script>