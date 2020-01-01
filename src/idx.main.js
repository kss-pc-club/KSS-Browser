// const {BrowserWindow, dialog} = require("electron") || require("electron").remote;
const BrowserWindow = require("electron").BrowserWindow || require("electron").remote.BrowserWindow;
const dialog = require("electron").dialog || require("electron").remote.dialog;
const {readFile} = require("./md");
const path = require('path');


const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);

console.log(BrowserWindow, dialog, require("electron").remote.BrowserWindow)

window.addEventListener("DOMContentLoaded", ()=>{
	$("p#uploadSelect").addEventListener("click", ()=>{
		const dir = dialog.showOpenDialogSync(null, {
			title: 'Select the Project Directory',
			defaultPath: '../',
			properties: ['openDirectory']
		});
		console.log(dir || "user canceled")
	})

	$("#openInst").addEventListener("click", ()=>{
		let w = window.open("", "modal");
		w.document.write(`
		<!DOCTYPE html>
		<html lang="ja">
		<head>
			<link href="../resources/common.css" rel="stylesheet">
			<link href="../resources/markdown.min.css" rel="stylesheet">
			<title>KSS Browser Instructions</title>
		</head>
		<body>
		`);
		readFile(path.join(__dirname, '../resources/instructions.md'), w);
		w.document.write(`
		</body>
		</html>
		`);
    })
});