/* 
    新建一个fecthHomePageData的api
    实现useAsync，将API包裹一层，处理Promise的状态
*/
import type { IHomeInfo } from '../types'
import axios from "./base"

export function fetchHomePageData() {
    return axios.get<IHomeInfo, IHomeInfo>('home_page')
}