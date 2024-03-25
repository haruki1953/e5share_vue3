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

export const shareConfirmSendService = ({ userId, message }) =>
  request.put(`/e5share/confirmation/send`, { userId, message })

export const shareStopSharingService = ({ userId, message }) =>
  request.put(`/e5share/stop/sharing`, { userId, message })

export const shareConfirmAcceptService = ({ e5id, message }) =>
  request.put(`/e5share/confirmation/accept`, { e5id, message })

export const shareApplicationService = ({ e5id, message }) =>
  request.post(`/e5share/application`, { e5id, message })

export const shareStopReceivingService = ({ e5id, message }) =>
  request.put(`/e5share/stop/receiving`, { e5id, message })
