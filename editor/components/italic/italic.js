export default class Italic{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElement = document.createElement("button")
        this.toolElement.type = "button"
        this.toolElement.classList.add("btn","btn-primary","px-3")
        this.toolElement.name = "italic"
        this.toolElement.id = "italic"
        this.toolElement.innerHTML = "Italic"
        this.toolElement.addEventListener("click",this.event)
        return this.toolElement
    }
    event = ()=>{
        const italicElement = document.createElement("i")
        this.appendFn(italicElement)
    }
}