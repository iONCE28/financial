<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="项目id" prop="projId">-->
            <!--                <a-input v-model="queryParam.projId" placeholder="请输入项目id" allow-clear/>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <a-col :md="8" :sm="24">
              <a-form-item label="来往名称" prop="name">
                <a-input v-model="queryParam.name" placeholder="请输入来往名称" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="类别" prop="type">
                <!--                0：单位，1：个人-->
                <a-select placeholder="请选择类别" v-model="queryParam.type" style="width: 100%" allow-clear>
                  <a-select-option value="0">单位</a-select-option>
                  <a-select-option value="1">个人</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <!--            <template v-if="advanced">-->
            <!--             -->
            <!--            </template>-->
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:SysTransactionUnit:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:SysTransactionUnit:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete"
                  v-hasPermi="['system:SysTransactionUnit:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <!--        <a-button type="primary" @click="handleExport" v-hasPermi="['system:SysTransactionUnit:export']">
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
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
         <span slot="typeRender" slot-scope="text, record">
        {{ record.type == 0 ? "公司" : "个人" }}
      </span>
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:SysTransactionUnit:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:SysTransactionUnit:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:SysTransactionUnit:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:SysTransactionUnit:remove']">
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
import {delSysTransactionUnit, exportSysTransactionUnit, listSysTransactionUnit} from '@/api/system/SysTransactionUnit'
import CreateForm from './modules/CreateForm'

export default {
  name: 'SysTransactionUnit',
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
        type: null,
        name: null,
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
        //   title: '项目id',
        //   dataIndex: 'projId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '类别',
          dataIndex: 'type',
          // ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: "typeRender"}
          ,
        },
        {
          title: '来往名称',
          dataIndex: 'name',
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
    /** 查询往来(单位-人)信息列表 */
    getList() {
      this.loading = true
      listSysTransactionUnit(this.queryParam).then(response => {
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
        type: undefined,
        name: undefined,
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
          return delSysTransactionUnit(ids)
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
          return exportSysTransactionUnit(that.queryParam)
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
