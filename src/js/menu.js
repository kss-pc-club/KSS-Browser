const {Menu, shell, ipcMain, BrowserWindow} = require("electron") || require("electron").remote;

const openLink = shell.openExternal;
const template = [
	// { role: 'fileMenu' }
	{
		label: 'Application',
		submenu: [
			{label: 'About KSS Browser', click: async ()=>{await openLink("https://github.com/a01sa01to/ElectronBrowser/blob/master/README.md")}},
			{label: 'License', click: async ()=>await openLink("https://github.com/a01sa01to/ElectronBrowser/blob/master/LICENSE"), sublabel: "MIT License"},
			{role: 'quit'}
		]
	},
	// { role: 'viewMenu' }
	{
		label: 'View',
		submenu: [
			{role: 'reload', accelerator: 'Ctrl+R'},
			{role: 'togglefullscreen', accelerator: 'F11'},
			{role: 'toggleDevTools', accelerator: 'F12'}
		]
	}
]

const menuTemplate = Menu.buildFromTemplate(template)
module.exports = {menuTemplate};