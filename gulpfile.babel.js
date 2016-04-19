import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import relativeSource from 'gulp-relative-sourcemaps-source';
import runsequence from 'run-sequence';
import shell from 'gulp-shell';
import concat from 'gulp-concat';
import minifyCss from 'gulp-clean-css';
import sass from 'gulp-sass';
import merge from 'merge-stream';
import autoprefixer from 'gulp-autoprefixer';

var environment = process.env.NODE_ENV || 'development';

const paths = {
	js: ['./src/**/*.js'],
	destination: './app'
};

gulp.task('clean', callback => {
	rimraf(paths.destination, callback);
});

gulp.task('babel', () => {
	if (environment === 'production') {
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
		watch: ['./src', './frontend'],
		script: './app/server.js',
		nodeArgs: ['--debug'],
		ext: 'js json',
		env: {'NODE_ENV': 'development'}
	}).on('restart', ['build:frontend', 'babel']);
});


gulp.task('clean', function () {
	return del('./frontend_public');
});

gulp.task('copy:html', function () {
	gulp.src('./frontend/**/*.html')
		.pipe(gulp.dest('./frontend_public'));
});

gulp.task('copy:css', function () {
	var cssStream = gulp.src(['./frontend/**/*.css'])
		.pipe(concat('css-files.css'));

	var sassStream = gulp.src(['./frontend/**/*.sass'])
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(concat('css-files.css'));

	return merge(sassStream, cssStream)
		.pipe(concat('styles.css'))
		.pipe(autoprefixer({browsers: ['last 3 versions']}))
		.pipe(minifyCss())
		.pipe(gulp.dest('./frontend_public'));

});

gulp.task('copy:icon', function () {
	gulp.src(['./frontend/*.ico'])
		.pipe(gulp.dest('./frontend_public'));
});

gulp.task('run webpack', shell.task(['npm run bundle']));

gulp.task('build:frontend', function () {
	runsequence('clean', ['copy:html', 'copy:css', 'run webpack', 'copy:icon']);
});

gulp.task('watch:frontend', function () {
	gulp.watch('./frontend/**/*', ['build:frontend']);
});
