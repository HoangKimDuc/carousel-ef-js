import Component from "./CarouselEfJs.vue"

export default {
    install(Vue, options) {
        // 1. add global method or property
        Vue.myGlobalMethod = function () {
            // some logic ...
            console.log("Hi!")
        }
        Vue.component("carousel-ef-js", Component)
    }
}