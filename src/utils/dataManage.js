import { accountStatus } from '@/config'
import {
  useAuthStore,
  useProfileStore,
  useUsersStore,
  usePostsStore,
  useShareStore
} from '@/stores'

// 鉴权信息
const authStore = useAuthStore()
// 用户个人信息
const profileStore = useProfileStore()
// 用户列表
const usersStore = useUsersStore()
// 动态列表
const postsStore = usePostsStore()
// 分享信息
const shareStore = useShareStore()

// 请求获取全部数据
export const loadAllData = async () => {
  // 获取用户列表
  const getUsersPromise = usersStore.getUsers()

  // 判断是否登录，未登录则返回
  if (!authStore.token) return

  // 保存Promise的变量，最终都要await
  let getPostsListPromise
  let getShareInfoPromise
  // 尝试根据上次持久化的用户信息，率先获取 动态信息 与 分享信息
  let helping_by_users = profileStore.user?.helping_by_users
  let account_status = profileStore.user?.account_status
  if (helping_by_users) {
    getPostsListPromise = postsStore.getPostsList()
  }
  if (account_status === accountStatus.sharing) {
    getShareInfoPromise = shareStore.getShareInfo()
  }

  // 获取用户信息
  await profileStore.getProfile()

  // 新的变量来保存再次请求的Promise
  let newGetPostsListPromise
  // 如果 未获取动态信息 或 有变化时 重新获取动态信息
  if (
    !helping_by_users ||
    helping_by_users.toString() !==
      profileStore.user?.helping_by_users.toString()
  ) {
    // 新建立即执行的异步函数，使其与接下来的操作并行
    newGetPostsListPromise = (async () => {
      // 需先等待原先的请求完成，否则可能导致错误
      await getPostsListPromise
      await postsStore.getPostsList()
    })()
  }

  // 这里不需要新的Promise变量和等待，因为无论如何 分享信息 只会获取一次
  // 如果 未获取分享信息 且 当前状态为分享时 再获取分享信息
  if (
    account_status !== accountStatus.sharing &&
    profileStore.user?.account_status === accountStatus.sharing
  ) {
    getShareInfoPromise = shareStore.getShareInfo()
  }

  // 等待所有请求完成，安全地进行 await
  await Promise.all([
    getUsersPromise,
    getPostsListPromise ? getPostsListPromise : Promise.resolve(),
    getShareInfoPromise ? getShareInfoPromise : Promise.resolve(),
    newGetPostsListPromise ? newGetPostsListPromise : Promise.resolve()
  ])
}

// 请求获取用户信息与用户列表（修改用户信息后调用）
export const loadUserData = async () => {
  await Promise.all([
    // 获取用户列表
    usersStore.getUsers(),
    // 获取用户信息
    profileStore.getProfile()
  ])
}

// 请求获取单个e5账号主的动态（发帖等操作后调用）
export const loadE5PostsData = async (e5id) => {
  await postsStore.getE5Posts(e5id)
}

// 请求获取分享信息（修改分享信息后）
export const loadShareData = async () => {
  await shareStore.getShareInfo()
}

// 退出登录
export const removeLogin = async () => {
  // 清除本地的数据 token、用户信息、动态、分享信息
  authStore.removeToken()
  profileStore.removeProfile()
  postsStore.removePosts()
  shareStore.removeShareInfo()
}
