# grunt-convert-plato-tsv

## Overview

Convert [plato](https://github.com/es-analysis/plato) report to TSV (Tab Separated Values) format report.

This suits to quality evaluation in Excel.

## Usage

Before run "convert-plato-tsv" task, you should run "plato" task.

```js
grunt.initConfig({
  plato : {
    target : {
      files : {
        'PLATO_REPORT_DIRECTORY' : [ 'src/*.js' ]
      }
    } 
  },
  "convert-plato-tsv" : {
    target : {
      options : {
        plato : 'PLATO_REPORT_DIRECTORY',
        output : 'PLATO_TSV_REPORT_DIRECTORY'
      }
    }
  }
});

grunt.loadNpmTasks('grunt-plato');
grunt.loadNpmTasks('grunt-convert-plato-tsv');
grunt.registerTask('default', ['plato', 'convert-plato-tsv']);
```


## Options

### plato

Type: String  
Default: undefined (Must be set)

Plato report directory.

### output

Type: String  
Default: undefined (Must be set)

TSV report directory.

### ext

Type: String
Default: 'tsv'

Extention of TSV report file.

### newline

Type: String  
Default: depend on operating system

NewLine character. For example: '\n', '\r', '\r\n'

### locale

Type: String  
Default: 'en'

Locale of TSV header line.
Support the following locale.

* en (English) (default)
* ja (Japanese)

### header

Type: Object  
Default: undefined

Set any header names.
This option is prior to locale option.

For example:
```
header: {
  module : 'Module',
  name : 'Name',
  line : 'Line',
  maintainability : 'Maintainability',
  slocPhysical : 'Physical SLOC',
  slocLogical : 'Logical SLOC',
  parameterCount : 'Parameter Count',
  cyclomaticComplexity : 'Cyclomatic Complexity',
  cyclomaticDensity : 'Cyclomatic Density',
  halsteadLength : 'Halstead Length',
  halsteadVocabulary : 'Halstead Vocabulary',
  halsteadDifficulty : 'Halstead Difficulty',
  halsteadVolume : 'Halstead Volume',
  halsteadEffort : 'Halstead Effort',
  halsteadBugs : 'Halstead Bugs'
}
```


## Output

### summary.tsv

Output metrics per module.

### functions.tsv

Output metrics per function.
