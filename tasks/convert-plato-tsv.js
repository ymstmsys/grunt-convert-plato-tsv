var fs = require('fs');
var path = require('path');
var summary = require('./lib/summary');
var functions = require('./lib/functions');

module.exports = function(grunt) {
  grunt.registerMultiTask('convert-plato-tsv', 'Convert plato report to tsv.', function() {
    var options = this.options();
    var plato = options.plato;
    var output = options.output;
    var ext = options.ext;
    var newline = options.newline;
    var locale = options.locale;
    var headerOptions = options.header;

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

    // Prepare Options
    if (!ext) {
      ext = 'tsv';
    }
    if (!newline) {
      newline = require('os').EOL;
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
    if (headerOptions) {
      for ( var attr in headerOptions) {
        if (headerOptions.hasOwnProperty(attr)) {
          header[attr] = headerOptions[attr];
        }
      }
    }

    // Summary
    var summaryFile = path.join(output, 'summary.' + ext);
    var modules = summary.convert(plato, header, newline, summaryFile);

    // Functions
    var functionsFile = path.join(output, 'functions.' + ext);
    functions.convert(plato, header, newline, modules, functionsFile);
  });
};
