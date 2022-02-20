import request from '@/utils/request'

// 查询合同基本信息列表
export function listContract (query) {
  return request({
    url: '/system/contract/list',
    method: 'get',
    params: query
  })
}

// 根据项目查询合同
export function ContractSByProj (projId) {
  return request({
    url: '/system/contract/contractSByProj/' + projId,
    method: 'get'
  })
}

// 查询合同基本信息详细
export function getContract (id) {
  return request({
    url: '/system/contract/' + id,
    method: 'get'
  })
}

// 新增合同基本信息
export function addContract (data) {
  return request({
    url: '/system/contract',
    method: 'post',
    data: data
  })
}

// 修改合同基本信息
export function updateContract (data) {
  return request({
    url: '/system/contract',
    method: 'put',
    data: data
  })
}

// 删除合同基本信息
export function delContract (id) {
  return request({
    url: '/system/contract/' + id,
    method: 'delete'
  })
}

// 导出合同基本信息
export function exportContract (query) {
  return request({
    url: '/system/contract/export',
    method: 'get',
    params: query
  })
}
