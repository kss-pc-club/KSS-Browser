// const {BrowserWindow, dialog} = require("electron") || require("electron").remote;
const BrowserWindow = require("electron").BrowserWindow || require("electron").remote.BrowserWindow;
const dialog = require("electron").dialog || require("electron").remote.dialog;
const fs = require('fs-extra');

const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);
Element.prototype.drop = function(fn){
	const _ = e=>{
		e.stopPropagation();
		e.preventDefault();
	}
	this.addEventListener("dragenter",_,false);
	this.addEventListener("dragover",_,false);
	this.addEventListener("drop",fn,false);
}

console.log(BrowserWindow, dialog, require("electron").remote.BrowserWindow)

window.addEventListener("DOMContentLoaded", ()=>{
	$("p#uploadSelect").addEventListener("click", ()=>{
		const dir = dialog.showOpenDialogSync(null, {
			title: 'Select the Project Directory',
			defaultPath: '../',
			properties: ['openDirectory']
		});
		console.log(dir || "user canceled")
		if(dir){ dirSel(dir) }
	})

	$("#openInst").addEventListener("click", ()=>{
		window.open("../resources/inst.html", "instructions");
	})

	$("div#dd").drop(e=>{
		e.stopPropagation();
		e.preventDefault();

		let files = e.dataTransfer.files;
		if(files.length === 1){ files = files[0] }
		else{
			alert("1つのフォルダのみD&Dしてください。")
			return;
		}
		console.log(files)
		const dir = (!files.type) ? files.path : alert("フォルダをD&Dしてください。");
		console.log(dir || "not directory");
		if(dir){ dirSel(dir) }
	});

});

const dirSel = dir=>{
	try{
		fs.ensureDirSync(dir);
	}
	catch(e){
		console.error("maybe Not directory", e);
		alert("もしかして: 無拡張子ファイル")
		return;
	}

}