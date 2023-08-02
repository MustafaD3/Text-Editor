export default class Header{
    constructor(appendFn){
        this.appendFn = appendFn
        const headers = ["h1","h2","h3","h4","h5","h6"]
        this.toolElement = document.createElement("select")
        this.toolElement.addEventListener("change",this.event)
        this.toolElement.name = "header"
        this.toolElement.classList.add("form-select","form-select-lg")
        this.toolElement.id = "headers"
        for(const [i,x] of headers.entries()){
            const header = document.createElement("option")
            header.innerHTML = x[0].toLocaleUpperCase()+x.slice(1)
            header.value = x[0].toLocaleUpperCase()+x.slice(1)
            if(i === 0)header.setAttribute('selected',"")
            this.toolElement.append(header)
        }
        return this.toolElement
    }
    event = ()=>{
        const headerElement = document.createElement(this.toolElement.value)
        headerElement.style.display = "inline-block"
        this.appendFn(headerElement)
    }
}