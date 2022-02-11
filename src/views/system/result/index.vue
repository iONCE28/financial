<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="结算项目id" prop="projId">
                <a-input v-model="queryParam.projId" placeholder="请输入结算项目id" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="结算项目名称" prop="projName">
                <a-input v-model="queryParam.projName" placeholder="请输入结算项目名称" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="结算金额" prop="projAmt">
                  <a-input v-model="queryParam.projAmt" placeholder="请输入结算金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收付款周期：比如：三月、半年、一年" prop="colpayCycle">
                  <a-input v-model="queryParam.colpayCycle" placeholder="请输入收付款周期：比如：三月、半年、一年" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收付款条件" prop="colpayCondition">
                  <a-input v-model="queryParam.colpayCondition" placeholder="请输入收付款条件" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收付款金额" prop="colpayAmt">
                  <a-input v-model="queryParam.colpayAmt" placeholder="请输入收付款金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收付款过期时间" prop="colpayExpireTime">
                  <a-date-picker style="width: 100%" v-model="queryParam.colpayExpireTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="结算账户名称" prop="accountName">
                  <a-input v-model="queryParam.accountName" placeholder="请输入结算账户名称" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="结算账户开户行" prop="openBank">
                  <a-input v-model="queryParam.openBank" placeholder="请输入结算账户开户行" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="结算账户" prop="account">
                  <a-input v-model="queryParam.account" placeholder="请输入结算账户" allow-clear/>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="handleQuery"><a-icon type="search" />查询</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery"><a-icon type="redo" />重置</a-button>
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
<!--        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:result:add']">-->
<!--          <a-icon type="plus" />新增-->
<!--        </a-button>-->
<!--        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)" v-hasPermi="['system:result:edit']">-->
<!--          <a-icon type="edit" />修改-->
<!--        </a-button>-->
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:result:remove']">
          <a-icon type="delete" />删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:result:export']">
          <a-icon type="download" />导出
        </a-button>
        <a-button
          type="dashed"
          shape="circle"
          :loading="loading"
          :style="{float: 'right'}"
          icon="reload"
          @click="getList" />
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
        <span slot="colpayExpireTime" slot-scope="text, record">
          {{ parseTime(record.colpayExpireTime) }}
        </span>
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="operation" slot-scope="text, record">
<!--          <a-divider type="vertical" v-hasPermi="['system:result:edit']" />-->
<!--          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:result:edit']">-->
<!--            <a-icon type="edit" />修改-->
<!--          </a>-->
          <a-divider type="vertical" v-hasPermi="['system:result:remove']" />
          <a @click="handleDelete(record)" v-hasPermi="['system:result:remove']">
            <a-icon type="delete" />删除
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
import { listResult, delResult, exportResult } from '@/api/system/result'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Result',
  components: {
    CreateForm
  },
  data () {
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
        projName: null,
        projAmt: null,
        colpayCycle: null,
        colpayCondition: null,
        colpayAmt: null,
        colpayExpireTime: null,
        accountName: null,
        openBank: null,
        account: null,
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        // {
        //   title: '删除状态 0. 正常 1. 删除',
        //   dataIndex: 'id',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '结算项目id',
        //   dataIndex: 'projId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '序号',
          key: 'number',
          scopedSlots: { customRender: 'serial' },
          align: 'center'
        },
        {
          title: '结算项目名称',
          dataIndex: 'projName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '结算金额',
          dataIndex: 'projAmt',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '收付款周期：比如：三月、半年、一年',
        //   dataIndex: 'colpayCycle',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收付款条件',
        //   dataIndex: 'colpayCondition',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收付款金额',
        //   dataIndex: 'colpayAmt',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收付款过期时间',
        //   dataIndex: 'colpayExpireTime',
        //   scopedSlots: { customRender: 'colpayExpireTime' },
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '结算账户名称',
          dataIndex: 'accountName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '结算账户开户行',
          dataIndex: 'openBank',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '结算账户',
          dataIndex: 'account',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '18%',
          scopedSlots: { customRender: 'operation' },
          align: 'center'
        }
      ]
    }
  },
  filters: {
  },
  created () {
    this.getList()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    /** 查询合同结算项目信息列表 */
    getList () {
      this.loading = true
      listResult(this.queryParam).then(response => {
        this.list = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParam.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.queryParam = {
        projId: undefined,
        projName: undefined,
        projAmt: undefined,
        colpayCycle: undefined,
        colpayCondition: undefined,
        colpayAmt: undefined,
        colpayExpireTime: undefined,
        accountName: undefined,
        openBank: undefined,
        account: undefined,
        pageNum: 1,
        pageSize: 10
      }
      this.handleQuery()
    },
    onShowSizeChange (current, pageSize) {
      this.queryParam.pageSize = pageSize
      this.getList()
    },
    changeSize (current, pageSize) {
      this.queryParam.pageNum = current
      this.queryParam.pageSize = pageSize
      this.getList()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.ids = this.selectedRows.map(item => item.id)
      this.single = selectedRowKeys.length !== 1
      this.multiple = !selectedRowKeys.length
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      var that = this
      const ids = row.id || this.ids
      this.$confirm({
        title: '确认删除所选中数据?',
        content: '当前选中编号为' + ids + '的数据',
        onOk () {
          return delResult(ids)
            .then(() => {
              that.onSelectChange([], [])
              that.getList()
              that.$message.success(
                '删除成功',
                3
              )
          })
        },
        onCancel () {}
      })
    },
    /** 导出按钮操作 */
    handleExport () {
      var that = this
      this.$confirm({
        title: '是否确认导出?',
        content: '此操作将导出当前条件下所有数据而非选中数据',
        onOk () {
          return exportResult(that.queryParam)
            .then(response => {
              that.download(response.msg)
              that.$message.success(
                '导出成功',
                3
              )
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>
