'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var through = require('through2');
var plugins = require('gulp-load-plugins')();

var config = {
	buildDir: 'app/assets/build',
	minify: false
};

gulp.task('less', function () {
	return gulp.src('app/assets/less/style.less')
		.pipe(plugins.less({ compress: true }))
		.on('error', function (err) {
			var parseError = plugins.util.colors.red.bold('Parse error:');
			plugins.util.log(parseError, err.message);
		})
		.pipe(plugins.autoprefixer())
		.pipe(config.minify ? plugins.minifyCss() : through.obj())
		.pipe(gulp.dest(config.buildDir));
});

gulp.task('build', ['less']);

gulp.task('default', ['build'], function () {
	gulp.watch('app/assets/less/**/*.less', ['less']);

	browserSync.init([
		'app/assets/build/style.css',
		'app/assets/css/**/*.css',
		// requirejs out,
		'app/assets/imgs/**/*.jpg',
		'app/assets/imgs/**/*.png',
		'app/**/*.php',
		'app/**/*.html'
	], {
		server: {
			baseDir: './app/'
		},
		ghostMode: {
			scroll: true,
			links: true,
			forms: true
		}
	});
});
