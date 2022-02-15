<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目id" prop="projId">
                <a-input v-model="queryParam.projId" placeholder="请输入项目id" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="合同id" prop="contractId">
                <a-input v-model="queryParam.contractId" placeholder="请输入合同id" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="结算项目id" prop="resultProjId">
                  <a-input v-model="queryParam.resultProjId" placeholder="请输入结算项目id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款单据编号" prop="advanceNo">
                  <a-input v-model="queryParam.advanceNo" placeholder="请输入预付账款单据编号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款类别0：协议支付，1：预付退回" prop="advanceType">
                  <a-select placeholder="请选择预付账款类别0：协议支付，1：预付退回" v-model="queryParam.advanceType" style="width: 100%"
                            allow-clear>
                    <a-select-option>请选择字典生成</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款付款方" prop="advancePayer">
                  <a-input v-model="queryParam.advancePayer" placeholder="请输入预付账款付款方" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款付款方id" prop="advancePayId">
                  <a-input v-model="queryParam.advancePayId" placeholder="请输入预付账款付款方id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款收款方" prop="advanceColer">
                  <a-input v-model="queryParam.advanceColer" placeholder="请输入预付账款收款方" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款收款方id" prop="advanceColId">
                  <a-input v-model="queryParam.advanceColId" placeholder="请输入预付账款收款方id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款发生金额" prop="advanceAmt">
                  <a-input v-model="queryParam.advanceAmt" placeholder="请输入预付账款发生金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预付账款发生日期" prop="advanceOpenTime">
                  <a-date-picker style="width: 100%" v-model="queryParam.advanceOpenTime" format="YYYY-MM-DD HH:mm:ss"
                                 allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="支付账户" prop="payAccount">
                  <a-input v-model="queryParam.payAccount" placeholder="请输入支付账户" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="冲销状态0：未冲销；1：已冲销" prop="writeoffStatus">
                  <a-select placeholder="请选择冲销状态0：未冲销；1：已冲销" v-model="queryParam.writeoffStatus" style="width: 100%"
                            allow-clear>
                    <a-select-option>请选择字典生成</a-select-option>
                  </a-select>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:advance:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:advance:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:advance:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:advance:export']">
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
        rowKey="id"
        :scroll="{x: 'max-content' }"
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="advanceOpenTime" slot-scope="text, record">
          {{ parseTime(record.advanceOpenTime) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:advance:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:advance:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:advance:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:advance:remove']">
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
import {delAdvance, exportAdvance, listAdvance} from '@/api/system/advance'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Advance',
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
        contractId: null,
        resultProjId: null,
        advanceNo: null,
        advanceType: null,
        advancePayer: null,
        advancePayId: null,
        advanceColer: null,
        advanceColId: null,
        advanceAmt: null,
        advanceOpenTime: null,
        payAccount: null,
        writeoffStatus: null,
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
          title: '序号',
          key: 'number',
          scopedSlots: {customRender: 'serial'},
          align: 'center'
        },
        {
          title: '项目id',
          dataIndex: 'projId',
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
          title: '结算项目id',
          dataIndex: 'resultProjId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款单据编号',
          dataIndex: 'advanceNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款类别0：协议支付，1：预付退回',
          dataIndex: 'advanceType',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款付款方',
          dataIndex: 'advancePayer',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款付款方id',
          dataIndex: 'advancePayId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款收款方',
          dataIndex: 'advanceColer',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款收款方id',
          dataIndex: 'advanceColId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款发生金额',
          dataIndex: 'advanceAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预付账款发生日期',
          dataIndex: 'advanceOpenTime',
          scopedSlots: {customRender: 'advanceOpenTime'},
          ellipsis: true,
          align: 'center'
        },
        {
          title: '支付账户',
          dataIndex: 'payAccount',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '冲销状态0：未冲销；1：已冲销',
          dataIndex: 'writeoffStatus',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '备注',
          dataIndex: 'remark',
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
    /** 查询预付账款信息列表 */
    getList() {
      this.loading = true
      listAdvance(this.queryParam).then(response => {
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
        contractId: undefined,
        resultProjId: undefined,
        advanceNo: undefined,
        advanceType: undefined,
        advancePayer: undefined,
        advancePayId: undefined,
        advanceColer: undefined,
        advanceColId: undefined,
        advanceAmt: undefined,
        advanceOpenTime: undefined,
        payAccount: undefined,
        writeoffStatus: undefined,
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
          return delAdvance(ids)
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
          return exportAdvance(that.queryParam)
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
