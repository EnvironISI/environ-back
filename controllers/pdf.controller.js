/*const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const authDocument = require("../templates/authorization/auth_document");*/

const Fs = require('fs')  
const Path = require('path')  
const Util = require('util')  
const Puppeteer = require('puppeteer')  
const Handlebars = require('handlebars')  
const ReadFile = Util.promisify(Fs.readFile)

var exports = module.exports = {};



exports.handlePdf = function (req, res, err) {
    /*const content = mustache.render(authDocument.templateStructure, authDocument.templateData);
    var options = { format: 'Letter' };
    htmlPdf.create(content, options).toBuffer(function(err, rest) {
        var filename = 'testfile-test';
        filename = encodeURIComponent(filename) + '.pdf'
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        res.write(rest);
        res.end();
    });*/

    async function html() {
        try {
          const data = {
            your: 'data'
          }
    
          const templatePath = Path.resolve('./templates/authorization/auth.html')
          const content = await ReadFile(templatePath, 'utf8')
    
          // compile and render the template with handlebars
          const template = Handlebars.compile(content)
    
          return template(data)
        } catch (error) {
          throw new Error('Cannot create invoice HTML template.')
        }
      }

    const html = await html()
    
    const browser = await Puppeteer.launch()
    const page = await browser.newPage()
    await page.setContent(html)
    page.pdf().then(function(rest) {
        var filename = 'testfile-test';
        filename = encodeURIComponent(filename) + '.pdf'
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        res.write(rest);
        res.end();
    })
}
