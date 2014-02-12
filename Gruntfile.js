'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
		options: {
		// define a string to put between each file in the concatenated output
			separator: ';'
		},
		dist: {
		// the files to concatenate
			src: ['js/*.js'],
		// the location of the resulting JS file
			dest: 'js/concat.js'
		}
	},

	uglify: {
		options: {
			// the banner is inserted at the top of the output
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		},
		dist: {
			files: {
			'js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		}
	},

	uncss: {
		dist: {
			files: {
				'css/tidy.css': ['index.html']
			}
		},
		options: {
			compress: true
		}
	}	

  });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-jshint');
	// grunt.loadNpmTasks('grunt-contrib-qunit');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-uncss');
	grunt.registerTask('default', ['concat', 'uglify', 'uncss']);

};