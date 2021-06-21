import { request, } from "./request"

//请求轮播图和推荐数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//请求款式数据
export function getHomeData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}