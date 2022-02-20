import request from '@/utils/request'

// 查询支付账户信息列表
export function listSysPayaccount (query) {
  return request({
    url: '/system/SysPayaccount/list',
    method: 'get',
    params: query
  })
}
// 查询支付账户信息列表
export function listSysPay (query) {
  return request({
    url: '/system/SysPayaccount/listpay',
    method: 'get',
    params: query
  })
}

// 查询支付账户信息详细
export function getSysPayaccount (id) {
  return request({
    url: '/system/SysPayaccount/' + id,
    method: 'get'
  })
}

// 新增支付账户信息
export function addSysPayaccount (data) {
  return request({
    url: '/system/SysPayaccount',
    method: 'post',
    data: data
  })
}

// 修改支付账户信息
export function updateSysPayaccount (data) {
  return request({
    url: '/system/SysPayaccount',
    method: 'put',
    data: data
  })
}

// 删除支付账户信息
export function delSysPayaccount (id) {
  return request({
    url: '/system/SysPayaccount/' + id,
    method: 'delete'
  })
}

// 导出支付账户信息
export function exportSysPayaccount (query) {
  return request({
    url: '/system/SysPayaccount/export',
    method: 'get',
    params: query
  })
}
