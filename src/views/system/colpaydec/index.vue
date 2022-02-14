<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="合同id" prop="contractId">
                <a-input v-model="queryParam.contractId" placeholder="请输入合同id" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="项目id" prop="projId">
                <a-input v-model="queryParam.projId" placeholder="请输入项目id" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="合同名称" prop="contractName">
                  <a-input v-model="queryParam.contractName" placeholder="请输入合同名称" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="资金流水号" prop="colpayNo">
                  <a-input v-model="queryParam.colpayNo" placeholder="请输入资金流水号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款时间" prop="colpayTime">
                  <a-date-picker style="width: 100%" v-model="queryParam.colpayTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款金额" prop="colpayAmt">
                  <a-input v-model="queryParam.colpayAmt" placeholder="请输入收款金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款说明" prop="colpayDec">
                  <a-input v-model="queryParam.colpayDec" placeholder="请输入收款说明" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款来源" prop="colpaySource">
                  <a-input v-model="queryParam.colpaySource" placeholder="请输入收款来源" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="经办人" prop="handler">
                  <a-input v-model="queryParam.handler" placeholder="请输入经办人" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="经办人id" prop="handlerId">
                  <a-input v-model="queryParam.handlerId" placeholder="请输入经办人id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预留字段1" prop="reserveOne">
                  <a-input v-model="queryParam.reserveOne" placeholder="请输入预留字段1" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预留字段2" prop="reserveTwo">
                  <a-input v-model="queryParam.reserveTwo" placeholder="请输入预留字段2" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预留字段3" prop="reserveThree">
                  <a-input v-model="queryParam.reserveThree" placeholder="请输入预留字段3" allow-clear/>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:colpaydec:add']">
          <a-icon type="plus" />新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)" v-hasPermi="['system:colpaydec:edit']">
          <a-icon type="edit" />修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:colpaydec:remove']">
          <a-icon type="delete" />删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:colpaydec:export']">
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
        <span slot="colpayTime" slot-scope="text, record">
          {{ parseTime(record.colpayTime) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:colpaydec:edit']" />
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:colpaydec:edit']">
            <a-icon type="edit" />修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:colpaydec:remove']" />
          <a @click="handleDelete(record)" v-hasPermi="['system:colpaydec:remove']">
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
import { listColpaydec, delColpaydec, exportColpaydec } from '@/api/system/colpaydec'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Colpaydec',
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
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '收款记录ID',
          dataIndex: 'id',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '合同id',
          dataIndex: 'contractId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '项目id',
          dataIndex: 'projId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '合同名称',
          dataIndex: 'contractName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '资金流水号',
          dataIndex: 'colpayNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '收款时间',
          dataIndex: 'colpayTime',
          scopedSlots: { customRender: 'colpayTime' },
          ellipsis: true,
          align: 'center'
        },
        {
          title: '收款金额',
          dataIndex: 'colpayAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '收款说明',
          dataIndex: 'colpayDec',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '收款来源',
          dataIndex: 'colpaySource',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '经办人',
          dataIndex: 'handler',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '经办人id',
          dataIndex: 'handlerId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预留字段1',
          dataIndex: 'reserveOne',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预留字段2',
          dataIndex: 'reserveTwo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预留字段3',
          dataIndex: 'reserveThree',
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
    /** 查询收入记账信息列表 */
    getList () {
      this.loading = true
      listColpaydec(this.queryParam).then(response => {
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
        contractId: undefined,
        projId: undefined,
        contractName: undefined,
        colpayNo: undefined,
        colpayTime: undefined,
        colpayAmt: undefined,
        colpayDec: undefined,
        colpaySource: undefined,
        handler: undefined,
        handlerId: undefined,
        reserveOne: undefined,
        reserveTwo: undefined,
        reserveThree: undefined,
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
          return delColpaydec(ids)
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
          return exportColpaydec(that.queryParam)
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
