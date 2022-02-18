<template>
  <a-drawer
    width="35%"
    :label-col="4"
    :wrapper-col="14"
    :visible="openDataScope"
    @close="onClose">
    <a-divider orientation="left">
      <b>{{ formTitle }}</b>
    </a-divider>
    <a-form-model ref="form" :model="form">
      <a-form-model-item label="数据权限" >
        <a-checkbox @change="handleCheckedTreeExpand($event)">
          展开/折叠
        </a-checkbox>
        <a-checkbox @change="handleCheckedTreeNodeAll($event)">
          全选/全不选
        </a-checkbox>
        <a-checkbox @change="handleCheckedTreeConnect($event)" :checked="form.deptCheckStrictly">
          父子联动
        </a-checkbox>
        <a-tree
          v-model="deptCheckedKeys"
          checkable
          :checkStrictly="!form.deptCheckStrictly"
          :expanded-keys="deptExpandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="budgetOptions"
          @expand="onExpandDept"
          :replaceFields="defaultProps"
          @check="onCheck"
        />
      </a-form-model-item>
      <div class="bottom-control">
        <a-space>
          <a-button type="primary" @click="submitDataScope">
            保存
          </a-button>
          <a-button type="dashed" @click="cancel">
            取消
          </a-button>
        </a-space>
      </div>
    </a-form-model>
  </a-drawer>
</template>

<script>

import { getRole, dataSubject } from '@/api/system/role'
import { treeselect as budgetTreeselect, rolebudgetTreeselect } from '@/api/system/budget'
export default {
  name: 'CreateDataScopeForm',
  components: {
  },
  data () {
    return {
      loading: false,
      deptExpandedKeys: [],
      autoExpandParent: false,
      deptCheckedKeys: [],
      halfCheckedKeys: [],
      // 部门列表
      budgetOptions: [],
      formTitle: '',
      // 表单参数
      form: {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: '0',
        // deptIds: [],
        id: [],
        deptCheckStrictly: true,
        remark: undefined
      },
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      deptExpand: true,
      deptNodeAll: false,
      defaultProps: {
        children: 'children',
        title: 'label',
        key: 'id'
      }
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
      
    onExpandDept (expandedKeys) {
      this.deptExpandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    /** 查询部门树结构 */
    getDeptTreeselect () {
      budgetTreeselect().then(response => {
        this.budgetOptions = response.data
      })
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys () {
      // 全选与半选
      return this.deptCheckedKeys.concat(this.halfCheckedKeys)
    },
    getAllDeptNode (nodes) {
      if (!nodes || nodes.length === 0) {
        return []
      }
      nodes.forEach(node => {
        this.deptCheckedKeys.push(node.id)
        return this.getAllDeptNode(node.children)
      })
    },
    // 回显过滤
    selectNodefilter (nodes, parentNos) {
      if (!nodes || nodes.length === 0) {
        return []
      }
      nodes.forEach(node => {
        // 父子关联模式且当前元素有父级
        const currentIndex = this.deptCheckedKeys.indexOf(node.id)
        // 当前节点存在,且父节点不存在，则说明父节点应是半选中状态
        if (currentIndex !== -1) {
          parentNos.forEach(parentNo => {
            if (this.halfCheckedKeys.indexOf(parentNo) === -1) {
              this.halfCheckedKeys.push(parentNo)
            }
          })
          parentNos = []
        }
        // 防重
        const isExist = this.halfCheckedKeys.indexOf(node.id)
        const isExistparentNos = parentNos.indexOf(node.id)
        if (isExist === -1 && isExistparentNos === -1 && currentIndex === -1) {
          parentNos.push(node.id)
        }
        return this.selectNodefilter(node.children, parentNos)
      })
    },
    handleCheckedTreeNodeAll (value) {
      if (value.target.checked) {
        this.getAllDeptNode(this.budgetOptions)
      } else {
        this.deptCheckedKeys = []
        this.halfCheckedKeys = []
      }
    },
    handleCheckedTreeExpand (value) {
      if (value.target.checked) {
        const treeList = this.budgetOptions
        for (let i = 0; i < treeList.length; i++) {
          this.deptExpandedKeys.push(treeList[i].id)
        }
      } else {
        this.deptExpandedKeys = []
      }
    },
    // 树权限（父子联动）
    handleCheckedTreeConnect (value) {
      this.form.deptCheckStrictly = !this.form.deptCheckStrictly
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect (roleId) {
      return rolebudgetTreeselect(roleId).then(response => {
        this.budgetOptions = response.data.depts
        return response
      })
    },
    onCheck (checkedKeys, info) {
      if (!this.form.deptCheckStrictly) {
        let currentCheckedKeys = []
        if (this.deptCheckedKeys.checked) {
          currentCheckedKeys = currentCheckedKeys.concat(this.deptCheckedKeys.checked)
        }
        if (this.deptCheckedKeys.halfChecked) {
          currentCheckedKeys = currentCheckedKeys.concat(this.deptCheckedKeys.halfChecked)
        }
        this.deptCheckedKeys = currentCheckedKeys
      } else {
        // 半选节点
        this.halfCheckedKeys = info.halfCheckedKeys
        this.deptCheckedKeys = checkedKeys
      }
    },
    onClose () {
      this.openDataScope = false
    },
    // 取消按钮
    cancel () {
      this.openDataScope = false
      this.reset()
    },
    // 表单重置
    reset () {
      this.deptExpand = true
      this.deptNodeAll = false
      this.deptExpandedKeys = []
      this.autoExpandParent = false
      this.deptCheckedKeys = []
      this.halfCheckedKeys = []
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        status: '0',
        id: [],
        deptCheckStrictly: true,
        remark: undefined
      }
    },
    /** 分配数据权限操作 */
    handleSubject (row) {
      this.reset()
      const rolebudgetTreeselect = this.getRoleDeptTreeselect(row.roleId)
      getRole(row.roleId).then(response => {
        this.form = response.data
        this.openDataScope = true
        this.$nextTick(() => {
          rolebudgetTreeselect.then(res => {
            this.deptCheckedKeys = res.data.checkedKeys
            // 过滤回显时的半选中node(父)
            if (this.form.deptCheckStrictly) {
              this.selectNodefilter(this.budgetOptions, [])
            }
          })
        })
        this.formTitle = '分配数据权限'
      })
    },
    /** 提交按钮（数据权限） */
    submitDataScope: function () {
      if (this.form.roleId !== undefined) {
        this.form.id = this.getDeptAllCheckedKeys()
        dataSubject(this.form).then(response => {
          this.$message.success(
            '修改成功',
            3
          )
          this.openDataScope = false
          this.$emit('ok')
        })
      }
    }
  }
}
</script>
