<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="项目id" prop="projId">-->
            <!--                <a-input v-model="queryParam.projId" placeholder="请输入项目id" allow-clear/>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="账户ID" prop="accountId">-->
            <!--                <a-input v-model="queryParam.accountId" placeholder="请输入账户ID" allow-clear/>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <a-col :md="8" :sm="24">
              <a-form-item label="账户名称" prop="accountName">
                <a-input v-model="queryParam.accountName" placeholder="请输入账户名称" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="开户行" prop="accountBank">
                <a-input v-model="queryParam.accountBank" placeholder="请输入开户行" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">


              <a-col :md="8" :sm="24">
                <a-form-item label="账户号码" prop="accountPhone">
                  <a-input v-model="queryParam.accountPhone" placeholder="请输入账户号码" allow-clear/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="handleQuery"><a-icon type="search"/>查询</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery"><a-icon type="redo"/>重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 操作 -->
      <div class="table-operations">
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:SysPayaccount:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:SysPayaccount:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:SysPayaccount:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <!--        <a-button type="primary" @click="handleExport" v-hasPermi="['system:SysPayaccount:export']">-->
        <!--          <a-icon type="download" />导出-->
        <!--        </a-button>-->
        <a-button
          type="dashed"
          shape="circle"
          :loading="loading"
          :style="{float: 'right'}"
          icon="reload"
          @click="getList"/>
      </div>
      <!-- 增加修改 -->
      <create-form
        ref="createForm"
        @ok="getList"
      />
      <!-- 数据展示 -->
      <a-table
        :loading="loading"
        :size="tableSize"
        rowKey="id"
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:SysPayaccount:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:SysPayaccount:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:SysPayaccount:remove']">
            <a-icon type="delete"/>删除
          </a>
        </span>
      </a-table>
      <!-- 分页 -->
      <a-pagination
        class="ant-table-pagination"
        show-size-changer
        show-quick-jumper
        :current="queryParam.pageNum"
        :total="total"
        :page-size="queryParam.pageSize"
        :showTotal="total => `共 ${total} 条`"
        @showSizeChange="onShowSizeChange"
        @change="changeSize"
      />
    </a-card>
  </page-header-wrapper>
</template>

<script>
import {delSysPayaccount, exportSysPayaccount, listSysPayaccount} from '@/api/system/SysPayaccount'
import CreateForm from './modules/CreateForm'

export default {
  name: 'SysPayaccount',
  components: {
    CreateForm
  },
  data() {
    return {
      list: [],
      selectedRowKeys: [],
      selectedRows: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      ids: [],
      loading: false,
      total: 0,
      // 查询参数
      queryParam: {
        projId: null,
        accountId: null,
        accountName: null,
        accountBank: null,
        accountPhone: null,
        pageNum: 1,
        pageSize: 10,
        accountType:null
      },
      columns: [
        {
          title: '序号',
          key: 'number',
          width: '4%',
          scopedSlots: {customRender: 'serial'},
          align: 'center'
        },
        // {
        //   title: '项目id',
        //   dataIndex: 'projId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '账户类型',
          dataIndex: 'accountType',
          ellipsis: true,
          align: 'center',
          customRender: function(text, record) {   
           if(text === "0") {
             return "现金"
           } else if(text === "1") {
             return "银行"
           }
          }
        },
        {
          title: '账户名称',
          dataIndex: 'accountName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户号码',
          dataIndex: 'accountPhone',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '开户行信息',
          dataIndex: 'accountBank',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户余额',
          dataIndex: 'accountBalance',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '18%',
          scopedSlots: {customRender: 'operation'},
          align: 'center'
        }
      ]
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  computed: {},
  watch: {},
  methods: {
    /** 查询支付账户信息列表 */
    getList() {
      this.loading = true
      listSysPayaccount(this.queryParam).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParam.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.queryParam = {
        projId: undefined,
        accountId: undefined,
        accountName: undefined,
        accountBank: undefined,
        accountPhone: undefined,
        pageNum: 1,
        pageSize: 10,
        accountType:null,
        accountBalance: null
      }
      this.handleQuery()
    },
    onShowSizeChange(current, pageSize) {
      this.queryParam.pageSize = pageSize
      this.getList()
    },
    changeSize(current, pageSize) {
      this.queryParam.pageNum = current
      this.queryParam.pageSize = pageSize
      this.getList()
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.ids = this.selectedRows.map(item => item.id)
      this.single = selectedRowKeys.length !== 1
      this.multiple = !selectedRowKeys.length
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var that = this
      const ids = row.id || this.ids
      this.$confirm({
        title: '确认删除所选中数据?',
        content: '当前选中编号为' + ids + '的数据',
        onOk() {
          return delSysPayaccount(ids)
            .then(() => {
              that.onSelectChange([], [])
              that.getList()
              that.$message.success(
                '删除成功',
                3
              )
            })
        },
        onCancel() {
        }
      })
    },
    /** 导出按钮操作 */
    handleExport() {
      var that = this
      this.$confirm({
        title: '是否确认导出?',
        content: '此操作将导出当前条件下所有数据而非选中数据',
        onOk() {
          return exportSysPayaccount(that.queryParam)
            .then(response => {
              that.download(response.msg)
              that.$message.success(
                '导出成功',
                3
              )
            })
        },
        onCancel() {
        }
      })
    }
  }
}
</script>
