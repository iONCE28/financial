import request from '@/utils/request'

// 查询预算管理列表
export function listSysBudgetMng (query) {
  return request({
    url: '/system/SysBudgetMng/list',
    method: 'get',
    params: query
  })
}

// 查询预算管理详细
export function getSysBudgetMng (id) {
  return request({
    url: '/system/SysBudgetMng/' + id,
    method: 'get'
  })
}

// 新增预算管理
export function addSysBudgetMng (data) {
  return request({
    url: '/system/SysBudgetMng',
    method: 'post',
    data: data
  })
}

// 修改预算管理
export function updateSysBudgetMng (data) {
  return request({
    url: '/system/SysBudgetMng',
    method: 'put',
    data: data
  })
}

// 删除预算管理
export function delSysBudgetMng (id) {
  return request({
    url: '/system/SysBudgetMng/' + id,
    method: 'delete'
  })
}

// 导出预算管理
export function exportSysBudgetMng (query) {
  return request({
    url: '/system/SysBudgetMng/export',
    method: 'get',
    params: query
  })
}
