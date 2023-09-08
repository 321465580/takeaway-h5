import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { IUserInfo } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export interface IUserState {
    userInfo: IUserInfo
    token: string
}

const getDefaultUserInfo: () => IUserInfo = () => ({
    id: "",
    avatar: "https://b.yzcdn.cn/vant/icon-demo-1126.png",
    nickname: '请登录',
})

export const useUserStore = defineStore("user", () => {
    // 用户信息的localstorage
    const { value: $userInfo, setValue: $setUserInfo, removeItem: $removeUserInfo } = useLocalStorage('userinfo', getDefaultUserInfo())
    // token的localstorage
    const { setValue: $setTokenValue, removeItem: $removeTokenValue } = useLocalStorage('token', "")  


    const state = ref({
        userInfo: getDefaultUserInfo(),
        token: ""
    })
    const getUserInfo = computed(() => {
        // localstorage耗时，先去读store，没有就从缓存中拿
        if(!state.value.userInfo || !state.value.userInfo.id) {
            state.value.userInfo = $userInfo.value
        }
        return state.value.userInfo
    })

    const setUserInfo = ({ token, userInfo }: IUserState) => {
        state.value.userInfo = userInfo;
        state.value.token = token;
        $setUserInfo(userInfo)
        $setTokenValue(token)
    }

    const removeInfo = () => {
        state.value.token = ""
        state.value.userInfo = getDefaultUserInfo()
        $removeUserInfo()
        $removeTokenValue()
    }


    return {
        state,
        getUserInfo,
        setUserInfo,
        removeInfo
    }
})