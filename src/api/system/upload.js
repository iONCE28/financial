import request from '@/utils/request'

// 通用上传请求
export function uploadCover (data) {
    return request({
      url: '/common/upload',
      method: 'post',
      data: data
    })
  }