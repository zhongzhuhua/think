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
const babelify = require('babelify');
const uglify = require('gulp-uglify');
let env = 'dev';

// 配置
let configs = {
  // 打包公用样式
  commonCss: ['css:common:compile'],
  // 打包公用脚本
  commonJs: ['js:common:compile'],
  // 脚本
  js: ['js:compile'],
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
  },
  // js 压缩配置
  jsMini: {
    drop_console: true
  }
};

// 脚本
gulp.task('js:compile', ['js:clean'], () => {
  if (env == 'prd') {
    gulp.start('js:mini');
  } else {
    gulp.start('js');
  }
});

gulp.task('js:clean', () => {
  return gulp.src('./www/static/js/**/*.js')
    .pipe(clean());
});

gulp.task('js', () => {
  gulp.src('./www/assets/js/**/*.js')
    .pipe(cache(browserify({
      transform: ['babelify'],
      debug: env == 'dev'
    })))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/js'))
    .pipe(rev.manifest({
      path: 'js.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

gulp.task('js:mini', () => {
  gulp.src('./www/assets/js/**/*.js')
    .pipe(cache(browserify({
      transform: ['babelify'],
      debug: env == 'dev'
    })))
    .pipe(uglify(configs.jsMini))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/js'))
    .pipe(rev.manifest({
      path: 'js.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

// 公用脚本
gulp.task('js:common:compile', ['js:common:clean', 'js:mm:common'], () => {
  gulp.start('js:pc:common');
});

gulp.task('js:common:clean', () => {
  return gulp.src('./www/static/lib/**/*.js')
    .pipe(clean());
});

gulp.task('js:pc:common', () => {
  return gulp.src(['./www/assets/lib/jquery.js'])
    .pipe(uglify({}))
    .pipe(concat('dll.pc.js'))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/lib'))
    .pipe(rev.manifest({
      path: 'js.pc.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

gulp.task('js:mm:common', () => {
  return gulp.src(['./www/assets/lib/zepto.js'])
    .pipe(uglify({}))
    .pipe(concat('dll.mm.js'))
    .pipe(rev())
    .pipe(gulp.dest('./www/static/lib'))
    .pipe(rev.manifest({
      path: 'js.mm.common.json'
    }))
    .pipe(gulp.dest('./www/rev'));
});

// 公用样式
gulp.task('css:common:compile', ['css:common:clean'], () => {
  gulp.start('css:pc:common');
  gulp.start('css:mm:common')
});

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
  cache.clearAll();
  gulp.start(configs.commonCss);
  gulp.start(configs.commonJs);
  gulp.start(configs.js);
});

// 开发
gulp.task('watch', () => {
  cache.clearAll();
  gulp.watch('./www/assets/css/**/*.scss', configs.commonCss);
  gulp.watch('./www/assets/js/**/*.js', configs.js);
  gulp.watch('./www/assets/components/**/*.js', configs.js);
  gulp.watch('./www/assets/configs/**/*.js', configs.js);
});

// 打包上线
gulp.task('build', () => {
  env = 'prd';
  gulp.start('default');
});
