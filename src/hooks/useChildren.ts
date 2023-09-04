import type { ComponentInternalInstance, InjectionKey } from 'vue'
import type { ParentProvide } from './useParent'
import { provide, shallowReactive } from 'vue'

export type NotNullChild = ComponentInternalInstance & Record<string, any>
export type Child = NotNullChild | null

export function useChildren<T>(key: InjectionKey<ParentProvide<T>>) {
  const children = shallowReactive<Child[]>([])

  const linkChildren = (value?: T) => {
    const link = (child: Child) => {
      children.push(child)
    }

    const unlink = (child: Child) => {
      const index = children.indexOf(child)
      children.splice(index, 1)
    }

    provide(key, {
        link,
        unlink,
        ...value
    } as ParentProvide<T>)

  }

  return {
    children,
    linkChildren,
  }
}
