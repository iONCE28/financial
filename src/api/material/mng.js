import request from '@/utils/request'

// 查询物料管理列表
export function listMng (query) {
  return request({
    url: '/system/mng/list',
    method: 'get',
    params: query
  })
}

// 查询物料管理详细
export function getMng (id) {
  return request({
    url: '/system/mng/' + id,
    method: 'get'
  })
}

// 新增物料管理
export function addMng (data) {
  return request({
    url: '/system/mng',
    method: 'post',
    data: data
  })
}

// 修改物料管理
export function updateMng (data) {
  return request({
    url: '/system/mng',
    method: 'put',
    data: data
  })
}

// 删除物料管理
export function delMng (id) {
  return request({
    url: '/system/mng/' + id,
    method: 'delete'
  })
}

// 导出物料管理
export function exportMng (query) {
  return request({
    url: '/system/mng/export',
    method: 'get',
    params: query
  })
}
