import gulp from 'gulp';
import gutil from 'gulp-util';
import del from 'del';
import browserify from 'browserify';
import runSequence from 'run-sequence';
import source from 'vinyl-source-stream';
import watch from 'gulp-watch';

gulp.task('clean', del.bind(null, ['dist']));

const bundleSubTasks = [];
function bundle(filename) {
    const taskName = 'bundle: ' + filename;
    bundleSubTasks.push(taskName);
    gulp.task(taskName, () => {
        return browserify('./src/' + filename)
            .bundle()
            .on('error', function (e) {
                gutil.log(e);
            })
            .pipe(source(filename))
            .pipe(gulp.dest('./dist/scripts'));
    });
}
gulp.task('bundle', cb => {
    runSequence(bundleSubTasks, cb);
});

gulp.task('bundle:watch', function () {
    // Might need to add something like gulp-plumber if the watch borks due to errors.
    // See https://github.com/floatdrop/gulp-watch/blob/master/docs/readme.md#prevent-pipe-breaking-on-errors
    return watch(['ext-src/**/*', 'src/**/*'], function () {
        runSequence(bundleSubTasks);
    });
});

const copySubTasks = [];
function copy(from, to) {
    const taskName = 'copy: ' + from + ' --> ' + to;
    copySubTasks.push(taskName);
    gulp.task(taskName, () => {
        return gulp.src(from).pipe(gulp.dest(to));
    });
}
gulp.task('copy', cb => {
    runSequence(copySubTasks, cb);
});

gulp.task('default', (callback) => {
    runSequence(
        'clean',
        ['bundle', 'copy'],
        callback);
});

// Create copy tasks ...
copy('ext-src/**', 'dist');
copy('node_modules/bootstrap/dist/**', 'dist/bootstrap');

// Bundle main extension scripts
bundle('background.js');
bundle('devtools.js');
bundle('panel.js');

// Bundle content scripts
bundle('content-scripts/bundle-data.js');
