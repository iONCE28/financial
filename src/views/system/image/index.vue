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
              <a-form-item label="影像类别" prop="type">
                <a-select placeholder="请选择影像类别" v-model="queryParam.type" style="width: 100%" allow-clear>

                  <a-select-option :value="item.id" v-for="item in Imagetype" :key="item.id">
                    {{ item.name }}
                  </a-select-option>

                </a-select>

              </a-form-item>
            </a-col>
            <template v-if="advanced">

              <a-col :md="8" :sm="24">
                <a-form-item label="影像标签" prop="label">
                  <a-input v-model="queryParam.label" placeholder="请输入影像标签" allow-clear/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="操作人" prop="operator">
                  <a-input v-model="queryParam.operator" placeholder="请输入操作人" allow-clear/>
                </a-form-item>
              </a-col>
              <!--              <a-col :md="8" :sm="24">-->
              <!--                <a-form-item label="操作人员ID" prop="operatorId">-->
              <!--                  <a-input v-model="queryParam.operatorId" placeholder="请输入操作人员ID" allow-clear/>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
              <!--              <a-col :md="8" :sm="24">-->
              <!--                <a-form-item label="文件上传时间" prop="uploadTime">-->
              <!--                  <a-date-picker style="width: 100%" v-model="queryParam.uploadTime" format="YYYY-MM-DD HH:mm:ss" allow-clear/>-->
              <!--                </a-form-item>-->
              <!--              </a-col>-->
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
        <a-button type="primary" @click="$refs.createForm.handleAdd()" v-hasPermi="['system:imagemng:add']">
          <a-icon type="plus"/>
          新增
        </a-button>
        <a-button type="primary" :disabled="single" @click="$refs.createForm.handleUpdate(undefined, ids)"
                  v-hasPermi="['system:imagemng:edit']">
          <a-icon type="edit"/>
          修改
        </a-button>
        <a-button type="danger" :disabled="multiple" @click="handleDelete" v-hasPermi="['system:imagemng:remove']">
          <a-icon type="delete"/>
          删除
        </a-button>
        <!--        <a-button type="primary" @click="handleExport" v-hasPermi="['system:imagemng:export']">-->
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
        <span slot="serial" slot-scope="text, record, index">
          {{ index + 1 }}
        </span>
        <span slot="uploadTime" slot-scope="text, record">
          {{ parseTime(record.uploadTime) }}
        </span>
        <span slot="imagetype" slot-scope="text, record">
           {{ imagetypeFormat(record) }}
        </span>
        <span slot="preview" slot-scope="text, record">

          <a @click="handlePreview(record)" v-hasPermi="['system:imagemng:remove']">
           文件预览
          </a>
        </span>
        <span slot="operation" slot-scope="text, record">
          <a-divider type="vertical" v-hasPermi="['system:imagemng:edit']"/>
          <a @click="$refs.createForm.handleUpdate(record, undefined)" v-hasPermi="['system:imagemng:edit']">
            <a-icon type="edit"/>修改
          </a>
          <a-divider type="vertical" v-hasPermi="['system:imagemng:remove']"/>
          <a @click="handleDelete(record)" v-hasPermi="['system:imagemng:remove']">
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
import {delImagemng, exportImagemng, listImagemng} from '@/api/system/imagemng'
import CreateForm from './modules/CreateForm'
import {listImagetype} from "@/api/system/imagetype";
import Base from '@/utils/base64'

export default {
  name: 'Imagemng',
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
        image: null,
        type: null,
        label: null,
        operator: null,
        operatorId: null,
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
          title: '影像类别',
          dataIndex: 'type',
          ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: 'imagetype'},
        },
        {
          title: '影像标签',
          dataIndex: 'label',
          ellipsis: true,
          align: 'center'
        },
        {
          title: '影像文件预览',
          dataIndex: 'image',
          ellipsis: true,
          align: 'center',
          scopedSlots: {customRender: 'preview'},
        },
        {
          title: '操作人',
          dataIndex: 'operator',
          ellipsis: true,
          align: 'center'
        },
        // {
        //   title: '操作人员ID',
        //   dataIndex: 'operatorId',
        //   ellipsis: true,
        //   align: 'center'
        // },
        {
          title: '文件上传时间',
          dataIndex: 'uploadTime',
          scopedSlots: {customRender: 'uploadTime'},
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
      ],
      Imagetype: []
    }
  },
  filters: {},
  created() {
    listImagetype().then(response => {
      this.Imagetype = response.rows

    })
    this.getList()
  },
  computed: {},
  watch: {},
  methods: {
    imagetypeFormat(row){
      for (let i = 0; i < this.Imagetype.length; i++) {
        if (row.type == this.Imagetype[i].id){
          return this.Imagetype[i].name
        }
      }
      return '/'
    },
    handlePreview(value) {
      var base1 = new Base()
      const url = value.image
      window.open('http://127.0.0.1:8012/onlinePreview?url=' + encodeURIComponent(base1.encode(url)));

    },
    /** 查询影像管理信息列表 */
    getList() {
      this.loading = true
      listImagemng(this.queryParam).then(response => {
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
        image: undefined,
        type: undefined,
        label: undefined,
        operator: undefined,
        operatorId: undefined,
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
          return delImagemng(ids)
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
          return exportImagemng(that.queryParam)
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
