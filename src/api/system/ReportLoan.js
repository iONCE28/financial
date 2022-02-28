import request from '@/utils/request'

// 查询ReportLoan列表
export function listReportLoan(query) {
  return request({
    url: '/system/ReportLoan/list',
    method: 'get',
    params: query
  })
}

// 查询ReportLoan详细
export function getReportLoan(amount) {
  return request({
    url: '/system/ReportLoan/' + amount,
    method: 'get'
  })
}

// 新增ReportLoan
export function addReportLoan(data) {
  return request({
    url: '/system/ReportLoan',
    method: 'post',
    data: data
  })
}

// 修改ReportLoan
export function updateReportLoan(data) {
  return request({
    url: '/system/ReportLoan',
    method: 'put',
    data: data
  })
}

// 删除ReportLoan
export function delReportLoan(amount) {
  return request({
    url: '/system/ReportLoan/' + amount,
    method: 'delete'
  })
}

// 导出ReportLoan
export function exportReportLoan(query) {
  return request({
    url: '/system/ReportLoan/export',
    method: 'get',
    params: query
  })
}
