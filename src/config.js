// axios配置，基地址、超时时间
export const axiosConfig = {
  baseURL: 'http://127.0.0.1:3007',
  timeout: 10000
}

// 头像配置，基地址‘默认头像
import defaultAvatar from '@/assets/default_avatar.jpg'
export const avatarConfig = {
  baseURL: 'http://127.0.0.1:3007/static/avatar',
  defaultAvatar
}

// 管理员联系方式
export const adminContact = 'X / Twitter: @harukiO_0'

// 用户状态配置
export const accountStatus = {
  active: 'active',
  banned: 'banned',
  sharing: 'sharing'
}
