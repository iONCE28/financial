<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="物料状态" prop="type">
                <a-select placeholder="请选择物料状态" v-model="queryParam.materialStatus" style="width: 100%" allow-clear>
                  <a-select-option :value="item.statusNo.toString()" v-for="item in typeList" :key="item.statusNo.toString()">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
                    <a-form-item label="变更时间">
                      <a-range-picker style="width: 100%" v-model="dateRange" valueFormat="YYYY-MM-DD" format="YYYY-MM-DD" allow-clear />
                    </a-form-item>
                  </a-col>
                  <template v-if="advanced">
<a-col :md="8" :sm="24">
                <a-form-item label="经办人" prop="handler">
                  <a-input v-model="queryParam.handler" placeholder="请输入经办人" allow-clear/>
                </a-form-item>
              </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="部门名称">
                      <a-input v-model="queryParam.deptName" placeholder="请输入经办人部门名称" allow-clear/>
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:update:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <!-- <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:update:edit']">
          <a-icon type="edit"/>
          修改
        </a-button> -->
        <!-- <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:update:remove']">
          <a-icon type="delete"/>
          删除
        </a-button> -->
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
      <details-from ref="detailsfrom">

      </details-from>
      <!-- 数据展示 -->
      <a-table
        :loading="loading"
        rowKey="id"
        :columns="columns"
        :data-source="list"
        :pagination="false"
        :scroll="{ x: 1800 }">
        <span slot="updateTime" slot-scope="text, record">
          {{ parseTime(record.updateTime) }}
        </span>
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="createTime" slot-scope="text, record">
          {{ parseTime(record.createTime) }}
        </span>
        <span slot="operation" slot-scope="text, record">
          <a @click="$refs.detailsfrom.handleDetail(record, undefined)" v-hasPermi="['system:update:edit']">
            <a-icon type="eye"/>详情
          </a>
          <!-- <a-divider type="vertical" v-hasPermi="['system:update:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:update:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:update:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:update:remove']">
            <a-icon type="delete"/>删除
          </a> -->
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
import {delUpdate, exportUpdate, listUpdate} from '@/api/material/update'
import CreateForm from './modules/CreateForm'
import {listStatus} from "@/api/material/status";
import DetailsFrom from './modules/DetailsFrom'
export default {
  name: 'Update',
  components: {
    CreateForm,
    DetailsFrom
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
      dateRange: [],
      loading: false,
      total: 0,
      typeList: [],
      // 查询参数
      queryParam: {
        id: null,
        projId: null,
        materialId: null,
        materialNo: null,
        materialStatus: null,
        num: null,
        updateTime: null,
        remark: null,
        handler: null,
        handlerId: null,
        reserveOne: null,
        reserveTwo: null,
        reserveThree: null,
        createTime: null,
        delFlag: null,
        deptName: null,
        pageNum: 1,
        pageSize: 10,
         startAmt: null,
         initAmt: null,
         projName: null
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
          dataIndex: 'projName',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '物料id',
        //   dataIndex: 'materialId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '变更单号',
          dataIndex: 'materialNo',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'materialStatus',
          ellipsis: true,
          align: 'center',
           customRender: function(text, record) {   
           if(text === "0") {
             return "入库"
           } else if(text === "1") {
             return "借出"
           } else if(text === "2") {
             return "归还"
           } else if (text === "3") {
             return "报损"
           } else{
             return "售卖"
           }
          }
        },
        {
          title: '变更数量',
          dataIndex: 'num',
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
          title: '经办人部门',
          dataIndex: 'deptName',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '物料期初余额',
          dataIndex: 'startAmt',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '物料期末余额',
          dataIndex: 'initAmt',
          ellipsis: true,
          align: 'center'
        },
        
        {
          title: '可用库存',
          dataIndex: 'availableStock',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          scopedSlots: {customRender: 'updateTime'},
          ellipsis: true,
           width: "15%",
          align: 'center'
        },
        // {
        //   title: '说明',
        //   dataIndex: 'remark',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '操作',
          dataIndex: 'operation',
          fixed: 'right',
    width: 100,
          scopedSlots: {customRender: 'operation'},
          align: 'center',
        }
      ],
    }
  },
  filters: {},
  //监听路由变化
  watch: {
    $route(to, from) {
      console.log(to.query.materialNo,"ccc")
      if (to.query.materialId != from.query.materialId) {
        this.queryParam.materialId = to.query.materialId
        this.queryParam.projName= to.query.projName
        localStorage.setItem("materialId", to.query.materialId)
        localStorage.setItem("projName",to.query.projName)
        //加载数据
        this.getList()
      }
    }
  },
  mounted() {
    //加载数据
       this.queryParam.materialId = this.$route.query.materialId
        this.queryParam.projName= this.$route.query.projName
        localStorage.setItem("materialId", this.$route.query.materialId)
        localStorage.setItem("projName",this.$route.query.projName)
    this.getList()
  },
  created() {
    listStatus().then(response => {
      this.typeList = response.rows    
    })

  },
  computed: {},
  methods: {
    /** 查询物料管理变更信息列表 */
    getList() {
      this.loading = true
      listUpdate(this.addDateRange(this.queryParam, this.dateRange)).then(response => {
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
      this.dateRange = [],
      this.queryParam = {
        id: undefined,
        projId: undefined,
        materialId: localStorage.getItem("materialId"),
        materialNo: undefined,
        materialStatus: undefined,
        num: undefined,
        updateTime: undefined,
        remark: undefined,
        handler: undefined,
        handlerId: undefined,
        reserveOne: undefined,
        reserveTwo: undefined,
        reserveThree: undefined,
        createTime: undefined,
        delFlag: undefined,
        pageNum: 1,
        pageSize: 10,
        startAmt: null,
         initAmt: null,
         projName: null,
         deptName: null
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
          return delUpdate(ids)
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
          return exportUpdate(that.queryParam)
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
