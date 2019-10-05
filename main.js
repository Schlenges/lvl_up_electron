const { app, BrowserWindow, ipcMain } = require('electron')
const db = require('./config/db')
const dbSetup = require('./config/dbSetup')
const skillService = require('./skillService')

// Fix for ES6 module support
const { protocol } = require('electron')
const nfs = require('fs')
const npjoin = require('path').join
const es6Path = npjoin(__dirname.replace(/\/$/, ''))
protocol.registerSchemesAsPrivileged([{ scheme: 'es6', privileges: { standard: true, secure: true } }])

// DB setup
dbSetup(db)

// Create and display BrowserWindow
let win
let menu

function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('./public/index.html')
  win.webContents.openDevTools()
}

app.on('ready', async () => {
  protocol.registerBufferProtocol('es6', (req, cb) => {
    nfs.readFile(
      npjoin(es6Path, req.url.replace('es6://', '')),
      (e, b) => { cb({ mimeType: 'text/javascript', data: b }) }
    )
  })
  await createWindow()
})

// Data Comminication
ipcMain.on('get skills', () => {
  skillService.getAll().then(skills => win.send('skills', skills))
})

// show menu
ipcMain.on('show menu', () => {
  menu = new BrowserWindow({
    width: 400, 
    height: 400, 
    parent: win,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })
  menu.loadFile('./public/menu.html')
  
  menu.on('close', () => win.send('closed menu', false))
})

ipcMain.on('close menu', () => menu.close())

// show skill form
ipcMain.on('show skill form', () => {
  menu.close()
  win.loadFile('./public/skillForm.html')
})

// cancel
ipcMain.on('cancel', () => win.loadFile('./public/index.html'))