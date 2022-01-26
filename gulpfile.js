var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var header = require('gulp-header');
var del = require('del');


gulp.task('pack-js', function () {
    return gulp.src(
        [
            'src/source-1.js',  // Source
            'src/source-2.js',
            'src/source-3.js'
        ]).pipe(concat('bundle.js')) // Processed file
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true
        })).pipe(header('/* Created: ${d} */\n', { d : new Date()} ))
        .pipe(gulp.dest('build')); // Output (build) dir
});

gulp.task('pack-css', function () {
    return gulp.src(
        [
            'src/source-1.css', // Source
            'src/source-2.css',
            'src/source-3.css'
        ]).pipe(concat('bundle.css')) // Processed file
        .pipe(cleanCss())
        .pipe(header('/* Created: ${d} */\n', { d : new Date()} ))
        .pipe(gulp.dest('build')); // Output (build) dir
});

gulp.task('clean-js', function () {
    return del([
        'build/*.js' // Output (build) dir
    ]);
});

gulp.task('clean-css', function () {
    return del([
        'build/*.css' // Output (build) dir
    ]);
});

gulp.task('default', gulp.series('clean-js', 'clean-css', 'pack-js', 'pack-css'));