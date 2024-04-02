import request from '@/utils/request'

export const postsGetService = (e5id) => request.get(`/e5post/posts/${e5id}`)

export const postsDelPostService = (e5id, uuid) =>
  request.delete(`/e5post/post`, {
    params: {
      e5id,
      uuid
    }
  })

export const postsSendPostService = (e5id, content) =>
  request.post(`/e5post/post`, { e5id, content })

export const postsClearPostService = () => request.delete(`/e5post/posts`)
