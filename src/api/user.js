import request from '@/utils/request'

export const userGetInfoService = () => request.get('/user/profile')

export const userUpdateProfileService = ({ nickname, contactInfo, bio }) =>
  request.patch('/user/profile', { nickname, contactInfo, bio })

export const userUpdateAvatarService = (data) =>
  request.put('/user/avatar', data)

export const userUpdateEmailService = ({ email }) =>
  request.put('/user/email', { email })

export const userUpdatePasswordService = ({ oldPassword, newPassword }) =>
  request.put('/user/password', { oldPassword, newPassword })

export const userUpdateE5infoService = ({ subscriptionDate, expirationDate }) =>
  request.put('/user/e5info', { subscriptionDate, expirationDate })
