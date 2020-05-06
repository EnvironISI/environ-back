var vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
    keyFilename: './config/keys.json'
});

module.exports = {
    client: client
}