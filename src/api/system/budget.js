import request from '@/utils/request'

// 查询科目列表
export function listbudget (query) {
  return request({
    url: '/system/budget/list',
    method: 'get',
    params: query
  })
}

// 查询科目列表（排除节点）
export function listbudgetExcludeChild (budgetid) {
  return request({
    url: '/system/budget/list/exclude/' + budgetid,
    method: 'get'
  })
}

// 查询科目详细
export function getbudget (id) {
  return request({
    url: '/system/budget/' + id,
    method: 'get'
  })
}

// 查询科目下拉树结构
export function treeselect () {
  return request({
    url: '/system/budget/treeselect',
    method: 'get'
  })
}


// 新增科目
export function addbudget (data) {
  return request({
    url: '/system/budget',
    method: 'post',
    data: data
  })
}

// 修改科目
export function updatebudget (data) {
  return request({
    url: '/system/budget',
    method: 'put',
    data: data
  })
}

// 删除科目
export function delbudget (id) {
  return request({
    url: '/system/budget/' + id,
    method: 'delete'
  })
}
