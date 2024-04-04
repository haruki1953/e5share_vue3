import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProfileStore } from './profile'
import { postsGetService } from '@/api/posts'
import { accountStatus } from '@/config'
import { parsePostsInfo } from '@/utils/resDataHandle'
import { useUsersStore } from './users'

export const usePostsStore = defineStore(
  'e5share-posts',
  () => {
    // 动态列表 其中是对象，包含e5账号主id和帖子数组
    const postsList = ref([])
    // 已读帖子
    const readPostUuid = ref([])

    // 关注的动态e5帐号主id
    const followE5ids = ref([])

    const profileStore = useProfileStore()
    const usersStore = useUsersStore()

    // 添加关注e5帐号主
    const addFollow = async (e5id) => {
      // 缺失必要数据返回
      if (!isCheckData.value) return ElMessage.error('缺失必要数据')
      // 不能添加关注则返回
      if (!shouldAddFollow(e5id)) return ElMessage.error('不能关注')

      // 请求获取动态
      await getE5Posts(e5id)
      // followE5ids添加（后添加，使在等待请求时，关注按钮也可以显示）
      followE5ids.value.push(e5id)
    }

    // 取消关注指定e5帐号主
    const removeFollow = (e5id) => {
      followE5ids.value = followE5ids.value.filter((foE5id) => foE5id !== e5id)
      postsList.value = postsList.value.filter((e5posts) => e5posts.id !== e5id)
    }

    // 检查必要数据是否已加载
    const isCheckData = computed(() => {
      // 检查必要数据是否已加载
      let isCheckData = true
      // 未加载profileStore
      if (!profileStore.user?.helping_by_users) isCheckData = false
      // 未加载usersStore
      if (!usersStore.userList?.length) isCheckData = false
      return isCheckData
    })
    // 是否可以关注
    const shouldFollow = (e5id) => {
      // 检查用户是否存在, 不存在直接返回
      const e5User = usersStore.findUserById(e5id)
      if (!e5User) return false
      // 非正在分享
      if (e5User.account_status !== accountStatus.sharing) return false
      // 与helping_by_users重复
      if (profileStore.user.helping_by_users.includes(e5id)) return false
      // 不能为自己
      if (profileStore.user.id === e5id) return false

      return true
    }
    // 是否可以添加关注（不能重复）
    const shouldAddFollow = (e5id) => {
      // 已存在则返回
      if (followE5ids.value.includes(e5id)) return false
      if (!shouldFollow(e5id)) return false
      return true
    }

    // 请求获取关注的动态
    const getFollowPosts = async () => {
      // 缺失必要数据返回
      if (!isCheckData.value) return

      // 过滤不应关注的e5帐号主
      followE5ids.value = followE5ids.value.filter((e5id) => {
        return shouldFollow(e5id)
      })

      // 构造一个包含所有异步操作的 Promise 数组
      const promises = followE5ids.value.map(async (e5id) => {
        // 请求获取单个e5账号主的动态
        await getE5Posts(e5id)
      })
      // 等待所有异步操作完成
      await Promise.all(promises)
    }

    // 请求获取动态
    const getPostsList = async () => {
      // 用一个新数组保存，保证顺序、并丢弃不需要的动态
      const tempPostsList = []
      // 如果当前状态为正在分享，则请求自己的动态信息
      if (profileStore.user.account_status === accountStatus.sharing) {
        const e5postObj = await getE5Posts(profileStore.user.id)
        tempPostsList.push(e5postObj)
      }

      /* 获取帮助的动态 */
      // 根据profile中helping_by_users字段，获取多个e5帐号主的动态
      // 构造一个包含所有异步操作的 Promise 数组
      const promises = profileStore.user.helping_by_users.map(async (e5id) => {
        // 请求获取单个e5账号主的动态
        const e5postObj = await getE5Posts(e5id)
        tempPostsList.push(e5postObj)
      })
      // 等待所有异步操作完成
      await Promise.all(promises)
      // 保存
      postsList.value = tempPostsList

      /* 获取关注动态 */
      await getFollowPosts()
    }

    // 请求获取单个e5账号主的动态
    const getE5Posts = async (e5id) => {
      const res = await postsGetService(e5id)
      const e5postsObj = { id: e5id, posts: parsePostsInfo(res.data.data) }
      // 找到要更新的对象的索引
      const index = postsList.value.findIndex((e5posts) => e5posts.id === e5id)
      if (index !== -1) {
        // 如果找到了，就替换它
        postsList.value.splice(index, 1, e5postsObj)
      } else {
        // 如果没有找到，就添加到数组的末尾
        postsList.value.push(e5postsObj)
      }
      return e5postsObj
    }

    // 清除信息
    const removePosts = () => {
      postsList.value = []
      readPostUuid.value = []
      followE5ids.value = []
    }

    // 获取未读帖子数量
    const unreadPostCount = computed(() => {
      let count = 0
      // 遍历所有动态，统计未读数量
      postsList.value.forEach(({ posts }) => {
        count += posts.filter(
          (post) => !readPostUuid.value.includes(post.id)
        ).length
      })
      return count
    })

    // 单个e5账号主的未读帖子数
    const unreadCountInE5Posts = (e5id) => {
      const e5posts = findE5PostsByE5id(e5id)
      return e5posts.filter((post) => !readPostUuid.value.includes(post.id))
        .length
    }

    // 帖子是否已读
    const isPostRead = (id) => {
      return readPostUuid.value.includes(id)
    }

    // 设置单个帖子为已读
    const markPostAsRead = (id) => {
      if (!readPostUuid.value.includes(id)) {
        readPostUuid.value.push(id)
      }
    }

    // 设置单个e5账号主动态全部已读
    const markE5PostsAsRead = (e5id) => {
      // if (!unreadPostCount.value) return // 没有未读则返回
      const e5posts = findE5PostsByE5id(e5id)
      e5posts.forEach((post) => {
        if (!readPostUuid.value.includes(post.id)) {
          readPostUuid.value.push(post.id)
        }
      })
    }

    // 设置全部帖子为已读
    const markAllPostAsRead = () => {
      // if (!unreadPostCount.value) return // 没有未读则返回
      // 清空 readPostUuid
      readPostUuid.value = []
      // 遍历所有动态，添加id
      postsList.value.forEach(({ posts }) => {
        posts.forEach(({ id }) => {
          readPostUuid.value.push(id)
        })
      })
    }

    // 获取e5id列表
    const e5idList = computed(() => {
      return postsList.value.map((e5post) => e5post.id)
    })

    // 根据id获取e5账号主的动态
    const findE5PostsByE5id = (e5id) => {
      return postsList.value.find((e5postInfo) => e5postInfo.id === e5id)?.posts
    }

    // 获取e5账号主最近的动态内容
    const getE5PostLastContent = (e5id) => {
      const posts = findE5PostsByE5id(e5id)
      if (posts && posts.length) {
        return posts[posts.length - 1]?.content
      }
      return null
    }

    return {
      postsList,
      readPostUuid,
      followE5ids,
      addFollow,
      removeFollow,
      shouldFollow,
      shouldAddFollow,
      getFollowPosts,
      getPostsList,
      getE5Posts,
      removePosts,
      unreadPostCount,
      unreadCountInE5Posts,
      isPostRead,
      markPostAsRead,
      markE5PostsAsRead,
      markAllPostAsRead,
      e5idList,
      findE5PostsByE5id,
      getE5PostLastContent
    }
  },
  {
    persist: true // 持久化
  }
)
