                                            <template>
    <a-drawer width="35%" :label-col="4" :wrapper-col="14" :visible="open" @close="onClose">
        <a-divider orientation="left">
            <b>{{ formTitle }}</b>
        </a-divider>
        <a-form-model ref="form" :model="form" :rules="rules">
                                                                                                                                                                                                                        <a-form-model-item label="项目id" prop="projId" >
                                                            <a-input v-model="form.projId" placeholder="请输入项目id" />
                                                    </a-form-model-item>
                                                                                                                                                                                                                            <a-form-model-item label="账户ID" prop="accountId" >
                                                            <a-input v-model="form.accountId" placeholder="请输入账户ID" />
                                                    </a-form-model-item>
                                                                                                                                                                                                                            <a-form-model-item label="账户名称" prop="accountName" >
                                                            <a-input v-model="form.accountName" placeholder="请输入账户名称" />
                                                    </a-form-model-item>
                                                                                                                                                                                                                            <a-form-model-item label="开户行" prop="accountBank" >
                                                            <a-input v-model="form.accountBank" placeholder="请输入开户行" />
                                                    </a-form-model-item>
                                                                                                                                                                                                                            <a-form-model-item label="账户号码" prop="accountPhone" >
                                                            <a-input v-model="form.accountPhone" placeholder="请输入账户号码" />
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
    import { getSysPayaccount, addSysPayaccount, updateSysPayaccount } from '@/api/system/SysPayaccount'
                
    export default {
        name: 'CreateForm',
    props: {
                                                                                                                                                                        },
    components: {
            },
    data () {
        return {
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
                                                                                                                updateTime: null                        
                                                },
            // 1增加,2修改
            formType: 1,
            open: false,
            rules: {
                                                                                                                                                                                                                                                                                                                                                                                    accountId: [
                                    { required: true, message: '账户ID不能为空', trigger: 'blur' }
                                ],
                                                                                                                                                                                                                                                                                                    accountName: [
                                    { required: true, message: '账户名称不能为空', trigger: 'blur' }
                                ],
                                                                                                                                                                                                                                                                                                    accountBank: [
                                    { required: true, message: '开户行不能为空', trigger: 'blur' }
                                ],
                                                                                                                                                                                                                                                                                                    accountPhone: [
                                    { required: true, message: '账户号码不能为空', trigger: 'blur' }
                                ]
                                                                                                                                                                                                                    }
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
                                                                                                                projId: null,                        
                                                                                                                accountId: null,                        
                                                                                                                accountName: null,                        
                                                                                                                accountBank: null,                        
                                                                                                                accountPhone: null,                        
                                                                                                                updateTime: null                        
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
                                                        this.$emit('ok')
                        })
                    } else {
                        addSysPayaccount(this.form).then(response => {
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
