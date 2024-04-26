const mbHelper = require('../mountebank-helper.js');
const settings = require('../settings.js');
const respuesta = require('../fixture/response.json')

function addService() {
    const response = respuesta;
    const ingresoId=Math.floor(Math.random() * (999999 - 1000) + 1000)
    response.data.ingresoId=ingresoId;

    const stubs = [
        {
            predicates: [ {
                equals: {
                    method: "POST",
                    "path": "/zer/external/ingreso/crear"
                }
            }],
            responses: [
                {
                    is: {
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(response)
                    },
                    behaviors:[
                        {
                            copy:{
                                from:"body",
                                into:"${PLACA}",
                                using:{
                                    method:"jsonpath",
                                    selector:"$..placa"
                                }
                            }
                        },
                        {
                            copy:{
                                from:"body",
                                into:"${VALOR}",
                                using:{
                                    method:"jsonpath",
                                    selector:"$..valor"
                                }
                            }
                        },
                        { 
                            shellTransform: "node src/utils/modificarResponse.js" 
                        }
                    ]
                }
            ]
        }
    ];

    const imposter = {
        port: settings.registrar_ingreso,
        protocol: 'http',
        stubs: stubs
    };

    return mbHelper.postImposter(imposter);
}

module.exports = { addService };