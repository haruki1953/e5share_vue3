import request from '@/utils/request'

export const authRegisterService = ({ username, password, email }) =>
  request.post('/auth/register', { username, password, email })

export const authLoginByUsernameService = ({ username, password }) =>
  request.post('/auth/login/username', { username, password })

export const authLoginByEmailService = ({ email, password }) =>
  request.post('/auth/login/email', { email, password })
