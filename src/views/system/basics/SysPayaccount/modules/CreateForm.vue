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
      <a-form-model-item label="账户类型" prop="accountType">
        <!-- <a-input v-model="form.accountId" placeholder="请输入账户ID"/> -->
        <a-select placeholder="请选择账户类型" v-model="form.accountType">
          <a-select-option value="0">现金</a-select-option>
          <a-select-option value="1">银行</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="账户名称" prop="accountName">
        <a-input v-model="form.accountName" placeholder="请输入账户名称"/>
      </a-form-model-item>
      <a-form-model-item label="开户行" prop="accountBank">
        <a-input v-model="form.accountBank" placeholder="请输入开户行"/>
      </a-form-model-item>
      <a-form-model-item label="账户号码" prop="accountPhone">
        <a-input v-model="form.accountPhone" placeholder="请输入账户号码"/>
      </a-form-model-item>
      <a-form-model-item label="账户余额" prop="accountBalance">
        <a-input v-model="form.accountBalance" placeholder="请输入账户余额"></a-input>
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
import {addSysPayaccount, getSysPayaccount, updateSysPayaccount} from '@/api/system/SysPayaccount'
import {listAll} from '@/api/system/proj'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
     const validatePrice = (rule,value,callback) =>{
        let reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})$/
        if(!value){
            callback(new Error('余额不能为空'))
         }else if(!reg.test(value)){
            callback(new Error('请输入正确格式的余额'))
             this.$set(this.ruleForm, "price", '');
         }else if(value.length > 10){
            callback(new Error('最多可输入10个字符'))
             this.$set(this.ruleForm, "price", '');
         }else{
          callback();
        }
      };

    return {
      projList: [],
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        projId: null,
        accountId: null,
        accountName: null,
        accountBank: null,
        accountPhone: null,
        updateTime: null,
        accountType: '1',
        accountBalance: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        // accountId: [
        //   {required: true, message: '账户ID不能为空', trigger: 'blur'}
        // ],
        projId: [
          {required: true, message: '关联项目不能为空', trigger: 'blur'}
        ],
        accountType: [
          {required: true, message: '账户类型不能为空', trigger: 'blur'}
        ],
        accountBalance: [
          {required: true,  trigger: 'blur',validator:validatePrice}
        ]
      }
    }
  },
  filters: {},
  created() {
    listAll().then(res => {
       this.projList = res.data
      })
  },
  computed: {},
  watch: {},
  mounted() {
  },
  methods: {
    onClose() {
      this.open = false
      this.$refs['form'].resetFields()
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.$refs['form'].resetFields()
      this.reset()
    },
    // 表单重置
    reset() {
      this.formType = 1
      this.form = {
        id: null,
        projId: null,
        accountId: null,
        accountName: null,
        accountBank: null,
        accountPhone: null,
        updateTime: null,
        accountType:'1',
        accountBalance: null
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
      getSysPayaccount(id).then(response => {
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
            updateSysPayaccount(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$refs['form'].resetFields()
              this.$emit('ok')
            })
          } else {
            addSysPayaccount(this.form).then(response => {
              this.$message.success(
                '新增成功',
                3
              )
              this.open = false
              this.$refs['form'].resetFields()
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
