const package = require('express').Router();
const packageController = require('../controllers/package.controller');

const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

package.get('/token', packageController.getToken);

package.get('/all', packageController.all);
package.get('/:id', packageController.getByID);
package.post('/create', packageController.create);
package.put('/edit/:id', packageController.edit);
package.delete('/delete/:id', packageController.delete);
package.get('/camara', packageController.getByCamara)

module.exports = package;