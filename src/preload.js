// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
/* le code avant suppression
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
 
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})
*/
const index_file =require('./renderer')
const {desktopCapturer}=require('electron')
console.log("ok1");
window.addEventListener('DOMContentLoaded', () => {

  document.getElementById("screenshot_button").addEventListener('click',() =>{
    console.log("ok1");
    desktopCapturer.getSources({types:['screen']})
    .then(sources =>{
      console.log(sources);
      document.getElementById("screenshot").src=sources[1].thumbnail.toDataURL()
    })
  }) 

 console.log("he from preload"); 
 var file_for_frontend =document.getElementById("index")

 if(file_for_frontend){
   index_file()
 }
})