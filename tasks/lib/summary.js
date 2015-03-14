var fs = require('fs');
var path = require('path');

module.exports.convert = function(platoDir, header, summaryFile) {
  // Header
  var summaryHeader = [];
  summaryHeader.push(header.module);
  summaryHeader.push(header.maintainability);
  summaryHeader.push(header.slocPhysical);
  summaryHeader.push(header.slocLogical);
  summaryHeader.push(header.cyclomaticComplexity);
  summaryHeader.push(header.cyclomaticDensity);
  summaryHeader.push(header.halsteadLength);
  summaryHeader.push(header.halsteadVocabulary);
  summaryHeader.push(header.halsteadDifficulty);
  summaryHeader.push(header.halsteadVolume);
  summaryHeader.push(header.halsteadEffort);
  summaryHeader.push(header.halsteadBugs);

  fs.writeFileSync(summaryFile, summaryHeader.join('\t') + '\n');

  // Report
  var summaryJson = fs.readFileSync(path.join(platoDir, 'report.json'), {
    encoding : 'utf8'
  });
  var summary = JSON.parse(summaryJson);

  var modules = [];

  summary.reports.forEach(function(report) {
    var value = [];
    value.push(report.complexity.module);
    value.push(report.complexity.maintainability);
    value.push(report.complexity.aggregate.sloc.physical);
    value.push(report.complexity.aggregate.sloc.logical);
    value.push(report.complexity.aggregate.cyclomatic);
    value.push(report.complexity.aggregate.cyclomaticDensity);
    value.push(report.complexity.aggregate.halstead.length);
    value.push(report.complexity.aggregate.halstead.vocabulary);
    value.push(report.complexity.aggregate.halstead.difficulty);
    value.push(report.complexity.aggregate.halstead.volume);
    value.push(report.complexity.aggregate.halstead.effort);
    value.push(report.complexity.aggregate.halstead.bugs);

    fs.appendFileSync(summaryFile, value.join('\t') + '\n');

    modules.push(report.complexity.module);
  });

  return modules;
};
