<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="预付金额" prop="amount">
                <a-input v-model="queryParam.amount" placeholder="请输入预付金额" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="归还金额" prop="returnAmount">
                <a-input v-model="queryParam.returnAmount" placeholder="请输入归还金额" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="单位名称" prop="name">
                  <a-input v-model="queryParam.name" placeholder="请输入单位名称" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="冲销金额" prop="reimbursement">
                  <a-input v-model="queryParam.reimbursement" placeholder="请输入冲销金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="单位id" prop="advanceColId">
                  <a-input v-model="queryParam.advanceColId" placeholder="请输入单位id" allow-clear/>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:reportAdvance:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:reportAdvance:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:reportAdvance:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:reportAdvance:export']">
          <a-icon type="download"/>
          导出
        </a-button>
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
        rowKey="amount"
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
         <span slot="reimbursement_1" slot-scope="text, record">
        {{ record.amount - record.returnAmount - record.reimbursement }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:reportAdvance:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:reportAdvance:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:reportAdvance:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:reportAdvance:remove']">
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
import {listReportAdvance, delReportAdvance, exportReportAdvance} from '@/api/system/reportAdvance'
import CreateForm from './modules/CreateForm'

export default {
  name: 'ReportAdvance',
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
        amount: null,
        returnAmount: null,
        name: null,
        reimbursement: null,
        advanceColId: null,
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '单位名称',
          dataIndex: 'name',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付金额',
          dataIndex: 'amount',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '归还金额',
          dataIndex: 'returnAmount',
          ellipsis: true,
          align: 'center'
        },

        {
          title: '冲销金额',
          dataIndex: 'reimbursement',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付余额',
          dataIndex: 'reimbursement_1',
          ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: 'reimbursement_1'},
        },
        // {
        //   title: '单位id',
        //   dataIndex: 'advanceColId',
        //   ellipsis: true,
        //   align: 'center'
        // },
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
    /** 查询reportAdvance列表 */
    getList() {
      this.loading = true
      listReportAdvance(this.queryParam).then(response => {
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
        amount: undefined,
        returnAmount: undefined,
        name: undefined,
        reimbursement: undefined,
        advanceColId: undefined,
        pageNum: 1,
        pageSize: 10
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
      this.ids = this.selectedRows.map(item => item.amount)
      this.single = selectedRowKeys.length !== 1
      this.multiple = !selectedRowKeys.length
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var that = this
      const amounts = row.amount || this.ids
      this.$confirm({
        title: '确认删除所选中数据?',
        content: '当前选中编号为' + amounts + '的数据',
        onOk() {
          return delReportAdvance(amounts)
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
          return exportReportAdvance(that.queryParam)
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
