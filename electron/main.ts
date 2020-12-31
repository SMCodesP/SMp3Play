import { app, BrowserWindow, ipcMain, protocol, Notification } from 'electron';
import * as path from 'path';
import * as url from 'url';
import ytdl from 'ytdl-core';
import fs from 'fs';

import { Video } from '../src/interfaces/Video';
import { Playlist } from '../src/interfaces/Playlist';

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

  if (process.env.NODE_ENV === "production") {
    mainWindow.loadURL('file://' + path.resolve('.', 'index.html'));
  } else {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);
app.allowRendererProcessReuse = true;

ipcMain.on('notification', (_event, arg: Electron.NotificationConstructorOptions | any) => {
  new Notification(arg).show()
})

ipcMain.on('video', (event, arg: Video) => {

  const dir = app.getPath('userData') + `/SMp3Play`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  if (!fs.existsSync(`${dir}/${arg.videoId}.mp3`)) {
    const stream = ytdl(arg.url, {
      quality: 'highestaudio',
      filter: 'audioonly'
    }).pipe(fs.createWriteStream(`${dir}/${arg.videoId}.mp3`))

    stream.on('close', () => {
      mainWindow?.webContents.send("videomp3", {
        path: `${dir}/${arg.videoId}.mp3`,
        video: arg
      })
    })
  } else {
    mainWindow?.webContents.send("videomp3preload", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg
    })
    mainWindow?.webContents.send("videomp3", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg
    })
  }
})
