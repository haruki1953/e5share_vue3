export const copyText = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      ElNotification({
        title: '复制成功',
        message: text,
        type: 'success'
      })
    })
    .catch(() => {
      ElNotification({
        title: '请手动复制',
        message: text,
        type: 'error'
      })
    })
}
