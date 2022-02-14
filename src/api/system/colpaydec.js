import request from '@/utils/request'

// 查询收入记账信息列表
export function listColpaydec (query) {
  return request({
    url: '/system/colpaydec/list',
    method: 'get',
    params: query
  })
}

// 查询收入记账信息详细
export function getColpaydec (id) {
  return request({
    url: '/system/colpaydec/' + id,
    method: 'get'
  })
}

// 新增收入记账信息
export function addColpaydec (data) {
  return request({
    url: '/system/colpaydec',
    method: 'post',
    data: data
  })
}

// 修改收入记账信息
export function updateColpaydec (data) {
  return request({
    url: '/system/colpaydec',
    method: 'put',
    data: data
  })
}

// 删除收入记账信息
export function delColpaydec (id) {
  return request({
    url: '/system/colpaydec/' + id,
    method: 'delete'
  })
}

// 导出收入记账信息
export function exportColpaydec (query) {
  return request({
    url: '/system/colpaydec/export',
    method: 'get',
    params: query
  })
}
