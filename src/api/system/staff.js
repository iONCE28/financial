import request from '@/utils/request'

// 查询员工管理列表
export function listStaff (query) {
  return request({
    url: '/system/staff/list',
    method: 'get',
    params: query
  })
}


export function listStaffdept (query) {
  return request({
    url: '/system/staff/deptId',
    method: 'get',
    params: query
  })
}

// 查询员工管理详细
export function getStaff (staffId) {
  return request({
    url: '/system/staff/' + staffId,
    method: 'get'
  })
}

// 新增员工管理
export function addStaff (data) {
  return request({
    url: '/system/staff',
    method: 'post',
    data: data
  })
}

// 修改员工管理
export function updateStaff (data) {
  return request({
    url: '/system/staff',
    method: 'put',
    data: data
  })
}

// 删除员工管理
export function delStaff (staffId) {
  return request({
    url: '/system/staff/' + staffId,
    method: 'delete'
  })
}

// 导出员工管理
export function exportStaff (query) {
  return request({
    url: '/system/staff/export',
    method: 'get',
    params: query
  })
}
