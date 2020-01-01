// const {BrowserWindow, dialog} = require("electron") || require("electron").remote;
const BrowserWindow = require("electron").BrowserWindow || require("electron").remote.BrowserWindow;
const dialog = require("electron").dialog || require("electron").remote.dialog;
NodeList.prototype.click = function(f){ this.forEach(_=>_.addEventListener("click",f)); }

console.log(BrowserWindow, dialog, require("electron").remote.BrowserWindow)

window.addEventListener("load", ()=>{
	document.querySelector("p#uploadSelect").addEventListener("click",()=>{
		const dir = dialog.showOpenDialogSync(null, {
			title: 'Select the Project Directory',
			defaultPath: '../',
			properties: ['openDirectory']
		});
		console.log(dir || "user canceled")
	})
});