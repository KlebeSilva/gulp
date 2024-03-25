const GulpClient = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return GulpClient.src('./source/images/*')
    .pipe(imagemin())
    .pipe(GulpClient.dest('./build/images'));
}

function comprimeJavaScript() {
    return GulpClient.src('./source/scripts/*.js')
    .pipe(uglify ())
    .pipe(obfuscate())
    .pipe(GulpClient.dest('./build/scripts'))
}

function compilaSass() {
    return GulpClient.src('./source/styles/main.scss')
    .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(GulpClient.dest('./build/styles'));
}







exports.default = function() {
GulpClient.watch('./source/styles/*.scss', GulpClient.series(compilaSass));
GulpClient.watch('./source/scripts/*.js', GulpClient.series(comprimeJavaScript));
GulpClient.watch('./source/images/*', GulpClient.series(comprimeImagens));
}
