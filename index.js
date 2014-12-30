/**
* @module ratbird
*/

var Notifier = require('./lib/notifier');
var through = require('through');
var blindfold = require('blindfold');

module.exports.createNotifier = function(config) {
  return new Notifier(config);
};

module.exports.createDispatchStream = function(config) {
  if (!config.preferencesPath) {
    throw new Error('Cannot create astream without `preferencePath`');
  }

  var notifier = new Notifier(config);

  return through(function(activity) {
    var prefs = blindfold(activity, config.preferencesPath);

    if (!prefs) {
      return this.queue(activity);
    }

    notifier.dispatch(activity, prefs);
    this.queue(notifier._populateContent(activity));
  });
};

module.exports.Notifier = Notifier;
