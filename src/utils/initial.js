import {
  useAuthStore,
  useProfileStore,
  useUsersStore,
  usePostsStore
} from '@/stores'

// 鉴权信息
const authStore = useAuthStore()
// 用户个人信息
const profileStore = useProfileStore()
// 用户列表
const usersStore = useUsersStore()
// 动态列表
const postsStore = usePostsStore()

// 请求获取数据
export const loadData = async () => {
  // 获取用户列表
  usersStore.getUsers()
  // 登陆时获取用户信息与动态信息
  if (authStore.token) {
    await profileStore.getProfile()
    // 动态信息要等待个人信息获取完毕
    await postsStore.getPostsList()
  }
}
