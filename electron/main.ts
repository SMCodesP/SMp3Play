import { app, BrowserWindow, ipcMain, protocol, Notification } from "electron";
import * as path from "path";
import * as url from "url";
import ytdl from "ytdl-core";
import fs from "fs";

import { Video } from "../src/interfaces/Video";
import { Playlist } from "../src/interfaces/Playlist";

import rpc from "discord-rich-presence";

const client = rpc("839258837855764500");

const startTimestamp = new Date();

let mainWindow: Electron.BrowserWindow | null;

function createWindow() {
  protocol.registerFileProtocol("media", (request, callback) => {
    const pathname = decodeURI(request.url.replace("media:///", ""));
    callback(pathname);
  });

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
      enableRemoteModule: true
    },
    title: "SMp3Play"
  });

  if (process.env.NODE_ENV === "production") {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "renderer/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  } else {
    mainWindow.loadURL(`http://localhost:4000`);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.userAgent =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.11 Safari/537.36 Edg/88.0.705.9";

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.allowRendererProcessReuse = true;

global.globalVars = {};

global.globalVars.RichPresence = {
  state: "em SMp3Play",
  details: "Procurando alguma música...",
  startTimestamp: Date.now(),
  largeImageKey: "logo",
  instance: true,
  progress: 0,
  duration: 0
};

let before_rich: any;

setInterval(() => {
  if (!global.globalVars.RichPresence) {
    client.updatePresence({})
    return;
  }
  client.updatePresence({
    ...global.globalVars.RichPresence,
    endTimestamp: Math.floor(Date.now() + ((global.globalVars.RichPresence.duration * 1000) - (global.globalVars.RichPresence.progress * 1000)))
  });
}, 500);

ipcMain.on(
  "notification",
  (_event, arg: Electron.NotificationConstructorOptions | any) => {
    new Notification(arg).show();
  }
);

const downloadMusic = (music: Video, pathFile: string): Promise<string> =>
  new Promise((res, rej) => {
    if (fs.existsSync(pathFile)) return res(pathFile);

    const stream = ytdl(music.url, {
      quality: "highestaudio",
      filter: "audioonly",
    }).pipe(fs.createWriteStream(pathFile));

    stream.on("close", () => {
      res(pathFile);
    });
  });

ipcMain.on("playlistDownload", (_event, arg: Playlist) => {
  const dir = app.getPath("userData") + `/SMp3Play`;

  const musicsDownload: Promise<string>[] =
    arg.musics?.map(async (music) => {
      const pathFile = `${dir}/${music.videoId}.mp3`;

      return await downloadMusic(music, pathFile);
    }) || [];

  Promise.all(musicsDownload).then((musics) => {
    mainWindow?.webContents.send("playlistDownloaded", musics);
  });
});

ipcMain.on("video", async (_event, arg: Video) => {
  const dir = app.getPath("userData") + `/SMp3Play`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  if (fs.existsSync(`${dir}/${arg.videoId}.mp3`)) {
    mainWindow?.webContents.send("videomp3", {
      path: `${dir}/${arg.videoId}.mp3`,
      video: arg,
    });
    return;
  }

  const info = await ytdl.getInfo(arg.url);
  const format = ytdl.chooseFormat(info.formats, {
    filter: "audioonly",
  });

  mainWindow?.webContents.send("videomp3", {
    path: format.url,
    video: arg,
  });
});
