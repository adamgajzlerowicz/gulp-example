var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('./wp-content/themes/dazzling/style/style.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./wp-content/themes/dazzling/'));
})

gulp.task('styles-wct', function() {
    gulp.src('./wp-content/plugins/woocommerce-tailors/css/wct-style.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('./wp-content/plugins/woocommerce-tailors/css/'));
})

gulp.task('lint', function() {
  gulp.src('./wp-content/plugins/woocommerce-tailors/js/wct-script.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {

    gulp.watch('wp-content/themes/dazzling/style/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('wp-content/plugins/woocommerce-tailors/css/**', function(event) {
        gulp.run('styles-wct');
    })

    gulp.watch('./wp-content/plugins/woocommerce-tailors/js/wct-script.js', function(event) {
        gulp.run('lint');
    })
    gulp.run('styles');
    gulp.run('lint');
    gulp.run('styles-wct');

})

var gulp = require('gulp');
var watch = require('gulp-watch');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();



gulp.task('serve', ['styles-wct','styles'], function() {

    browserSync.init({
        proxy: "http://localhost/shirts-with-buttons/",
    });

    gulp.watch("./wp-content/plugins/woocommerce-tailors/css/**", ['styles-wct']);
    gulp.watch("./wp-content/themes/dazzling/style/style.scss", ['styles']);
    //gulp.watch("./wp-content/themes/dazzling/**/*.php").on('change', browserSync.reload);
});

gulp.task('styles-wct', function() {
    return gulp.src("./wp-content/plugins/woocommerce-tailors/css/wct-style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./wp-content/plugins/woocommerce-tailors/css/"))
        .pipe(browserSync.stream());
});
gulp.task('styles', function() {
    return gulp.src("./wp-content/themes/dazzling/style/style.scss")
        .pipe(sass())
        .pipe(gulp.dest("./wp-content/themes/dazzling/style.css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
