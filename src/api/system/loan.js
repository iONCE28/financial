import request from '@/utils/request'

// 查询个人借款信息列表
export function listLoan (query) {
  return request({
    url: '/system/loan/list',
    method: 'get',
    params: query
  })
}

// 查询个人借款信息详细
export function getLoan (id) {
  return request({
    url: '/system/loan/' + id,
    method: 'get'
  })
}

// 新增个人借款信息
export function addLoan (data) {
  return request({
    url: '/system/loan',
    method: 'post',
    data: data
  })
}

// 修改个人借款信息
export function updateLoan (data) {
  return request({
    url: '/system/loan',
    method: 'put',
    data: data
  })
}

// 删除个人借款信息
export function delLoan (id) {
  return request({
    url: '/system/loan/' + id,
    method: 'delete'
  })
}

// 导出个人借款信息
export function exportLoan (query) {
  return request({
    url: '/system/loan/export',
    method: 'get',
    params: query
  })
}
