module.exports = function( grunt ) {

	// Project configuration
	grunt.initConfig( {
		pkg:    grunt.file.readJSON( 'package.json' ),
		concat: {
			options: {
				stripBanners: true,
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			global: {
				src: [
					'public/javascript/lib/global.js',
					'public/javascript/lib/signatureheatmap.js'
				],
				dest: 'public/javascript/lib/combined.js'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'public/javascripts/**/*.js',
				'public/javascripts/test/**/*.js'
			],
			options: {
				curly:   true,
				eqeqeq:  true,
				immed:   true,
				latedef: true,
				newcap:  true,
				noarg:   true,
				sub:     true,
				undef:   true,
				boss:    true,
				eqnull:  true,
				browser: true,
				devel: true,
				globals: {
					exports: true,
					module:  false
				},
				jquery:  true
			}
		},
		uglify: {
			all: {
				files: {
					'public/javascript/lib/combined.min.js': ['public/javascript/lib/combined.js']
				},
				options: {
					banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
						' * <%= pkg.homepage %>\n' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' * Licensed GPLv2+' +
						' */\n',
					mangle: {
						except: ['jQuery']
					}
				}
			}
		},
		test:   {
			files: ['public/javascripts/test/**/*.js']
		},

		sass:   {
			all: {
				files: {
					'public/stylesheets/style.css': 'public/stylesheets/style.scss'
				}
			}
		},

		cssmin: {
			options: {
				banner: '/*! <%= pkg.title %> - v<%= pkg.version %>\n' +
					' * <%= pkg.homepage %>\n' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
					' * Licensed GPLv2+' +
					' */\n'
			},
			minify: {
				expand: true,

				cwd: 'public/stylesheets/',
				src: ['style.css'],

				dest: 'public/stylesheets/',
				ext: '.min.css'
			}
		},
		watch:  {

			sass: {
				files: ['public/stylesheets/*.scss'],
				tasks: ['sass', 'cssmin'],
				options: {
					debounceDelay: 500
				}
			},

			scripts: {
				files: ['public/javascripts/**/*.js'],
				tasks: ['jshint', 'concat', 'uglify'],
				options: {
					debounceDelay: 500
				}
			}
		},
		clean: {
			main: ['release/<%= pkg.version %>']
		},
		copy: {
			// Copy the plugin to a versioned release directory
			main: {
				src:  [
					'**',
					'!node_modules/**',
					'!release/**',
					'!.git/**',
					'!.sass-cache/**',
					'!css/src/**',
					'!js/src/**',
					'!img/src/**',
					'!Gruntfile.js',
					'!package.json',
					'!.gitignore',
					'!.gitmodules'
				],
				dest: 'release/<%= pkg.version %>/'
			}
		},
		compress: {
			main: {
				options: {
					mode: 'zip',
					archive: './release/govapi.<%= pkg.version %>.zip'
				},
				expand: true,
				cwd: 'release/<%= pkg.version %>/',
				src: ['**/*'],
				dest: 'govapi/'
			}
		}
	} );

	// Load other tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');

	// Default task.

	grunt.registerTask( 'default', ['jshint', 'concat', 'uglify', 'sass', 'cssmin'] );

	grunt.registerTask( 'build', ['default', 'clean', 'copy', 'compress'] );

	grunt.util.linefeed = '\n';
};
