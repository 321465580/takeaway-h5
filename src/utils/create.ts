// 处理类名的函数
export function createBEM(name: string) {
    // Record键值对的类型，泛型的前一个是key，后一个是值
    return (el? :string, mods? :Record<string, boolean>) => {
        let result = `${name} ${el? `__${el}`: ''}`
        if(mods) {
            let modsStr = Object.keys(mods).filter(mod => mods[mod]).map(mod => `${result}--${mod}`).join('')
            result += modsStr
        }
        return result
    }
}


export function createNamespace(name: string) {
    const prefixedName = `op-${name}`
    return [prefixedName, createBEM(prefixedName)] as const
}
