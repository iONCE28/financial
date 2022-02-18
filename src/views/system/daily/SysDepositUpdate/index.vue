<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <!--        <a-col :md="8" :sm="24">
                   <a-form-item label="押金id" prop="depId">
                     <a-input v-model="queryParam.depId" placeholder="请输入押金id" allow-clear/>
                   </a-form-item>
                 </a-col>
                 <a-col :md="8" :sm="24">
                   <a-form-item label="押金大类" prop="depMaxType">
                     <a-select placeholder="请选择押金大类" v-model="queryParam.depMaxType" style="width: 100%" allow-clear>
                       <a-select-option>请选择字典生成</a-select-option>
                     </a-select>
                   </a-form-item>
                 </a-col>-->
            <template v-if="advanced">
              <!--              <a-col :md="8" :sm="24">-->
              <!--                <a-form-item label="押金小类" prop="depMinType">-->
              <!--                  <a-select placeholder="请选择押金小类" v-model="queryParam.depMinType" style="width: 100%" allow-clear>-->
              <!--                    <a-select-option>请选择字典生成</a-select-option>-->
              <!--                  </a-select>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <a-col :md="8" :sm="24">
                <a-form-item label="押金金额" prop="depAmt">
                  <a-input v-model="queryParam.depAmt" placeholder="请输入押金金额" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金日期" prop="depTime">
                  <a-date-picker style="width: 100%" v-model="queryParam.depTime" format="YYYY-MM-DD HH:mm:ss"
                                 allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="押金状态" prop="depStatus">
                  <a-select placeholder="请选择押金状态" v-model="queryParam.depStatus" style="width: 100%" allow-clear>
                    <a-select-option>请选择字典生成</a-select-option>
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
        <a-button type="primary" @click="$refs.updateForm.handleAdd()" v-hasPermi="['system:SysDepositUpdate:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.updateForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:SysDepositUpdate:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete"
                  v-hasPermi="['system:SysDepositUpdate:remove']">
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
      <update-form
        ref="updateForm"
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
        <span slot="depTime" slot-scope="text, record">
          {{ record.depTime }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:SysDepositUpdate:edit']"/>
          <a @click="$refs.updateForm.handleUpdate(record, undefined)" v-hasPermi="['system:SysDepositUpdate:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:SysDepositUpdate:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:SysDepositUpdate:remove']">
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
import {listSysDepositUpdate, delSysDepositUpdate, exportSysDepositUpdate} from '@/api/system/SysDepositUpdate'
import UpdateForm from './modules/UpdateForm'

export default {
  name: 'SysDepositUpdate',
  components: {
    UpdateForm
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
        depId: null,
        depMaxType: null,
        depMinType: null,
        depAmt: null,
        depTime: null,
        depStatus: null,
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
        // {
        //   title: '押金id',
        //   dataIndex: 'depId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '押金金额',
          dataIndex: 'depAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金日期',
          dataIndex: 'depTime',
          scopedSlots: {customRender: 'depTime'},
          ellipsis: true,
          align: 'center'
        },
        {
          title: '押金条状态',
          dataIndex: 'depStatus',
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
  //监听路由变化
  watch: {
    $route(to, from) {
      if ((to.query.id != from.query.id) && (to.query.depNo != from.query.depNo)) {
        this.queryParam.depId = to.query.id
        this.queryParam.de = to.query.id
        this.$refs.updateForm.form.depId = this.queryParam.depId
        //加载数据
        this.getList()
      }
    }
  },
  methods: {
    /** 查询押金变更信息列表 */
    getList() {
      this.loading = true
      listSysDepositUpdate(this.queryParam).then(response => {
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
        depId: undefined,
        depMaxType: undefined,
        depMinType: undefined,
        depAmt: undefined,
        depTime: undefined,
        depStatus: undefined,
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
          return delSysDepositUpdate(ids)
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
          return exportSysDepositUpdate(that.queryParam)
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
