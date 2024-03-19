import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia
export * from './modules/auth'
export * from './modules/profile'
export * from './modules/users'
export * from './modules/posts'
export * from './modules/share'
