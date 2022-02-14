<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="合同类型" prop="type">
                <a-select placeholder="请选择合同类型" v-model="queryParam.constractBigType" style="width: 100%" allow-clear>
                  <a-select-option :value="item.id" v-for="item in maxTypes" :key="item.id">
                    {{ item.maxType }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :md="8" :sm="24">
              <a-form-item label="甲方名称" prop="nailName">
                <a-input v-model="queryParam.nailName" placeholder="请输入甲方名称" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                <a-button type="primary" @click="handleQuery"><a-icon type="search"/>查询</a-button>
                <a-button style="margin-left: 8px" @click="resetQuery"><a-icon type="redo"/>重置</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <!-- 操作 -->
      <div class="table-operations">
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:contract:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:contract:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:contract:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <a-button type="primary" @click="handleExport" v-hasPermi="['system:contract:export']">
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
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
        <span slot="files" slot-scope="text, record" v-if="record.voucher !== ''">
          <a @click="preview(record.voucher)">
            <a-icon type="eye"/>预览
          </a>
          <a-divider type="vertical"/>
          <a @click="download(record.voucher)">
            <a-icon type="download"/>下载
          </a>
        </span>
        <div v-else>
          <span slot="files" slot-scope="text, record" style="display: none">
          <a @click="preview(record.voucher)">
            <a-icon type="eye"/>预览
          </a>
          <a-divider type="vertical"/>
          <a @click="download(record.voucher)">
            <a-icon type="download"/>下载
          </a>
        </span>
        </div>
        <span slot="signTime" slot-scope="text, record">
          {{ parseTime(record.signTime) }}
        </span>
        <span slot="uploadTime" slot-scope="text, record">
          {{ parseTime(record.uploadTime) }}
        </span>
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:contract:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:contract:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:contract:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:contract:remove']">
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
import {delContract, exportContract, listContract} from '@/api/system/contract'
import CreateForm from './modules/CreateForm'
import {listType} from "@/api/system/type";
import Base from '@/utils/base64'

export default {
  name: 'Contract',
  components: {
    CreateForm
  },
  data() {
    return {
      maxTypes: [],//合同类型-大
      minTypes: [],//合同类型-小
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
        type: null,
        nailName: null,
        bname: null,
        content: null,
        closeAmount: null,
        closeProj: null,
        investor: null,
        voucher: null,
        account: null,
        openBank: null,
        payCycle: null,
        payCondition: null,
        payAmount: null,
        payCallType: null,
        harvestCycle: null,
        harvestCondition: null,
        harvestAmount: null,
        harvestCallType: null,
        projId: null,
        constractName: null,
        constractNo: null,
        signTime: null,
        constractBigType: null,
        constractSmallType: null,
        uploadTime: null,
        contactsor: null,
        contactsPhone: null,
        contactsEmai: null,
        contactsOthers: null,
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
        //   title: '合同类型',
        //   dataIndex: 'type',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '甲方名称',
          dataIndex: 'nailName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '乙方名称',
          dataIndex: 'bname',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '合同内容',
        //   dataIndex: 'content',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '结算金额',
          dataIndex: 'closeAmount',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '结算项目',
        //   dataIndex: 'closeProj',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '投资方',
        //   dataIndex: 'investor',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '合同凭证',
        //   dataIndex: 'voucher',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '结算账户',
        //   dataIndex: 'account',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '开户银行',
        //   dataIndex: 'openBank',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '付款周期数：年月日',
        //   dataIndex: 'payCycle',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '付款条件',
        //   dataIndex: 'payCondition',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '付款金额',
        //   dataIndex: 'payAmount',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '付款提醒方式：短信，邮箱等',
        //   dataIndex: 'payCallType',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收款周期数:',
        //   dataIndex: 'harvestCycle',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收款条件',
        //   dataIndex: 'harvestCondition',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收款金额',
        //   dataIndex: 'harvestAmount',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '收款提醒方式：短信，邮箱等',
        //   dataIndex: 'harvestCallType',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '项目id',
        //   dataIndex: 'projId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '合同名称',
          dataIndex: 'constractName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '合同编号',
          dataIndex: 'constractNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '签约日期',
          dataIndex: 'signTime',
          scopedSlots: {customRender: 'signTime'},
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '合同大类别:0：收入合同，1：支出合同',
        //   dataIndex: 'constractBigType',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '合同小类别',
          dataIndex: 'constractSmallType',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '合同上传文件时间',
        //   dataIndex: 'uploadTime',
        //   scopedSlots: { customRender: 'uploadTime' },
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '联系人名称',
          dataIndex: 'contactsor',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '联系人电话',
        //   dataIndex: 'contactsPhone',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '联系人邮箱',
        //   dataIndex: 'contactsEmai',
        //   ellipsis: true,
        //   align: 'center'
        // },
        // {
        //   title: '联系人其他',
        //   dataIndex: 'contactsOthers',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '合同文件',
          dataIndex: 'voucher',
          width: '8%',
          scopedSlots: {customRender: 'files'},
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
    listType().then(response => {
      this.maxTypes = response.maxTypes;
      this.minTypes = response.minTypes;
    })
    this.getList()
  },
  computed: {},
  watch: {},
  methods: {
    preview(row) {
      var base1 = new Base();
      const url = row
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + encodeURIComponent(base1.encode(url)));
    },
    download(row) {
      window.location.href = row
    },
    /** 查询合同基本信息列表 */
    getList() {
      this.loading = true
      listContract(this.queryParam).then(response => {
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
        type: undefined,
        nailName: undefined,
        bname: undefined,
        content: undefined,
        closeAmount: undefined,
        closeProj: undefined,
        investor: undefined,
        voucher: undefined,
        account: undefined,
        openBank: undefined,
        payCycle: undefined,
        payCondition: undefined,
        payAmount: undefined,
        payCallType: undefined,
        harvestCycle: undefined,
        harvestCondition: undefined,
        harvestAmount: undefined,
        harvestCallType: undefined,
        projId: undefined,
        constractName: undefined,
        constractNo: undefined,
        signTime: undefined,
        constractBigType: undefined,
        constractSmallType: undefined,
        uploadTime: undefined,
        contactsor: undefined,
        contactsPhone: undefined,
        contactsEmai: undefined,
        contactsOthers: undefined,
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
          return delContract(ids)
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
          return exportContract(that.queryParam)
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
