/*
undo
redo
cut
copy
paste
pasteAndMatchStyle
delete
selectAll
reload
forceReload
toggleDevTools
resetZoom
zoomIn
zoomOut
togglefullscreen
window
minimize
close
help
about
services
hide
hideOthers
unhide
quit
startSpeaking
stopSpeaking
close
minimize
zoom
front
appMenu
fileMenu
editMenu
viewMenu
recentDocuments
toggleTabBar
selectNextTab
selectPreviousTab
mergeAllWindows
clearRecentDocuments
moveTabToNewWindow
windowMenu*/

const {Menu, shell} = require("electron") || require("electron").remote;
const openLink = shell.openExternal;
const template = [
	// { role: 'fileMenu' }
	{
		label: 'Application',
		submenu: [
			{role: 'about', },
			{role: 'quit'}
		]
	},
	// { role: 'editMenu' }
	{
		label: 'Edit',
		submenu: [
			{role: 'undo'},
			{role: 'redo'},
			{type: 'separator'},
			{role: 'cut'},
			{role: 'copy'},
			{role: 'paste'},
			{role: 'delete'},
			{type: 'separator'},
			{role: 'selectAll'}
		]
	},
	// { role: 'viewMenu' }
	{
		label: 'View',
		submenu: [
			{role: 'reload', accelerator: 'Ctrl+R'},
			{role: 'togglefullscreen', accelerator: 'F11'}
		]
	},
	// { role: 'windowMenu' }
	{
		label: 'Window',
		submenu: [
			{role: 'minimize'},
			{role: 'zoom'},
			{role: 'close'}
		]
	},
	{
		role: 'help',
		submenu: [{
			label: 'Learn More',
			click: async ()=>{await openLink('https://electronjs.org')}
		}]
	}
]
const menuTemplate = Menu.buildFromTemplate(template)
module.exports = {menuTemplate};