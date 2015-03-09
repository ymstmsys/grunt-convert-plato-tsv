var fs = require('fs');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('convert-plato-tsv', 'Convert plato report to tsv.', function() {
    var options = this.options();
    var plato = options.plato;
    var output = options.output;

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

    // Summary
    var summaryFile = path.join(output, 'summary.tsv');
    var summaryHeader = [ 'Module', 'Maintainability', 'Physical SLOC', 'Logical SLOC', 'Cyclomatic Complexity',
        'Cyclomatic Density', 'Halstead Length', 'Halstead Difficulty', 'Halstead Volume', 'Halstead Effort',
        'Halstead Bugs' ];
    fs.writeFileSync(summaryFile, summaryHeader.join('\t') + '\n');

    var summaryJson = fs.readFileSync(path.join(plato, 'report.json'), {
      encoding : 'utf8'
    });
    var summary = JSON.parse(summaryJson);

    summary.reports.forEach(function(report) {
      var module = report.complexity.module;
      var maintainability = report.complexity.maintainability;
      var slocPhysical = report.complexity.aggregate.sloc.physical;
      var slocLogical = report.complexity.aggregate.sloc.logical;
      var cyclomatic = report.complexity.aggregate.cyclomatic;
      var cyclomaticDensity = report.complexity.aggregate.cyclomaticDensity;
      var halsteadLength = report.complexity.aggregate.halstead.length;
      var halsteadDifficulty = report.complexity.aggregate.halstead.difficulty;
      var halsteadVolume = report.complexity.aggregate.halstead.volume;
      var halsteadEffort = report.complexity.aggregate.halstead.effort;
      var halsteadBugs = report.complexity.aggregate.halstead.bugs;

      var value = [ module, maintainability, slocPhysical, slocLogical, cyclomatic, cyclomaticDensity, halsteadLength,
          halsteadDifficulty, halsteadVolume, halsteadEffort, halsteadBugs ];
      fs.appendFileSync(summaryFile, value.join('\t') + '\n');
    });

    // Function
    var functionFile = path.join(output, 'functions.tsv');
    var functionHeader = [ 'Module', 'Name', 'Line', 'Physical SLOC', 'Logical SLOC', 'Parameter Count',
        'Cyclomatic Complexity', 'Cyclomatic Density', 'Halstead Length', 'Halstead Difficulty', 'Halstead Volume',
        'Halstead Effort', 'Halstead Bugs' ];
    fs.writeFileSync(functionFile, functionHeader.join('\t') + '\n');

    var fileDirs = fs.readdirSync(path.join(plato, 'files'));
    fileDirs.forEach(function(fileDir) {
      var functionsJson = fs.readFileSync(path.join(plato, 'files', fileDir, 'report.json'), {
        encoding : 'utf8'
      });
      var functions = JSON.parse(functionsJson);

      var module = functions.complexity.module;

      functions.complexity.functions.forEach(function(f) {
        var name = f.name;
        var line = f.line;
        var slocPhysical = f.sloc.physical;
        var slocLogical = f.sloc.logical;
        var params = f.params;
        var cyclomatic = f.cyclomatic;
        var cyclomaticDensity = f.cyclomaticDensity;
        var halsteadLength = f.halstead.length;
        var halsteadDifficulty = f.halstead.difficulty;
        var halsteadVolume = f.halstead.volume;
        var halsteadEffort = f.halstead.effort;
        var halsteadBugs = f.halstead.bugs;

        cyclomaticDensity = cyclomaticDensity ? cyclomaticDensity : 0;

        var value = [ module, name, line, slocPhysical, slocLogical, params, cyclomatic, cyclomaticDensity,
            halsteadLength, halsteadDifficulty, halsteadVolume, halsteadEffort, halsteadBugs ];
        fs.appendFileSync(functionFile, value.join('\t') + '\n');
      });
    });
  });
};
