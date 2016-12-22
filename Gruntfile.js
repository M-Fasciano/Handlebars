module.exports = function (grunt) {
    'use strict';
    grunt.registerTask('listItems', 'Lists the handlebars pages', function () {
        var sourceUrl = 'source/html/pages/';
        var files = grunt.file.expand(sourceUrl + '**/*.{hbs,handlebars}');
        if (files.length > 0) {
            var contents = '<h2>List of pages:</h2><ul>';
            for (var i = 0; i < files.length; i++) {
                var temp = files[i].split(sourceUrl);
                var title;
                if (temp[1].indexOf('handlebars') < 0) {
                    title = temp[1].split('.hbs');
                } else {
                    title = temp[1].split('.handlebars');
                }
                contents += '<li><a href="' + title[0] + '.html">' + title[0] + '</a></li>';
            }
            contents += '</ul>';
        }
        grunt.file.write('source/html/partials/fileList.handlebars', contents);
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('browserify-handlebars');
    grunt.loadNpmTasks('assemble');
    grunt.initConfig({
        config: {
            source: 'source/',
            dest: 'dist/'
        },
        connect: {
            options: {
                port: 9012,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: '<%= config.dest %>'
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= config.dest %>',
                    livereload: false
                }
            }
        },
        sass: {
          dev: {
            files: {
                '<%= config.dest %>css/main.css': '<%= config.source %>scss/main.scss'
            }
          }
        },
        copy: {
            files: {
                files: [
                    {
                        src: ['**/*.*'],
                        dest: '<%= config.dest %>/images/',
                        cwd: '<%= config.source %>/images/',
                        expand: true
                    },
                    {
                        src: ['**/*.*'],
                        dest: '<%= config.dest %>webfonts/',
                        cwd: '<%= config.source %>webfonts/',
                        expand: true
                    }
                ]
            },
            js: {
                files: [{
                        src: ['**/*.js'],
                        dest: '<%= config.dest %>js/',
                        cwd: '<%= config.source %>js/',
                        expand: true
                    }]
            },
            data: {
                files: [
                  {
                    src: ['**/*.json'],
                    dest: '<%= config.dest %>data/',
                    cwd: '<%= config.source %>html/data/',
                    expand: true
                  }
              ]
            },
            fontsicons: {
                files: [{
                        src: ['**/*.{svg,eot,woff,ttf,woff2,otf}'],
                        dest: '<%= config.dest %>css/',
                        cwd: '<%= config.source %>css/',
                        expand: true
                    }]
            }
        },
        watch: {
            scripts: {
                options: { livereload: true },
                files: ['<%= config.source %>js/**/*.js'],
                tasks: ['browserify:dev']
            },
            html: {
                options: { livereload: true },
                files: [
                    '<%= config.source %>html/**/*.{html,hbs,handlebars,json,yml}',
                    '!<%= config.source %>html/partials/fileList.{hbs,handlebars}'
                ],
                tasks: [
                    'listItems',
                    'assemble',
                    'copy:data',
                    'browserify:dev'
                ]
            },
            css: {
                options: { livereload: true },
                files: ['<%= config.source %>/scss/**/*.scss'],
                tasks: ['sass']
            },
            images: {
                options: { livereload: true },
                files: ['<%= config.source %>images/*.*'],
                tasks: ['copy:files']
            },
            fontsicons: {
                options: { livereload: true },
                files: ['<%= config.source %>css/**/*.{svg,eot,woff,ttf,woff2,otf}'],
                tasks: ['copy:fontsicons']
            },
            data: {
                options: { livereload: true },
                files: ['<%= config.source %>html/more-data/**/*.json'],
                tasks: ['copy:data']
            }
        },
        assemble: {
            options: {
                flatten: false,
                partials: ['<%= config.source %>html/partials/**/*.{hbs,handlebars}'],
                layout: ['<%= config.source %>html/layouts/default.handlebars'],
                data: ['<%= config.source %>html/data/**/*.{json,yml}']
            },
            pages: {
                files: [{
                        expand: true,
                        cwd: '<%= config.source %>html/pages/',
                        dest: '<%= config.dest %>',
                        src: ['**/*.{hbs,handlebars}'],
                        ext: '.html'
                    }]
            }
        },
        browserify: {
          dev: {
            src: ['<%= config.source %>js/**/*main.js'],
            dest: '<%= config.dest %>js/scripts.js',
            options: {
              transform: ['browserify-handlebars']
            }
          }
        }
    });
    grunt.registerTask('build', [
        'listItems',
        'assemble',
        'sass:dev',
        'browserify:dev',
        'copy:files',
        'copy:data',
        'copy:fontsicons'
    ]);
    grunt.registerTask('dev', [
        'listItems',
        'assemble',
        'sass:dev',
        'browserify:dev',
        'copy:files',
        'copy:data',
        'copy:fontsicons'
    ]);
    grunt.registerTask('default', [
        'dev',
        'connect:livereload',
        'watch'
    ]);
};
