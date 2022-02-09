import request from '@/utils/request'

// 查询收/付款到期提醒方式信息列表
export function listSysPaycolType (query) {
  return request({
    url: '/system/SysPaycolType/list',
    method: 'get',
    params: query
  })
}

// 查询收/付款到期提醒方式信息详细
export function getSysPaycolType (id) {
  return request({
    url: '/system/SysPaycolType/' + id,
    method: 'get'
  })
}

// 新增收/付款到期提醒方式信息
export function addSysPaycolType (data) {
  return request({
    url: '/system/SysPaycolType',
    method: 'post',
    data: data
  })
}

// 修改收/付款到期提醒方式信息
export function updateSysPaycolType (data) {
  return request({
    url: '/system/SysPaycolType',
    method: 'put',
    data: data
  })
}

// 删除收/付款到期提醒方式信息
export function delSysPaycolType (id) {
  return request({
    url: '/system/SysPaycolType/' + id,
    method: 'delete'
  })
}

// 导出收/付款到期提醒方式信息
export function exportSysPaycolType (query) {
  return request({
    url: '/system/SysPaycolType/export',
    method: 'get',
    params: query
  })
}
