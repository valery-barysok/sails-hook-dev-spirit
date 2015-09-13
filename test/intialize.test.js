'use strict';

var should = require('should');
var Sails = require('sails').Sails;

describe('dev-spirit hook', function () {

  var app;

  it('should initialize', function (done) {
    app = new Sails();
    app.load({
      globals: false,
      hooks: {
        'dev-spirit': require('../')
      },
      loadHooks: [
        'moduleloader',
        'userconfig',
        'dev-spirit'
      ]
    }, done);
  });
});
