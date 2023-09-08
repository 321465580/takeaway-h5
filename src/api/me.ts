import axios from './base'
import { IMeInfo } from '../types'

export const fecthMePageData = () => {
    return axios.get<IMeInfo, IMeInfo>('me_page')
}