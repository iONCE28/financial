import request from '@/utils/request'

// 查询费用报销信息列表
export function listReimbursement (query) {
  return request({
    url: '/system/reimbursement/list',
    method: 'get',
    params: query
  })
}

// 查询费用报销信息详细
export function getReimbursement (id) {
  return request({
    url: '/system/reimbursement/' + id,
    method: 'get'
  })
}

// 新增费用报销信息
export function addReimbursement (data) {
  return request({
    url: '/system/reimbursement',
    method: 'post',
    data: data
  })
}

// 修改费用报销信息
export function updateReimbursement (data) {
  return request({
    url: '/system/reimbursement',
    method: 'put',
    data: data
  })
}

// 删除费用报销信息
export function delReimbursement (id) {
  return request({
    url: '/system/reimbursement/' + id,
    method: 'delete'
  })
}

// 导出费用报销信息
export function exportReimbursement (query) {
  return request({
    url: '/system/reimbursement/export',
    method: 'get',
    params: query
  })
}
