import request from '@/utils/request'

export const shareGetInfoService = () => request.get(`/e5share/info`)

export const shareRegisterService = ({ subscriptionDate, expirationDate }) =>
  request.put(`/e5share/register`, { subscriptionDate, expirationDate })
