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

var sendNotifications = require('./sendNotifications.js')

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
        adminFb.auth().getUser(decodedClaims.uid).then(user => {

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
            var duration = req.sanitize("duration").escape();
            let tipoEvento;

            request({
                url: 'https://identity.primaverabss.com/core/connect/token',
                method: 'POST',
                auth: {
                    user: 'ENVIRONISI', // TODO : put your application client id here
                    pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
                },
                form: {
                    'grant_type': 'client_credentials',
                    'scope': 'application',
                }
            }, function (err, result) {
                if (result) {
                    var json = JSON.parse(result.body);
                    request({
                        url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + pacote,
                        method: 'GET',
                        headers: {
                            Authorization: 'Bearer ' + json.access_token
                        },
                        json: true
                    }, function (err, result, body) {

                        var description = body.complementaryDescription;
                        var args = description.split(" | ");

                        args.forEach(element => {
                            if (element.includes("TipoEvento")) {
                                var rep = element.replace("TipoEvento: ", "");
                                tipoEvento = rep;
                            }
                        });

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
                                    },
                                    {
                                        property_id: 12850,
                                        value: duration
                                    },
                                    {
                                        property_id: 12908,
                                        value: tipoEvento
                                    }
                                ],
                            }
                            moloni.products('insert', params, function (error, result) {
                                if (error) {
                                    console.log(error)
                                    res.status(400).send({ error: "Ocorreu um erro ao criar o evento! Tente novamente!" });
                                } else {
                                    adminFb.auth().listUsers().then(userRecords => {
                                        userRecords.users.forEach(userRecord => {
                                            if (userRecord.customClaims.admin) {
                                                var msg = 'Tem um novo evento para aceitar!';
                                                sendNotifications.sendNoti(msg, user, userRecord.email, "evento");
                                            }
                                        })
                                    })
                                    res.status(200).send({ msg: result });
                                }
                            })
                        })
                    })
                }
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
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
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
                            /*{
                                property_id: 11847,
                                value: result.properties[9].value
                            },*/
                            {
                                property_id: 12774,
                                value: result.properties[9].value
                            },
                            {
                                property_id: 12850,
                                value: result.properties[10].value
                            },
                            {
                                property_id: 12908,
                                value: result.properties[11].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            adminFb.auth().listUsers().then(userRecords => {
                                userRecords.users.forEach(userRecord => {
                                    if (userRecord.displayName.includes(result.properties[8].value)) {
                                        var msg = 'Tem um novo evento para aceitar!';
                                        sendNotifications.sendNoti(msg, user, userRecord.email, "evento");
                                    }
                                })
                            })
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
        })
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
        adminFb.auth().getUser(decodedClaims.uid).then(user => {
            if (decodedClaims.admin || decodedClaims.camara) {
                if (accept === 'true') { status = 'Aceite' } else { status = 'Rejeitado' }

                var initDate = req.sanitize('initDate').escape();
                var endDate = req.sanitize('endDate').escape();

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
                                value: initDate
                            },
                            {
                                property_id: 11633,
                                value: endDate
                            },
                            {
                                property_id: 11634,
                                value: result.properties[7].value
                            },
                            {
                                property_id: 11640,
                                value: result.properties[8].value
                            },
                            /*{
                                property_id: 11847,
                                value: result.properties[9].value
                            },*/
                            {
                                property_id: 12774,
                                value: result.properties[9].value
                            },
                            {
                                property_id: 12850,
                                value: result.properties[10].value
                            },
                            {
                                property_id: 12908,
                                value: result.properties[11].value
                            }
                        ],
                    }
                    moloni.products('update', params, function (error, result2) {
                        if (error) {
                            console.log(error)
                            res.status(400).send({ error: error });
                        } else {
                            if (status == 'Aceite') {
                                adminFb.auth().getUserByEmail(result.properties[1].value).then(userRecord => {
                                    var msg = 'O seu evento ' + result.name + " foi aceite!";
                                    sendNotifications.sendNoti(msg, user, userRecord.email, "evento");
                                })
                                res.status(200).send(result2);
                            }
                        }
                    })
                    if (error) res.status(400).send({ error: error });
                })
            }
            else {
                res.redirect('/denied');
                res.end();
            }
        })
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

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (decodedClaims.empresa || decodedClaims.camara) {

            moloni.products('getOne', { company_id: company_id, product_id: eventId }, function (error, eventResult) {

                var data = new Date(),
                    dia = data.getDate().toString(),
                    diaNow = (dia.length == 1) ? '0' + dia : dia,
                    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
                    mesNow = (mes.length == 1) ? '0' + mes : mes,
                    anoNow = data.getFullYear(),
                    mesExtenso = mesNow;

                for (var i = 1; i < 13; i++) {
                    var nome = ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                    if (mesExtenso.includes(i.toString())) {
                        mesExtenso = nome[i - 1];
                    }
                }

                var datainicial = eventResult.properties[5].value.replace("&#x2F;", "/");
                datainicial = datainicial.replace("&#x2F;", "/");
                var parti = datainicial.split("/");
                var diai = parti[0],
                    mesi = parti[1],
                    anoi = parti[2];
                var datafinal = eventResult.properties[6].value.replace("&#x2F;", "/");
                datafinal = datafinal.replace("&#x2F;", "/");
                var partf = datafinal.split("/");
                var diaf = partf[0],
                    mesf = partf[1],
                    anof = partf[2];

                request({
                    url: 'https://identity.primaverabss.com/core/connect/token',
                    method: 'POST',
                    auth: {
                        user: 'ENVIRONISI', // TODO : put your application client id here
                        pass: 'c2d7e4bf-3d30-43fb-82d8-2f0e08f474dd' // TODO : put your application client secret here
                    },
                    form: {
                        'grant_type': 'client_credentials',
                        'scope': 'application',
                    }
                }, function (err, jsonKey) {
                    if (jsonKey) {

                        var json = JSON.parse(jsonKey.body);

                        request({
                            url: 'https://my.jasminsoftware.com/api/235151/235151-0001/businesscore/items/' + eventResult.properties[9].value,
                            method: 'GET',
                            headers: {
                                Authorization: 'Bearer ' + json.access_token
                            },
                            json: true
                        }, function (err, packageResult, body) {

                            var packsAut = [];
                            var packsPart = [];
                            let tipoEvento;

                            var description = body.complementaryDescription;
                            var args = description.split(" | ");

                            args.forEach(element => {
                                if (element.includes("EntidadesAutorização")) {
                                    var rep = element.replace("EntidadesAutorização: ", "");
                                    packsAut.push(rep);
                                }
                                if (element.includes("EntidadesParticipação")) {
                                    var rep = element.replace("EntidadesParticipação: ", "");
                                    packsPart.push(rep);
                                }
                                if (element.includes("TipoEvento")) {
                                    var rep = element.replace("TipoEvento: ", "");
                                    tipoEvento = rep;
                                }
                            });

                            var municipio = eventResult.properties[8].value;

                            var templateData = {
                                data: {
                                    nrEvent: eventId,
                                    empresa: eventResult.properties[1].value,
                                    dataNow: diaNow + "/" + mesNow + "/" + anoNow,
                                    municipio: municipio,
                                    tipoEvento: tipoEvento,
                                    diai: diai,
                                    mesi: mesi,
                                    anoi: anoi,
                                    diaf: diaf,
                                    mesf: mesf,
                                    anof: anof,
                                    local: eventResult.properties[7].value,
                                    pack: packsAut + ", " + packsPart,
                                    diaNow: diaNow,
                                    mesNow: mesNow,
                                    anoNow: anoNow,
                                    mesExtenso: mesExtenso,
                                    municipioUpperLetter: municipio.toUpperCase()
                                }
                            };

                            const content = mustache.render(authDocument.templateStructure, templateData);
                            var options = { format: 'Letter' };
                            htmlPdf.create(content, options).toBuffer(function (err, rest) {
                                var filename = 'testfile-test';
                                filename = encodeURIComponent(eventResult.name) + '.pdf'
                                res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
                                res.setHeader('Content-type', 'application/pdf')
                                res.write(rest);
                                res.end();
                            });
                        })
                    }
                })

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