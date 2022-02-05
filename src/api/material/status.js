import request from '@/utils/request'

// 查询物料状态信息列表
export function listStatus (query) {
  return request({
    url: '/system/status/list',
    method: 'get',
    params: query
  })
}

// 查询物料状态信息详细
export function getStatus (id) {
  return request({
    url: '/system/status/' + id,
    method: 'get'
  })
}

// 新增物料状态信息
export function addStatus (data) {
  return request({
    url: '/system/status',
    method: 'post',
    data: data
  })
}

// 修改物料状态信息
export function updateStatus (data) {
  return request({
    url: '/system/status',
    method: 'put',
    data: data
  })
}

// 删除物料状态信息
export function delStatus (id) {
  return request({
    url: '/system/status/' + id,
    method: 'delete'
  })
}

// 导出物料状态信息
export function exportStatus (query) {
  return request({
    url: '/system/status/export',
    method: 'get',
    params: query
  })
}
