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


## Output

### summary.tsv

Output metrics per module.

### functions.tsv

Output metrics per function.
