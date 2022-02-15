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
                <a-form-item label="押金单据编号" prop="depNo">
                  <a-input v-model="queryParam.depNo" placeholder="请输入押金单据编号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金收取方" prop="depCollecor">
                  <a-input v-model="queryParam.depCollecor" placeholder="请输入押金收取方" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金支付方" prop="depPaior">
                  <a-input v-model="queryParam.depPaior" placeholder="请输入押金支付方" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金金额" prop="depAmt">
                  <a-input v-model="queryParam.depAmt" placeholder="请输入押金金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金经办人" prop="depHandler">
                  <a-input v-model="queryParam.depHandler" placeholder="请输入押金经办人" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="经办人id" prop="depHandlerId">
                  <a-input v-model="queryParam.depHandlerId" placeholder="请输入经办人id" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金收款账户" prop="depColAccount">
                  <a-input v-model="queryParam.depColAccount" placeholder="请输入押金收款账户" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金支付账户" prop="depPayAccount">
                  <a-input v-model="queryParam.depPayAccount" placeholder="请输入押金支付账户" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金收据编号" prop="depColNo">
                  <a-input v-model="queryParam.depColNo" placeholder="请输入押金收据编号" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金收据影像" prop="depColImg">
                  <a-input v-model="queryParam.depColImg" placeholder="请输入押金收据影像" allow-clear/>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:deposit:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:deposit:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:deposit:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:deposit:export']">
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
        :columns="columns"
        :scroll="{x: 1500 }"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
         <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:deposit:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:deposit:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:deposit:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:deposit:remove']">
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
import {delDeposit, exportDeposit, listDeposit} from '@/api/system/deposit'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Deposit',
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
        depNo: null,
        depCollecor: null,
        depPaior: null,
        depContent: null,
        depAmt: null,
        depHandler: null,
        depHandlerId: null,
        depColAccount: null,
        depPayAccount: null,
        depColNo: null,
        depColImg: null,
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
          width: '4%',
          scopedSlots: {customRender: 'serial'},
          align: 'center'
        },
        // {
        //   title: '押金ID',
        //   dataIndex: 'id',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '项目id',
        //   dataIndex: 'projId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '合同id',
        //   dataIndex: 'contractId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '结算项目id',
        //   dataIndex: 'resultProjId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '押金单据编号',
          dataIndex: 'depNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金收取方',
          dataIndex: 'depCollecor',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金支付方',
          dataIndex: 'depPaior',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金金额',
          dataIndex: 'depAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金内容',
          dataIndex: 'depContent',
          ellipsis: true,
          align: 'center'
        },

        {
          title: '押金经办人',
          dataIndex: 'depHandler',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '经办人id',
        //   dataIndex: 'depHandlerId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '押金收款账户',
          dataIndex: 'depColAccount',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金支付账户',
          dataIndex: 'depPayAccount',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金收据编号',
          dataIndex: 'depColNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金收据影像',
          dataIndex: 'depColImg',
          ellipsis: true,
          align: 'center'
        }, {
          title: '押金条状态',
          dataIndex: 'depStatus',
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
    /** 查询押金基础信息列表 */
    getList() {
      this.loading = true
      listDeposit(this.queryParam).then(response => {
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
        depNo: undefined,
        depCollecor: undefined,
        depPaior: undefined,
        depContent: undefined,
        depAmt: undefined,
        depHandler: undefined,
        depHandlerId: undefined,
        depColAccount: undefined,
        depPayAccount: undefined,
        depColNo: undefined,
        depColImg: undefined,
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
          return delDeposit(ids)
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
          return exportDeposit(that.queryParam)
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
