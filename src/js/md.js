const fs = require('fs');
const hljs = require("highlight.js");
const marked = require('marked')
const exportFile = ()=>{
	fs.readFile(file="./resources/instructions.md", (err, d) => {
		const data = marked(d.toString());
		// console.log(data)
		const fn = "./resources/inst.html";
		let fileD = `<!DOCTYPE html>
<html lang="ja">
<head>
	<link href="../resources/common.css" rel="stylesheet">
	<link href="../resources/markdown.min.css" rel="stylesheet">
	<title>KSS Browser Instructions</title>
</head>
<body>
`;
fileD += data;
fileD += `
</body>
</html>`;
		fs.writeFile(fn, fileD, err=>{if(err)console.error(err)})
		// `);
		// readFile(path.join(__dirname, '../resources/instructions.md'), w);
		// w.document.writeln(`
		//
		// Array.from(document.querySelectorAll('pre code')).forEach(block => hljs.highlightBlock(block))
		// Array.from(document.querySelectorAll('.md a')).forEach((link, index) => {
		//   // console.log(document.querySelectorAll('.md a').item(index))
		//   document.querySelectorAll('.md a').item(index).addEventListener('click', (ev) => {
		//     let url;
		//     if (ev.target.localName === 'img' || ev.target.localName === 'span') {
		//       url = ev.target.parentElement.href;
		//     }
		//     else {
		//       url = ev.target.href;
		//     }
		//     shell.openExternal(url, {}, (err) => {
		//       if (err) {
		//         throw err;
		//       }
		//       shell.beep();
		//       console.log("visit: ", url);
		//     })
		//     ev.preventDefault();
		//     // return false;
		//   });
		//   /*
		//   link.addEventListener('click', (ev) => {
		//     ev.preventDefault();
		//     shell.openExternal(ev.target.href, {}, (err) => {
		//       if (err) {
		//         throw err;
		//       }
		//       shell.beep();
		//       console.log("visit: ", ev.target.href);
		//     })
		//   })
		//   */
		// })
	})
}

module.exports = {exportFile};