const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

const fileinclude = require('gulp-file-include');

//watch files once
exports.html = function includeHTML() {
    return src('html/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./'));
};

//watch files many times
exports.w = function watchs() {
    watch(['html/*.html', 'html/**/*.html'], exports.html);
}