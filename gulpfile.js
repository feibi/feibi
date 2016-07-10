var gulp = require('gulp'),
    clean = require('gulp-clean'),
    svgSprite = require('gulp-svg-sprite');

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
        view: { // Activate the «view» mode
            bust: true,
            render: {
                scss: true, // Activate Sass output (with default options)
                css: true
            },
            sprite: "../fonts/sprite.name.svg",
            dimensions: '-name',
            dest: 'sass',
            example: false
        },
        symbol: false // Activate the «symbol» mode

    }
};
gulp.task('svg', function() {
    gulp.src('app/images/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function() {
    gulp.src('./dist', {
            read: false
        })
        .pipe(clean({
            force: true
        }))
});


gulp.task('default', ['clean', 'svg']);
