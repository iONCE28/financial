<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
<!--      <a-form-model-item label="合同类型" prop="type" >-->
<!--        <a-select placeholder="请选择合同类型" v-model="form.type">-->
<!--          <a-select-option :value="item.id" v-for="item in maxTypes" :key="item.id">-->
<!--            {{ item.maxType }}-->
<!--          </a-select-option>-->
<!--        </a-select>-->
<!--      </a-form-model-item>-->
      <a-form-model-item label="甲方名称" prop="nailName" >
        <a-input v-model="form.nailName" placeholder="请输入甲方名称" />
      </a-form-model-item>
      <a-form-model-item label="乙方名称" prop="bname" >
        <a-input v-model="form.bname" placeholder="请输入乙方名称" />
      </a-form-model-item>
      <a-form-model-item label="合同内容" prop="content" >
        <div id="content" name="content" ></div>
      </a-form-model-item>
      <a-form-model-item label="结算金额(单位: w)" prop="closeAmount" >
        <a-input v-model="form.closeAmount" placeholder="请输入结算金额" />
      </a-form-model-item>
      <a-form-model-item label="结算项目" prop="closeProj" >
        <a-input v-model="form.closeProj" placeholder="请输入结算项目" />
      </a-form-model-item>
      <a-form-model-item label="投资方" prop="investor" >
        <a-input v-model="form.investor" placeholder="请输入投资方" />
      </a-form-model-item>
      <a-form-model-item label="合同凭证:扫描图片地址" prop="voucher" >
        <a-input v-model="form.voucher" placeholder="请输入合同凭证:扫描图片地址" />
      </a-form-model-item>
      <a-form-model-item label="结算账户" prop="account" >
        <a-input v-model="form.account" placeholder="请输入结算账户" />
      </a-form-model-item>
      <a-form-model-item label="开户银行" prop="openBank" >
        <a-input v-model="form.openBank" placeholder="请输入开户银行" />
      </a-form-model-item>
<!--      <a-form-model-item label="付款周期数：年月日" prop="payCycle" >-->
<!--        <a-input v-model="form.payCycle" placeholder="请输入付款周期数：年月日" />-->
<!--      </a-form-model-item>-->

      <a-form-model-item label="付款周期数" prop="payCycle" >
        <a-select placeholder="请选择" v-model="form.payCycle">
          <a-select-option :value="item.val" v-for="item in payCycles" :key="item.id">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-model-item>

      <a-form-model-item label="付款条件" prop="payCondition" >
        <a-input v-model="form.payCondition" placeholder="请输入付款条件" />
      </a-form-model-item>
      <a-form-model-item label="付款金额(单位: w)" prop="payAmount" >
        <a-input v-model="form.payAmount" placeholder="请输入付款金额" />
      </a-form-model-item>
      <a-form-model-item label="付款提醒方式" prop="payCallType" >
        <a-select placeholder="请选择提示方式" v-model="form.payCallType">
          <a-select-option  :value="item.id" v-for="item in callTypes" :key="item.id">
            {{ item.val }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="收款周期数:" prop="harvestCycle" >
<!--        <a-input v-model="form.harvestCycle" placeholder="请输入收款周期数:" />-->

        <a-select placeholder="请选择" v-model="form.harvestCycle">
          <a-select-option :value="item.val" v-for="item in colCycles" :key="item.id">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="收款条件" prop="harvestCondition" >
        <a-input v-model="form.harvestCondition" placeholder="请输入收款条件" />
      </a-form-model-item>
      <a-form-model-item label="收款金额(单位: w)" prop="harvestAmount" >
        <a-input v-model="form.harvestAmount" placeholder="请输入收款金额" />
      </a-form-model-item>
      <a-form-model-item label="收款提醒方式" prop="harvestCallType" >
        <a-select placeholder="请选择提示方式" v-model="form.harvestCallType">
          <a-select-option  :value="item.id" v-for="item in colTypes" :key="item.id">
            {{ item.val }}
          </a-select-option>
        </a-select>

      </a-form-model-item>
      <a-form-model-item label="项目id" prop="projId" >
        <a-input v-model="form.projId" placeholder="请输入项目id" />
      </a-form-model-item>
      <a-form-model-item label="合同名称" prop="constractName" >
        <a-input v-model="form.constractName" placeholder="请输入合同名称" />
      </a-form-model-item>
      <a-form-model-item label="合同编号" prop="constractNo" >
        <a-input v-model="form.constractNo" placeholder="请输入合同编号" />
      </a-form-model-item>
      <a-form-model-item label="签约日期" prop="signTime" >
        <a-date-picker style="width: 100%" v-model="form.signTime" format="YYYY-MM-DD" allow-clear/>
      </a-form-model-item>

      <a-form-model-item label="合同大类别" prop="constractBigType" >
        <a-select placeholder="请选择合同大类别" v-model="form.constractBigType">
          <a-select-option :value="item.id" v-for="item in maxTypes" :key="item.id">
            {{ item.maxType }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="合同小类别" prop="constractSmallType" >
        <a-select placeholder="请选择合同小类别" v-model="form.constractSmallType">
          <a-select-option :value="item.minType" v-for="item in minTypes" :key="item.id">
            {{ item.minType }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="合同上传文件时间" prop="uploadTime" >
        <a-date-picker style="width: 100%" v-model="form.uploadTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
      </a-form-model-item>
      <a-form-model-item label="联系人名称" prop="contactsor" >
        <a-input v-model="form.contactsor" placeholder="请输入联系人名称" />
      </a-form-model-item>
      <a-form-model-item label="联系人电话" prop="contactsPhone" >
        <a-input v-model="form.contactsPhone" placeholder="请输入联系人电话" />
      </a-form-model-item>
      <a-form-model-item label="联系人邮箱" prop="contactsEmai" >
        <a-input v-model="form.contactsEmai" placeholder="请输入联系人邮箱" />
      </a-form-model-item>
      <a-form-model-item label="联系人其他" prop="contactsOthers" >
        <a-input v-model="form.contactsOthers" placeholder="请输入联系人其他" />
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
import { getContract, addContract, updateContract } from '@/api/system/contract'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import {listType} from "@/api/system/type";

export default {
  name: 'CreateForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      payCycles: [
        {"id":1,"val":360,"text":"年"},
        {"id":2,"val":30,"text":"月"},
        {"id":3,"val":1,"text":"日"}
      ],
      colCycles: [
        {"id":1,"val":360,"text":"年"},
        {"id":2,"val":30,"text":"月"},
        {"id":3,"val":1,"text":"日"}
      ],
      callTypes: [
        {"id":0,"val":"手机"},
        {"id":1,"val":"邮箱"}
      ],
      colTypes: [
        {"id":0,"val":"手机"},
        {"id":1,"val":"邮箱"}
      ],
      maxTypes: [],//合同类型-大
      minTypes: [],//合同类型-小
      loading: false,
      formTitle: '',
      contentEditor: '',
      // 表单参数
      form: {
        id: null,
        type: null,
        nailName: null,
        bname: null,
        content: null,
        closeAmount: null,
        closeProj: null,
        investor: null,
        voucher: null,
        account: null,
        openBank: null,
        payCycle: null,
        payCondition: null,
        payAmount: null,
        payCallType: null,
        harvestCycle: null,
        harvestCondition: null,
        harvestAmount: null,
        harvestCallType: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        projId: null,
        constractName: null,
        constractNo: null,
        signTime: null,
        constractBigType: null,
        constractSmallType: null,
        uploadTime: null,
        contactsor: null,
        contactsPhone: null,
        contactsEmai: null,
        contactsOthers: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        nailName: [
          { required: true, message: '甲方名称不能为空', trigger: 'blur' }
        ],
        bname: [
          { required: true, message: '乙方名称不能为空', trigger: 'blur' }
        ],
        closeAmount: [
          { required: true, message: '结算金额不能为空', trigger: 'blur' }
        ],
        closeProj: [
          { required: true, message: '结算项目不能为空', trigger: 'blur' }
        ],
        delFlag: [
          { required: true, message: '删除状态 0. 正常 1. 删除不能为空', trigger: 'blur' }
        ],
        projId: [
          { required: true, message: '项目id不能为空', trigger: 'blur' }
        ],
        signTime: [
          { required: true, message: '签约日期不能为空', trigger: 'blur' }
        ],
        constractBigType: [
          { required: true, message: '合同大类别:0：收入合同，1：支出合同不能为空', trigger: 'change' }
        ],
        constractSmallType: [
          { required: true, message: '合同小类别:投资方分类。演员合同、职员合同……不能为空', trigger: 'change' }
        ],
        uploadTime: [
          { required: true, message: '合同上传文件时间不能为空', trigger: 'blur' }
        ],
        contactsor: [
          { required: true, message: '联系人名称不能为空', trigger: 'blur' }
        ],
        contactsPhone: [
          { required: true, message: '联系人电话不能为空', trigger: 'blur' }
        ],
        contactsEmai: [
          { required: true, message: '联系人邮箱不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  filters: {
  },
  created () {
    listType().then(response => {
      this.maxTypes = response.maxTypes;
      this.minTypes = response.minTypes;
    })
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    openEditor () {
      this.$nextTick(() => {
        this.contentEditor = new Vditor('content', {
          height: 360,
          toolbarConfig: {
            pin: true
          },
          cache: {
            enable: false
          },
          after: () => {
            let content = this.form.content
            if (content === undefined || content === null) {
              content = ''
            }
            this.contentEditor.setValue(content)
          }
        })
      })
    },
    closeEditor () {
      this.noticeContentEditor.destroy()
    },
    onClose () {
      this.open = false
      this.closeEditor()
    },
    // 取消按钮
    cancel () {
      this.open = false
      this.reset()
      this.closeEditor()
    },
    // 表单重置
    reset () {
      this.formType = 1
      this.form = {
        id: null,
        type: null,
        nailName: null,
        bname: null,
        content: null,
        closeAmount: null,
        closeProj: null,
        investor: null,
        voucher: null,
        account: null,
        openBank: null,
        payCycle: null,
        payCondition: null,
        payAmount: null,
        payCallType: null,
        harvestCycle: null,
        harvestCondition: null,
        harvestAmount: null,
        harvestCallType: null,
        createTime: null,
        updateTime: null,
        delFlag: null,
        projId: null,
        constractName: null,
        constractNo: null,
        signTime: null,
        constractBigType: null,
        constractSmallType: null,
        uploadTime: null,
        contactsor: null,
        contactsPhone: null,
        contactsEmai: null,
        contactsOthers: null
      }
    },
    /** 新增按钮操作 */
    handleAdd (row) {
      this.reset()
      this.formType = 1
      this.open = true
      this.openEditor()
      this.formTitle = '添加'
    },
    /** 修改按钮操作 */
    handleUpdate (row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getContract(id).then(response => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
        this.openEditor()
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.form.content = this.contentEditor.getValue()
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.form.id !== undefined && this.form.id !== null) {
            updateContract(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.closeEditor()
              this.$emit('ok')
            })
          } else {
            addContract(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
              this.open = false
              this.closeEditor()
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