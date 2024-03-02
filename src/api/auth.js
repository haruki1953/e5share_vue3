import request from '@/utils/request'

export const authRegisterService = ({ username, password, email }) =>
  request.post('/auth/register', { username, password, email })
