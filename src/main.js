// Modules to control application life and create native browser window
// アプリコントロールとウィンドウ生成のモジュール
const {app, BrowserWindow, Menu} = require("electron") || require("electron").remote;
const path = require('path');


// Keep a global reference of the window object, if you don't, the window will be closed automatically when the JavaScript object is garbage collected.
// ウィンドウオブジェのグローバル参照を保つ。さもないと、JSオブジェがメモリ自動開放したときに勝手にウィンドウが閉じる。
let mainWindow = null;

// var log = require('electron-log');
// app.on('uncaughtException', function(err) {
// 	log.error('electron:event:uncaughtException');
// 	log.error(err);
// 	log.error(err.stack);
// 	app.quit();
// });

function createWindow() {
	// Create the browser window.
	// ブラウザウィンドウ生成
    mainWindow = new BrowserWindow({
        width: 700,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            // preload: path.join(__dirname, 'src/preload.js'),
			nodeIntegration: true
        }
    })

    // Menu.setApplicationMenu(null);

    // and load the index.html of the app.
	// アプリのindex.htmlを読み込み
    mainWindow.loadFile('index.html')
    // mainWindow.loadFile('src/index.html')

    // Open the DevTools.
	// DevTools開く
    mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
	// windowが閉じられた時に発火
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
		// ウィンドウオブジェ逆参照。普通はアプリがマルチウィンドウをサポートしている場合、ウィンドウを配列に格納。これは、対応要素を削除する必要がある場合。
        mainWindow = null
    })
}

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
// このメソッドは初期化終了してウィンドウ生成準備完了時に呼ばれる。これが起こったあとしか使えないAPIもある
app.on('ready', createWindow)

// Quit when all windows are closed.
// 全ウィンドウが閉じてから終了
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
	// macでは、 Cmd+Q で明示的に閉じるまでアプリとメニューがアクティブなのは普通なので。
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
	// maxでは、ドックのアイコンがクリックされて開いてるウィンドウがないときに再生成するのは普通なので。
    if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process code. You can also put them in separate files and require them here.
// このファイルには残りのメインプロセスのコード書けるで。あと分割してrequireしてもokよ。

const {menuTemplate} = require("./menu");
const {readFile} = require("./md");

Menu.setApplicationMenu(menuTemplate)
readFile(path.join(__dirname, 'ex.md'))
// readFile(path.join(__dirname, 'src/ex.md'))
