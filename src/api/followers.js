import request from '@/utils/request'

/**
 * 获取用户粉丝列表
*/
export const getFollowers = (params) => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/followers',
    params
  })
}
