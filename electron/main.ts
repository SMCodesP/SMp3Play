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
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'renderer/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
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

const downloadMusic = (music: Video, path: string): Promise<string> => new Promise((res, rej) => {
  if (fs.existsSync(path))
    return res(path)

  const stream = ytdl(music.url, {
    quality: 'highestaudio',
    filter: 'audioonly'
  }).pipe(fs.createWriteStream(path))

  stream.on('close', () => {
    res(path)
  })
})

ipcMain.on('playlistDownload', (_event, arg: Playlist) => {
  const dir = app.getPath('userData') + `/SMp3Play`

  let musicsDownload: Promise<string>[] = arg.musics?.map(async (music) => {
    const path = `${dir}/${music.videoId}.mp3`

    return await downloadMusic(music, path)
  }) || []

  Promise.all(musicsDownload)
    .then((musics) => {
      mainWindow?.webContents.send('playlistDownloaded', musics)
    })
    .catch((err) => {
      console.log('erro')
      console.log(err)
    })
})

ipcMain.on('video', (_event, arg: Video) => {

  const dir = app.getPath('userData') + `/SMp3Play`

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const path = `${dir}/music.mp3`

  if (fs.existsSync(`${dir}/${arg.videoId}.mp3`)) {
    mainWindow?.webContents.send("videomp3preload", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg
    })
  
    mainWindow?.webContents.send("videomp3", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg
    })
    return;
  }
  
  mainWindow?.webContents.send("videomp3preload", {
    path: path,
    video: arg
  })

  const stream = ytdl(arg.url, {
    quality: 'highestaudio',
    filter: 'audioonly'
  }).pipe(fs.createWriteStream(path))

  stream.on('close', () => {
    mainWindow?.webContents.send("videomp3", {
      path: path,
      video: arg
    })
  })
})
