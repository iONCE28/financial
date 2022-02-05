<template>
  <a-modal
    ref="subTableModel"
    :title="'物料管理变更信息'"
    width="80%"
    :visible="visible"
    @cancel="close"
  >
    <template slot="footer">
      <a-button type="dashed" @click="close">
        关闭
      </a-button>
    </template>
    <a-card :bordered="false">
      <!-- 操作 -->
      <div class="table-operations">
        <a-button type="primary" @click="$refs.createSubForm.handleAdd()">
          <a-icon type="plus" />新增
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete">
          <a-icon type="delete" />删除
        </a-button>
      </div>
      <!-- 增加修改 -->
      <create-sub-form
        ref="createSubForm"
        @add="handleAddSysMaterialUpdate"
      />
      <!-- 数据展示 -->
      <a-table
        :loading="loading"
        :size="tableSize"
        rowKey="materialId"
        :columns="columns"
        :data-source="list"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
        :pagination="false">
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" />
          <a @click="handleDelete(record)">
            <a-icon type="delete" />删除
          </a>
        </span>
      </a-table>
    </a-card>
  </a-modal>
</template>

<script>
import CreateSubForm from './CreateSubForm'

export default {
  name: 'SubTable',
  components: {
    CreateSubForm
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      visible: false,
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
      columns: [
        {
          title: '项目id',
          dataIndex: 'projId',
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
          title: '状态:0:入库,1:出库',
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
          title: '修改时间',
          dataIndex: 'updateTime',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '说明:简单的摘要信息，如：因物料老化报损',
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
          title: '费用报销日期',
          dataIndex: 'createTime',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '删除状态 0. 正常 1. 删除',
          dataIndex: 'delFlag',
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
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 关闭模态框
    close () {
      this.visible = false
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    // 打开抽屉(由外面的组件调用)
    show () {
      this.visible = true
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
      this.ids = selectedRowKeys.map(item => item - 1)
      this.single = selectedRowKeys.length !== 1
      this.multiple = !selectedRowKeys.length
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      var that = this
      if (row) {
        var index = (this.list || []).findIndex((item) => item === row)
      }
      const ids = index !== undefined ? index : this.ids
      this.$confirm({
        title: '确认删除所选中数据?',
        content: '当前选中序号为' + ids + '的数据',
        onOk () {
          that.$emit('delete', index, ids)
        },
        onCancel () {}
      })
    },
    handleAddSysMaterialUpdate (row) {
      this.$emit('add', row)
    }
  }
}
</script>
