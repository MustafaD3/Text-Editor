export default class Image{
     constructor(appendFn,uploadsEndpoint,filePath){
        this.appendFn = appendFn
        this.uploadsEndpoint = uploadsEndpoint
        this.filePath = filePath
        return this
    }
     init = async ()=>{
        this.toolElementContainer = document.createElement("div")
        this.toolElementContainer.id = "image-container"
        this.toolElement = document.createElement("input")
        this.toolElement.type = "file"
        this.toolElement.accept = "image/png, image/jpeg"
        this.toolElement.multiple = true
        this.toolElement.addEventListener("change",this.event)
        this.toolElementContainer.append(await this.uploadsFolder(),this.toolElement,this.imageEditContainer(),this.imagePreview())
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
            const blowURL = this.blowURL(image)
            const imageElement = document.createElement("img")
            imageElement.addEventListener("click",(e)=>this.imageAppend(e.target.cloneNode()))
            imageElement.src = blowURL
            imageElement.setAttribute("relSrc",this.filePath + "/" + image.name)
            this.imagePreviewContainer.append(imageElement)
        }
    }
     uploadsFolder = async ()=>{
        const request = await fetch(this.uploadsEndpoint)
        const uploadsDiv = document.createElement("div")
        try {
            const response = await request.json()
            const imageContainer = document.createElement("div")
            const title = document.createElement("h2")
            uploadsDiv.id = "uploads"
            imageContainer.id = "image-container"
            title.style.textAlign = "center"
            title.textContent = "Uploads"
            uploadsDiv.append(title)
            for(const x of response){
                const image = document.createElement("img")
                image.src = this.filePath+"/"+x
                image.addEventListener("click",(e)=>{this.imageAppend(e.target.cloneNode())})
                imageContainer.append(image)
            }
            uploadsDiv.append(imageContainer)
        } catch (error) {
            
        }
      
        return uploadsDiv
    }
    imageEditContainer = ()=>{
        const container = document.createElement("div")
        this.widthInput = document.createElement("input")
        this.heightInput = document.createElement("input")
        //Set Input Type
        this.widthInput.type = "number"
        this.heightInput.type = "number"
        //Set Input Name
        this.widthInput.name = "width"
        this.heightInput.name = "height"
        //Set Input Placeholder
        this.widthInput.placeholder = "Width"
        this.heightInput.placeholder = "Height"
        container.append(this.widthInput,this.heightInput)
        return container
    }
    imageAppend = (image)=>{
        if(!this.widthInput.value && this.heightInput.value){
            image.style.width = "300px"
            image.style.height = "300px"
        }
        else{
            image.style.width = this.widthInput.value+"px"
            image.style.height = this.heightInput.value+"px"
        }
        this.appendFn(image)
    }
}