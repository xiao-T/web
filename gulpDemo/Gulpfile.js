//包含gulp
var gulp = require('gulp');

//包含插件
var jshint = require('gulp-jshint'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');

//lin task
gulp.task('lint', function() {
	gulp.src('js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

//编译sass
gulp.task('sass', function() {
	gulp.src('scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('css'));
});

//拼接、简化js文件
gulp.task('scripts', function() {
	gulp.src('js/*.js')
	.pipe(concat('index.js'))
	.pipe(gulp.dest('dist'))
	.pipe(rename('index.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist'));
});

//默认任务
gulp.task('default', function() {
	gulp.run('lint', 'sass', 'scripts');

	//监视JS文件的变化
	gulp.watch('js/*.js', function() {
		gulp.run('lint', 'scripts');
	});

	//监视scss文件的变化 
	gulp.watch('scss/*.scss', function() {
		gulp.run('sass');
	});
});

