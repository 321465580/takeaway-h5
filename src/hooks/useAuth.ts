// 登录页面的逻辑
/* 
    前端：useAuth处理登录逻辑 -> useUserStore处理用户信息 -> useLocalStorage保存信息

    后端：提供给 useAuth 用户的token

*/

import { computed } from "vue"
import { useUserStore } from "../stores/user"
import { ILoginInfo } from "../types"
import { auth } from '../api/user'

export const useAuth = () => {
    const store = useUserStore()

    const user = computed(() => store.getUserInfo)

    const login = async (data: ILoginInfo) => {
        const { token, userInfo} = await auth(data)
        store.setUserInfo({token, userInfo})
    }

    const logout = () => {
        store.removeInfo()
    }   

    return {
        user,
        login, // 方法
        logout 
    } 
}