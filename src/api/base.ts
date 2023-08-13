import axios from "axios";
import { showDialog } from "vant";

const instance = axios.create({
    baseURL: '/api'
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
})


export default instance