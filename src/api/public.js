import request from '@/utils/request'

export const publicGetUsersService = () => request.get('/public/users')
