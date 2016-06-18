var gulp = require('gulp'),
    browserSync = require('browser-sync');
    reload = browserSync.reload;

gulp.task('serve', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    './*.html',
    './*.js'
  ]).on('change', reload);
});
