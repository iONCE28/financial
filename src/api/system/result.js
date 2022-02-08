import request from '@/utils/request'

// 查询合同结算项目信息列表
export function listResult (query) {
  return request({
    url: '/system/result/list',
    method: 'get',
    params: query
  })
}

// 查询合同结算项目信息详细
export function getResult (id) {
  return request({
    url: '/system/result/' + id,
    method: 'get'
  })
}

// 新增合同结算项目信息
export function addResult (data) {
  return request({
    url: '/system/result',
    method: 'post',
    data: data
  })
}

// 修改合同结算项目信息
export function updateResult (data) {
  return request({
    url: '/system/result',
    method: 'put',
    data: data
  })
}

// 删除合同结算项目信息
export function delResult (id) {
  return request({
    url: '/system/result/' + id,
    method: 'delete'
  })
}

// 导出合同结算项目信息
export function exportResult (query) {
  return request({
    url: '/system/result/export',
    method: 'get',
    params: query
  })
}
