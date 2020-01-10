// const {BrowserWindow, dialog} = require("electron") || require("electron").remote;
const BrowserWindow = require("electron").BrowserWindow || require("electron").remote.BrowserWindow;
const dialog = require("electron").dialog || require("electron").remote.dialog;
const fs = require('fs-extra');
const path = require('path');

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
		if(dir){ dirSel(dir[0]) }
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
	fs.ensureDirSync(dir+"/.kssbrowser");
	if(fs.pathExistsSync(`${dir}\\README.md`)){
		const marked = require('marked')
		fs.readFile(file=`${dir}\\README.md`, (err, d) => {
			const data = marked(d.toString());
			// console.log(data)
			const fn = `${dir}\\.kssbrowser\\README.md.html`;
			let fileD = `<!DOCTYPE html>
<html lang="ja">
<head>
	<link rel="stylesheet" href="./markdown.min.css">
	<title>README.md</title>
</head>
<body>
`;
fileD += data;
fileD += `
</body>
</html>`;
			fs.writeFile(fn, fileD, err=>{if(err)console.error(err)});

			fs.copyFileSync(path.join(__dirname,"../resources/markdown.min.css"), `${dir}\\.kssbrowser\\markdown.min.css`)

			window.open(dir+":readme", "proj");
		})
	}
	else{
		alert("README.mdファイルがまだ作成されていないようです。\n作成してみましょう！");
		window.open(dir+":no-readme", "proj");
	}
}