	module.exports = function(grunt) {
		require('load-grunt-tasks')(grunt);

		grunt.initConfig({
			pkg: grunt.file.readJSON( 'package.json' ),
			makepot: {
				target: {
					options: {
						domainPath: '/languages',                   // Where to save the POT file.
						exclude: ['.git/.*', '.svn/.*', '.node_modules/.*', '.vendor/.*'],
						mainFile: 'anspress-question-answer.php',
						potHeaders: {
								poedit: true,                 // Includes common Poedit headers.
								'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
						},                                // Headers to add to the generated POT file.
						type: 'wp-plugin',                // Type of project (wp-plugin or wp-theme).
						updateTimestamp: true             // Whether the POT-Creation-Date should be updated without other changes.
					}
				}
			},

			addtextdomain: {
				options: {
							textdomain: 'anspress-question-answer',    // Project text domain.
							updateDomains: ['ap']  // List of text domains to replace.
					},
					target: {
							files: {
									src: [
											'*.php',
											'**/*.php',
											'!node_modules/**',
											'!tests/**',
											'!.git/.*', '!.svn/.*', '!.vendor/.*'
									]
							}
					}
			},
			phpdocumentor: {
				dist: {
					options: {
						directory : './',
						target : 'M:\wamp\www\anspress-docs\\'
					}
				}
			},
			csscomb: {
				files: ['**/*.css', '!**/node_modules/**'],
				tasks: ['csscomb'],
			},

			copy: {
				main: {
					files: [
					{nonull:true, expand: true, cwd: 'M:\\wamp\\www\\anspress\\wp-content\\plugins\\anspress-question-answer', src: ['**/*', '!**/.git/**', '!**/.svn/**', '!**/node_modules/**', '!**/bin/**', '!**/docs/**', '!**/tests/**'], dest: 'M:\\wamp\\www\\aptest\\wp-content\\plugins\\anspress-question-answer'},
					{nonull:true, expand: true, cwd: 'M:\\wamp\\www\\anspress\\wp-content\\plugins\\anspress-question-answer', src: ['**/*', '!**/.git/**', '!**/.svn/**', '!**/node_modules/**', '!**/bin/**', '!**/docs/**', '!**/tests/**'], dest: 'M:\\wamp\\www\\askbug\\wp-content\\plugins\\anspress-question-answer'}
					]
				}
			},
			version: {
				css: {
					options: {
						prefix: 'Version\\:\\s'
					},
					src: [ 'style.css' ],
				},
				php: {
					options: {
						prefix: 'Version\\:\\s+'
					},
					src: [ 'anspress-question-answer.php' ],
				},
				mainplugin: {
					options: {
						pattern: '\$_plugin_version = (?:\')(.+)(?:\')/g'
					},
					src: [ 'anspress-question-answer.php' ],
				},
				project: {
					src: ['plugin.json']
				}
			},
			sass: {
				dist: {
					options: {
						style: 'expanded'
					},
					files: {
						"theme/default/css/main.css": "theme/default/scss/main.scss",
						"theme/default/css/RTL.css": "theme/default/scss/RTL.scss",
						//"assets/ap-admin.css": "assets/ap-admin.scss"
					}
				}
			},
			uglify: {
				my_target: {
					files: {
						'assets/js/min/admin-app.min.js': ['assets/js/admin-app.js'],
						'assets/js/min/question.min.js': ['assets/js/question.js'],
						'assets/js/min/common.min.js': ['assets/js/common.js'],
						'assets/js/min/upload.min.js': ['assets/js/upload.js'],
						'assets/js/min/ap-admin.min.js': ['assets/js/ap-admin.js'],
						'assets/js/min/ask.min.js': ['assets/js/ask.js'],
						'theme/default/js/min/theme.min.js': ['theme/default/js/theme.js']
					}
				}
			},
			wp_readme_to_markdown: {
				your_target: {
					files: {
						'README.md': 'readme.txt'
					},
				},
			},

		phplint : {
			options : {
				spawn : false
			},
			all: ['**/*.php']
		},
		/*concat: {
			options: {
				separator: ';',
			},
			anspress: {
				src: ['assets/min/ap-functions.min.js', 'assets/min/anspress_site.min.js'],
				dest: 'assets/min/anspress.min.js',
			},
			theme: {
				src: ['theme/default/js/initial.min.js', 'theme/default/js/jquery.peity.min.js', 'theme/default/js/jquery.scrollbar.min.js', 'theme/default/min/ap.min.js'],
				dest: 'theme/default/min/anspress-theme.min.js',
			},
		},*/

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
				rebase: true
			},
			target: {
				files: {
					'theme/default/css/min/main.min.css': 'theme/default/css/main.css',
					'theme/default/css/min/RTL.min.css': 'theme/default/css/RTL.css',
					'theme/default/css/min/fonts.min.css': 'theme/default/css/fonts.css'
				}
			}
		},

		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['sass', 'cssmin'],
			},
			uglify: {
				files: ['theme/default/js/*.js','assets/js/*.js'],
				tasks: ['uglify'],
			}
		},
	});

	grunt.registerTask( 'build', [ 'phplint', 'makepot', 'version', 'sass', 'uglify', 'compress' ]);

}
