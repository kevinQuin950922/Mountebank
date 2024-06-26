const fetch = require('node-fetch')
const settings = require('./settings.js');

function postImposter(body) {
    const url = `http://0.0.0.0:${settings.port}/imposters`;

    return fetch(url, {
                    method:'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
}

module.exports = { postImposter };