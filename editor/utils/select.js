export default class Select{
    WindowSelectEvent = ()=>{
        this.editor.content.addEventListener("mouseup",this.WindowSelect)
    }
    WindowSelect = ()=>{
        const {startOffset,endOffset,startContainer} = window.getSelection().getRangeAt(0)
        this.startContainer = startContainer
        if(this.startContainer.nodeType === 3){
            this.textNode = this.startContainer
            this.startContainer = this.startContainer.parentElement
            this.nodeIndex = Array.prototype.indexOf.call(this.startContainer.childNodes, this.textNode);
        }else return
        if(this.startContainer.childNodes[this.nodeIndex].textContent.slice(startOffset,endOffset)){
            this.text = this.startContainer.childNodes[this.nodeIndex].textContent
            this.htmlText = this.startContainer.innerHTML
            this.subText = this.text.slice(startOffset,endOffset)
            this.startString = ""
            this.endString = ""
            if(this.nodeIndex > 0){
                for(let i = 0;i<=this.nodeIndex;i++){
                    if(i === this.nodeIndex){
                        this.startString+=this.startContainer.childNodes[i].textContent.slice(0,startOffset)
                        continue
                    }
                    this.startString+=this.startContainer.childNodes[i].nodeType === 3 ? this.startContainer.childNodes[i].textContent : this.startContainer.childNodes[i].outerHTML
                }
                for(let i = this.nodeIndex+1;i<this.startContainer.childNodes.length;i++){
                    if(i === this.nodeIndex){
                        this.startString+=this.startContainer.childNodes[i].textContent.slice(endOffset)
                        continue
                    }
                    this.endString+=this.startContainer.childNodes[i].nodeType === 3 ? this.startContainer.childNodes[i].textContent : this.startContainer.childNodes[i].outerHTML
                }
            }else{
                this.startString = this.htmlText.slice(0,startOffset)
                this.endString = this.htmlText.slice(endOffset)
            }
        }
    }
    append = (element)=>{
        if(this.subText){
            element.innerText = this.subText
            this.startContainer.innerHTML = this.startString + element.outerHTML + this.endString
        }
    }
    appendImage = (image)=>{
        this.startContainer.innerHTML += image.outerHTML
    }

}