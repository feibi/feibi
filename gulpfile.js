var gulp = require('gulp'),
    clean = require('gulp-clean'),
    svgSprite = require('gulp-svg-sprite'),
    plumber = require('gulp-plumber'),
    fileInclude = require('gulp-file-include');

var config = {
    shape: {
        dimension: { // Set maximum dimensions
            maxWidth: 32,
            maxHeight: 32
        },
        spacing: { // Add padding
            padding: 10
        }
    },
    mode: {
        // view: { // Activate the «view» mode
        //     bust: true,
        //     render: {
        //         scss: true, // Activate Sass output (with default options)
        //         css: true
        //     },
        //     sprite: "../fonts/sprite.name.svg",
        //     dimensions: '-name',
        //     dest: 'sass',
        //     example: false
        // },
        symbol: {
            dest: './',
            dimensions: '-icon',
            render:{
              scss:{
                dest:'sass/sprite.scss'
              }
            }
        }
    } // Activate the «symbol» mode
};
gulp.task('svg', function() {
    gulp.src('app/images/svg/*.svg')
        .pipe(plumber())
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./app'));
});
gulp.task('symbol', ['svg'], function() {
    gulp.src('app/svg/*.svg')
        .pipe(plumber())
        .pipe(gulp.dest('./dist/svg'))
});
gulp.task('include', ['symbol'], function() {
    gulp.src(['app/index.html'])
        .pipe(plumber())
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});
gulp.task('clean', function() {
    gulp.src('./dist', {
            read: false
        })
        .pipe(plumber())
        .pipe(clean({
            force: true
        }))
});


gulp.task('default', ['clean', 'include']);
