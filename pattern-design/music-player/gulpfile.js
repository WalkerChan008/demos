var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var uglify = require('gulp-uglify');
var stripDebug = require('gulp-strip-debug');
var concat = require('gulp-concat');
var lessToCss = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');

var folder = {
    src: 'src/',
    dist: 'dist/'
}

// var devMode = process.env.NODE_ENV == 'development';
// console.log('Running environment is:' + process.env.NODE_ENV);
var devMode = true;

gulp.task('html', function () {
    var temp = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())

    if(!devMode) {
        temp.pipe(htmlclean())
    }
    temp.pipe(gulp.dest(folder.dist + 'html/'))
})

gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(connect.reload())
        .pipe(gulp.dest(folder.dist + 'images/'))
})

gulp.task('js', function () {
    var temp = gulp.src(folder.src + 'js/*')
        .pipe(connect.reload())

    if(!devMode) {
        temp.pipe(stripDebug())
        // .pipe(concat('main.js'))
        .pipe(uglify())
    }
    temp.pipe(gulp.dest(folder.dist + 'js/'))
})

gulp.task('css', function () {
    var options = [autoprefixer(), cssnano()]
    var temp = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(lessToCss())

    if(!devMode) {
        temp.pipe(postcss(options))
    }
    temp.pipe(gulp.dest(folder.dist + 'css/'))
})

gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html'])
    gulp.watch(folder.src + 'images/*', ['images'])
    gulp.watch(folder.src + 'js/*', ['js'])
    gulp.watch(folder.src + 'css/*', ['css'])
})

gulp.task('server', function () {
    connect.server({
        port: 8080,
        livereload: true
    })
})

gulp.task('default', ['html', 'images', 'js', 'css', 'watch', 'server'])