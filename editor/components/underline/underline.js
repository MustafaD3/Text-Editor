export default class Underline{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElement = document.createElement("button")
        this.toolElement.addEventListener("click",this.event)
        this.toolElement.type = "button"
        this.toolElement.classList.add("btn","btn-primary")
        this.toolElement.name = "underline"
        this.toolElement.id = "underline"
        this.toolElement.innerHTML = "Underline"
        return this.toolElement
    }
    event = ()=>{
        const underlineElement = document.createElement("span")
        underlineElement.style.textDecoration = "underline"
        this.appendFn(underlineElement)
    }
}