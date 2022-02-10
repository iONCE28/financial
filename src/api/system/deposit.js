import request from '@/utils/request'

// 查询押金基础信息列表
export function listDeposit (query) {
  return request({
    url: '/system/deposit/list',
    method: 'get',
    params: query
  })
}

// 查询押金基础信息详细
export function getDeposit (id) {
  return request({
    url: '/system/deposit/' + id,
    method: 'get'
  })
}

// 新增押金基础信息
export function addDeposit (data) {
  return request({
    url: '/system/deposit',
    method: 'post',
    data: data
  })
}

// 修改押金基础信息
export function updateDeposit (data) {
  return request({
    url: '/system/deposit',
    method: 'put',
    data: data
  })
}

// 删除押金基础信息
export function delDeposit (id) {
  return request({
    url: '/system/deposit/' + id,
    method: 'delete'
  })
}

// 导出押金基础信息
export function exportDeposit (query) {
  return request({
    url: '/system/deposit/export',
    method: 'get',
    params: query
  })
}
