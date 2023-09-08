import { Ref, ref, onMounted } from "vue";

type ScrollElement = HTMLElement | Window

const defaultRoot = window
const overflowScrollReg = /scroll|auot|overlay/i

function isElement(node: Element) {
    const ELMENT_NODE_TYPE = 1
    return node.tagName != "HTML" && node.tagName !== "BODY" && node.nodeType === ELMENT_NODE_TYPE
}

const getScrollElement = (el: Element, root: ScrollElement) => {
    let node = el
    while(node && node !== root && isElement(node)) {
        const { overflowY } = window.getComputedStyle(node)
        // 如果是这一段的值，说明是可以滚动的
        if(overflowScrollReg.test(overflowY)) {
            return node
        }
        // 没有的话，往上找
        node = node.parentNode as Element
    }
    return root
}

export function useScrollParent(element: Ref<Element>, root: ScrollElement = defaultRoot) {
    const scrollParent = ref()

    onMounted(() => {
        if(element.value) {
            scrollParent.value = getScrollElement(element.value, root)
        }
        
    })


    return scrollParent
}