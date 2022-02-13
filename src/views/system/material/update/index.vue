<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 条件搜索 -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="物料名称" prop="name">
                <a-input v-model="queryParam.name" placeholder="请输入物料名称" allow-clear/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="物料状态" prop="type">


                <a-select placeholder="请选择物料状态" v-model="queryParam.type" style="width: 100%" allow-clear>

                  <a-select-option :value="item.id" v-for="item in typeList" :key="item.id">
                    {{ item.name }}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="${comment}" prop="id">-->
            <!--                <a-input v-model="queryParam.id" placeholder="请输入${comment}" allow-clear/>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--            <a-col :md="8" :sm="24">-->
            <!--              <a-form-item label="项目id" prop="projId">-->
            <!--                <a-input v-model="queryParam.projId" placeholder="请输入项目id" allow-clear/>-->
            <!--              </a-form-item>-->
            <!--            </a-col>-->
            <!--            <template v-if="advanced">-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="物料id" prop="materialId">-->
            <!--                  <a-input v-model="queryParam.materialId" placeholder="请输入物料id" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="变更单号" prop="materialNo">-->
            <!--                  <a-input v-model="queryParam.materialNo" placeholder="请输入变更单号" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="状态:0:入库,1:出库" prop="materialStatus">-->
            <!--                  <a-select placeholder="请选择状态:0:入库,1:出库" v-model="queryParam.materialStatus" style="width: 100%" allow-clear>-->
            <!--                    <a-select-option>请选择字典生成</a-select-option>-->
            <!--                  </a-select>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="变更数量" prop="num">-->
            <!--                  <a-input v-model="queryParam.num" placeholder="请输入变更数量" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="修改时间" prop="updateTime">-->
            <!--                  <a-date-picker style="width: 100%" v-model="queryParam.updateTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="说明:简单的摘要信息，如：因物料老化报损" prop="remark">-->
            <!--                  <a-input v-model="queryParam.remark" placeholder="请输入说明:简单的摘要信息，如：因物料老化报损" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="经办人" prop="handler">-->
            <!--                  <a-input v-model="queryParam.handler" placeholder="请输入经办人" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="经办人id" prop="handlerId">-->
            <!--                  <a-input v-model="queryParam.handlerId" placeholder="请输入经办人id" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="预留字段1" prop="reserveOne">-->
            <!--                  <a-input v-model="queryParam.reserveOne" placeholder="请输入预留字段1" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="预留字段2" prop="reserveTwo">-->
            <!--                  <a-input v-model="queryParam.reserveTwo" placeholder="请输入预留字段2" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="预留字段3" prop="reserveThree">-->
            <!--                  <a-input v-model="queryParam.reserveThree" placeholder="请输入预留字段3" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="费用报销日期" prop="createTime">-->
            <!--                  <a-date-picker style="width: 100%" v-model="queryParam.createTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
            <!--              <a-col :md="8" :sm="24">-->
            <!--                <a-form-item label="删除状态 0. 正常 1. 删除" prop="delFlag">-->
            <!--                  <a-input v-model="queryParam.delFlag" placeholder="请输入删除状态 0. 正常 1. 删除" allow-clear/>-->
            <!--                </a-form-item>-->
            <!--              </a-col>-->
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:update:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:update:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:update:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <!--        <a-button type="primary" @click="handleExport" v-hasPermi="['system:update:export']">-->
        <!--          <a-icon type="download" />导出-->
        <!--        </a-button>-->
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
          <a-divider type="vertical" v-hasPermi="['system:update:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:update:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:update:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:update:remove']">
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
import {delUpdate, exportUpdate, listUpdate} from '@/api/material/update'
import CreateForm from './modules/CreateForm'
import {listStatus} from "@/api/material/status";

export default {
  name: 'Update',
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
          title: '物料id',
          dataIndex: 'materialId',
          ellipsis: true,
          align: 'center'
        },
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
          align: 'center'
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
        /*  {
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
            title: '费用报销日期',
            dataIndex: 'createTime',
            scopedSlots: { customRender: 'createTime' },
            ellipsis: true,
            align: 'center'
          },*/
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          scopedSlots: {customRender: 'updateTime'},
          ellipsis: true,
          align: 'center'
        },
        {
          title: '说明',
          dataIndex: 'remark',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '删除状态 0. 正常 1. 删除',
        //   dataIndex: 'delFlag',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '18%',
          scopedSlots: {customRender: 'operation'},
          align: 'center'
        }
      ],
      typeList: []
    }
  },
  filters: {},
  //监听路由变化
  watch: {
    $route(to, from) {
      console.log(to.query.id,"ccc")
      if (to.query.id != from.query.id) {


        this.queryParam.materialId = to.query.id
        this.$refs.createForm.form.materialId = this.queryParam.materialId
        //加载数据
        this.getList()
      }
    }
  },
  mounted() {
    //加载数据
    this.getList()
  },
  created() {
    console.log("ccc")
    console.log(this.$router,"ccc")
    listStatus().then(response => {
      this.typeList = response.rows
    })

  },
  computed: {},
  methods: {
    /** 查询物料管理变更信息列表 */
    getList() {
      this.loading = true
      listUpdate(this.queryParam).then(response => {
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
        id: undefined,
        projId: undefined,
        materialId: undefined,
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
