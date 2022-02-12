<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
      <a-form-model-item label="大类" prop="maxType" >
        <a-select placeholder="请选择合同类别" v-model="form.maxType">
          <a-select-option :value="item.maxType" v-for="item in maxTypes" :key="item.id">
            {{ item.maxType }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="小类" prop="minType" >
        <a-input v-model="form.minType" placeholder="请输入" />
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
import {getType, addType, updateType, listType} from '@/api/system/type'

export default {
  name: 'CreateForm',
  props: {
  },
  components: {
  },
  data () {
    return {
      maxTypes: [],//合同类型-大
      minTypes: [],//合同类型-小
      loading: false,
      formTitle: '',
      // 表单参数
      form: {
        id: null,
        maxType: null,
        minType: null,
        createTime: null,
        updateTime: null,
        delFlag: null
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      rules: {
        maxType: [
          { required: true, message: '大类：0收入合同，1支出合同不能为空', trigger: 'change' }
        ],
        minType: [
          { required: true, message: '小类：演员合同，职员合同..不能为空', trigger: 'change' }
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
      this.formType = 1
      this.form = {
        id: null,
        maxType: null,
        minType: null,
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
    /** 修改按钮操作 */
    handleUpdate (row, ids) {
      this.reset()
      this.formType = 2
      const id = row ? row.id : ids
      getType(id).then(response => {
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
            updateType(this.form).then(response => {
              this.$message.success(
                '修改成功',
                3
              )
              this.open = false
              this.$emit('ok')
            })
          } else {
            addType(this.form).then(response => {
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