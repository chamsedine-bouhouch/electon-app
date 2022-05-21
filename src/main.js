// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, Tray} = require('electron')
const path = require('path')
const windowStateKeeper= require('electron-window-state')
const {MainMenu}= require('./MainMenu')

let tray, trayMenu
trayMenu= Menu.buildFromTemplate([
{label:'ithem 1'},
{label:'ithem 2'},
{role:'quit'}
])
function createTray(){
  tray=new Tray('alistar1.png')
  tray.setToolTip('tray test App')
  tray.setContextMenu (trayMenu)
}

//creation un variable (js)
let contexMenu = Menu.buildFromTemplate([
  {label: 'item 1'},
  {label: 'item 2'},
  {role: 'editmenu'}
])
let mainWindow
function createWindow () {
  new MainMenu()
  let winState =windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  })
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 400,
    minHeight:200,
    width: winState.width,
    height: winState.height,
    //(x,y)detecte la derniere position de window
    x:winState.x,
    y:winState.y,
    webPreferences: {
    },
    show: false,
    //frame: false //desactive le cadre de fennetre
  })
  mainWindow.webContents.on('context-menu',() => {
    contexMenu.popup()
  })
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  createTray()
  //(.menage)detecte la derniere position de window
  winState.manage(mainWindow)
  mainWindow.once("ready-to-show",mainWindow.show)
  //mainWindow.loadURL('https://www.google.com')
  // Open the DevTools.
  mainWindow.webContents.openDevTools() // auto ouvrir le debuggage
  console.log("hello from Main.js");
  mainWindow.on('closed'.valueOf, ()=>{
    mainWindow=null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('browser-window-focus',() =>{
  console.log("app_is_focssed");
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
console.log(BrowserWindow.getAllWindows()); // afficher les details de fenetre sur console
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

