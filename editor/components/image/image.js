export default class Image{
    constructor(appendFn){
        this.appendFn = appendFn
        this.toolElementContainer = document.createElement("div")
        this.toolElementContainer.id = "image-container"
        this.toolElement = document.createElement("input")
        this.toolElement.type = "file"
        this.toolElement.accept = "image/png, image/jpeg"
        this.toolElement.multiple = true
        this.toolElement.addEventListener("change",this.event)
        this.toolElementContainer.append(this.toolElement,this.imagePreview())
        return this.toolElementContainer
    }
    imagePreview = ()=>{
        this.imagePreviewContainer = document.createElement("div")
        this.imagePreviewContainer.id = "image-preview-container"
        return this.imagePreviewContainer
    }
    blowURL = (image)=>{
        return URL.createObjectURL(image)
    }
    event = (e)=>{
        this.imagePreviewContainer.innerHTML = ""
        for(const image of e.target.files){
            const imageElement = document.createElement("img")
            imageElement.addEventListener("click",this.imageAppendEvent)
            imageElement.src = this.blowURL(image)
            this.imagePreviewContainer.append(imageElement)
        }
    }
    imageAppendEvent = (e)=>{
        this.appendFn(e.target)
    }
}