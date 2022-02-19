<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目" prop="projId">
                <a-select placeholder="请选择项目" v-model="queryParam.projId" @select="handleProj">
                  <a-select-option :value="item.id" v-for="item in projsList" :key="item.id">
                    {{ item.name }}
                  </a-select-option>
                </a-select>

              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="合同" prop="contractId">
                <a-select placeholder="请选择合同" v-model="queryParam.contractId">
                  <a-select-option :value="item.id" v-for="item in contractsList" :key="item.id">
                    {{ item.constractName }}
                  </a-select-option>
                </a-select>

              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">

                <a-form-item label="结算项目" prop="resultContractId">
                  <a-select placeholder="请选择项目" v-model="queryParam.resultContractId" @select="handleProj">
                    <a-select-option :value="item.id" v-for="item in projsList" :key="item.id">
                      {{ item.name }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="个人借款单据编号" prop="resultContractNo">
                  <a-input v-model="queryParam.resultContractNo" placeholder="请输入个人借款单据编号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="个人借款类别" prop="loanType">
                  <a-select placeholder="请选择个人借款类别" v-model="queryParam.loanType" style="width: 100%"
                            allow-clear>
                    <a-select-option :value="item.value" :key="item.value" v-for="(item) in loanTypeList ">{{
                        item.label
                      }}
                    </a-select-option>

                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="借款人:对内借款，借款人从内部人员中取" prop="borrower">
                  <a-input v-model="queryParam.borrower" placeholder="请输入借款人:对内借款，借款人从内部人员中取" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="借款人" prop="borrowerId">
                  <a-select v-model="queryParam.borrowerId" placeholder="请选择借款人" style="width: 100%" allow-clear>
                    <a-select-option :value="item.staffId" :key="item.staffId" v-for="(item,index) in StaffList"> {{
                        item.staffName
                      }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="个人借款发生金额" prop="amount">
                  <a-input v-model="queryParam.amount" placeholder="请输入个人借款发生金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="支付账户" prop="payAccount">
                  <a-input v-model="queryParam.payAccount" placeholder="请输入支付账户" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="冲销状态" prop="writeoffStatus">
                  <a-select placeholder="请选择冲销状态" v-model="queryParam.writeoffStatus" style="width: 100%"
                            allow-clear>
                    <a-select-option :value="0">未冲销</a-select-option>
                    <a-select-option :value="1">已冲销</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="经办人" prop="handler">
                  <a-select v-model="queryParam.handler" placeholder="请选择经办人" style="width: 100%" allow-clear>
                    <a-select-option value="0"> #todo 对接内部员工接口</a-select-option>
                    <a-select-option value="1"> #todo 对接内部员工接口</a-select-option>
                  </a-select>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:loan:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:loan:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:loan:remove']">
          <a-icon type="delete"/>
          删除
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
        <span slot="formatLoanType" slot-scope="text, record, index">
          {{ formatLoanType(record) }}
        </span>
        <span slot="formatWriteoffStatus" slot-scope="text, record, index">
          {{ formatWriteoffStatus(record) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:loan:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:loan:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:loan:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:loan:remove']">
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
import {delLoan, exportLoan, listLoan} from '@/api/system/loan'
import CreateForm from './modules/CreateForm'
import {projsByUser} from "@/api/system/proj";
import {contractSByProj} from "@/api/system/contract";
import {listStaff} from "@/api/system/staff";

export default {
  name: 'Loan',
  components: {
    CreateForm
  },
  data() {
    return {
      StaffList: [],
      loanTypeList: [
        {value: 0, label: "支付借款"},
        {value: 1, label: "报销借款"},
        {value: 2, label: "归还借款"},
      ],
      contractsList: [],
      projsList: [],
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
        resultContractId: null,
        resultContractNo: null,
        loanType: null,
        borrower: null,
        borrowerId: null,
        abstracted: null,
        amount: null,
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
          ellipsis: true,
          fixed: "left",
          scopedSlots: {customRender: 'serial'},
          align: 'center'
        },
        {
          title: '项目名称',
          dataIndex: 'projName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '合同名称',
          dataIndex: 'contractId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '结算项目',
          dataIndex: 'resultContractId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '单据编号',
          dataIndex: 'resultContractNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '借款类别',
          dataIndex: 'loanType',
          ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: 'formatLoanType'},
        },
        {
          title: '借款人',
          dataIndex: 'borrower',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '发生金额',
          dataIndex: 'amount',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '收款方式',
          dataIndex: 'payType',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户名称',
          dataIndex: 'payAccountId',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户开户行',
          dataIndex: 'payAccountBank',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户号码',
          dataIndex: 'payAccountPhone',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '冲销状态',
          dataIndex: 'writeoffStatus',
          ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: 'formatWriteoffStatus'},
        },
        {
          title: '备注',
          dataIndex: 'remark',
          ellipsis: true,
          align: 'center'
        },

        {
          title: '操作',
          dataIndex: 'operation',
          width: 160,
          fixed: "right",
          scopedSlots: {customRender: 'operation'},
          align: 'center'
        }
      ]
    }
  },
  filters: {},
  created() {
    projsByUser().then(response => {
      this.projsList = response;
    })
    listStaff().then(response => {
      this.StaffList = response;
    })

    this.getList()
  },
  computed: {},
  watch: {},
  methods: {

    formatWriteoffStatus(record) {
      //支付
      if (record.loanType == 0) {
        return record.writeoffStatus == 0 ? "未冲销" : "已冲销"
      }
      return ""

    },
    formatLoanType(row) {
      for (let i = 0; i < this.loanTypeList.length; i++) {
        if (row.loanType == this.loanTypeList[i].value) {
          return this.loanTypeList[i].label
        }
      }
      return "/"
    },
    handleProj(value) {
      this.queryParam.projId = value;
      contractSByProj(value).then(response => {
        this.contractsList = response;
      })
    },
    /** 查询个人借款信息列表 */
    getList() {
      this.loading = true
      listLoan(this.queryParam).then(response => {
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
        resultContractId: undefined,
        resultContractNo: undefined,
        loanType: undefined,
        borrower: undefined,
        borrowerId: undefined,
        abstracted: undefined,
        amount: undefined,
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
          return delLoan(ids)
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
          return exportLoan(that.queryParam)
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
