import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProfileStore } from './profile'
import { postsGetService } from '@/api/posts'
import { accountStatus } from '@/config'
import { parsePostsInfo } from '@/utils/resDataHandle'

export const usePostsStore = defineStore(
  'e5share-posts',
  () => {
    // 动态列表 其中是对象，包含e5账号主id和帖子数组
    const postsList = ref([])
    // 已读帖子
    const readPostUuid = ref([])

    // 请求获取动态
    const getPostsList = async () => {
      const tempPostsList = []
      const profileStore = useProfileStore()
      // 如果当前状态为正在分享，则请求自己的动态信息
      if (profileStore.user.account_status === accountStatus.sharing) {
        const res = await postsGetService(profileStore.user.id)
        tempPostsList.push({
          id: profileStore.user.id,
          posts: parsePostsInfo(res.data.data)
        })
      }

      // 根据profile中helping_by_users字段，获取多个e5帐号主的动态
      // 构造一个包含所有异步操作的 Promise 数组
      const promises = profileStore.user.helping_by_users.map(async (e5id) => {
        // 请求获取单个e5账号主的动态
        const res = await postsGetService(e5id)
        // 处理数据并添加到tempPostsList
        tempPostsList.push({ id: e5id, posts: parsePostsInfo(res.data.data) })
      })
      // 等待所有异步操作完成
      await Promise.all(promises)
      // 保存
      postsList.value = tempPostsList
    }

    // 请求获取单个e5账号主的动态
    const getE5Posts = async (e5id) => {
      const res = await postsGetService(e5id)
      const e5postsObj = { id: e5id, posts: parsePostsInfo(res.data.data) }
      console.log(e5postsObj)
      // 找到要更新的对象的索引
      const index = postsList.value.findIndex((e5posts) => e5posts.id === e5id)
      if (index !== -1) {
        // 如果找到了，就替换它
        postsList.value.splice(index, 1, e5postsObj)
      } else {
        // 如果没有找到，就添加到数组的末尾
        postsList.value.push(e5postsObj)
      }
    }

    // 清除信息
    const removePosts = () => {
      postsList.value = []
      readPostUuid.value = []
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
