import request from '@/utils/request'

// 查询预付账款信息列表
export function listAdvance (query) {
  return request({
    url: '/system/advance/list',
    method: 'get',
    params: query
  })
}

// 查询预付账款信息详细
export function getAdvance (id) {
  return request({
    url: '/system/advance/' + id,
    method: 'get'
  })
}

// 新增预付账款信息
export function addAdvance (data) {
  return request({
    url: '/system/advance',
    method: 'post',
    data: data
  })
}

// 修改预付账款信息
export function updateAdvance (data) {
  return request({
    url: '/system/advance',
    method: 'put',
    data: data
  })
}

// 删除预付账款信息
export function delAdvance (id) {
  return request({
    url: '/system/advance/' + id,
    method: 'delete'
  })
}

// 导出预付账款信息
export function exportAdvance (query) {
  return request({
    url: '/system/advance/export',
    method: 'get',
    params: query
  })
}
