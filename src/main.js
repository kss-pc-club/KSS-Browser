// Modules to control application life and create native browser window
// アプリコントロールとウィンドウ生成のモジュール
const {app, BrowserWindow, Menu, globalShortcut} = require("electron") || require("electron").remote;
const path = require("path");

app.name = "KSS Browser";

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
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true
        },
        icon: path.join(__dirname,"../resources/ico.ico")
    })

    mainWindow.setTitle("KSS Browser");

    // 画面の中央に表示させる
    mainWindow.center();

    // Menu.setApplicationMenu(null);

    // and load the index.html of the app.
	// アプリのindex.htmlを読み込み
    // mainWindow.loadFile('index.html')
    mainWindow.loadFile('src/index.html')

    // Open the DevTools.
	// DevTools開く
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
	// windowが閉じられた時に発火
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows in an array if your app supports multi windows, this is the time when you should delete the corresponding element.
		// ウィンドウオブジェ逆参照。普通はアプリがマルチウィンドウをサポートしている場合、ウィンドウを配列に格納。これは、対応要素を削除する必要がある場合。
        mainWindow = null
    });

    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
        if (frameName === 'proj') {
            // open window as modal
            event.preventDefault()
            const exp = require("express");
            const ls = exp();
            const server = ls.listen(1331,(...arg)=>console.log("Hello",arg));

            const existReadme = !url.includes(":no-readme");
            url = url.replace(":no-readme","").replace(":readme","").replace("file:///","");

            ls.use("/", exp.static(url));
            ls.use((req, res) => { res.sendStatus(404); });

            console.log(url, existReadme);

            const wind = event.newGuest = new BrowserWindow({
                modal: true,
                parent: mainWindow,
                width: 300,
                height: 300,
                titleBarStyle: "hiddenInset",
                resizable: false,
                alwaysOnTop: true,
                closable: false,
                fullscreen: true,
                // movable: false,
                skipTaskbar: true,
                autoHideMenuBar: true,
                nodeIntegration: true
            });
            wind.loadURL((existReadme)?"http://localhost:1331/.kssbrowser/README.md.html":"http://localhost:1331/index.html");
            wind.on("close",()=>{server.close()})
            globalShortcut.register("Ctrl+Super+Alt+Shift+Delete+Insert", ()=>{
                server.close();
                app.quit();
            });
            globalShortcut.register("Ctrl+Super+Alt+F12", ()=>{
                wind.webContents.toggleDevTools();
            });
            globalShortcut.registerAll(["Ctrl+Alt+Delete", "Ctrl+Shift+Esc", "F11", "F12"], ev=>{
                ev.preventDefault();
                return false;
            });
            globalShortcut.register("F5", ()=>{
                wind.reload();
            });
        }
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

const {menuTemplate} = require("./js/menu");

Menu.setApplicationMenu(menuTemplate)
