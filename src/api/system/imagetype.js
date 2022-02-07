import request from '@/utils/request'

// 查询影像类别信息列表
export function listImagetype(query) {
  return request({
    url: '/system/imagetype/list',
    method: 'get',
    params: query
  })
}

// 查询影像类别信息详细
export function getImagetype(id) {
  return request({
    url: '/system/imagetype/' + id,
    method: 'get'
  })
}

// 新增影像类别信息
export function addImagetype(data) {
  return request({
    url: '/system/imagetype',
    method: 'post',
    data: data
  })
}

// 修改影像类别信息
export function updateImagetype(data) {
  return request({
    url: '/system/imagetype',
    method: 'put',
    data: data
  })
}

// 删除影像类别信息
export function delImagetype(id) {
  return request({
    url: '/system/imagetype/' + id,
    method: 'delete'
  })
}

// 导出影像类别信息
export function exportImagetype(query) {
  return request({
    url: '/system/imagetype/export',
    method: 'get',
    params: query
  })
}
