var gulp = require('gulp');
var connect = require('gulp-connect');
var fileinclude  = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');

var srcPath="./src";
var cssPath=srcPath+'/css/**/*.*';
var imagePath=srcPath+'/images/**/*.*';
var jsPath=srcPath+'/js/**/*.*';

gulp.task('fileinclude', function() {
    gulp.src('./src/htmls/**.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
    .pipe(gulp.dest('./dist'));
});


gulp.task('css', function() {
    return gulp.src(cssPath).pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))    
        .pipe(gulp.dest('./dist/css'))   //输出文件夹
});

gulp.task('image', function() {
    return gulp.src(imagePath).pipe(imagemin())    
        .pipe(gulp.dest('./dist/images'))   //输出文件夹
});

gulp.task('js', function() {
    return gulp.src(jsPath)      
        .pipe(gulp.dest('./dist/js'))   //输出文件夹
});




gulp.task('static',['css','js','image'])

gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});


gulp.task('html', function () {
  gulp.src('./src/**/*.*')
    .pipe(connect.reload());
});
 // 监听html

 gulp.task('watchhtml',function(){
 	return gulp.watch('src/htmls/**.*', function(){
 		 	
            gulp.run('fileinclude');
            gulp.run('html');
        });
 })
 // 监听css
  gulp.task('watchcss',function(){
 	return gulp.watch(cssPath, function(){
 		 	gulp.run('css');
            gulp.run('html');
        });
 })
 // 监听image
    gulp.task('watchimage',function(){
 	return gulp.watch(imagePath, function(){
 		 	gulp.run('image');

            gulp.run('html');
        });
 })
 // 监听js
    gulp.task('watchjs',function(){
	return gulp.watch(jsPath, function(){
		 	gulp.run('js');
        gulp.run('html');
    });
})
        

gulp.task('default', ['connect','watchhtml','watchcss','watchimage','watchjs'])