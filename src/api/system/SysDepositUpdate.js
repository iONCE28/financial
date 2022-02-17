import request from '@/utils/request'

// 查询押金变更信息列表
export function listSysDepositUpdate(query) {
  return request({
    url: '/system/SysDepositUpdate/list',
    method: 'get',
    params: query
  })
}

// 查询押金变更信息详细
export function getSysDepositUpdate(id) {
  return request({
    url: '/system/SysDepositUpdate/' + id,
    method: 'get'
  })
}

// 新增押金变更信息
export function addSysDepositUpdate(data) {
  return request({
    url: '/system/SysDepositUpdate',
    method: 'post',
    data: data
  })
}

// 修改押金变更信息
export function updateSysDepositUpdate(data) {
  return request({
    url: '/system/SysDepositUpdate',
    method: 'put',
    data: data
  })
}

// 删除押金变更信息
export function delSysDepositUpdate(id) {
  return request({
    url: '/system/SysDepositUpdate/' + id,
    method: 'delete'
  })
}

// 导出押金变更信息
export function exportSysDepositUpdate(query) {
  return request({
    url: '/system/SysDepositUpdate/export',
    method: 'get',
    params: query
  })
}
