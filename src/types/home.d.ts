export interface ISearchRecomment {
    value: number
    label: string
}

// 搜索到的结果数组，格式
export interface ISearchResultList {
    list: ISearchResult[]
}

export interface ISearchResult {
    type: number
    label: string
    resultCount: number
}

export interface IHomeInfo {
    banner: IBanner[]
    searchRecomments: ISearchRecomment[]
    transformer: ITransformer[]
    scrollBarInfoList: IScrollBarInfo[]
    countdown: ICountdown
    activities: string[]
}

export interface IBanner {
    imgUrl: string
}

export interface ITransformer {
    imgUrl: string
    label: string
}

export interface ICountdown {
    time: number
    goods: IGood
}

export interface IScrollBarInfo {
    type: string
    badge: string
    detail: string
    btn: string
}