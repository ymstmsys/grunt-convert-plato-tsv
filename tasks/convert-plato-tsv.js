var fs = require('fs');
var path = require('path');
var summary = require('./lib/summary');
var functions = require('./lib/functions');

module.exports = function(grunt) {
  grunt.registerMultiTask('convert-plato-tsv', 'Convert plato report to tsv.', function() {
    var options = this.options();
    var plato = options.plato;
    var output = options.output;
    var locale = options.locale;

    // Check plato directory
    if (!plato) {
      grunt.fail.fatal('Option \'plato\' is missing.');
      return;
    }
    if (!fs.existsSync(plato)) {
      grunt.fail.fatal('\'' + plato + '\' directory not exists.');
      return;
    }

    // Create output directory
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    // Header
    var header;
    if (locale) {
      try {
        header = require('./header/' + locale);
      } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
          throw e;
        }
      }
    }
    if (!header) {
      header = require('./header/en');
    }

    // Summary
    var summaryFile = path.join(output, 'summary.tsv');
    var modules = summary.convert(plato, header, summaryFile);

    // Functions
    var functionsFile = path.join(output, 'functions.tsv');
    functions.convert(plato, header, modules, functionsFile);
  });
};
