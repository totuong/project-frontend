import Cookies from 'js-cookie'
import { storageLocal } from '@pureadmin/utils'
import { useUserStoreHook } from '@/store/modules/user'

export interface DataInfo<T> {
  accessToken?: string;
  id?: string;
  roles?: Array<any>;
  phone?: string;
  email?: string;
}

export const userKey = 'user-info'
export const TokenKey = 'authorized-token'
/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = 'multiple-tabs'

/** 获取`token` */
export function getToken (): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageLocal().getItem(userKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken (data: DataInfo<Date>, accessToken: string) {
  let expires = 0
  const { isRemembered, loginDay } = useUserStoreHook()
  const cookieString = JSON.stringify({ accessToken })

  Cookies.set(TokenKey, cookieString, {
    expires: 30
  })

  Cookies.set(
    multipleTabsKey,
    'true',
    isRemembered
      ? {
        expires: loginDay
      }
      : {}
  )

  function setUserKey (username: string, roles: Array<string>, phone: string, email: string) {
    useUserStoreHook().SET_USERNAME(username)
    useUserStoreHook().SET_PHONE(phone)
    useUserStoreHook().SET_EMAIL(email)
    storageLocal().setItem(userKey, {
      expires,
      username,
      roles,
      phone,
      email
    })
  }

  if (data.id) {
    const { id, roles, mobile, email } = data
    setUserKey(id, roles, mobile, email)
  } else {
    const username = storageLocal().getItem<DataInfo<number>>(userKey)?.id ?? ''
    const phone = storageLocal().getItem<DataInfo<number>>(userKey)?.phone ?? ''
    const email = storageLocal().getItem<DataInfo<number>>(userKey)?.email ?? ''
    const roles = storageLocal().getItem<DataInfo<number>>(userKey)?.roles ?? []
    setUserKey(username, roles, phone, email)
  }
}

export function setAccessToken (accessToken: string) {
  const cookieString = JSON.stringify({ accessToken })
  Cookies.set(TokenKey, cookieString, {
    expires: 30
  })
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken () {
  Cookies.remove(TokenKey)
  Cookies.remove(multipleTabsKey)
  storageLocal().removeItem(userKey)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}
