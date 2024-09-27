/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-22 22:06:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 10:45:52
 */
import router from '@/router'
import setting from './settings'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from './store' 
import useUserStore from './store/modules/user'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start()
 
  const token = userStore.token

  const username = userStore.username
  console.log("🚀 ~ router.beforeEach ~ token:", username)
  if (token) {
    console.log("🚀 ~ router.beforeEach ~ token:", token)
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    if (to.path == '/') {
      next()
    } else {
      next({ path: '/', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫

router.afterEach((route) => {
  nprogress.done()
})
