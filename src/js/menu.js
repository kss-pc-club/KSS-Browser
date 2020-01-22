const {Menu, shell} = require("electron") || require("electron").remote;

const openLink = shell.openExternal;
const template = [
	// { role: 'fileMenu' }
	{
		label: 'Application',
		submenu: [
			{label: 'About KSS Browser', click: async ()=>{await openLink("https://github.com/a01sa01to/ElectronBrowser/blob/master/README.md")}},
			{label: 'Source Code', click: async()=>await openLink('https://github.com/a01sa01to/ElectronBrowser')},
			{label: 'License', click: async ()=>await openLink("https://github.com/a01sa01to/ElectronBrowser/blob/master/LICENSE"), sublabel: "MIT License"},
			{label: 'Version', sublabel: "v.1.2.0"}
			{role: 'quit'}
		]
	},
	// { role: 'viewMenu' }
	{
		label: 'View',
		submenu: [
			{role: 'reload', accelerator: 'Ctrl+R'}
		]
	}
]

const menuTemplate = Menu.buildFromTemplate(template)
module.exports = {menuTemplate};
