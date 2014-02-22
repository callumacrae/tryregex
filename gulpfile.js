'use strict';

var browserSync = require('browser-sync'),
	es = require('event-stream'),
	gulp = require('gulp'),
	stylish = require('jshint-stylish'),
	plugins = require('gulp-load-plugins')();

var config = {
	lintOnLess: true,
	minify: true, // @todo: Get this from a env var or something

	recessOptions: {
		strictPropertyOrder: false
	}
};

gulp.task('build', ['less']);

gulp.task('less', function () {
	var lessStream = plugins.less({
			compress: true
		});

	lessStream.on('error', function (err) {
		plugins.util.log(plugins.util.colors.red.bold('Parse error:'), err.message);
	});

	var stream = gulp.src('app/assets/less/style.less');

	if (config.lintOnLess) {
		stream = stream.pipe(plugins.recess(config.recessOptions));
	}

	stream = stream.pipe(lessStream)
		.pipe(plugins.autoprefixer());

	if (config.minify) {
		stream = stream.pipe(plugins.minifyCss());
	}

	stream.pipe(gulp.dest('app/assets/build'));
});

gulp.task('lesslint', function () {
	gulp.src(['app/assets/css/*.css', 'app/assets/less/*.less'])
		.pipe(plugins.recess(config.recessOptions));

	// @todo: Add failure
});

gulp.task('browser-sync', function () {
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

gulp.task('jshint', function (done) {
	var failed = false;

	gulp.src(['app/assets/js/*.js', 'gulpfile.js'])
		.pipe(plugins.jshint('.jshintrc'))
		.pipe(plugins.jshint.reporter(stylish))
		.pipe(es.map(function (file, cb) {
			cb(null, file);
			if (!failed) {
				failed = !file.jshint.success;
			}
		}))
		.on('end', function () {
			if (failed) {
				done(new Error('Failed JSHint'));
			} else {
				done();
			}
		});
});

gulp.task('htmllint', function (done) {
	var failed = false;

	gulp.src(['app/**/*.html', '!app/assets/js/**/*.html'])
		.pipe(plugins.w3cjs())
		.pipe(es.map(function (file, cb) {
			cb(null, file);
			if (!failed) {
				failed = !file.w3cjs.success;
			}
		}))
		.on('end', function () {
			if (failed) {
				done(new Error('Failed HTMLLint'));
			} else {
				done();
			}
		});
});

gulp.task('lint', ['jshint', 'lesslint', 'htmllint']);

gulp.task('default', ['lint', 'build', 'browser-sync'], function () {
	gulp.watch('app/assets/less/**/*.less', ['less']);
});
