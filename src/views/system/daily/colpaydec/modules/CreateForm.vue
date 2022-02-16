<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">

      <a-form-model-item label="项目" prop="closeProj" >
        <a-select placeholder="请选择项目"  v-model="form.projId">
          <a-select-option :value="item.id" @click="selected(item.id)" v-for="item in projs" :key="item.id">
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="合同" prop="contractId" >
        <a-select placeholder="请选择合同类别" v-model="form.contractName">
          <a-select-option :value="item.constractName" @click="selectCid(item.id)" v-for="item in contracts" :key="item.id">
            {{ item.constractName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="资金流水号" prop="colpayNo">
        <a-input v-model="form.colpayNo" placeholder="请输入资金流水号"/>
      </a-form-model-item>
      <a-form-model-item label="收款时间" prop="colpayTime">
        <a-date-picker style="width: 100%" v-model="form.colpayTime" format="YYYY-MM-DD HH:mm:ss"  valueFormat="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="收款金额" prop="colpayAmt">
        <a-input v-model="form.colpayAmt" type="number" placeholder="请输入收款金额"/>
      </a-form-model-item>
      <a-form-model-item label="收款说明" prop="colpayDec">
        <a-input v-model="form.colpayDec" placeholder="请输入收款说明"/>
      </a-form-model-item>
      <a-form-model-item label="收款来源" prop="colpaySource">
        <a-input v-model="form.colpaySource" placeholder="请输入收款来源"/>
      </a-form-model-item>
      <a-form-model-item label="经办人" prop="handler">
        <a-input v-model="form.handler" @click="selectHandler(form.handler)" placeholder="请输入经办人"/>
      </a-form-model-item>


      <a-form-model-item label="收款类型" prop="contractId" >
        <a-select placeholder="请选择收款类型" v-model="form.colpayType">
          <a-select-option :value="item.id" v-for="item in colpayTypes" :key="item.id">
            {{ item.val }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="收款方式" prop="contractId" >
        <a-select placeholder="请选择收款方式" v-model="form.colpayWay" style="width: 100%" allow-clear>
          <a-select-option :value="item.id" v-for="item in colpayWays" :key="item.id">
            {{ item.val }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="收款账户名称" prop="handler">
        <a-input v-model="form.colpayName" @click="selectcolpayName(form.colpayName)" placeholder="请输入经办人"/>
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
import {addColpaydec, getColpaydec, updateColpaydec,queryColpayName,queryColpayHandler} from '@/api/system/colpaydec'
import { projsByUser } from '@/api/system/proj'
import { contractSByProj } from '@/api/system/contract'

export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
      colpayTypes: [
        {id:"0",val:"合同收款"},
        {id:"1",val:"其它收款"}],
      colpayWays: [
        {id:"0",val:"现金"},
        {id:"1",val:"银行"}],
      contracts: [],
      projs: [],
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        colpayType: null,
        colpayWay: null,
        colpayAccountId: null,
        colpayName: null,
        colpayBank: null,
        colpayPhone: null,
        contractId: null,
        projId: null,
        contractName: null,
        colpayNo: null,
        colpayTime: null,
        colpayAmt: null,
        colpayDec: null,
        colpaySource: null,
        handler: null,
        handlerId: null,
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
        colpayTime: [
          {required: true, message: '收款时间不能为空', trigger: 'blur'}
        ],
        handler: [
          {required: true, message: '经办人不能为空', trigger: 'blur'}
        ],
        handlerId: [
          {required: true, message: '经办人id不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  filters: {},
  created() {
    projsByUser().then(response => {
      this.projs = response;
    })
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    selectcolpayName(data){
      contractSByProj(data).then(response => {
        this.form.colpayAccountId = response.data.userId;
      })
    },
    selectHandler(data){
      contractSByProj(data).then(response => {
        this.form.handlerId = response.data.userId;
      })
    },
    selected(data){
      this.form.contractId = data;
      contractSByProj(data).then(response => {
        this.contracts = response;
      })
    },
    selectCid(data){
      this.form.contractId = data;
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
        contractId: null,
        projId: null,
        contractName: null,
        colpayNo: null,
        colpayTime: null,
        colpayAmt: null,
        colpayDec: null,
        colpaySource: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        updateTime: null,
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
      getColpaydec(id).then(response => {
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
            updateColpaydec(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addColpaydec(this.form).then(response => {
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
