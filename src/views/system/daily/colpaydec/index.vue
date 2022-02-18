<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
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
              <a-form-item label="收款开始时间" prop="colpayTime">
                <a-date-picker style="width: 100%" v-model="queryParam.colpayStartTime" format="YYYY-MM-DD HH:mm:ss"
                               valueFormat="YYYY-MM-DD HH:mm:ss"
                               allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="收款开始时间" prop="colpayTime">
                <a-date-picker style="width: 100%" v-model="queryParam.colpayEndTime" format="YYYY-MM-DD HH:mm:ss"
                               valueFormat="YYYY-MM-DD HH:mm:ss"
                               allow-clear/>
              </a-form-item>
            </a-col>
            <template v-if="advanced">

              <a-col :md="8" :sm="24">
                <a-form-item label="收款类型" prop="type">
                  <a-select placeholder="请选择收款类型" v-model="queryParam.colpayType" style="width: 100%" allow-clear>
                    <a-select-option :value="item.id" v-for="item in colpayTypes" :key="item.id">
                      {{ item.val }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="收款方式" prop="type">
                  <a-select placeholder="请选择收款方式" v-model="queryParam.colpayWay" style="width: 100%" allow-clear>
                    <a-select-option :value="item.id" v-for="item in colpayWays" :key="item.id">
                      {{ item.val }}
                    </a-select-option>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:colpaydec:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:colpaydec:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:colpaydec:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <!--        <a-button type="primary" @click="handleExport" v-hasPermi="['system:colpaydec:export']">
                  <a-icon type="download"/>
                  导出
                </a-button>-->
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
        <span slot="colpayTime" slot-scope="text, record">
          {{ parseTime(record.colpayTime) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:colpaydec:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:colpaydec:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:colpaydec:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:colpaydec:remove']">
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
import {delColpaydec, exportColpaydec, listColpaydec} from '@/api/system/colpaydec'
import CreateForm from './modules/CreateForm'

export default {
  name: 'Colpaydec',
  components: {
    CreateForm
  },
  data() {
    return {
      colpayTypes: [
        {id: "0", val: "合同收款"},
        {id: "1", val: "其它收款"}],
      colpayWays: [
        {id: "0", val: "现金"},
        {id: "1", val: "银行"}],
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
        contractName: null,
        colpayNo: null,
        colpayStartTime: null,
        colpayEndTime: null,
        colpayType: null,
        colpayWay: null,
        colpayName: null,
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
          dataIndex: 'id',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '项目名称',
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
          title: '收款类型',
          dataIndex: 'colpaySource',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '单据编号',
          dataIndex: 'colpayNo',
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
          title: '发生金额',
          dataIndex: 'colpayAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '发生日期',
          dataIndex: 'colpayTime',
          scopedSlots: {customRender: 'colpayTime'},
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
          title: '收款方式',
          dataIndex: 'colpayDec',
          ellipsis: true,
          align: 'center'
        },

        {
          title: '账户名称',
          dataIndex: 'handler',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '账户开户行',
          dataIndex: 'handler',
          ellipsis: true,
          align: 'center'
        }, {
          title: '账户号码',
          dataIndex: 'handler',
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
    /** 查询收入记账信息列表 */
    getList() {
      this.loading = true
      listColpaydec(this.queryParam).then(response => {
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
          return exportColpaydec(that.queryParam)
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
