import request from '@/utils/request'

// 查询影像管理信息列表
export function listImagemng(query) {
  return request({
    url: '/system/imagemng/list',
    method: 'get',
    params: query
  })
}

// 查询影像管理信息详细
export function getImagemng(id) {
  return request({
    url: '/system/imagemng/' + id,
    method: 'get'
  })
}

// 新增影像管理信息
export function addImagemng(data) {
  return request({
    url: '/system/imagemng',
    method: 'post',
    data: data
  })
}

// 修改影像管理信息
export function updateImagemng(data) {
  return request({
    url: '/system/imagemng',
    method: 'put',
    data: data
  })
}

// 删除影像管理信息
export function delImagemng(id) {
  return request({
    url: '/system/imagemng/' + id,
    method: 'delete'
  })
}

// 导出影像管理信息
export function exportImagemng(query) {
  return request({
    url: '/system/imagemng/export',
    method: 'get',
    params: query
  })
}
