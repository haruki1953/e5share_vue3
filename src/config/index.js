// logo图标
import logoImage from '@/assets/logo.png'
export { logoImage }

// 登录页图片
import loginImage from '@/assets/login_bg.jpg'
export { loginImage }

// 网站的基地址
export const webBaseUrl = 'https://e5.sakiko.top'

// 网站名称
export const webName = '小祥のE5分享'

// axios配置，基地址、超时时间
export const axiosConfig = {
  baseURL: 'https://e5node.sakiko.top',
  timeout: 10000
}

// 头像配置，基地址，默认头像，空头像（用户不存在）
import defaultAvatar from '@/assets/default_avatar.jpg'
import emptyAvatar from '@/assets/empty_avatar.jpg'
export const avatarConfig = {
  baseURL: 'https://e5avatar.sakiko.top',
  defaultAvatar,
  emptyAvatar
}

// 联系方式
export const contactInfo = {
  twitter: {
    name: 'X / Twitter', // 平台名称
    fontawesomeClass: 'fab fa-twitter', // fontawesome图标的class
    logoUrl: '', // 图标地址(有fontawesomeClass则不显示)
    description: '@harukiO_0', // 描述,简介
    link: 'https://twitter.com/harukiO_0' // 链接
  },
  discord: {
    name: 'Discord',
    fontawesomeClass: 'fab fa-discord',
    description: '小祥の小窝',
    link: 'https://discord.gg/xCYW3THQye'
  },
  github: {
    name: 'Github',
    fontawesomeClass: 'fab fa-github',
    description: 'haruki1953/e5share_vue3',
    link: 'https://github.com/haruki1953/e5share_vue3'
  }
}

// 友情链接
export const friendshipLinks = {
  sakikoAlist: {
    name: '小祥の小窝',
    logoUrl: 'https://static.sakiko.top/sakiko/sakiko.ico',
    description: '一个番剧小窝',
    link: 'https://bangumi.sakiko.top/'
  }
}

// 管理员联系方式
export const adminContact = 'X / Twitter: @harukiO_0'

// 用户状态配置
export const accountStatus = {
  active: 'active',
  banned: 'banned',
  sharing: 'sharing'
}

// 未登录时可以访问的路径
export const publicRoutes = ['/login', '/home']

// 通知类型配置
export const notificationType = {
  // 系统通知
  system: 'system',
  // 其他通知
  other: 'other',
  // e5分享申请通知
  e5_share_application: 'e5_share_application',
  // e5分享确认通知
  e5_share_confirmation: 'e5_share_confirmation',
  // e5分享完成通知
  e5_share_completion: 'e5_share_completion',
  // e5分享注销通知
  e5_share_closure: 'e5_share_closure',
  // e5账号主停止分享通知
  e5_share_sharer_stop: 'e5_share_sharer_stop',
  // 用户停止接受分享通知
  e5_share_receiver_stop: 'e5_share_receiver_stop'
}

// 分享信息状态
export const shareInfoStatus = {
  unsent: 'unsent',
  pending_confirmation: 'pending_confirmation',
  confirmed: 'confirmed',
  stoped: 'stoped'
}

// 分享信息不能删除的状态：已确认后不能删除
export const shareInfoCantDelStatus = [shareInfoStatus.confirmed]

// 申请信息的的过期时间 3天
export const applyInfoExpirationTime = 3 * 24 * 60 * 60 * 1000
