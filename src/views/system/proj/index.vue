<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="项目名称" prop="name">
                <a-input v-model="queryParam.name" placeholder="请输入项目名称" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="项目编号" prop="number">
                <a-input v-model="queryParam.number" placeholder="请输入项目编号" allow-clear/>
              </a-form-item>
            </a-col>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:proj:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:proj:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:proj:remove']">
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
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="onTime" slot-scope="text, record">
          {{ parseTime(record.onTime) }}
        </span>
        <span slot="offTime" slot-scope="text, record">
          {{ parseTime(record.offTime) }}
        </span>
        <span slot="uploadTime" slot-scope="text, record">
          {{ parseTime(record.uploadTime) }}
        </span>
        <span slot="files" slot-scope="text, record" v-if="record.file !== null">
          <a @click="preview(record.file)">
            <a-icon type="eye"/>预览
          </a>
          <a-divider type="vertical"/>
          <a @click="download(record.file)">
            <a-icon type="download"/>下载
          </a>
        </span>
          <div v-else>
            <span slot="files" slot-scope="text, record" style="display: none">
          <a @click="preview(record.file)">
            <a-icon type="eye"/>预览
          </a>
          <a-divider type="vertical"/>
          <a @click="download(record.file)">
            <a-icon type="download"/>下载
          </a>
        </span>
          </div>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:proj:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:proj:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:proj:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:proj:remove']">
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
import {delProj, exportProj, listProj} from '@/api/system/proj'
import CreateForm from './modules/CreateForm'
import Base from '@/utils/base64'

export default {
  name: 'Proj',
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
        name: null,
        number: null,
        nature: null,
        status: null,
        abstracts: null,
        file: null,
        showNum: null,
        setNum: null,
        onTime: null,
        offTime: null,
        cycle: null,
        investor: null,
        undertakor: null,
        depart: null,
        dutior: null,
        dutiorTitle: null,
        dutiorPhone: null,
        scale: null,
        uploadTime: null,
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
        {
          title: '项目名称',
          dataIndex: 'name',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '项目编号',
          dataIndex: 'number',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '项目性质',
          dataIndex: 'nature',
          ellipsis: true,
          align: 'center',
          customRender: function (text) {
            if (text === '0') {
              return "新建"
            } else if (text === '1') {
              return "在建"
            } else if (text === '2') {
              return "维护"
            }
          }
        },
        {
          title: '执行状态',
          dataIndex: 'status',
          ellipsis: true,
          align: 'center',
          customRender: function (text) {
            if (text === '0') {
              return "未开始"
            } else if (text === '1') {
              return "正在进行"
            } else if (text === '2') {
              return "已验收"
            }
          }
        },
        {
          title: '场次',
          dataIndex: 'showNum',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '页数',
          dataIndex: 'pageNum',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '集数',
          dataIndex: 'setNum',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '负责人',
          dataIndex: 'dutior',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '项目文件',
          dataIndex: 'file',
          width: '12%',
          scopedSlots: {customRender: 'files'},
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '12%',
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
    preview(row) {
      var base1 = new Base();
      const url = row
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + encodeURIComponent(base1.encode(url)));
    },
    download(row) {
      window.location.href = row
    },
    /** 查询项目基本信息列表 */
    getList() {
      this.loading = true
      listProj(this.queryParam).then(response => {
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
        name: undefined,
        number: undefined,
        nature: undefined,
        status: undefined,
        abstracts: undefined,
        file: undefined,
        showNum: undefined,
        setNum: undefined,
        onTime: undefined,
        offTime: undefined,
        cycle: undefined,
        investor: undefined,
        undertakor: undefined,
        depart: undefined,
        dutior: undefined,
        dutiorTitle: undefined,
        dutiorPhone: undefined,
        scale: undefined,
        uploadTime: undefined,
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
          return delProj(ids)
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
          return exportProj(that.queryParam)
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
