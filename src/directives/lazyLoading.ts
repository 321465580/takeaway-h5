import { App, DirectiveBinding } from "vue"

const vLazy = (observer: IntersectionObserver) => {
    return {
        // binding，就是v-lazy传递来的值
        beforeMount: (el: HTMLImageElement, binding: DirectiveBinding) => {
            // 给这个元素添加类名
            el.classList.add('op-lazyload')
            const { value } = binding
            // <image data-origin=" /">
            el.dataset.origin = value
            observer.observe(el)
        }
    }
}

// 注册插件
const lazyPlugin = {
    install(app: App) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(item => {
                if (item.isIntersecting) {
                    // 开始加载图片，把 data-origin 的值放到 src
                    const el = item.target as HTMLImageElement
                    el.src = el.dataset.origin as string
                    el.classList.remove("op-lazyload")
                    // 停止监听
                    observer.unobserve(el)
                }
            })
        }, {
            // 交叉视图的 100px 就开始派发事件
            rootMargin: '0px 0px -100px 0px'
        })

        app.directive('lazy', vLazy(observer))
    }
}

export default lazyPlugin