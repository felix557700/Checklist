import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import relativeSource from 'gulp-relative-sourcemaps-source';
import stylus from 'gulp-stylus';
import runsequence from 'run-sequence';
import shell from 'gulp-shell';

// Set production flag
var isProduction = process.env.IS_PRODUCTION || false;

const paths = {
	js: ['./src/**/*.js'],
	destination: './app'
};

gulp.task('clean', callback => {
	rimraf(paths.destination, callback);
});

gulp.task('babel', () => {
	if (isProduction) {
		return gulp.src(paths.js)
			.pipe(babel())
			.pipe(gulp.dest(paths.destination));
	}

	return gulp.src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(relativeSource({dest: 'app'}))
		.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '.'}))
		.pipe(gulp.dest(paths.destination));
});

gulp.task('dev', ['babel'], () => {
	nodemon({
		verbose: true,
		ignore: ['.git', '.idea', 'node_modules/**/node_modules', 'test', './app'],
		watch: ['./src', './public'],
		script: './app/server.js',
		nodeArgs: ['--debug'],
		ext: 'js json',
		env: {'NODE_ENV': 'development'}
	}).on('restart', ['babel']);
});


gulp.task('clean', function () {
	return del('./frontend-public');
});

gulp.task('copy:html', function () {
	gulp.src('./frontend/**/*.html')
		.pipe(gulp.dest('./frontend-public'));
});

gulp.task('copy:css', function () {
	gulp.src('./frontend/**/*.styl')
		.pipe(stylus())
		.pipe(gulp.dest('./frontend-public'));

});

gulp.task('run webpack', shell.task(['npm run bundle']));

gulp.task('build:frontend', function () {
	runsequence('clean', ['copy:html', 'copy:css', 'run webpack']);
});

gulp.task('watch:frontend', function () {
	gulp.watch('./frontend/**/*', ['build:frontend']);
});
