import request from '@/utils/request'

export function commonRequest(method, url, query, body) {
  switch (method) {
    case 'get':
      return request({
        method: 'get',
        url,
        params: query
      })
    case 'post':
      return request({
        method: 'post',
        url,
        params: query,
        data: body
      })
    case 'put':
      return request({
        method: 'put',
        url,
        params: query,
        data: body
      })
    case 'delete':
      return request({
        method: 'delete',
        url,
        data: body
      })
  }
}
