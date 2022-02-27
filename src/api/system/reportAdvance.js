import request from '@/utils/request'

// 查询reportAdvance列表
export function listReportAdvance(query) {
  return request({
    url: '/system/reportAdvance/list',
    method: 'get',
    params: query
  })
}

// 查询reportAdvance详细
export function getReportAdvance(amount) {
  return request({
    url: '/system/reportAdvance/' + amount,
    method: 'get'
  })
}

// 新增reportAdvance
export function addReportAdvance(data) {
  return request({
    url: '/system/reportAdvance',
    method: 'post',
    data: data
  })
}

// 修改reportAdvance
export function updateReportAdvance(data) {
  return request({
    url: '/system/reportAdvance',
    method: 'put',
    data: data
  })
}

// 删除reportAdvance
export function delReportAdvance(amount) {
  return request({
    url: '/system/reportAdvance/' + amount,
    method: 'delete'
  })
}

// 导出reportAdvance
export function exportReportAdvance(query) {
  return request({
    url: '/system/reportAdvance/export',
    method: 'get',
    params: query
  })
}
