export default class Alignment{
    constructor(alignmentFn){
        this.alignments= ["Left","Center","Right",]
        this.alignmentFn = alignmentFn
        this.toolElement = document.createElement("select")
        this.toolElement.classList.add("btn","btn-light")
        this.toolElement.name = "alignment"
        this.toolElement.id = "alignment"
        for(const x of this.alignments){
            const option = document.createElement("option")
            option.innerHTML = x
            option.value = x
            this.toolElement.append(option)
        }
        this.toolElement.addEventListener("change",this.event)
        return this.toolElement
    }
    event = (e)=>{
        const value = e.target.value.toLowerCase()
        const alignment = {}
        if(value === "left"){
            alignment.text = "left"
        }
        else if(value === "center"){
            alignment.text = "center"
        }
        else {
            alignment.text = "right"
        }
        this.alignmentFn(alignment)
    }
}