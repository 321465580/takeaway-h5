import { ILoginInfo } from '../types'
import axios from './base'
import { IAuth } from '../types'

export const auth = ({username, password} : ILoginInfo) => {
    // 泛型里面是返回的类型
    return axios.post<IAuth, IAuth>("auth", {
        username,
        password
    })
}