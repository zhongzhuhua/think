const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
// nested：嵌套缩进的css代码，它是默认值。
// expanded：没有缩进的、扩展的css代码。
// compact：简洁格式的css代码。
// compressed：压缩后的css代码。
const sass = require('gulp-sass');
const cache = require('gulp-cache');

gulp.task('css:pc:common', () => {
  gulp.src('www/assets/css/common/**/*.pc.scss')
    .pipe(autoprefixer({
      browsers: ['ie >= 8', 'Firefox > 10', 'chrome>1.0'],
      cascade: false
    }))
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(gulp.dest('www/static/common/css'))
});

gulp.task('css:mm:common', () => {
  gulp.src('www/assets/css/common/**/*.mm.scss')
    .pipe(autoprefixer({
      browsers: ['Android >= 2.1', 'IOS >= 5.0'],
      cascade: false
    }))
    .pipe(sass({
      outputStyle: 'compact'
    }))
    .pipe(gulp.dest('www/static/common/css'))
});

gulp.task('default', ['css:pc:common', 'css:mm:common']);
