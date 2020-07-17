import './styles/index.scss'


export default class Carousel {
    constructor(el, data, options = {}) {
        this.el = el
        this.data = data
        this.options = options
        this.currentIndex = 0
        this.oldIndex = 0
        this.container = make(
            "div", [this.CSS.container], {},
        )
        this.items = []
    }
    get CSS() {
        return {
            container: "kd-container",
            items: "kd-items",
            itemWrap: "kd-item-wrap",
            btn: "kd-btn",
            btnLeft: "kd-btn-left",
            btnRight: "kd-btn-right",
            type1Item: "kd-type1-item",
            type2Item: "kd-type2-item",
            type3Item: "kd-type3-item",
            type4Item: "kd-type4-item",
            type5Item: "kd-type5-item",
            type5ItemLeft: "left",
            type5ItemRight: "right",
        }
    }
    render() {
        this.el.appendChild(this.container)
        this.items = this.data.map((item, index) => {
            let itemEl
            // 
            let zIndex = index === this.currentIndex ? this.data.length + 3 : 1
            let style = `z-index: ${zIndex}`
            let duration = this.options.duration || .5
            switch (item.type) {
                case "type1":
                    itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                        style
                    },
                        make("div", [this.CSS.type1Item], {
                            style: `
                                width: 100%;
                                height:100%;
                                background-image: url(${item.img});
                                background-size: 100% 100%;
                                transition: opacity ${duration}s;
                                `
                        }))
                    break
                case "type2":
                    {
                        let numPart = 10
                        let timeDelay = 0
                        itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                            style

                        },
                            Array.from(Array(numPart).keys()).map((index) => {
                                timeDelay += duration / numPart

                                let width = this.container.clientWidth / numPart
                                return make("div", [this.CSS.type2Item], {
                                    style: `width: ${width}px;
                                height:100%;
                                background-color:${item.color};
                                background-image: url(${item.img});
                                background-size: ${this.container.clientWidth}px 100%;
                                background-position: ${-width * index}px 0px;
                                transition: transform ${duration}s;
                                transition-delay: ${timeDelay}s;
                                `
                                })
                            })
                        )
                    }
                    break


                case "type3":
                    itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                        style

                    },
                        make("div", [this.CSS.type3Item], {
                            style: `
                                width: 100%;
                                height:100%;
                                background-image: url(${item.img});
                                background-size: 100% 100%;
                                transition: transform ${duration}s;
                                `
                        }))
                    break
                case "type4":
                    {
                        let columns = 10
                        let rows = 5
                        let numPart = columns * rows
                        let timeDelay = 0
                        let height = this.container.clientHeight / rows
                        itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                            style
                        },
                            Array.from(Array(numPart).keys()).map((index) => {
                                timeDelay += duration / numPart

                                let width = this.container.clientWidth / columns
                                return make("div", [this.CSS.type4Item], {
                                    style: `width: ${width}px;
                                height: ${height}px;
                                background-color:${item.color};
                                background-image: url(${item.img});
                                background-size: ${this.container.clientWidth}px ${this.container.clientHeight}px;
                                background-position: ${-width * index}px ${-height * Math.floor(index / columns)}px;
                                transition: opacity ${duration}s;
                                transition-delay: ${timeDelay}s;
                                `
                                })
                            })
                        )
                    }
                    break
                case "type5":

                    let transition = `transition: transform ${duration}s ease-in;`
                    itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                        style
                    },
                        [
                            make("div", [this.CSS.type5Item, this.CSS.type5ItemLeft], {
                                style: `
                                width: 50%;
                                height:100%;
                                background-size: ${this.container.clientWidth}px 100%;
                                background-position: 0 100%;
                                ${transition}
                                `
                            }),
                            make("div", [this.CSS.type5Item, this.CSS.type5ItemRight], {
                                style: `
                                width: 50%;
                                height:100%;
                                background-size: ${this.container.clientWidth}px 100%;
                                background-position: ${-this.container.clientWidth / 2}px 100%;
                                ${transition}
                                `
                            }),
                            make("div", [], {
                                style: `
                                width: 100%;
                                height:100%;
                                background-image: url(${item.img});
                                background-size: 100% 100%;
                                `
                            }),
                        ])
                    break
                default:
                    itemEl = make("div", [this.CSS.itemWrap, index === this.currentIndex ? 'active' : ''], {
                        style: `background-color: ${item.color};
                        background-image: url(${item.img});
                        background-size: 100% 100%
                        
                        `
                    })
                    break
            }
            // 
            return itemEl
        })
        this.container.appendChild(
            make('div', [this.CSS.items], {}, this.items)
        )

        let btnLeft = make("div", [this.CSS.btn, this.CSS.btnLeft], {
            innerHTML: "<"

        })

        btnLeft.addEventListener("click", function () {
            this.previous()
        }.bind(this))
        let btnRight = make("div", [this.CSS.btn, this.CSS.btnRight], {
            innerHTML: ">"
        })
        btnRight.addEventListener("click", function () {
            this.next()
        }.bind(this))
        this.container.appendChild(
            btnLeft
        )
        this.container.appendChild(
            btnRight
        )
    }
    next() {
        this.oldIndex = this.currentIndex
        if (this.currentIndex < this.data.length - 1) {
            this.currentIndex++
        } else {
            this.currentIndex = 0
        }
        this.update()
    }
    previous() {
        this.oldIndex = this.currentIndex

        if (this.currentIndex > 0) {
            this.currentIndex--
        } else {
            this.currentIndex = this.data.length - 1
        }
        this.update()

    }
    update() {
        for (const index in this.items) {
            this.items[index].classList.remove("old")
            if (index == this.currentIndex) {
                if (this.data[index].type == "type5") {
                    console.log(this.items[index].children)
                    for (let itemKey = 0; itemKey < this.items[index].children.length; itemKey++) {
                        const item = this.items[index].children[itemKey]
                        if (item.classList.contains(this.CSS.type5Item)) {
                            this.items[index].children[itemKey].style.backgroundImage = `url(${this.data[this.oldIndex].img})`
                        }
                    }


                }
                //
                setTimeout(() => {
                    this.items[index].style.zIndex = this.items.length + 3
                    this.items[index].classList.add("active")
                }, 0)
                // 
            } else {
                this.items[index].classList.remove("active")
                if (index == this.oldIndex) {

                    this.items[index].classList.add("old")
                    this.items[index].style.zIndex = this.items.length + 2
                } else {

                    this.items[index].style.zIndex = parseInt(index) + 2
                }
            }
        }
    }
}
export const make = function make(tagName, classNames = null, attributes = {}, child = null) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
        el.classList.add(...classNames.filter(item => item))
    } else if (classNames) {
        el.classList.add(classNames)
    }

    for (const attrName in attributes) {
        el[attrName] = attributes[attrName]
    }
    if (Array.isArray(child)) {
        for (const item of child) {
            el.appendChild(item)
        }
    } else if (child) {
        el.appendChild(child)
    }
    return el
}