const mb = require('mountebank')
const settings = require('./settings.js');
const helloService = require('./services/hello-service.js')
const registrar_ingreso=require('./services/registrarIngresoParquimetros.js')

const mbServerInstance = mb.create({
        port: settings.port,
        pidfile: '../mb.pid',
        logfile: '../mb.log',
        protofile: '../protofile.json',
        ipWhitelist: ['*'],
        allowInjection: true
    });

mbServerInstance.then(function() {
    helloService.addService();
    registrar_ingreso.addService();
});