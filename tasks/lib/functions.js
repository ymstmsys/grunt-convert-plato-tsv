var fs = require('fs');
var path = require('path');

module.exports.convert = function(platoDir, header, newline, modules, functionsFile) {
  // Header
  var functionsHeader = [];
  functionsHeader.push(header.module);
  functionsHeader.push(header.name);
  functionsHeader.push(header.line);
  functionsHeader.push(header.slocPhysical);
  functionsHeader.push(header.slocLogical);
  functionsHeader.push(header.parameterCount);
  functionsHeader.push(header.cyclomaticComplexity);
  functionsHeader.push(header.cyclomaticDensity);
  functionsHeader.push(header.halsteadLength);
  functionsHeader.push(header.halsteadVocabulary);
  functionsHeader.push(header.halsteadDifficulty);
  functionsHeader.push(header.halsteadVolume);
  functionsHeader.push(header.halsteadEffort);
  functionsHeader.push(header.halsteadBugs);

  fs.writeFileSync(functionsFile, functionsHeader.join('\t') + newline);

  // Reports
  var fileDirs = fs.readdirSync(path.join(platoDir, 'files'));
  fileDirs.forEach(function(fileDir) {
    var functionsJson = fs.readFileSync(path.join(platoDir, 'files', fileDir, 'report.json'), {
      encoding : 'utf8'
    });
    var functions = JSON.parse(functionsJson);

    var module = functions.complexity.module;

    if (modules.indexOf(module) === -1) {
      return;
    }

    // Report
    functions.complexity.functions.forEach(function(f) {
      var value = [];
      value.push(module);
      value.push(f.name);
      value.push(f.line);
      value.push(f.sloc.physical);
      value.push(f.sloc.logical);
      value.push(f.params);
      value.push(f.cyclomatic);
      value.push(f.cyclomaticDensity ? f.cyclomaticDensity : 0);
      value.push(f.halstead.length);
      value.push(f.halstead.vocabulary);
      value.push(f.halstead.difficulty);
      value.push(f.halstead.volume);
      value.push(f.halstead.effort);
      value.push(f.halstead.bugs);

      fs.appendFileSync(functionsFile, value.join('\t') + newline);
    });
  });
};
