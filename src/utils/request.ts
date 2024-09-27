import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'
import { env } from './env'

const request = axios.create({
  baseURL: env.VITE_APP_BASE_API +'/v1',
  timeout: 300000 // request timeout
})

export const formatToken = (token: string): string => {
  return 'Bearer ' + token;
}
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()

    if (userStore.token) {
      config.headers["Authorization"] = formatToken(userStore.token);
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

request.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response.data)
    }
  },
  (error) => {
    let message = ''
    const status = error.response.status
    switch (status) {
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401:
        message = '401 No permission'
        break
      // 403 token过期
      // 登录过期对用户进行提示
      // 清除本地token和清空vuex中token对象
      // 跳转登录页面
      case 403:
        message = '403 No permission'
        break
      case 404:
        message = 'Not found'
        break
      case 500:
        message = 'Intenal Error'
        break
      default:
        message = error.response.data.message
        break
    }
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)

const camelCaseToUnderScore = (obj: Object, join: boolean = true) => {
  const keys = Object.keys(obj)
  const params: Object = {}
  keys.forEach(k => {
    const key = k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`)
    // @ts-ignore
    const value = Array.isArray(obj[k]) && join ? obj[k].join(',') : obj[k]
    // @ts-ignore
    params[key] = value
  })
  return params
}

export {
  camelCaseToUnderScore,
  env
}

export default request