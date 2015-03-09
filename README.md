# grunt-convert-plato-tsv

## Usage

Before run "convert-plato-tsv" task, you should run "plato" task.

```js
grunt.initConfig({
	plato : {
		target : {
			files : {
				'plato_report_directory' : [ 'src/*.js' ]
			}
		} 
	},
	"convert-plato-tsv" : {
		target : {
			options : {
				plato : 'plato_report_directory',
				output : 'plato_tsv_report_directory'
			}
		}
	}
});

grunt.loadNpmTasks('grunt-plato');
grunt.loadNpmTasks('grunt-convert-plato-tsv');
grunt.registerTask('default', ['plato', 'convert-plato-tsv']);
```
