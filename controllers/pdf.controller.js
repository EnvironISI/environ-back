const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const authDocument = require("../templates/auth_document");
const fs = require("fs");

var exports = module.exports = {};

exports.handlePdf = function (req, res, err) {
    //const content = mustache.render(authDocument.templateStructure, authDocument.templateData);
    var html = fs.readFileSync("./templates/authorization/auth.html", 'utf8');
    var options = { format: 'Letter' };
    htmlPdf.create(html, options).toBuffer(function(err, rest) {
        var filename = 'testfile-test';
        filename = encodeURIComponent(filename) + '.pdf'
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
        res.setHeader('Content-type', 'application/pdf')
        res.write(rest);
        res.end();
    });
}
