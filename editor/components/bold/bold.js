export default class Bold{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElement = document.createElement("button")
        this.toolElement.addEventListener("click",this.event)
        this.toolElement.type = "button"
        this.toolElement.classList.add("btn","btn-danger","px-3")
        this.toolElement.name = "bold"
        this.toolElement.id = "bold"
        this.toolElement.innerHTML = "Bold"
        return this.toolElement
    }
    event =()=>{
        const boldElement = document.createElement("b")
        this.appendFn(boldElement)
    }
}