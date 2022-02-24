const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

const fileinclude = require('gulp-file-include');

//watch files once
function includeHTML() {
    return src('src/html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
};
exports.html = series(includeHTML, mv_img, mv_js, mv_php);

//watch files many times
exports.w = function watchs() {
    watch(['src/html/*.html', 'src/html/**/*.html'], includeHTML);
    watch(['src/js/*.*', 'src/js/**/*.*'], mv_js);
    watch(['src/phps/*.*', 'src/phps/**/*.*'], mv_php);
    watch(['src/assets/*.*', 'src/assets/**/*.*'], mv_img);
}

//  圖片搬家
function mv_img() {
    return src(['src/assets/*.*', 'src/assets/**/*.*']).pipe(dest('dist/assets/'))
}
exports.mvimg = mv_img

//  JS搬家
function mv_js() {
    return src(['src/js/*.*', 'src/js/**/*.*']).pipe(dest('dist/js'))
}
exports.mvjs = mv_js

//  PHP搬家
function mv_php() {
    return src(['src/phps/*.*', 'src/phps/**/*.*']).pipe(dest('dist/phps'))
}
exports.mvphp = mv_php

// JS檔壓縮
const uglify = require('gulp-uglify');
// 更名
const rename = require('gulp-rename');
// 上線用
// JS壓縮並更名
function ugjs() {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js/min'));
}
exports.minjs = ugjs;


// 壓縮css 
const cleanCSS = require('gulp-clean-css');

function cleanC() {
    return src('dist/assets/css/*.css') //來源
        .pipe(cleanCSS()) // 壓縮
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('dist/assets/css/min')) // 目的地
}
exports.mincss = cleanC;


// 合併css
var concat = require('gulp-concat');

function concatCss() {
    return src('dist/assets/css/*.css').pipe(concat('all.css')).pipe(dest('dist/assets/css/all/'))
}
exports.allcss = concatCss

// 同時壓縮JS、CSS
exports.all = series(ugjs, cleanC);

// 同時壓縮JS、CSS、img
exports.min = series(ugjs, cleanC, min_images);


// sass編譯
// const sass = require('gulp-sass')(require('sass'));

// function sassstyle() {
//     return src('src/sass/*.scss')
//         .pipe(sass.sync().on('error', sass.logError))
//         .pipe(dest('dist/assets/css'));
// }

// exports.scss = sassstyle;



//  圖片壓縮 （上線用）
const imagemin = require('gulp-imagemin');

function min_images() {
    return src('src/assets/images/**/*.*')
        .pipe(imagemin([
            imagemin.mozjpeg({
                quality: 70,
                progressive: true
            })
            // 壓縮品質 quality越低 -> 壓縮越大 -> 品質越差 
        ]))
        .pipe(dest('dist/assets/images/min'))
}
exports.img = min_images;