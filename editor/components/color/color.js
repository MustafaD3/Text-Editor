export default class Color{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElement = document.createElement("input")
        this.toolElement.name = "color"
        this.toolElement.type = "color"
        this.toolElement.id = "color"
        this.toolElement.addEventListener("change",this.event)
        return this.toolElement
    }
    event = (e)=>{
        const colorElement = document.createElement("span")
        colorElement.style.color = e.target.value
        this.appendFn(colorElement)
    }
}