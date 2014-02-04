var default_reqfmt = null;
var default_resfmt = null;

module.exports.logger = function (options) {
  options = options || {};

  var reqfmt = options.reqfmt;
  if (!reqfmt) {
    var reqtpl = options.reqtpl;
    if (!reqtpl) {
      if (!default_reqfmt) {
        default_reqfmt = require('dot').template(require('curly-colors')('<{magenta>{{=it.name}}<}> << <{yellow>{{=it.method}}<}> {{=it.path}}{{? it.data}} {{=JSON.stringify(it.data, undefined, 2)}}{{?}}'));
      }
      reqfmt = default_reqfmt;
    } else {
      reqfmt = require('dot').template(require('curly-colors')(reqtpl));
    }
  }

  var resfmt = options.resfmt;
  if (!resfmt) {
    var restpl = options.restpl;
    if (!restpl) {
      if (!default_resfmt) {
        default_resfmt = require('dot').template(require('curly-colors')('<{magenta>{{=it.req.options.name}}<}> >> <{yellow>{{=it.req.method}}<}> {{=it.req.path}} {{? it.res.statusCode <= 299}}<{green>{{=it.res.statusCode}}<}>{{??}}<{red>{{=it.res.statusCode}}<}>{{?}}{{? it.res.data}} {{=JSON.stringify(it.res.data, undefined, 2)}}{{?}}'));
      }
      resfmt = default_resfmt;
    } else {
      resfmt = require('dot').template(require('curly-colors')(restpl));
    }
  }

  var log = options.log || console.log;

  return {
    before: function (options, next) {
      log(reqfmt(options));
      return next();
    },
    after: function (req, res, next) {
      log(resfmt({ req: req, res: res }));
      return next();
    }
  };
};

