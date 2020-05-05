var vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
    keyFilename: './auth/keys.json'
});

module.exports = {
    visionClient: client
}