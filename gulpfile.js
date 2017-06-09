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
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
let env = 'dev';

// 配置
let configs = {
  // 打包公用样式
  commonCss: ['css:common:clean', 'css:pc:common', 'css:mm:common'],
  // 打包公用脚本
  commonJs: ['js:common:clean', 'js:pc:common', 'js:mm:common'],
  // 脚本
  js: ['js:clean', 'js'],
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

// 脚本
gulp.task('js:clean', () => {
  return gulp.src('./www/static/js/**/*.js')
    .pipe(clean());
});

gulp.task('js', () => {
  gulp.src('./www/assets/js/**/*.js')
    .pipe(browserify())
    .pipe(rev())
    .pipe(gulp.dest('./www/static/js'))
    .pipe(rev.manifest({
      path: 'js.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

// 公用脚本
gulp.task('js:common:clean', () => {
  return gulp.src('./www/static/lib')
    .pipe(clean());
});

gulp.task('js:pc:common', () => {
  gulp.src(['./www/assets/lib/jquery.js'])
    .pipe(concat('dll.pc.js'))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/lib'))
    .pipe(rev.manifest({
      path: 'js.pc.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

gulp.task('js:mm:common', () => {
  gulp.src(['./www/assets/lib/zepto.js'])
    .pipe(concat('dll.mm.js'))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/lib'))
    .pipe(rev.manifest({
      path: 'js.mm.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

// 公用样式
gulp.task('css:common:clean', () => {
  return gulp.src('./www/static/css/common')
    .pipe(clean());
});

gulp.task('css:pc:common', () => {
  gulp.src('./www/assets/css/common/**/*.pc.*')
    .pipe(rev())
    .pipe(cache(autoprefixer(configs.cssPC)))
    .pipe(sass(configs.cssOutput))
    .pipe(gulp.dest('./www/static/css/common'))
    .pipe(rev.manifest({
      path: 'css.pc.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

gulp.task('css:mm:common', () => {
  gulp.src('./www/assets/css/common/**/*.mm.*')
    .pipe(rev())
    .pipe(cache(autoprefixer(configs.cssMM)))
    .pipe(sass(configs.cssOutput))
    .pipe(gulp.dest('./www/static/css/common'))
    .pipe(rev.manifest({
      path: 'css.mm.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

// 生成公用脚本，由于不经常变化，所有执行一次即可
gulp.task('buildlib', () => {
  gulp.start(configs.commonJs);
});

// 生成脚本
gulp.task('buildjs', () => {
  gulp.start(configs.js);
});

// 默认
gulp.task('default', function() {
  gulp.start(configs.commonCss);
  gulp.start(configs.commonJs);
  gulp.start(configs.js);
});

// 开发
gulp.task('watch', () => {
  gulp.watch('./www/assets/css/**/*.scss', configs.commonCss);
  gulp.watch('./www/assets/js/**/*.js', configs.js);
});

// 打包上线
gulp.task('build', () => {
  env = 'prd';
  gulp.start('default');
});
