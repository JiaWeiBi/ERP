import request from '@/utils/request'

export function commonRequest(methed, url, query, body) {
  switch (methed) {
    case 'get':
      return request({
        methed: 'get',
        url,
        params: query
      })
    case 'post':
      break
    case 'put':
      break
  }
}
