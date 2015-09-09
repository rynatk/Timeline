var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    minifyCss   = require('gulp-minify-css'),
    browserSync = require('browser-sync').create();
    ghPages     = require('gulp-gh-pages');

gulp.task('jade', function() {
  gulp.src('./src/**/*.jade')
   .pipe(jade({locals: {
     pageTitle: "Paws of Love 2: Electric Boogaloo"
   }}))
   .pipe(gulp.dest('./dist/'))
})

gulp.task('sass', function() {
  gulp.src('./src/styles/**/*.sass')
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/styles'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'jade'], function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch('./src/styles/**/*.sass', ['sass']);
  gulp.watch('./src/**/*.jade', ['jade']);
  gulp.watch('./dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*.html')
    .pipe(ghPages());
});
