const gulp = require('gulp');
const connect = require('gulp-connect');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename')
const htmlmin = require('gulp-htmlmin');

gulp.task('connect', () => {
    connect.server({
      root: 'dist',
      livereload: true
    });
});

gulp.task('build:css', () => {
    return gulp.src('src/styles/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({ extname: '.css' }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(connect.reload());
});

gulp.task('build:index', () => {
    return gulp.src('src/index.ejs')
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('build:about', () => {
    return gulp.src('src/about/**/*.ejs')
        .pipe(ejs())
        .pipe(rename({ extname: '.html' }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/about'))
        .pipe(connect.reload());
});

gulp.task('watch', (done) => {
    gulp.watch(['src/styles/**/*.sass'], gulp.series('build:css'));
    gulp.watch(['src/index.ejs'], gulp.series('build:index'));
    gulp.watch(['src/about/**/*.ejs'], gulp.series('build:about'));

    gulp.watch(['src/partials/**/*.ejs'], gulp.series('build'));
});

gulp.task('build', gulp.parallel('build:css', 'build:index', 'build:about'));

gulp.task('default', gulp.series('build', gulp.parallel('connect', 'watch')));
