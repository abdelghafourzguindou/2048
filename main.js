const {app, BrowserWindow, globalShortcut} = require('electron')
const url = require('url')
const path = require('path')

let win

function createWindow() {
   win = new BrowserWindow({
   	width: 520, 
   	height: 700, 
   	resizable: false
   });win
   win.loadURL(url.format({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true,
   }));
   set_global_shortcuts();
}

function set_global_shortcuts(){
    globalShortcut.register('Up',function(){
        win.webContents.send('up');
    });
    globalShortcut.register('Down',function(){
        win.webContents.send('down');
    });
    globalShortcut.register('Left',function(){
        win.webContents.send('left');
    });
    globalShortcut.register('Right',function(){
        win.webContents.send('right');
    });
    
}

app.on('ready', createWindow);
app.on('window-all-closed', function() {
    app.quit();
});