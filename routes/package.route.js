const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "packages");

const package = require('express').Router();
const packageController = require('../controllers/package.controller');

package.get('/token', packageController.getToken);

package.get('/camara', packageController.camara);
package.get('/:id', packageController.getByID);
package.post('/create', packageController.create);
package.put('/edit/:id', packageController.edit);
package.delete('/delete/:id', packageController.delete);
package.post('/sendMail', packageController.sendMail);

module.exports = package;