import request from '@/utils/request'

// 查询物料管理变更信息列表
export function listUpdate (query) {
  return request({
    url: '/system/update/list',
    method: 'get',
    params: query
  })
}

// 查询物料管理变更信息详细
export function getUpdate (id) {
  return request({
    url: '/system/update/' + id,
    method: 'get'
  })
}

// 新增物料管理变更信息
export function addUpdate (data) {
  return request({
    url: '/system/update',
    method: 'post',
    data: data
  })
}

// 修改物料管理变更信息
export function updateUpdate (data) {
  return request({
    url: '/system/update',
    method: 'put',
    data: data
  })
}

// 删除物料管理变更信息
export function delUpdate (id) {
  return request({
    url: '/system/update/' + id,
    method: 'delete'
  })
}

// 导出物料管理变更信息
export function exportUpdate (query) {
  return request({
    url: '/system/update/export',
    method: 'get',
    params: query
  })
}
