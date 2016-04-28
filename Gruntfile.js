module.exports = function(grunt) {


    var src = 'src/',
        prod = 'prod/',
        category = '', // e.g construction/
        path = {
            src: src,
            prod: prod,
            fixtures: src+'/fixtures/',
            prodBanners: prod+'/banners/'+category,
            srcBanners: src+'/fixtures/banners/'+category
        },
        dimensions =  'dimensions.json';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile the SASS
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: path.fixtures,
                    src: ['**/*.scss'],
                    dest: path.prod,
                    ext: '.css'
                }],
                options: {
                    sourcemap: 'none'
                }
            }
        },

        // Optimise images
        tinypng: {
            options: {
                apiKey: "",
                showProgress: true,
                stopOnImageError: true
            },
            default: {
                files: [{
                    expand: true,
                    cwd: path.fixtures,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: path.fixtures
                }]
            }
        },



        copy: {
            main: {
                cwd: path.fixtures,
                src: ['**/*.html', '**/*.png', '**/*.jpg'],
                dest: path.prod,
                expand: true
            },

            generateBanners : {
                files: (function() {
                    var filename = grunt.file.readJSON(dimensions).dimensions;
                    var out = [];
                    filename.forEach(function (element, index){
                        var src = path.src+'/template/';
                        var dest = path.srcBanners + filename[index];;
                        out.push({
                            src: ['**'],
                            dest: dest,
                            expand: true,
                            cwd : src
                        });
                    });
                    return out;
                })()
            }
        },

        // Watch the files
        watch: {
            templates: {
                files: ['**/*.html'],
                tasks: ['copy:main'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['**/*.scss'],
                tasks: ['sass', 'cssmin'],
                options: {
                    spawn: false
                }
            },
            images: {
                files: [path.fixtures+'**/*.{png,jpg,gif}'],
                tasks: ['newer:tinypng'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: [path.src+'**/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },

        // Run all watch tasks AT THE SAME TIME!!!
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            default: {
                tasks: ["watch:templates","watch:sass", "watch:images", "watch:js", "connect"]
            }
        },


        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: path.fixtures,
                    src: '**/*.js',
                    dest: path.prod
                }]
            }
        },

        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: path.prod,
                    src: '**/*.css',
                    dest: path.prod,
                    ext: '.css'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    base: path.prod+'banners/',
                    keepalive: true,
                    open: true
                }
            }
        }



    });

    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-import');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-tinypng');


    grunt.registerTask('updateBannerDimension',  function(){

        var json = grunt.file.readJSON(dimensions);

        for(var i =0;i<json.dimensions.length;i++) {

            var dim = getDimension(json.dimensions[i]);

            grunt.file.write(path.srcBanners+json.dimensions[i]+'/css/_overwrites.scss', '$banner-width:'+dim['width']+'px;\n$banner-height:'+dim['height']+'px;' )        }

        /**
         * Grabbing the width and height
         * from the folder name
         * @param folderName
         * @returns {Array}
         */
        function getDimension (folderName) {

            var dimension = [],
                x = folderName.indexOf("x");

            dimension['width']  = folderName.slice(0,x);
            dimension['height'] = folderName.slice((x+1), folderName.length);

            return dimension;
        }
    });

    /**
     * createBanner will create all the dimensions added
     * to dimensions.json and update
     * relevant styles.scss files
     */
    grunt.registerTask('createBanners',['copy:generateBanners','updateBannerDimension']);

    grunt.registerTask('default', ['sass', 'cssmin', 'copy:main', 'uglify', 'concurrent']);


};
