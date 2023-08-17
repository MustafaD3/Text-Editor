import tools from "./components/tools.js";
import editorInitialized from "./editor.js";
function start(){
    new editorInitialized({
        id:"editor",
        toolbarItems:[tools.Header,tools.Color,tools.Bold,tools.Italic,tools.Underline,tools.Link,tools.Fontfamily,tools.Alignment,tools.Image],
        sendFn:send,//Callback Function Return Object
        width:"70%",
        height:"auto",
        alignment:"center",//Center Right Left Default:Left
        uploadsEndpoint:"",//Here You Must Specify Where Images Will Be Uploaded
        filePath:""//Here You Must Specify Where to Upload Images
    })
}
start()
function send(object){
    console.log(object)
}