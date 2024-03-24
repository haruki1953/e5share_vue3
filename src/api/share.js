import request from '@/utils/request'

export const shareGetInfoService = () => request.get(`/e5share/info`)

export const shareRegisterService = ({ subscriptionDate, expirationDate }) =>
  request.put(`/e5share/register`, { subscriptionDate, expirationDate })

export const shareCancelService = ({ message }) =>
  request.put(`/e5share/cancel`, { message })

export const shareAddInfoService = ({ userId, note }) =>
  request.post(`/e5share/info`, { userId, note })

export const shareUpdateInfoService = ({ userId, note }) =>
  request.patch(`/e5share/info`, { userId, note })

export const shareDeleteInfoService = ({ userId }) =>
  request.delete(`/e5share/info/${userId}`)

export const shareConfmSendService = ({ userId, message }) =>
  request.put(`/e5share/confirmation/send`, { userId, message })

export const shareStopSharingService = ({ userId, message }) =>
  request.put(`/e5share/stop/sharing`, { userId, message })
