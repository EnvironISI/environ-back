var API = require('html-to-pdf-conversion');
var api = new API({
	access_key: [ACCESS_KEY],
	secret_key: [SECRET_KEY],
	secure: [true|false]
});

module.exports = {
    pdfLayer: api
}