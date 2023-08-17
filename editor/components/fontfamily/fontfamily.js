export default class Fontfamily{
    constructor(appendFn){
        this.fonts = ["Arial","Verdana","Helvetica","Tahoma","Trebuchet","Times New Roman","Georgia","Garamond","Courier New","Brush Script MT","Monospace"]
        this.appendFn = appendFn
        this.toolElement = document.createElement("select")
        this.toolElement.classList.add("btn","btn-dark")
        this.toolElement.name = "fontfamily"
        this.toolElement.id = "fontfamily"
        for(const x of this.fonts){
            const option = document.createElement("option")
            option.value = x
            option.innerHTML = x
            this.toolElement.append(option)
        }
        this.toolElement.addEventListener("change",this.event)
        return this.toolElement
    }
    event = (e)=>{
        const fontfamilyElement = document.createElement("span")
        fontfamilyElement.style.fontFamily = e.target.value
        this.appendFn(fontfamilyElement)
    }
}