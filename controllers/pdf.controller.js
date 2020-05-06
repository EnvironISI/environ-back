const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const authDocument = require("../template/auth");

/*const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
const data = require('../templates/authorization/auth1');*/

var exports = module.exports = {};

exports.handlePdf = function (req, res, err) {
    const content = mustache.render(authDocument.templateStructure, authDocument.templateData);
    //const content = fs.readFileSync(require.resolve('../templates/authorization/auth.html'), 'utf8')
    var options = { format: 'Letter' };
    htmlPdf.create(content, options).toBuffer(function(err, rest) {
        var filename = 'testfile-test';
        filename = encodeURIComponent(filename) + '.pdf'
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        res.write(rest);
        res.end();
    });
}

/*exports.handlePdf = async function (req, res, err) {

    var templateHtml = fs.readFileSync(path.join(process.cwd(), './templates/authorization/auth.html'), 'utf8');
	var template = handlebars.compile(templateHtml);
    var html = template(data);

	var milis = new Date();
	milis = milis.getTime();

	//var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

	var options = {
		width: '1230px',
		headerTemplate: "<p></p>",
		footerTemplate: "<p></p>",
		displayHeaderFooter: false,
		margin: {
			top: "10px",
			bottom: "30px"
		},
		printBackground: true,
		//path: pdfPath
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	});

	var page = await browser.newPage();
	
	await page.goto(`data:text/html;charset=UTF-8,${html}`, {
		waitUntil: 'networkidle0'
	});

	await page.pdf(options).then(rest => {
        var filename = 'testfile-test';
        filename = encodeURIComponent(filename) + '.pdf'
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        res.write(rest);
        res.end();
    });

    await browser.close();
}
*/