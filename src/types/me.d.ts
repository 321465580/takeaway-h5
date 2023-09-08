export interface IMeInfo {
    cards: ICard []
    superCard: ISuperCard
}

export interface ICard {
    label: string
    size: number
    items:  Item[]
}

export interface IItem {
    count: number
    inconUrl: string
    label: string
}

export interface ISuperCard {
    beanCount: number
    tips: string
}