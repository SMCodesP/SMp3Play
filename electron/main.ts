import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import * as path from 'path';
import * as url from 'url';
import ytdl from 'ytdl-core';
import fs from 'fs';
import { Video } from '../src/interfaces/Video';

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  protocol.registerFileProtocol('media', (request, callback) => {
    const pathname = decodeURI(request.url.replace('media:///', ''));
    callback(pathname);
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
  });

  mainWindow.loadURL('file:///home/smcodes/projects/SMp3Play/dist/index.html');
  
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

ipcMain.on('video', (event, arg: Video) => {

  const dir = app.getPath('userData') + `/SMp3Play`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const stream = ytdl(arg.url, {
    quality: 'highestaudio',
    filter: 'audioonly'
  }).pipe(fs.createWriteStream(`${dir}/${arg.videoId}.mp3`))

  mainWindow?.webContents.send("videomp3preload", {
    path: `${dir}/${arg.videoId}.mp3`,
    video: arg
  })

  stream.on('close', () => {
    mainWindow?.webContents.send("videomp3", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg
    })
  })
  

})
