const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const commercialInvoices = require("../templates/commercialInvoice");

var exports = module.exports = {};

exports.handlePdf = function (req, res, err) {
    const content = mustache.render(commercialInvoices.templateStructure, commercialInvoices.templateData);
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
