import type { UserInfo } from '/#/store'
import type { ErrorMessageMode } from '/#/axios'
import { defineStore } from 'pinia'
import { store } from '@/store'
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cache-enum'
import { getAuthCache, setAuthCache } from '@/utils/auth'
import { GetUserInfoModel, LoginParams } from '@/api/model/user-model'
import { loginApi, getUserInfo } from '@/api/user'
import { useMessage } from '@/hooks/web/use-message'
import router from '@/routers'
// import { usePermissionStore } from '@/store/modules/permission'
// import { PAGE_NOT_FOUND_ROUTE } from '@/router/routes/basic'
import { RoleEnum } from '@/enums/role-enum'
import { PageEnum } from '@/enums/page-enum'
import textMessages from '@/locales'
import { Nullable } from '/#/global'
import { isArray } from '@/utils/is'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
  lastUpdateTime: number
  messageStatus: boolean
  visibleMessageDialog: boolean
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
    // message status
    messageStatus: false,
    visibleMessageDialog: false,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {}
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY)
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0
        ? this.roleList
        : getAuthCache<RoleEnum[]>(ROLES_KEY)
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime
    },
    // 获取消息状态
    getMessageStatus(): boolean {
      return this.messageStatus
    },
    // 是否显示消息提示框
    getVisibleMessageDialog(): boolean {
      return this.visibleMessageDialog
    },
  },
  actions: {
    setToken(info: string | undefined) {
      console.log(info, 'setToken')
      this.token = info ? info : '' // for null or undefined value
      setAuthCache(TOKEN_KEY, info)
      console.log(TOKEN_KEY, 'setToken before')
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList
      setAuthCache(ROLES_KEY, roleList)
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      setAuthCache(USER_INFO_KEY, info)
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag
    },
    // 变更消息状态
    setMessageStatus(status: boolean) {
      this.messageStatus = status
    },
    clickMessageIcon() {
      this.visibleMessageDialog = !this.visibleMessageDialog
    },
    resetState() {
      this.userInfo = null
      this.token = ''
      this.roleList = []
      this.sessionTimeout = false
    },
    /**
     * @description: login
     */
    async login(
      params: LoginParams & {
        goHome?: boolean
        mode?: ErrorMessageMode
      }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params

        const data = await loginApi(loginParams, mode)
        console.log(data, 'login-data-')
        const { token } = data

        // save token
        this.setToken(token)
        return this.afterLoginAction(goHome)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null
      console.log('getUserInfo')
      // get user info
      const userInfo: UserInfo = await this.getUserInfoAction()

      const sessionTimeout = this.sessionTimeout
      if (sessionTimeout) {
        this.setSessionTimeout(false)
      } else {
        // const permissionStore = usePermissionStore()
        // if (!permissionStore.isDynamicAddedRoute) {
        //   const routes = await permissionStore.buildRoutesAction()
        //   routes.forEach(route => {
        //     router.addRoute(route as unknown as RouteRecordRaw)
        //   })
        //   router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw)
        //   permissionStore.setDynamicAddedRoute(true)
        // }
        goHome &&
          (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME))
      }
      return userInfo
    },
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null
      const userInfo = await getUserInfo()
      const { roles = [] } = userInfo
      if (isArray(roles)) {
        const roleList = roles.map(item => item.value) as RoleEnum[]
        this.setRoleList(roleList)
      } else {
        userInfo.roles = []
        this.setRoleList([])
      }
      this.setUserInfo(userInfo)
      return userInfo
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          //   await doLogout();
          //   await API.login.getLoginout.request({})
        } catch {
          console.log('注销Token失败')
        }
      }
      this.setToken(undefined)
      this.setSessionTimeout(false)
      this.setUserInfo(null)
      goLogin && router.push(PageEnum.BASE_LOGIN)
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage()
      //   const { t } = useI18n()
      createConfirm({
        iconType: 'warning',
        title: () => textMessages.app.logoutTip,
        content: () => textMessages.app.logoutMessage,
        onOk: async () => {
          await this.logout(true)
        },
      })
    },
  },
})

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store)
}
