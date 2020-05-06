const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const authDocument = require("../templates/authorization/auth_document");

var exports = module.exports = {};

exports.handlePdf = function (req, res, err) {
    const content = mustache.render(authDocument.templateStructure, authDocument.templateData);
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
