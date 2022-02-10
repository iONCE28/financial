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
              <a-form-item label="合同ID" prop="contractId">
                <a-input v-model="queryParam.contractId" placeholder="请输入合同ID" allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="结算项目id" prop="resultProjId">
                  <a-input v-model="queryParam.resultProjId" placeholder="请输入结算项目id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="费用报销单据编号" prop="reimbursementNo">
                  <a-input v-model="queryParam.reimbursementNo" placeholder="请输入费用报销单据编号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="预算科目ID" prop="budgetId">
                  <a-input v-model="queryParam.budgetId" placeholder="请输入预算科目ID" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="关联单位" prop="affiliatedUnit">
                  <a-input v-model="queryParam.affiliatedUnit" placeholder="请输入关联单位" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="关联单位id" prop="affiliatedUnitId">
                  <a-input v-model="queryParam.affiliatedUnitId" placeholder="请输入关联单位id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="关联个人" prop="affiliatedPerson">
                  <a-input v-model="queryParam.affiliatedPerson" placeholder="请输入关联个人" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="关联个人id" prop="affiliatedPersonId">
                  <a-input v-model="queryParam.affiliatedPersonId" placeholder="请输入关联个人id" allow-clear/>
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
              <a-col :md="8" :sm="24">
                <a-form-item label="代办标识0：无代办；1：代办。默认0" prop="agencyLogo">
                  <a-input v-model="queryParam.agencyLogo" placeholder="请输入代办标识0：无代办；1：代办。默认0" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="费用部门" prop="expenseDept">
                  <a-input v-model="queryParam.expenseDept" placeholder="请输入费用部门" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="报销金额" prop="reimbAmt">
                  <a-input v-model="queryParam.reimbAmt" placeholder="请输入报销金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="发票张树" prop="invoiceNum">
                  <a-input v-model="queryParam.invoiceNum" placeholder="请输入发票张树" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="上传时间" prop="uploadTime">
                  <a-date-picker style="width: 100%" v-model="queryParam.uploadTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付" prop="payType">
                  <a-select placeholder="请选择支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付" v-model="queryParam.payType" style="width: 100%" allow-clear>
                    <a-select-option>请选择字典生成</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="报销支付账户名称" prop="reimbPayName">
                  <a-input v-model="queryParam.reimbPayName" placeholder="请输入报销支付账户名称" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="报销支付账户开户行" prop="reimbPayBank">
                  <a-input v-model="queryParam.reimbPayBank" placeholder="请输入报销支付账户开户行" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="报销支付账户号码" prop="reimbPayNo">
                  <a-input v-model="queryParam.reimbPayNo" placeholder="请输入报销支付账户号码" allow-clear/>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:reimbursement:add']">
          <a-icon type="plus" />新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)" v-hasPermi="['system:reimbursement:edit']">
          <a-icon type="edit" />修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:reimbursement:remove']">
          <a-icon type="delete" />删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:reimbursement:export']">
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
        <span slot="uploadTime" slot-scope="text, record">
          {{ parseTime(record.uploadTime) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:reimbursement:edit']" />
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:reimbursement:edit']">
            <a-icon type="edit" />修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:reimbursement:remove']" />
          <a @click="handleDelete(record)" v-hasPermi="['system:reimbursement:remove']">
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
import { listReimbursement, delReimbursement, exportReimbursement } from '@/api/system/reimbursement'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Reimbursement',
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
        contractId: null,
        resultProjId: null,
        reimbursementNo: null,
        budgetId: null,
        affiliatedUnit: null,
        affiliatedUnitId: null,
        affiliatedPerson: null,
        affiliatedPersonId: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        agencyLogo: null,
        expenseDept: null,
        abstract: null,
        reimbAmt: null,
        invoiceNum: null,
        image: null,
        uploadTime: null,
        payType: null,
        reimbPayName: null,
        reimbPayBank: null,
        reimbPayNo: null,
        pageNum: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '费用报销ID',
          dataIndex: 'id',
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
          title: '合同ID',
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
          title: '费用报销单据编号',
          dataIndex: 'reimbursementNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '预算科目ID',
          dataIndex: 'budgetId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '关联单位',
          dataIndex: 'affiliatedUnit',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '关联单位id',
          dataIndex: 'affiliatedUnitId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '关联个人',
          dataIndex: 'affiliatedPerson',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '关联个人id',
          dataIndex: 'affiliatedPersonId',
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
          title: '代办标识0：无代办；1：代办。默认0',
          dataIndex: 'agencyLogo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '费用部门',
          dataIndex: 'expenseDept',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '摘要',
          dataIndex: 'abstract',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '报销金额',
          dataIndex: 'reimbAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '发票张树',
          dataIndex: 'invoiceNum',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '发票影像：存文件路径',
          dataIndex: 'image',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '上传时间',
          dataIndex: 'uploadTime',
          scopedSlots: { customRender: 'uploadTime' },
          ellipsis: true,
          align: 'center'
        },
        {
          title: '支付类别:0：支付账户，1：支付报销，2：冲销借款，3：冲销预付',
          dataIndex: 'payType',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '报销支付账户名称',
          dataIndex: 'reimbPayName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '报销支付账户开户行',
          dataIndex: 'reimbPayBank',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '报销支付账户号码',
          dataIndex: 'reimbPayNo',
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
    /** 查询费用报销信息列表 */
    getList () {
      this.loading = true
      listReimbursement(this.queryParam).then(response => {
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
        contractId: undefined,
        resultProjId: undefined,
        reimbursementNo: undefined,
        budgetId: undefined,
        affiliatedUnit: undefined,
        affiliatedUnitId: undefined,
        affiliatedPerson: undefined,
        affiliatedPersonId: undefined,
        handler: undefined,
        handlerId: undefined,
        reserveOne: undefined,
        reserveTwo: undefined,
        reserveThree: undefined,
        agencyLogo: undefined,
        expenseDept: undefined,
        abstract: undefined,
        reimbAmt: undefined,
        invoiceNum: undefined,
        image: undefined,
        uploadTime: undefined,
        payType: undefined,
        reimbPayName: undefined,
        reimbPayBank: undefined,
        reimbPayNo: undefined,
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
          return delReimbursement(ids)
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
          return exportReimbursement(that.queryParam)
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
