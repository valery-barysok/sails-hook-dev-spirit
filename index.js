'use strict';

var Q = require('q');
var _ = require('lodash');
var prettyBytes = require('pretty-bytes');
var fs = require('fs-extra');
var path = require('path');
var jsonCycle = require('json-cycle');

/**
 * sails-hook-dev-spirit hook
 *
 * Backend helpers that're only for development.
 *
 * @param  {App} sails
 * @return {Object}
 * @hook
 */

var hook = function (sails) {

  return {

    defaults: {

      __configKey__: {}
    },

    initialize: function (cb) {
      return cb();
    },

    routes: {

      before: {

        'get /dev': function (req, res) {
          if (process.env.NODE_ENV === 'production') {
            return res.notFound();
          }
          return res.send('' +
              '<h1>Runtime reference info</h1>' + '<br/>' +
              '<em>development only</em>' + '<br/>' +
              '<br/>' + '<br/>' +
              '<a href="/dev/routes">See all routes</a>' + '<br/>' +
              '<a href="/dev/session">See current user session</a>' + '<br/>' +
              '<a href="/dev/memory">See current memory usage</a>' + '<br/>' +
              '<a href="/dev/dependencies">See actual versions of node_module dependencies</a>' + '<br/>' +
              '<a href="/dev/config">See whole Sails configuration</a>' + '<br/>' +
              '<a href="/dev/env">See loaded Environment variables</a>' + '<br/>' +
              '<form method="post" action="/dev/gc"><button type="submit">Garbage collect</button></form>' +
              '');
        },

        '/dev/*': function (req, res, next) {
          if (process.env.NODE_ENV === 'production') {
            return res.notFound();
          }
          return next();
        },

        'get /dev/routes': function (req, res) {
          return res.json(sails.config.routes);
        },

        'get /dev/session': function (req, res) {
          return res.json(req.session);
        },

        'post /dev/gc': function (req, res) {
          if (!global.gc) {
            return res.send('gc() not exposed.  Try lifting your app via \'node --expose-gc app.js\'.');
          }
          var before = process.memoryUsage();
          global.gc();
          var after = process.memoryUsage();
          var diff = {
            rss: before.rss - after.rss,
            heapTotal: before.heapTotal - after.heapTotal,
            heapUsed: before.heapUsed - after.heapUsed
          };
          return res.json({Before: prettifyObject(before), After: prettifyObject(after), Diff: prettifyObject(diff)});
        },

        'get /dev/env': function (req, res) {
          return res.json(process.env);
        },

        'get /dev/config': function (req, res) {
          return res.json(jsonCycle.decycle(sails.config));
        },

        'get /dev/memory': function (req, res) {
          return res.json(prettifyObject(process.memoryUsage()));
        },

        'get /dev/dependencies': function (req, res) {
          Q.nfcall(fs.readJson, path.resolve(sails.config.appPath, 'package.json'), "utf-8")
              .then(function (json) {
                Q.all(_.map(json.dependencies, function (semverRange, depName) {
                      return Q.nfcall(fs.readJson, path.resolve(sails.config.appPath, path.join('node_modules', depName, 'package.json')), "utf-8")
                          .then(function (json) {
                            return [depName, json.version + (semverRange !== json.version ? ' (package.json version: ' + semverRange + ')' : '')];
                          })
                    }))
                    .catch(function (err) {
                      return res.serverError(err);
                    })
                    .done(function (deps) {
                      return res.json(_.zipObject(deps));
                    });
              });
        }
      }
    }
  };
};

hook.configKey = 'dev';

module.exports = hook;

function prettifyObject(memoryUsage) {
  memoryUsage.residentSetSize = memoryUsage.rss + ' B (' + prettyBytes(memoryUsage.rss) + ')';
  delete memoryUsage.rss;
  memoryUsage.heapTotal = memoryUsage.heapTotal + ' B (' + prettyBytes(memoryUsage.heapTotal) + ')';
  memoryUsage.heapUsed = memoryUsage.heapUsed + ' B (' + prettyBytes(memoryUsage.heapUsed) + ')';
  return memoryUsage;
}