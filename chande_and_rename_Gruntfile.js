module.exports = function(grunt) {

    var mobile = false;

    var tablet = false;

    var ft_folder = '4call/';
    


    
    var dist_valid_array = ['dist/index.php'];  

    var src_valid_array = ['src/desctop/index.php'];  

    if(tablet){
        dist_valid_array.push('dist/tablet/index.php');
        src_valid_array.push('src/tablet/index.php');
    }

    if(mobile){
        dist_valid_array.push('dist/mobile/index.php');
        src_valid_array.push('src/mobile/index.php');
    }

    var async_init = '</style><script>!function(e,t,n){function r(){for(;u[0]&&"loaded"==u[0][l];)o=u.shift(),o[f]=!a.parentNode.insertBefore(o,a)}for(var i,s,o,u=[],a=e.scripts[0],f="onreadystatechange",l="readyState";i=n.shift();)s=e.createElement(t),"async"in a?(s.async=!1,e.head.appendChild(s)):a[l]?(u.push(s),s[f]=r):e.write("<"+t+\' src="\'+i+\'" defer></\'+t+">"),s.src=i}(document,"script",["https://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js","js/init.js"]);</script>';

    grunt.option("force", true);

    grunt.registerTask('unusedimages', function(test) {
        if (test == 'desctop') {
            var i_cwd = 'dist/img/';
            var i_expand = ['dist/index.php','dist/ajax/*.html', 'dist/css/full.min.css', 'dist/js/main.min.js', 'dist/js/map.min.js'];
        }

        if (test == 'tablet') {
            var i_cwd = 'dist/tablet/img/';
            var i_expand = ['dist/tablet/index.php','dist/tablet/ajax/*.html', 'dist/tablet/css/full.min.css', 'dist/tablet/js/main.min.js', 'dist/tablet/js/map.min.js'];
        }

        if (test == 'mobile') {
            var i_cwd = 'dist/mobile/img/';
            var i_expand = ['dist/mobile/index.php', 'dist/mobile/css/full.min.css', 'dist/mobile/js/main.min.js', 'dist/mobile/js/map.min.js'];
        }

        var assets = [],
            links = [];

        grunt.file.expand({
            filter: 'isFile',
            cwd: i_cwd 
        }, ['**/*']).forEach(function(file) {
            assets.push(file);
        });

        grunt.file.expand({
            filter: 'isFile',
        }, i_expand).forEach(function(file) {
            var content = grunt.file.read(file);
            assets.forEach(function(asset) {
                if (content.search(asset) !== -1) {
                    links.push(asset);
                }
            });
        });

        var unused = grunt.util._.difference(assets, links);
        console.log('Found ' + unused.length + ' unused images:');
        unused.forEach(function(el) {
            grunt.file.delete(i_cwd + el)
            console.log('unused and deleted: ' + i_cwd + el);
        });
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        jsbeautifier: {
            desctop: {
                src : ["src/desctop/js/main.js","src/desctop/js/init.js","src/desctop/js/map.js"]
            },          
            tablet: {
                src : ["src/tablet/js/main.js","src/tablet/js/init.js","src/tablet/js/map.js"]
            },          
            mobile: {
                src : ["src/mobile/js/main.js","src/mobile/js/init.js","src/mobile/js/map.js"]
            }
        },


        csslint: {
          desctop: {
            src: ['src/desctop/css/*.css']
          },
          tablet: {
            src: ['src/tablet/css/*.css']
          },
          mobile: {
            src: ['src/mobile/css/*.css']
          },
        },


        csscomb: {
            desctop: {
                files: {
                    'src/desctop/css/style.css': ['src/desctop/css/style.css'],
                    'src/desctop/css/media.css': ['src/desctop/css/media.css'],
                    'src/desctop/css/head.css': ['src/desctop/css/head.css'],
                    'src/desctop/css/scripts.css': ['src/desctop/css/scripts.css'],
                }
            },
            tablet: {
                files: {
                    'src/tablet/css/style.css': ['src/tablet/css/style.css'],
                    'src/tablet/css/media.css': ['src/tablet/css/media.css'],
                    'src/tablet/css/head.css': ['src/tablet/css/head.css'],
                    'src/tablet/css/scripts.css': ['src/tablet/css/scripts.css'],
                }
            },
            mobile: {
                files: {
                    'src/mobile/css/style.css': ['src/mobile/css/style.css'],
                    'src/mobile/css/media.css': ['src/mobile/css/media.css'],
                    'src/mobile/css/head.css': ['src/mobile/css/head.css'],
                    'src/mobile/css/scripts.css': ['src/mobile/css/scripts.css'],
                }
            }
        },


        htmlcomb: {
            desctop: {
                options: {
                    removeEmptyValue: false
                },
                files: {
                    'src/desctop/index.php': ['src/desctop/index.php'],                    
                    'src/desctop/ajax/map.html': ['src/desctop/ajax/map.html']
                }
            },
            tablet: {
                options: {
                    removeEmptyValue: false
                },
                files: {
                    'src/tablet/index.php': ['src/tablet/index.php'],                    
                    'src/tablet/ajax/map.html': ['src/tablet/ajax/map.html']
                }
            },
            mobile: {
                options: {
                    removeEmptyValue: false
                },
                files: {
                    'src/mobile/index.php': ['src/mobile/index.php'],                    
                    'src/mobile/ajax/map.html': ['src/mobile/ajax/map.html']
                }
            }
        },


        prettify: {
            options: {
                "indent": 4,
                "indent_char": " ",
                "indent_scripts": "normal",
                "wrap_line_length": 0,
                "brace_style": "collapse",
                "preserve_newlines": true,
                "max_preserve_newlines": 1,
                "unformatted": [
                    "code",
                    "pre",
                    "br"
                ]
            },
            desctop: {
                files: {
                    'src/desctop/index.php': ['src/desctop/index.php'],                    
                    'src/desctop/ajax/map.html': ['src/desctop/ajax/map.html']
                }
            },
            tablet: {
                files: {
                    'src/tablet/index.php': ['src/tablet/index.php'],                    
                    'src/tablet/ajax/map.html': ['src/tablet/ajax/map.html']
                }
            },
            mobile: {
                files: {
                    'src/mobile/index.php': ['src/mobile/index.php'],                    
                    'src/mobile/ajax/map.html': ['src/mobile/ajax/map.html']
                }
            }
        },

        criticalcss: {
            desctop: {
                options: {
                    url: "src/desctop/index_fc.html",
                    width: 1200,
                    height: 900,
                    outputfile: "src/desctop/css/bp/critical.css",
                    filename: "src/desctop/css/full.css",
                    //buffer: 1200 * 1920,
                    ignoreConsole: false
                }
            },
            desctop_tab: {
                options: {
                    url: "src/desctop/index_fc.html",
                    width: 800,
                    height: 1024,
                    outputfile: "src/desctop/css/bp/critical_t.css",
                    filename: "src/desctop/css/full.css",
                    //buffer: 1200 * 1920,
                    ignoreConsole: false
                }
            },
            desctop_mob: {
                options: {
                    url: "src/desctop/index_fc.html",
                    width: 340,
                    height: 1024,
                    outputfile: "src/desctop/css/bp/critical_m.css",
                    filename: "src/desctop/css/full.css",
                    //buffer: 1200 * 1920,
                    ignoreConsole: false
                }
            },
            tablet: {
                options: {
                    url: "src/tablet/index_fc.html",
                    width: 800,
                    height: 1024,
                    outputfile: "src/tablet/css/bp/critical.css",
                    filename: "src/tablet/css/full.css", 
                    //buffer: 800 * 1024,
                    ignoreConsole: false
                }
            },
            mobile: {
                options: {
                    url: "src/mobile/index_fc.html",
                    width: 480,
                    height: 854,
                    outputfile: "src/mobile/css/bp/critical.css",
                    filename: "src/mobile/css/full.css", 
                    //buffer: 480 * 480,
                    ignoreConsole: false
                }
            }
        },


        inlineImgSize: {
            desctop: {
                files: {
                    src: ['dist/index.php']
                }
            },
            tablet: {
                files: {
                    src: ['dist/tablet/index.php']
                }
            },
            mobile: {
                files: {
                    src: ['dist/mobile/index.php']
                }
            }
        },


        validation: {
            dist: {
                options: {
                    relaxerror: ['(XML processing instructions are not supported in HTML.)'],
                },
                files: {
                    src: dist_valid_array
                }
            },
            src: {
                options: {
                    relaxerror: ['(XML processing instructions are not supported in HTML.)'],
                },
                files: {
                    src: src_valid_array
                }
            }
        },


        copy: {
            desctop_for_critical: {
                src: 'src/desctop/index.*',
                dest: 'src/desctop/index_fc.html',
            },
            desctop_index: {
                expand: true,
                flatten: true,
                cwd: 'src/desctop/',
                src: '*.*',
                dest: 'dist/',
            },
            desctop_httaccess: {
                expand: true,
                flatten: true,
                src: 'src/desctop/.htaccess',
                dest: 'dist/',
            },
            desctop_ajax: {
                expand: true,
                flatten: true,
                cwd: 'src/desctop/ajax/',
                src: '**',
                dest: 'dist/ajax/',
            },
            desctop_fonts: {
                expand: true,
                flatten: true,
                cwd: 'src/desctop/fonts/',
                src: '**',
                dest: 'dist/fonts/',
            },
            track: {
                expand: true,
                flatten: true,
                cwd: 'src/track/',
                src: '**',
                dest: 'dist/track/',
            },
            desctop_libs_js: {
                src: 'src/desctop/js/libs.js',
                dest: 'dist/js/libs.min.js',
            },
            desctop_fonts_css: {
                src: 'src/desctop/css/fonts.css',
                dest: 'dist/css/fonts.css',
            },
            desctop_bp_init_js: {
                src: 'src/desctop/js/init.js',
                dest: 'src/desctop/js/bp/init.js',
            },
            tablet_for_critical: {
                src: 'src/tablet/index.*',
                dest: 'src/tablet/index_fc.html',
            },
            tablet_index: {
                expand: true,
                flatten: true,
                cwd: 'src/tablet/',
                src: '*.*',
                dest: 'dist/tablet/',
            },
            tablet_httaccess: {
                expand: true,
                flatten: true,
                src: 'src/tablet/.htaccess',
                dest: 'dist/tablet/',
            },
            tablet_ajax: {
                expand: true,
                flatten: true,
                cwd: 'src/tablet/ajax/',
                src: '**',
                dest: 'dist/tablet/ajax/',
            },
            tablet_fonts: {
                expand: true,
                flatten: true,
                cwd: 'src/tablet/fonts/',
                src: '**',
                dest: 'dist/tablet/fonts/',
            },
            tablet_libs_js: {
                src: 'src/tablet/js/libs.js',
                dest: 'dist/tablet/js/libs.min.js',
            },
            tablet_fonts_css: {
                src: 'src/tablet/css/fonts.css',
                dest: 'dist/tablet/css/fonts.css',
            },
            tablet_bp_init_js: {
                src: 'src/tablet/js/init.js',
                dest: 'src/tablet/js/bp/init.js',
            },
            mobile_for_critical: {
                src: 'src/mobile/index.*',
                dest: 'src/mobile/index_fc.html',
            },
            mobile_index: {
                expand: true,
                flatten: true,
                cwd: 'src/mobile/',
                src: '*.*',
                dest: 'dist/mobile/',
            },
            mobile_httaccess: {
                expand: true,
                flatten: true,
                src: 'src/mobile/.htaccess',
                dest: 'dist/mobile/',
            },
            mobile_ajax: {
                expand: true,
                flatten: true,
                cwd: 'src/mobile/ajax/',
                src: '**',
                dest: 'dist/mobile/ajax/',
            },
            mobile_fonts: {
                expand: true,
                flatten: true,
                cwd: 'src/mobile/fonts/',
                src: '**',
                dest: 'dist/mobile/fonts/',
            },
            mobile_libs_js: {
                src: 'src/mobile/js/libs.js',
                dest: 'dist/mobile/js/libs.min.js',
            },
            mobile_fonts_css: {
                src: 'src/mobile/css/fonts.css',
                dest: 'dist/mobile/css/fonts.css',
            },
            mobile_bp_init_js: {
                src: 'src/mobile/js/init.js',
                dest: 'src/mobile/js/bp/init.js',
            }
        },


        htmlmin: {
            desctop: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    removeAttributeQuotes: true
                },
                files: {
                    'dist/index.php': 'dist/index.php',
                    'dist/ajax/map.html': 'dist/ajax/map.html'
                }
            },
            tablet: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    removeAttributeQuotes: true
                },
                files: {
                    'dist/tablet/index.php': 'dist/tablet/index.php',
                    'dist/tablet/ajax/map.html': 'dist/tablet/ajax/map.html'
                }
            },
            mobile: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    removeAttributeQuotes: true
                },
                files: {
                    'dist/mobile/index.php': 'dist/mobile/index.php',
                    'dist/mobile/ajax/map.html': 'dist/mobile/ajax/map.html'
                }
            }
        },


        clean: {
            options: {
                force: true
            },

            desctop: ['src/desctop/index_fc.html','src/desctop/css/full.css', 'src/desctop/css/bp', 'src/desctop/css/ap', 'src/desctop/js/bp'],
            tablet: ['src/tablet/index_fc.html','src/tablet/css/full.css', 'src/tablet/css/bp', 'src/tablet/css/ap', 'src/tablet/js/bp'],
            mobile: ['src/mobile/index_fc.html','src/mobile/css/full.css', 'src/mobile/css/bp', 'src/mobile/css/ap', 'src/mobile/js/bp']

        },


        'string-replace': {
            desctop_rebase: {
                files: {
                    './': ['dist/js/init.min.js', 'dist/index.*', 'dist/ajax/map.html']
                },
                options: {
                    replacements: [{
                        pattern: /main.js/ig,
                        replacement: 'main.min.js'
                    }, {
                        pattern: /libs.js/ig,
                        replacement: 'libs.min.js'
                    }, {
                        pattern: /init.js/ig,
                        replacement: 'init.min.js'
                    }, {
                        pattern: /map.js/ig,
                        replacement: 'map.min.js'
                    }, {
                        pattern: /full.css/ig,
                        replacement: 'full.min.css'
                    }, {
                        pattern: /head.css/ig,
                        replacement: 'head.min.css'
                    }, {
                        pattern: /..\/mobile/ig,
                        replacement: 'mobile'
                    }, {
                        pattern: /..\/tablet/ig,
                        replacement: 'tablet'
                    }, {
                        pattern: /..\/track/ig,
                        replacement: 'track'
                    }]
                }
            },
            desctop_beforebase: {
                files: {
                    './': 'dist/css/head.min.css'
                },
                options: {
                    replacements: [{
                        pattern: /\/img/ig,
                        replacement: '../img'
                    }]
                }
            },
            desctop_afterbase: {
                files: {
                    './': ['dist/css/head.min.css']
                },
                options: {
                    replacements: [{
                        pattern: /..\/img/ig,
                        replacement: 'img'
                    }]
                }
            },
            desctop_remove_img_from_head: {
                files: {
                    './': 'src/desctop/css/bp/critical.css'
                },
                options: {
                    replacements: [{
                        pattern: /(?:background-image)[ ]*:[ ]*[^;]+/ig,
                        replacement: ' '
                    }, {
                        pattern: /(?:url)\([^*]*\)+/ig,
                        replacement: ' '
                    }]
                }
            },
            desctop_for_lazyload: {
                files: {
                    './': ['dist/index.php', 'dist/js/main.min.js']
                },
                options: {
                    replacements: [{
                        pattern: /src="img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original="img/'
                    }, {
                        pattern: /src=img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original=img/'
                    }, {
                        pattern: /src='img\//ig,
                        replacement: "src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=' data-original='img/"
                    }, {
                        pattern: '$(document).ready(',
                        replacement: '$("img").each(function(){var a=$(this).attr("data-original");"undefined"!=typeof a&&a!==!1&&$(this).attr("src",$(this).data("original"))}),$(document).ready('
                    }]
                }
            },
            desctop_async_css: {
                files: {
                    './': ['src/desctop/js/bp/init.js']
                },
                options: {
                    replacements: [{
                        pattern: '//loadCSS',
                        replacement: 'loadCSS'
                    }]
                }
            },
            desctop_async_init: {
                files: {
                    './': ['dist/index.php']
                },
                options: {
                    replacements: [{
                        pattern: '</style>',
                        replacement: async_init
                    }]
                }
            },
            desctop_remove_link_css: {
                files: {
                    './': ['dist/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<link[^>]*css[^>]*>/ig,
                        replacement: ' '
                    }]
                }
            },
            desctop_remove_sync_init: {
                files: {
                    './': ['dist/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<script[^>]*(?:webfont.js|init.js)[^>]*>[^>]*\/script>/ig,
                        replacement: ' '
                    }]
                }
            },
            tablet_rebase: {
                files: {
                    './': ['dist/tablet/js/init.min.js', 'dist/tablet/index.*', 'dist/tablet/ajax/map.html']
                },
                options: {
                    replacements: [{
                        pattern: /main.js/ig,
                        replacement: 'main.min.js'
                    }, {
                        pattern: /libs.js/ig,
                        replacement: 'libs.min.js'
                    }, {
                        pattern: /init.js/ig,
                        replacement: 'init.min.js'
                    }, {
                        pattern: /map.js/ig,
                        replacement: 'map.min.js'
                    }, {
                        pattern: /full.css/ig,
                        replacement: 'full.min.css'
                    }, {
                        pattern: /head.css/ig,
                        replacement: 'head.min.css'
                    }, {
                        pattern: /..\/desctop/ig,
                        replacement: '../'
                    }]
                }
            },
            tablet_beforebase: {
                files: {
                    './': 'dist/tablet/css/head.min.css'
                },
                options: {
                    replacements: [{
                        pattern: /\/img/ig,
                        replacement: '../img'
                    }]
                }
            },
            tablet_afterbase: {
                files: {
                    './': ['dist/tablet/css/head.min.css']
                },
                options: {
                    replacements: [{
                        pattern: /..\/img/ig,
                        replacement: 'img'
                    }]
                }
            },
            tablet_remove_img_from_head: {
                files: {
                    './': 'src/tablet/css/bp/critical.css'
                },
                options: {
                    replacements: [{
                        pattern: /(?:background-image)[ ]*:[ ]*[^;]+/ig,
                        replacement: ' '
                    }, {
                        pattern: /(?:url)\([^*]*\)+/ig,
                        replacement: ' '
                    }]
                }
            },
            tablet_for_lazyload: {
                files: {
                    './': ['dist/tablet/index.php', 'dist/tablet/js/main.min.js']
                },
                options: {
                    replacements: [{
                        pattern: /src="img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original="img/'
                    }, {
                        pattern: /src=img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original=img/'
                    }, {
                        pattern: /src='img\//ig,
                        replacement: "src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=' data-original='img/"
                    }, {
                        pattern: '$(document).ready(',
                        replacement: '$("img").each(function(){var a=$(this).attr("data-original");"undefined"!=typeof a&&a!==!1&&$(this).attr("src",$(this).data("original"))}),$(document).ready('
                    }]
                }
            },
            tablet_async_css: {
                files: {
                    './': ['src/tablet/js/bp/init.js']
                },
                options: {
                    replacements: [{
                        pattern: '//loadCSS',
                        replacement: 'loadCSS'
                    }]
                }
            },
            tablet_async_init: {
                files: {
                    './': ['dist/tablet/index.php']
                },
                options: {
                    replacements: [{
                        pattern: '</style>',
                        replacement: async_init
                    }]
                }
            },
            tablet_remove_link_css: {
                files: {
                    './': ['dist/tablet/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<link[^>]*css[^>]*>/ig,
                        replacement: ' '
                    }]
                }
            },
            tablet_remove_sync_init: {
                files: {
                    './': ['dist/tablet/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<script[^>]*(?:webfont.js|init.js)[^>]*>[^>]*\/script>/ig,
                        replacement: ' '
                    }]
                }
            },
            mobile_rebase: {
                files: {
                    './': ['dist/mobile/js/init.min.js', 'dist/mobile/index.*', 'dist/mobile/ajax/map.html']
                },
                options: {
                    replacements: [{
                        pattern: /main.js/ig,
                        replacement: 'main.min.js'
                    }, {
                        pattern: /libs.js/ig,
                        replacement: 'libs.min.js'
                    }, {
                        pattern: /init.js/ig,
                        replacement: 'init.min.js'
                    }, {
                        pattern: /map.js/ig,
                        replacement: 'map.min.js'
                    }, {
                        pattern: /full.css/ig,
                        replacement: 'full.min.css'
                    }, {
                        pattern: /head.css/ig,
                        replacement: 'head.min.css'
                    }, {
                        pattern: /..\/desctop/ig,
                        replacement: '../'
                    }]
                }
            },
            mobile_beforebase: {
                files: {
                    './': 'dist/mobile/css/head.min.css'
                },
                options: {
                    replacements: [{
                        pattern: /\/img/ig,
                        replacement: '../img'
                    }]
                }
            },
            mobile_afterbase: {
                files: {
                    './': ['dist/mobile/css/head.min.css']
                },
                options: {
                    replacements: [{
                        pattern: /..\/img/ig,
                        replacement: 'img'
                    }]
                }
            },
            mobile_remove_img_from_head: {
                files: {
                    './': 'src/mobile/css/bp/critical.css'
                },
                options: {
                    replacements: [{
                        pattern: /(?:background-image)[ ]*:[ ]*[^;]+/ig,
                        replacement: ' '
                    }, {
                        pattern: /(?:url)\([^*]*\)+/ig,
                        replacement: ' '
                    }]
                }
            },
            mobile_for_lazyload: {
                files: {
                    './': ['dist/mobile/index.php', 'dist/mobile/js/main.min.js']
                },
                options: {
                    replacements: [{
                        pattern: /src="img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original="img/'
                    }, {
                        pattern: /src=img\//ig,
                        replacement: 'src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=" data-original=img/'
                    }, {
                        pattern: /src='img\//ig,
                        replacement: "src='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=' data-original='img/"
                    }, {
                        pattern: '$(document).ready(',
                        replacement: '$("img").each(function(){var a=$(this).attr("data-original");"undefined"!=typeof a&&a!==!1&&$(this).attr("src",$(this).data("original"))}),$(document).ready('
                    }]
                }
            },
            mobile_async_css: {
                files: {
                    './': ['src/mobile/js/bp/init.js']
                },
                options: {
                    replacements: [{
                        pattern: '//loadCSS',
                        replacement: 'loadCSS'
                    }]
                }
            },
            mobile_async_init: {
                files: {
                    './': ['dist/mobile/index.php']
                },
                options: {
                    replacements: [{
                        pattern: '</style>',
                        replacement: async_init
                    }]
                }
            },
            mobile_remove_link_css: {
                files: {
                    './': ['dist/mobile/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<link[^>]*css[^>]*>/ig,
                        replacement: ' '
                    }]
                }
            },
            mobile_remove_sync_init: {
                files: {
                    './': ['dist/mobile/index.php']
                },
                options: {
                    replacements: [{
                        pattern: /<script[^>]*(?:webfont.js|init.js)[^>]*>[^>]*\/script>/ig,
                        replacement: ' '
                    }]
                }
            }
        },


        dataUri: {
            desctop: {
                src: ['dist/css/full.min.css', 'dist/css/head.min.css'], 
                dest: 'dist/css/',
                options: {
                    target: ['dist/img/*.*'],
                    fixDirLevel: true,
                    maxBytes: 2048

                }
            },
            tablet: {
                src: ['dist/tablet/css/full.min.css', 'dist/tablet/css/head.min.css'], 
                dest: 'dist/tablet/css/',
                options: {
                    target: ['dist/tablet/img/*.*'],
                    fixDirLevel: true,
                    maxBytes: 2048

                }
            }
            mobile: {
                src: ['dist/mobile/css/full.min.css', 'dist/mobile/css/head.min.css'], 
                dest: 'dist/mobile/css/',
                options: {
                    target: ['dist/mobile/img/*.*'],
                    fixDirLevel: true,
                    maxBytes: 2048

                }
            }
        },


        concat: {
            desctop_libs_js: {
                src: 'src/desctop/js/libs/*.js',
                dest: 'src/desctop/js/libs.js'
            },
            desctop_libs_css: {
                src: 'src/desctop/css/libs/*.css',
                dest: 'src/desctop/css/libs.css'
            },
            desctop_full_css: {
                src: ['src/desctop/css/libs.css', 'src/desctop/css/style.css', 'src/desctop/css/media.css', 'src/desctop/css/scripts.css'],
                dest: 'src/desctop/css/full.css'
            },
            desctop_head_css: {
                src: ['src/desctop/css/head.css', 'src/desctop/css/bp/critical.css'],
                dest: 'src/desctop/css/bp/head.css'
            },
            tablet_libs_js: {
                src: 'src/tablet/js/libs/*.min.js',
                dest: 'src/tablet/js/libs.js'
            },
            tablet_libs_css: {
                src: 'src/tablet/css/libs/*.css',
                dest: 'src/tablet/css/libs.css'
            },
            tablet_full_css: {
                src: ['src/tablet/css/libs.css', 'src/tablet/css/style.css', 'src/tablet/css/media.css', 'src/tablet/css/scripts.css'],
                dest: 'src/tablet/css/full.css'
            },
            tablet_head_css: {
                src: ['src/tablet/css/head.css', 'src/tablet/css/bp/critical.css'],
                dest: 'src/tablet/css/bp/head.css'
            },
            mobile_libs_js: {
                src: 'src/mobile/js/libs/*.min.js',
                dest: 'src/mobile/js/libs.js'
            },
            mobile_libs_css: {
                src: 'src/mobile/css/libs/*.css',
                dest: 'src/mobile/css/libs.css'
            },
            mobile_full_css: {
                src: ['src/mobile/css/libs.css', 'src/mobile/css/style.css', 'src/mobile/css/media.css', 'src/mobile/css/scripts.css'],
                dest: 'src/mobile/css/full.css'
            },
            mobile_head_css: {
                src: ['src/mobile/css/head.css', 'src/mobile/css/bp/critical.css'],
                dest: 'src/mobile/css/bp/head.css'
            },
            allcritical: {
                src: ['src/desctop/css/bp/critical.css', 'src/desctop/css/bp/critical_t.css','src/desctop/css/bp/critical_m.css'],
                dest: 'src/desctop/css/bp/critical.css'
            }
        },


        cssmin: {
            desctop: {
                files: [{
                        src: 'src/desctop/css/ap/head.css',
                        dest: 'dist/css/head.min.css'
                    }, {
                        src: 'src/desctop/css/ap/full.css',
                        dest: 'dist/css/full.min.css'
                    }]
            },
            tablet: {
                files: [{
                        src: 'src/tablet/css/ap/head.css',
                        dest: 'dist/tablet/css/head.min.css'
                    }, {
                        src: 'src/tablet/css/ap/full.css',
                        dest: 'dist/tablet/css/full.min.css'
                    }]
            },
            mobile: {
                files: [{
                        src: 'src/mobile/css/ap/head.css',
                        dest: 'dist/mobile/css/head.min.css'
                    }, {
                        src: 'src/mobile/css/ap/full.css',
                        dest: 'dist/mobile/css/full.min.css'
                    }]
            }
        },


        uglify: {
            options: {
                compress: {
                    drop_console: true
                }
            },
            desctop_src: {
                files: [{
                    'dist/js/init.min.js': 'src/desctop/js/bp/init.js'
                }, {
                    'dist/js/main.min.js': 'src/desctop/js/main.js'
                }, {
                    'dist/js/map.min.js': 'src/desctop/js/map.js'
                }]
            },
            desctop_libs: {
                files: [{
                    expand: true,
                    cwd: 'src/desctop/js/libs/',
                    src: '**/*.js',
                    dest: 'src/desctop/js/libs/'
                }]
            },
            tablet_src: {
                files: [{
                    'dist/tablet/js/init.min.js': 'src/tablet/js/bp/init.js'
                }, {
                    'dist/tablet/js/main.min.js': 'src/tablet/js/main.js'
                }, {
                    'dist/tablet/js/map.min.js': 'src/tablet/js/map.js'
                }]
            },
            tablet_libs: {
                files: [{
                    expand: true,
                    cwd: 'src/tablet/js/libs/',
                    src: '**/*.js',
                    dest: 'src/tablet/js/libs/'
                }]
            },
            mobile_src: {
                files: [{
                    'dist/mobile/js/init.min.js': 'src/mobile/js/bp/init.js'
                }, {
                    'dist/mobile/js/main.min.js': 'src/mobile/js/main.js'
                }, {
                    'dist/mobile/js/map.min.js': 'src/mobile/js/map.js'
                }]
            },
            mobile_libs: {
                files: [{
                    expand: true,
                    cwd: 'src/mobile/js/libs/',
                    src: '**/*.js',
                    dest: 'src/mobile/js/libs/'
                }]
            }
        },


        sass: {
            desctop: {
                options: {
                    sourceMap: true
                },
                files: {
                    'src/desctop/css/style.css': 'src/desctop/css/sass/style.scss'
                }
            },
            tablet: {
                options: {
                    sourceMap: true
                },
                files: {
                    'src/tablet/css/style.css': 'src/tablet/css/sass/style.scss'
                }
            },
            mobile: {
                options: {
                    sourceMap: true
                },
                files: {
                    'src/mobile/css/style.css': 'src/mobile/css/sass/style.scss'
                }
            }
        },


        imagemin: {
            desctop: {
                files: [{
                        expand: true,
                        cwd: 'src/desctop/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/img/'
                    }]
            },
            tablet: {
                files: [{
                        expand: true,
                        cwd: 'src/tablet/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/tablet/img/'
                    }]
            },
            mobile: {
                files: [{
                        expand: true,
                        cwd: 'src/mobile/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: 'dist/mobile/img/'
                    }]
            }
        },


        autoprefixer: {
            options: {
                browsers: ['ie >= 8', 'last 10 versions', '> 0.1%', 'ff >= 20', 'Android > 1']
            },
            desctop: {
                files: [{
                        'src/desctop/css/ap/full.css': 'src/desctop/css/full.css'
                    }, {
                        'src/desctop/css/ap/head.css': 'src/desctop/css/bp/head.css'
                    }]
            },
            tablet: {
                files: [{
                        'src/tablet/css/ap/full.css': 'src/tablet/css/full.css'
                    }, {
                        'src/tablet/css/ap/head.css': 'src/tablet/css/bp/head.css'
                    }]
            },
            mobile: {
                files: [{
                        'src/mobile/css/ap/full.css': 'src/mobile/css/full.css'
                    }, {
                        'src/mobile/css/ap/head.css': 'src/mobile/css/bp/head.css'
                    }]
            }
        },

        ftpush: {
            build: {
                auth: {
                    host: '31.170.165.128',
                    port: 21,
                    authKey: "key2"
                },
                src: 'dist/',
                dest: ft_folder,
                exclusions: [
                    '**/.DS_Store',
                    '**/Thumbs.db',
                ]
            }
        },



        watch: {
            desctop_sass: {
                files: 'src/desctop/css/sass/*.scss',
                tasks: ['sass:desctop']
            },
            tablet_sass: {
                files: 'src/tablet/css/sass/*.scss',
                tasks: ['sass:tablet']
            },
            mobile_sass: {
                files: 'src/mobile/css/sass/*.scss',
                tasks: ['sass:mobile']
            },
            desctop_concat_libs_css: {
                files: ['src/desctop/css/libs/*.css'],
                tasks: ['concat:desctop_libs_css'],
            },
            tablet_concat_libs_css: {
                files: ['src/tablet/css/libs/*.css'],
                tasks: ['concat:tablet_libs_css'],
            },
            mobile_concat_libs_css: {
                files: ['src/mobile/css/libs/*.css'],
                tasks: ['concat:mobile_libs_css'],
            },
            desctop_concat_libs_js: {
                files: ['src/desctop/js/libs/*.js'],
                tasks: ['concat:desctop_libs_js'],
            },
            tablet_concat_libs_js: {
                files: ['src/tablet/js/libs/*.js'],
                tasks: ['concat:tablet_libs_js'],
            },
            mobile_concat_libs_js: {
                files: ['src/mobile/js/libs/*.js'],
                tasks: ['concat:mobile_libs_js'],
            }  
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ftpush');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-data-uri');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-w3c-html-validation');
    grunt.loadNpmTasks('grunt-inline-imgsize');
    grunt.loadNpmTasks('grunt-criticalcss');
    grunt.loadNpmTasks('grunt-csscomb');
    grunt.loadNpmTasks('grunt-htmlcomb');
    grunt.loadNpmTasks('grunt-prettify');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-csslint');

    grunt.registerTask('start-desctop', [
        'uglify:desctop_libs', //Минификация src/desctop/js/libs/*.js
        'concat:desctop_libs_js', //Склейка src/desctop/js/libs/*.js в src/desctop/js/libs.js
        'concat:desctop_libs_css', //Склейка src/desctop/css/libs/*.css в src/desctop/css/libs.css
        'csscomb:desctop', //beautify src/desctop/css/**/* 
        'htmlcomb:desctop', //beautify src/desctop/index.php ,src/desctop/ajax/map.html часть1
        'prettify:desctop', //beautify src/desctop/index.php ,src/desctop/ajax/map.html часть2
        'jsbeautifier:desctop', //beautify (src/desctop/js/) init.js, main.js, map.js
        //'csslint:desctop'
    ]);

    grunt.registerTask('start-tablet', [
        'uglify:tablet_libs',
        'concat:tablet_libs_js',
        'concat:tablet_libs_css',
        'csscomb:tablet',
        'htmlcomb:tablet',
        'prettify:tablet',
        'jsbeautifier:tablet',
        //'csslint:tablet'
    ]);

    grunt.registerTask('start-mobile', [
        'uglify:mobile_libs',
        'concat:mobile_libs_js',
        'concat:mobile_libs_css',
        'csscomb:mobile',
        'htmlcomb:mobile',
        'prettify:mobile',
        'jsbeautifier:mobile',
        //'csslint:desctop'
    ]);

var critical_array = ['criticalcss:desctop'];

if(!mobile&&!tablet){
    critical_array.push('criticalcss:desctop_tab');
    critical_array.push('criticalcss:desctop_mob');
    critical_array.push('concat:allcritical');
}
    
    grunt.registerTask('critical-dtm',critical_array);


    grunt.registerTask('fin-desctop', [
        'concat:desctop_full_css', //Склейка (src/desctop/css/) libs.css,style.css,media.css,scripts.css, в src/desctop/css/full.css
        'copy:desctop_for_critical', //Копия (src/desctop/) index.* в кеш файл index_fc.html для выдиление критического css
        'critical-dtm', //Выделение критического css для src/desctop/index_fc.html с src/desctop/css/full.css в src/desctop/css/bp/critical.css 
        'string-replace:desctop_remove_img_from_head', //Удаление всех графических ресурсов с src/desctop/css/bp/critical.css
        'concat:desctop_head_css', // Склейка src/desctop/css/head.css и src/desctop/css/bp/critical.css в src/desctop/css/bp/head.css
        'autoprefixer:desctop', //autoprefix src/desctop/css/full.css в src/desctop/css/ap/full.css, src/desctop/css/bp/head.css в src/desctop/css/ap/head.css
        'copy:desctop_bp_init_js', //Копирование src/desctop/js/init.js в src/desctop/js/bp/init.js для добавления асинхронной загрузки css
        'string-replace:desctop_async_css', //Изменение src/desctop/js/bp/init.js для асинхронной загрузки css
        'uglify:desctop_src', //Сжатие (src/desctop/js/) init.js, main.js, init.js в dist/js/*.min.js
        'copy:desctop_libs_js', //Копирование src/desctop/js/libs.js в dist/js/libs.min.js
        'cssmin:desctop', //Сжатие (src/desctop/css/ap/) head.css,full.css в dist/css/*.min.css
        'imagemin:desctop', //Сжатие src/desctop/img/*.* в dist/img/
        'clean:desctop', //Удаление src/desctop/index_fc.html,src/desctop/css/bp,src/desctop/css/ap,src/desctop/js/bp
        'copy:desctop_fonts',
        'copy:desctop_fonts_css',    
        'copy:desctop_index', //Копирование src/desctop/*.* в dist/
        'copy:desctop_httaccess', //Копирование src/desctop/.httaccess в dist/
        'copy:desctop_ajax', //Копирование src/desctop/ajax/ в dist/ajax/
        'string-replace:desctop_async_init', //добавления блока асинхронной инициализации в index.php
        'string-replace:desctop_remove_sync_init', //Удаление синхронной инициализации в index.php
        'string-replace:desctop_rebase', //Замена путей к track/ mobile/ tablet/ в dist/ версии desctop
        'inlineImgSize:desctop', //Добавление width и height на img
        'string-replace:desctop_for_lazyload', //замена установка lazy-load закгрузки <img> на dist/index.php
        'string-replace:desctop_remove_link_css', //удаление link[rel="stylesheet"] из dist/index.php
        'string-replace:desctop_beforebase', //замена путей /img->../img для base64uri маленьких картинок в dist/css/head.min.css
        'dataUri:desctop', //перевод картинок до 2048 байт в base64uri в dist/css/head.min.css, dist/css/full.min.css
        'string-replace:desctop_afterbase', //замена путей ../img->img непереведдных картинок в dist/css/head.min.css
        'htmlmin:desctop', //сжатие dist/index.php и dist/ajax/map.html
        'unusedimages:desctop', //Удаление неиспользованных картинок из dist/img/
        'copy:track', //Копирование src/track/ в dist/track/
    ]);

    grunt.registerTask('fin-tablet', [
        'concat:tablet_full_css',
        'copy:tablet_for_critical',
        'criticalcss:tablet', 
        'string-replace:tablet_remove_img_from_head',
        'concat:tablet_head_css',
        'autoprefixer:tablet',
        'copy:tablet_bp_init_js',
        'string-replace:tablet_async_css',
        'uglify:tablet_src',
        'copy:tablet_libs_js',
        'cssmin:tablet',
        'imagemin:tablet',
        'clean:tablet',
        'copy:tablet_fonts',
        'copy:tablet_fonts_css',
        'copy:tablet_index',
        'copy:tablet_httaccess',
        'copy:tablet_ajax',
        'string-replace:tablet_async_init',
        'string-replace:tablet_remove_sync_init',
        'string-replace:tablet_rebase',
        'inlineImgSize:tablet', 
        'string-replace:tablet_for_lazyload', 
        'string-replace:tablet_remove_link_css', 
        'string-replace:tablet_beforebase',
        'dataUri:tablet',
        'string-replace:tablet_afterbase', 
        'htmlmin:tablet',
        'unusedimages:tablet', 
    ]);

    grunt.registerTask('fin-mobile', [
        'concat:mobile_full_css',
        'copy:mobile_for_critical',
        'criticalcss:mobile', 
        'string-replace:mobile_remove_img_from_head',
        'concat:mobile_head_css',
        'autoprefixer:mobile',
        'copy:mobile_bp_init_js',
        'string-replace:mobile_async_css',
        'uglify:mobile_src',
        'copy:mobile_libs_js',
        'cssmin:mobile',
        'imagemin:mobile',
        'clean:mobile',
        'copy:mobile_fonts',
        'copy:mobile_fonts_css',
        'copy:mobile_index',
        'copy:mobile_httaccess',
        'copy:mobile_ajax',
        'string-replace:mobile_async_init',
        'string-replace:mobile_remove_sync_init',
        'string-replace:mobile_rebase',
        'inlineImgSize:mobile', 
        'string-replace:mobile_for_lazyload', 
        'string-replace:mobile_remove_link_css', 
        'string-replace:mobile_beforebase',
        'dataUri:mobile',
        'string-replace:mobile_afterbase', 
        'htmlmin:mobile',
        'unusedimages:mobile', 
    ]);

    grunt.registerTask('check-desctop', [
        'concat:desctop_libs_css', 
        'csscomb:desctop'
    ]);

    grunt.registerTask('check-tablet', [
        'concat:tablet_libs_css', 
        'csscomb:tablet'
    ]);

    grunt.registerTask('check-mobile', [
        'concat:mobile_libs_css', 
        'csscomb:mobile'
    ]);


var start_command = ['start-desctop'];

var fin_array = ['start-desctop','fin-desctop'];

var fin_command = ['fin-desctop'];

var validate_command = ['validation'];

var check_command = ['check-desctop'];

if(tablet) {
    fin_command.push('fin-tablet');
    start_command.push('start-tablet');
    fin_array.push('start-tablet').push('fin-tablet');
    check_command.push('check-tablet');
}

if(mobile) {
    fin_command.push('fin-mobile');
    start_command.push('start-mobile');
    fin_array.push('start-mobile').push('fin-mobile');
    check_command.push('check-mobile');
}

fin_array.push('validation:dist');

check_command.push('validation:src');

    grunt.registerTask('check', check_command);
    grunt.registerTask('start', start_command);
    grunt.registerTask('fin', fin_array);
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('ftp', ['ftpush']);


};