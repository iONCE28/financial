<template>
  <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form" :rules="rules">
     <a-form-model-item label="部门" prop="deptId">
        <a-tree-select
          v-model="form.deptId"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="deptOptions"
          placeholder="请选择"
          :replaceFields="replaceFields"
          tree-default-expand-all
        >
        </a-tree-select>
        </a-form-model-item>
      <a-form-model-item label="员工工号" prop="jobNum">
        <a-input v-model="form.jobNum" placeholder="请输入员工工号" />
      </a-form-model-item>
      <a-form-model-item label="员工姓名" prop="staffName">
        <a-input v-model="form.staffName" placeholder="请输入员工姓名" />
      </a-form-model-item>
      <a-form-model-item label="员工性别" prop="staffSex">
        <a-select placeholder="请选择员工性别" v-model="form.staffSex">
          <a-select-option value="0">男</a-select-option>
          <a-select-option value="1">女</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="职位" prop="dutyId">
        <a-select
          v-model="form.dutyId"
          placeholder="请选择"
        >
          <a-select-option v-for="(d, index) in postOptions" :key="index" :value="d.postId">
            {{ d.postName }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="员工电话" prop="staffPhone">
        <a-input v-model="form.staffPhone" placeholder="请输入员工电话" />
      </a-form-model-item>
      <a-form-model-item label="员工邮箱" prop="staffEmail">
        <a-input v-model="form.staffEmail" placeholder="请输入员工邮箱" />
      </a-form-model-item>
      <div class="bottom-control">
        <a-space>
          <a-button type="primary" @click="submitForm"> 保存 </a-button>
          <a-button type="dashed" @click="cancel"> 取消 </a-button>
        </a-space>
      </div>
    </a-form-model>
  </a-drawer>
</template>

<script>
import { getStaff, addStaff, updateStaff } from '@/api/system/staff'
import { treeselect } from '@/api/system/dept'
import { getUser } from '@/api/system/user'
export default {
  name: 'CreateForm',
  props: {},
  components: {},
  data() {
    return {
       rules: {
         deptId:[
          { required: true, message: '部门不能为空', trigger: 'blur' }
        ],
      staffName: [
          { required: true, message: '员工姓名不能为空', trigger: 'blur' }
        ],
      staffSex: [
          { required: true, message: '员工性别不能为空', trigger: 'blur' }
        ],
      dutyId: [
          { required: true, message: '职位不能为空', trigger: 'blur' }
        ],
        staffEmail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请正确填写邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        staffPhone: [
          { required: true, message: '员工电话不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请正确填写手机号',
            trigger: 'blur'
          }
        ],
       },
      loading: false,
      formTitle: '',
        replaceFields: { children: 'children', title: 'label', key: 'id', value: 'id' },
        postOptions: [],
      // 表单参数
      form: {
        staffId: null,
        deptId: null,
        deptName: null,
        jobNum: null,
        staffName: null,
        staffSex: null,
        dutyId: null,
        dutyName: null,
        staffPhone: null,
        staffEmail: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        delFlag: "0",
      },
      // 1增加,2修改
      formType: 1,
      open: false,
      // rules: {},
    }
  },
  filters: {},
  created() {
    this.getTreeselect()
    this.getUsers()
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getUsers() {
      getUser().then(response => {
        this.postOptions = response.data.posts
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
    reset() {
      this.formType = 1
      this.form = {
        staffId: null,
        deptId: null,
        deptName: null,
        jobNum: null,
        staffName: null,
        staffSex: null,
        dutyId: null,
        dutyName: null,
        staffPhone: null,
        staffEmail: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        delFlag: "0"
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
      const staffId = row ? row.staffId : ids
      getStaff(staffId).then((response) => {
        this.form = response.data
        this.open = true
        this.formTitle = '修改'
      })
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.staffId !== undefined && this.form.staffId !== null) {
            updateStaff(this.form).then((response) => {
              this.$message.success('修改成功', 3)
              this.open = false
              this.$emit('ok')
            })
          } else {
            addStaff(this.form).then((response) => {
              this.$message.success('新增成功', 3)
              this.open = false
              this.$emit('ok')
            })
          }
        } else {
          return false
        }
      })
    },
  },
}
</script>
