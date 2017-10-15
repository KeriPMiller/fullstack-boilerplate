const gulp = require('gulp');
const markdown = require('gulp-markdown-it');

gulp.task('markdown', function() {
    return gulp.src('**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest('./auto-html'));
});

gulp.task('default', ['markdown'], function() {
    gulp.watch('**/*.md', ['markdown']);
});
