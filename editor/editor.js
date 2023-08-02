import Select from "./utils/select.js"
const mustParameter = ["id","toolbarItems","stylePath"]
export default class editorInitialized extends Select{
    constructor(config = {}){
        super()
        this.editor = {}
        try {
            if(typeof config !== "object")throw {type:"typeError",variable:"Config:"+typeof config}
            for(const x of mustParameter){
                if(!config.hasOwnProperty(x)){
                    throw {type:"undefinedProperty",property:""+x}
                }
                else {
                    this.editor[x] = config[x]
                    delete config[x]
                }
            }
            for(const [key,value] of Object.entries(config))this.editor[key] = value
            if(typeof this.editor.toolbarItems !== "object")throw {type:"typeError",variable:"toolbarItems:"+typeof config.toolbarItems}
        } catch (error) {
            if(error.type === "typeError")console.error("Parameter Must Be of Type Object You Sent " + error.variable)
            if(error.type === "undefinedProperty")console.error("Property:"+error.property+" Is Not Defined")
            return
        }
        if(document.querySelector("#"+this.editor.id)){
            this.editor.element = document.querySelector("#"+this.editor.id)
            this.focusNodeNumber = 0
            this.cursorPosition = 0
            this.cursorNode = null
            this.bootstrapCDN()
            this.editorStart()
            this.editorStyle()
            this.editorEvent()
        }
        else{
            console.error("Element with id:" + this.editor.id + " Not Found")
        }
    }
    bootstrapCDN(){
        const link = document.createElement("link")
        link.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        link.rel = "stylesheet"
        link.integrity = "sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        link.crossOrigin = "anonymous"
        document.head.append(link)
    }
    editorStart(){
        this.editor.toolbar = document.createElement("div")
        this.editor.content = document.createElement("div")
        this.editor.toolbar.id = "toolbar"
        this.editor.content.id = "content"
        this.WindowSelectEvent()
        for(const x of this.editor.toolbarItems){
            if(x.name === "Image"){
                this.editor.toolbar.append(new x(this.appendImage))
                continue
            }
            this.editor.toolbar.append(new x(this.append))
        }
        const row = this.newRow()
        this.cursorNodeUpdate(row)
        this.editor.content.append(row)
        this.editor.element.append(this.editor.toolbar,this.editor.content)
    }
    editorStyle(){
            if(this.editor.stylePath){
                const styleDocument = document.createElement("link")
                styleDocument.rel = "stylesheet"
                styleDocument.href = this.editor.stylePath
                document.head.append(styleDocument)
            }
          if(this.editor.width && this.editor.height){
            this.editor.element.style.width = this.editor.width
            this.editor.element.style.minHeight = this.editor.height
          }      
          else{
            this.editor.element.style.width = window.innerWidth
            this.editor.element.style.minHeight = window.innerHeight
          }
          if(this.editor.alignment && this.editor.alignment === "center"){
            this.editor.element.style.margin = "0px auto"
          }
    }
    editorEvent(){
        this.editor.content.addEventListener("keydown",(e)=>{
            if(this.cursorNode){
                if(e.key.toLowerCase() === "arrowleft"){
                    this.cursorPosition > 0 ?  this.cursorPosition--:null
                }
                else if(e.key.toLowerCase() === "arrowright"){
                    this.cursorPosition < this.cursorNode.innerText.length ?  this.cursorPosition++:null
                }
            }
            if(e.key.toLowerCase() === "backspace"){
                if(this.focusNodeNumber > 1){
                    if(this.cursorNode.innerText.length === 0){
                        e.preventDefault()
                        this.cursorNode.remove()
                        this.focusNodeNumberUpdate(this.focusNodeNumber - 1)
                        this.travelRow()
                    }
                }
            }
            if(e.key.toLowerCase() === "arrowup"){
                this.focusNodeNumberUpdate(this.focusNodeNumber > 1 ? this.focusNodeNumber - 1:this.focusNodeNumber)
                this.travelRow()
            }
            else if(e.key.toLowerCase() === "arrowdown"){
                this.focusNodeNumberUpdate(this.focusNodeNumber < this.editor.content.querySelectorAll("div").length ? this.focusNodeNumber + 1:this.focusNodeNumber)
                this.travelRow()
            }
            
        })
        
        this.editor.content.addEventListener("keypress",(e)=>{
            if(e.key.toLowerCase() === "enter"){
                e.preventDefault()
                const row = this.newRow(this.cutText())
                this.editor.content.append(row)
                this.cursorAllUpdate(row.getAttribute("node"),row,row.innerText.length)
                row.focus()
                this.setCaret()
                return
            }
            this.cursorPosition += 1
        })
        
        this.editor.content.addEventListener("click",(e)=>{
            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            this.cursorPosition = range.startOffset
            if(range.commonAncestorContainer.tagName === "DIV"){
                this.cursorNodeUpdate( range.startContainer)
            }
            else{
                this.cursorNodeUpdate(range.startContainer.parentElement)
            }
            let parent = range.commonAncestorContainer.parentElement
            while(parent.tagName.toLowerCase() !== "div"){
                    parent = parent.parentElement
                    this.focusNodeNumberUpdate(parent.getAttribute("node"))
            } 
        })
    }
    newRow(text){
        const count = this.editor.content.children.length + 1
        const row = document.createElement("div")
        row.setAttribute("node",count)
        row.contentEditable = true
        row.innerHTML = text ? text:null
        this.startContainer = row
        return row
    }
    travelRow(){
        this.cursorNodeUpdate(this.editor.content.children[this.focusNodeNumber - 1])
        this.cursorPositionUpdate(this.cursorNode.innerText.length)
        this.cursorNode.focus()
        this.setCaret()
    }
    cutText(){
        if(this.cursorPosition >= 0){
            const text = this.cursorNode.innerText.slice(this.cursorPosition)
            this.cursorNode.innerText = this.cursorNode.innerText.slice(0,this.cursorPosition)
            return text 
        }
        return ""
    }
    setCaret() {
        const range = document.createRange()
        const sel = window.getSelection()
        if(this.cursorNode.childNodes[0] && this.cursorNode.childNodes[0].nodeType === 3)range.setStart(this.cursorNode.childNodes[0], this.cursorPosition)
        else range.setStart(this.cursorNode, this.cursorPosition)
        range.collapse(true)
        sel.removeAllRanges()
        sel.addRange(range)
    }
    focusNodeNumberUpdate(focusNodeNumber){
        this.focusNodeNumber = focusNodeNumber
    }
    cursorPositionUpdate(position){
        this.cursorPosition = position
    }
    cursorNodeUpdate(node){
        this.cursorNode = node
    }
    cursorAllUpdate(focusNodeNumber,node,position){
        this.focusNodeNumber = focusNodeNumber
        this.cursorNode = node
        this.cursorPosition = position
    }
    
    
    
}