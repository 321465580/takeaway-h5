import axios from "axios";
import { showDialog } from "vant";
import { useLocalStorage } from "../hooks/useLocalStorage";

const instance = axios.create({
    baseURL: '/api'
})
// 请求拦截器，请求带上token
instance.interceptors.request.use((config) => {
    const { value: token} = useLocalStorage("token", "")
    if(config.headers && token) {
        config.headers["x-token"] = token.value
    }
    return config
})


// 响应拦截器，处理响应失败的情况，就会出现弹出框
instance.interceptors.response.use((response) => {
    const {data: _data} = response
    const { data, code, msg} = _data
    if(code !== 0) {
        showDialog({
            message: msg
        }).then(() => {

        })
        return Promise.reject(msg)
    }
    return data
}, (err) => {
    if(err.response && err.response.status === 401) {
        showDialog({
            message: "请登录"
        }).then(() => {
            // 关闭弹窗的逻辑
        })
    }
})


export default instance