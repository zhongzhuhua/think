const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
// nested：嵌套缩进的css代码，它是默认值。
// expanded：没有缩进的、扩展的css代码。
// compact：简洁格式的css代码。
// compressed：压缩后的css代码。
const sass = require('gulp-sass');
const cache = require('gulp-cache');
const rev = require('gulp-rev');
const clean = require('gulp-clean');
let env = 'dev';

// 配置
let configs = {
  // 打包公用样式
  commonCss: ['css:common:clean', 'css:pc:common', 'css:mm:common'],
  // pc autoprefixer 兼容
  cssPC: {
    browsers: ['ie >= 8', 'Firefox > 10', 'chrome>1.0'],
    cascade: false
  },
  // mobile autoprefixer 兼容
  cssMM: {
    browsers: ['Android >= 2.1', 'IOS >= 5.0'],
    cascade: false
  },
  // 样式压缩格式
  cssOutput: {
    outputStyle: env == 'dev' ? 'expanded' : 'compressed'
  }
};

// 公用脚本

// 公用样式
gulp.task('css:common:clean', () => {
  return gulp.src('www/static/common/css')
    .pipe(clean());
});

gulp.task('css:pc:common', () => {
  gulp.src('www/assets/css/common/**/*.pc.scss')
    .pipe(rev())
    .pipe(cache(autoprefixer(configs.cssPC)))
    .pipe(sass(configs.cssOutput))
    .pipe(gulp.dest('www/static/common/css'))
    .pipe(rev.manifest({
      path: 'css.pc.common.json'
    }))
    .pipe(gulp.dest('www/rev'))
});

gulp.task('css:mm:common', () => {
  gulp.src('www/assets/css/common/**/*.mm.scss')
    .pipe(rev())
    .pipe(cache(autoprefixer(configs.cssMM)))
    .pipe(sass(configs.cssOutput))
    .pipe(gulp.dest('www/static/common/css'))
    .pipe(rev.manifest({
      path: 'css.mm.common.json'
    }))
    .pipe(gulp.dest('www/rev'))
});

// 开发
gulp.task('default', configs.commonCss);
gulp.task('watch', () => {
  gulp.watch('./www/assets/css/**/*.scss', configs.commonCss);
});

gulp.task('build', () => {
  env = 'prd';
  gulp.run(configs.commonCss);
});
