RestC - Log
===========

Install
-------

    npm install restc-log

Usage
-----

    var logger = require('restc-log').logger();

    var client = restc(
      {
        name: 'HELLO',
        port: 1337
      },
      logger
    );

    client.get('/', function (err, req, res, data) {
      /* ... */
    });

will log

    HELLO << GET /
    HELLO >> GET / 200 "Hello World"

the `logger` factory accepts the following options

* `reqfmt` : request formatter (e.g. `function (options) { return /* ... */; }`)
* `reqtpl` : _doT_ / _curly-colors_ template to use to generate `reqfmt` when not provided
* `resfmt` : response formatter (e.g. `function ({ req: req, res: res }) { return /* ... */; }`)
* `restpl` : _doT_ / _curly-colors_ template to use to generate `resfmt` when not provided
* `log` : synchronous log function (default: `console.log`)

default `reqtpl` and `restpl` are respectively

    '<{magenta>{{=it.name}}<}> << <{yellow>{{=it.method}}<}> {{=it.path}}{{? it.body}} {{=JSON.stringify(it.body, undefined, 2)}}{{?}}'

and

    '<{magenta>{{=it.req.options.name}}<}> >> <{yellow>{{=it.req.method}}<}> {{=it.req.path}} {{? it.res.statusCode <= 299}}<{green>{{=it.res.statusCode}}<}>{{??}}<{red>{{=it.res.statusCode}}<}>{{?}}{{? it.res.body}} {{=JSON.stringify(it.res.body, undefined, 2)}}{{?}}'

