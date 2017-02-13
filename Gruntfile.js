
//包装函数
module.exports = function (grunt) {

  //任务配置，所有插件的配置信息
  grunt.initConfig({

    //获取 package.json 的信息
    pkg: grunt.file.readJSON('package.json'),


    //less插件配置
    less: {
        main: {
            expand: true,
            cwd: 'less',
            src: ['*.less'],
            dest: 'css/',
            ext: '.css'
        },
        dev: {
            options: {
                compress: true,
                yuicompress:false
            }
        }
    },

    //csscomb插件配置信息  排序
    csscomb: {
      options: {
        config: 'config.json'
      },
      css: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: 'css', //批匹配相对lib目录的src来源
            src: '*.css', //实际的匹配模式
            dest: 'src/css/', //目标路径前缀
            ext: '.css' //目标文件路径中文件的扩展名.
          }
        ]
      }
    },
    //autoprefixer插件配置信息
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 7', 'ie 8', 'ie 9'],
        map: true
      },
      // less: {
      //   src: '<%= pkg.path.dest.less %>*.css'
      // },
      css: {
      	src: 'css/*.css'
      }
    },

    //watch插件配置信息
    watch: {
      css: {
        files: ['less/*.less'],
        tasks: ['less', 'autoprefixer','csscomb'],
        options: { spawn: false}
      }
    },

  });

  //告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  


  //告诉grunt当我们在终端中输入grunt时需要做些什么 （注意先后顺序）
  grunt.registerTask('default' , ['less','autoprefixer','csscomb', 'watch']);

};