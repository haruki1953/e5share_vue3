import request from '@/utils/request'

export const profileGetInfoService = () => request.get('/user/profile')
