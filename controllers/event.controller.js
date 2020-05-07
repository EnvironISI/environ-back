const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "events");
const fs = require('fs');
const request = require('request');
const mustache = require("mustache");
const htmlPdf = require("html-pdf");
const authDocument = require("../template/auth");

var { adminFb } = require('../config/firebaseConfig.js');
var { moloni } = require('../config/moloniConfig.js');
var { client } = require('../config/visionConfig.js');

var exports = module.exports = {};
var company_id = 126979;

exports.events = function (req, res, err) {
    moloni.products('getAll', { company_id: company_id }, function (error, result) {
        if (error) {
            console.log(error)
            res.status(500).send(error);
            res.end();
        } else {
            res.status(200).send(result);
            res.end();
        }
    })
}
exports.createEvent = function (req, res, err) {
    const sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true /** checkRevoked */).then((decodedClaims) => {
        adminFb.auth().listUsers().then((userRecords) => {

            var name = req.sanitize('name').escape();
            var lat = req.sanitize('latitude').escape();
            var long = req.sanitize('longitude').escape();
            var address = req.sanitize('address').escape();
            var initTime = req.sanitize('initTime').escape();
            var endTime = req.sanitize('endTime').escape();
            var nrPart = req.sanitize('nrPart').escape();
            var summary = req.sanitize('summary').escape();
            var municipio = req.sanitize('municipio').escape();
            var pacote = req.sanitize('package').escape();
            //var reference = municipio.trim() + Math.floor((Math.random() * 100000000000) + 1).toString();
            /* try {
                 userRecords.users.forEach((user) => {
                     if (!user.customClaims.camara == municipio) {
                         res.status(400).send({ error: "O Municipio ainda não se encontra registado no sistema da Environ." })
                         res.end();
                     }
                 })
             } catch (error) { console.log(error) }*/

            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                var params = {
                    company_id: company_id,
                    category_id: 2151197,
                    type: 2,
                    name: name,
                    reference: name,
                    summary: summary,
                    price: 0.0,
                    unit_id: 1076333,
                    has_stock: 1,
                    exemption_reason: "M99",
                    stock: 1,
                    properties: [
                        {
                            property_id: 11543,
                            value: "Suspenso"
                        },
                        {
                            property_id: 11549,
                            value: user.email
                        },
                        {
                            property_id: 11623,
                            value: lat
                        },
                        {
                            property_id: 11625,
                            value: long
                        },
                        {
                            property_id: 11627,
                            value: nrPart
                        },
                        {
                            property_id: 11632,
                            value: initTime
                        },
                        {
                            property_id: 11633,
                            value: endTime
                        },
                        {
                            property_id: 11634,
                            value: address
                        },
                        {
                            property_id: 11640,
                            value: municipio
                        },
                        {
                            property_id: 12774,
                            value: pacote
                        }
                    ],
                }
                moloni.products('insert', params, function (error, result) {
                    if (error) {
                        console.log(error)
                        res.status(400).send({ error: error });
                    } else {
                        res.status(200).send(result);
                    }
                })
            })
        }).catch(error => {
            console.log(error);
            res.status(500).send({ error: error })
            res.end();
        })
    }).catch(error => {
        console.log(error);
        res.redirect("/login");
    })
}
exports.adminAccept = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();
    let status;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin) {
            if (accept === 'true') { status = 'Pendente' } else { status = 'Rejeitado' }
            moloni.products('getOne', { company_id: company_id, product_id: eventId }, function (error, result) {
                var params = {
                    company_id: company_id,
                    product_id: eventId,
                    category_id: 2151197,
                    type: 2,
                    price: 0.0,
                    unit_id: 1076333,
                    has_stock: 1,
                    exemption_reason: "M99",
                    stock: 1000,
                    properties: [
                        {
                            property_id: 11542,
                            value: status
                        },
                        {
                            property_id: 11549,
                            value: result.properties[1].value
                        },
                        {
                            property_id: 11623,
                            value: result.properties[2].value
                        },
                        {
                            property_id: 11625,
                            value: result.properties[3].value
                        },
                        {
                            property_id: 11627,
                            value: result.properties[4].value
                        },
                        {
                            property_id: 11632,
                            value: result.properties[5].value
                        },
                        {
                            property_id: 11633,
                            value: result.properties[6].value
                        },
                        {
                            property_id: 11634,
                            value: result.properties[7].value
                        },
                        {
                            property_id: 11640,
                            value: result.properties[8].value
                        },
                        {
                            property_id: 11847,
                            value: result.properties[9].value
                        }
                    ],
                }
                moloni.products('update', params, function (error, result2) {
                    if (error) {
                        console.log(error)
                        res.status(400).send({ error: error });
                    } else {
                        res.status(200).send(result2);
                    }
                })

                if (error) res.status(400).send({ error: error });
            })
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}
exports.camaraAccept = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    var eventId = req.sanitize('eventId').escape();
    var accept = req.sanitize('accept').escape();
    let status;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.admin || decodedClaims.camara) {
            if (accept === 'true') { status = 'Aceite' } else { status = 'Rejeitado' }
            moloni.products('getOne', { company_id: company_id, product_id: eventId }, function (error, result) {
                var params = {
                    company_id: company_id,
                    product_id: eventId,
                    category_id: 2151197,
                    type: 2,
                    price: 0.0,
                    unit_id: 1076333,
                    has_stock: 1,
                    exemption_reason: "M99",
                    stock: 1000,
                    properties: [
                        {
                            property_id: 11543,
                            value: status
                        },
                        {
                            property_id: 11549,
                            value: result.properties[1].value
                        },
                        {
                            property_id: 11623,
                            value: result.properties[2].value
                        },
                        {
                            property_id: 11625,
                            value: result.properties[3].value
                        },
                        {
                            property_id: 11627,
                            value: result.properties[4].value
                        },
                        {
                            property_id: 11632,
                            value: result.properties[5].value
                        },
                        {
                            property_id: 11633,
                            value: result.properties[6].value
                        },
                        {
                            property_id: 11634,
                            value: result.properties[7].value
                        },
                        {
                            property_id: 11640,
                            value: result.properties[8].value
                        },
                        {
                            property_id: 11847,
                            value: result.properties[9].value
                        }
                    ],
                }
                moloni.products('update', params, function (error, result2) {
                    if (error) {
                        console.log(error)
                        res.status(400).send({ error: error });
                    } else {
                        if (status == 'Aceite') {
                            res.redirect('/package/verify');
                        }
                        //res.status(200).send(result2);
                    }
                })
                if (error) res.status(400).send({ error: error });
            })
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}
exports.camaraEvents = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.camara) {
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                moloni.products('getAll', { company_id: company_id }, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                        res.end();
                    } else {
                        let obj = [];
                        result.forEach(product => {
                            if (user.displayName.includes(product.properties[8].value)) {
                                obj.push(product);
                            }
                        });
                        res.status(200).send(obj);
                        res.end();
                    }
                })
            }).catch(error => {
                console.log(error)
                res.status(500).send(error);
                res.end();
            })
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        res.redirect('/denied');
        res.end();
    })
}
exports.userEvents = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.empresa) {
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                moloni.products('getAll', { company_id: company_id }, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                        res.end();
                    } else {
                        let obj = [];
                        result.forEach(product => {
                            if (product.properties[1].value === user.email) {
                                obj.push(product);
                            }
                        });
                        res.status(200).send(obj);
                        res.end();
                    }
                })
            }).catch(error => {
                console.log(error)
                res.status(500).send(error);
                res.end();
            })
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        res.redirect('/denied');
        res.end();
    })
}
exports.acceptedEvents = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.empresa) {
            adminFb.auth().getUser(decodedClaims.uid).then(user => {
                moloni.products('getAll', { company_id: company_id }, function (error, result) {
                    if (error) {
                        console.log(error);
                        res.status(400).send(error);
                        res.end();
                    } else {
                        let resp = [];
                        result.forEach(product => {
                            if (product.properties[0].value === 'Aceite') {
                                let obj = {
                                    name: product.name,
                                    initDate: product.properties[5].value,
                                    endDate: product.properties[6].value
                                }
                                resp.push(obj);
                            }
                        });
                        res.status(200).send(resp);
                        res.end();
                    }
                })
            }).catch(error => {
                console.log(error)
                res.status(500).send(error);
                res.end();
            })
        }
        else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        res.redirect('/denied');
        res.end();
    })
}
exports.colab = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var url_faces = req.body.url_faces;

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(async decodedClaims => {
        if (decodedClaims.camara) {

            var options = {
                url: url_faces,
                method: "get",
                encoding: null
            };
            request(options, async function (error, response, body) {
                if (error) {
                    console.error('error:', error);
                } else {
                    console.log('Response: StatusCode:', response && response.statusCode);
                    console.log('Response: Body: Length: %d. Is buffer: %s', body.length, (body instanceof Buffer));
                    fs.writeFileSync('test.jpg', body);

                    const [result] = await client.faceDetection(url_faces);
                    const faces = result.faceAnnotations;

                    const outputFile = 'output.png';
                    const { promisify } = require('util');
                    const Canvas = require('canvas');
                    const readFile = promisify(fs.readFile);
                    const image = await readFile('test.jpg');
                    const Image = Canvas.Image;

                    // Open the original image into a canvas
                    const img = new Image();
                    img.src = image;
                    const canvas = new Canvas.Canvas(img.width, img.height);
                    const context = canvas.getContext('2d');
                    context.drawImage(img, 0, 0, img.width, img.height);

                    // Now draw boxes around all the faces
                    context.strokeStyle = 'rgba(0,255,0,0.8)';
                    context.lineWidth = '5';

                    faces.forEach(face => {
                        context.beginPath();
                        let origX = 0;
                        let origY = 0;
                        face.boundingPoly.vertices.forEach((bounds, i) => {
                            if (i === 0) {
                                origX = bounds.x;
                                origY = bounds.y;
                            }
                            context.lineTo(bounds.x, bounds.y);
                        });
                        context.lineTo(origX, origY);
                        context.stroke();
                        context
                    });

                    // Write the result to a file
                    console.log(`Processando resultado para ${outputFile}`);
                    const writeStream = fs.createWriteStream(outputFile);
                    const pngStream = canvas.pngStream();

                    await new Promise((resolve, reject) => {
                        pngStream
                            .on('data', chunk => writeStream.write(chunk))
                            .on('error', reject)
                            .on('end', resolve);
                    });

                    canvas.toBuffer(function (err, rest) {
                        var filename = 'output';
                        filename = encodeURIComponent(filename) + '.png';
                        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
                        res.setHeader('Content-type', 'application/png');
                        res.write(rest);
                        res.end();
                    });
                }
            });
        } else {
            console.log(error)
            res.send(error);
        }
    }).catch((error) => {
        console.log(error)
        res.send(error);
    })
}
exports.nrcolab = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    var url_faces = req.body.url_faces;
    adminFb.auth().verifySessionCookie(sessionCookie, true).then(async decodedClaims => {
        if (decodedClaims.camara) {
            const [result] = await client.faceDetection(url_faces);
            const faces = result.faceAnnotations;
            const length = faces.length;
            res.status(200).send({ faces: length });
            res.end();
        } else {
            console.log(error);
            res.send(error);
        }
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })
}
exports.handlePdf = function (req, res, err) {
    var sessionCookie = req.cookies.session || '';
    const eventId = req.sanitize('eventId').escape();

    var data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.empresa || decodedClaims.camara) {

            moloni.products('getOne', { company_id: company_id, product_id: eventId }, function (error, result) {

                var datainicial = result.properties[5].value.replace("&#x2F;", "/")
                var res = datainicial.split("/");
                var diai = res[0],
                    mesi = res[1],
                    anoi = res[2];

                var templateData = {
                    data: {
                        nrEvent: eventId,
                        empresa: result.properties[1].value,
                        data: diaF+"/"+mesF+"/"+anoF,
                        municipio: result.properties[8].value,
                        tipoEvento: result.name,
                        diai: diai,
                        mesi: mesi,
                        anoi: anoi,
                        local: result.properties[7].value,
                        pack: 'PSP, OLA, NICE',
                        dia: diaF,
                        mes: mesF,
                        ano: anoF
                    }
                };

                const content = mustache.render(authDocument.templateStructure, templateData);
                var options = { format: 'Letter' };
                htmlPdf.create(content, options).toBuffer(function (err, rest) {
                    var filename = 'testfile-test';
                    filename = encodeURIComponent(filename) + '.pdf'
                    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
                    res.setHeader('Content-type', 'application/pdf')
                    res.write(rest);
                    res.end();
                });

                if (error) res.status(400).send({ error: error });
            })
        } else {
            res.redirect('/denied');
            res.end();
        }
    }).catch(error => {
        console.log(error);
        res.redirect('/denied');
        res.end();
    })
}