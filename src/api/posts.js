import request from '@/utils/request'

export const postsGetService = (e5id) => request.get(`/e5post/posts/${e5id}`)
