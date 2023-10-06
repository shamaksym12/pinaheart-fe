const next = require('next')
const routes = require('./routes')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handler = routes.getRequestHandler(app);
const { join } = require('path')
const compression = require('compression')

const express = require('express')
var http = require('http');
var https = require('https');

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

app.prepare().then(() => {
	const server = express();
    server.use(compression({level: 9}))
    // server.get('/index.js', function (req, res) {
    //     res.setHeader('Cache-Control', 'public, max-age=86400');
    //     res.render('index.js');
    // });
    server.use('/policy.html', express.static(join(__dirname, '/static/policy.html')));
	server.use(handler).listen(3000)
});

require('laravel-echo-server').run({
    // authHost: 'https://www.pinaheart.com', //'http://pina',
    // host: 'api.pinaheart.com',
    authHost: 'https://api.pinaheart.com/', //'https://api.pinaheart.com/',
    authEndpoint: '/broadcasting/auth',
    secure: true,
    protocol: 'https',
    sslCertPath: '/etc/ssl/certs/STAR_pinaheart_com.crt',
    sslKeyPath: '/etc/ssl/private/STAR_pinaheart_com.pem',
    sslCertChainPath: '/etc/ssl/certs/STAR_pinaheart_com.ca-bundle',
    devMode: true,
    database: "redis",
    databaseConfig: {
        redis: {
            host: '127.0.0.1',
            port: 6379,
        }
    },
    // apiOriginAllow: {
    //     "allowCors" : true,
    //     "allowOrigin" : "http://127.0.0.1",
    //     "allowMethods" : "GET, POST",
    //     "allowHeaders" : "Origin, Content-Type, X-Auth-Token, X-Requested-With, Accept, Authorization, X-CSRF-TOKEN, X-Socket-Id"
    // },
 });
 
