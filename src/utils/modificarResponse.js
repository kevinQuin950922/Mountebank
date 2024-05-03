const request = JSON.parse(process.env.MB_REQUEST);
const response = JSON.parse(process.env.MB_RESPONSE);
const dateFns = require('date-fns');

const fechaActual=new Date();
const fechaRegistro=dateFns.format(fechaActual, "yyyy-MM-dd'T'HH:mm:ss.SSSSS'Z'");
const fechaDesde=dateFns.format(fechaActual, "yyyy-MM-dd'T'HH:mm:ss.SSSSS'Z'");
const minutosAnticipado=parseInt(JSON.parse(request.body)["minutosAnticipado"]);
const fechaHasta= dateFns.format(fechaActual.setMinutes(minutosAnticipado+fechaActual.getMinutes()), "yyyy-MM-dd'T'HH:mm:ss.SSSSS'Z'");


response.body=response.body.replace("${FECHAREGISTRO}",fechaRegistro);
response.body=response.body.replace("${FECHADESDE}",fechaDesde);
response.body=response.body.replace("${FECHAHASTA}",fechaHasta);
console.log(JSON.stringify(response));


