export default class Link{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElement = document.createElement("div")
        this.linkElement = document.createElement("button")
        this.linkElement.addEventListener("click",this.openForm)
        this.linkElement.type = "button"
        this.form = document.createElement("div")
        this.form.id = "anchor-form"
        this.form.innerHTML = 
        `<input placeholder="Anchor" name="anchor" >
        <button type="button" class="btn btn-warning" id="add-button">Add</button>
        `
        this.form.querySelector("#add-button").addEventListener("click",this.event)
        this.toolElement.setAttribute("role",'button')
        this.toolElement.id = "link"
        this.linkElement.innerHTML = "Link"
        this.linkElement.classList.add("btn","btn-link","text-primary","text-decoration-underline")
        this.toolElement.append(this.linkElement,this.form)
        return this.toolElement
    }
    openForm = ()=>{
        this.form.classList.toggle("display-flex")
    }
    event = ()=>{
            const linkElement = document.createElement("a")
            linkElement.href = this.form.querySelector("input").value
            this.appendFn(linkElement)
    }
}