import request from '@/utils/request'

// 查询往来(单位-人)信息列表
export function listSysTransactionUnit (query) {
  return request({
    url: '/system/SysTransactionUnit/list',
    method: 'get',
    params: query
  })
}

// 查询往来(单位-人)信息详细
export function getSysTransactionUnit (id) {
  return request({
    url: '/system/SysTransactionUnit/' + id,
    method: 'get'
  })
}

// 新增往来(单位-人)信息
export function addSysTransactionUnit (data) {
  return request({
    url: '/system/SysTransactionUnit',
    method: 'post',
    data: data
  })
}

// 修改往来(单位-人)信息
export function updateSysTransactionUnit (data) {
  return request({
    url: '/system/SysTransactionUnit',
    method: 'put',
    data: data
  })
}

// 删除往来(单位-人)信息
export function delSysTransactionUnit (id) {
  return request({
    url: '/system/SysTransactionUnit/' + id,
    method: 'delete'
  })
}

// 导出往来(单位-人)信息
export function exportSysTransactionUnit (query) {
  return request({
    url: '/system/SysTransactionUnit/export',
    method: 'get',
    params: query
  })
}
