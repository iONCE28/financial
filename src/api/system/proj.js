import request from '@/utils/request'

// 查询项目基本信息列表
export function listProj (query) {
  return request({
    url: '/system/proj/list',
    method: 'get',
    params: query
  })
}

// 查询项目基本信息详细
export function getProj (id) {
  return request({
    url: '/system/proj/' + id,
    method: 'get'
  })
}

// 新增项目基本信息
export function addProj (data) {
  return request({
    url: '/system/proj',
    method: 'post',
    data: data
  })
}

// 修改项目基本信息
export function updateProj (data) {
  return request({
    url: '/system/proj',
    method: 'put',
    data: data
  })
}

// 删除项目基本信息
export function delProj (id) {
  return request({
    url: '/system/proj/' + id,
    method: 'delete'
  })
}

// 导出项目基本信息
export function exportProj (query) {
  return request({
    url: '/system/proj/export',
    method: 'get',
    params: query
  })
}
