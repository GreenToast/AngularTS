/// <binding ProjectOpened='watch' />
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del'),
    minifyHtml = require("gulp-minify-html"),
    fs = require('fs'),
    mainBowerFiles = require('main-bower-files'),
    sass = require('gulp-sass'),
    ts = require('gulp-tsc');

var paths = {
    scripts: ['app/js/**/*.js'],
    typescripts: ['app/js/**/*.ts'],
    images: [],
    css: ['app/css/**/*.css'],
    scss: ['app/css/**/*.scss'],
    html: ['app/index.html', 'app/templates/**/*.html'],
    libs: ['app/libs/**/*.ts', '!app/libs/ext/**/*.ts'],
    extlibs: ['app/libs/ext/**/*.*'],
    fonts: []
};

var buildpaths = {
    scripts: ['build/AngularTS/js/**/*.js'],
    images: ['build/AngularTS/imgs/**/*'],
    css: ['build/AngularTS/css/**/*.css'],
    html: ['build/AngularTS/index.html', 'build/AngularTS/templates/**/*.html' ],
    libs: ['build/AngularTS/libs/**/*.*', '!build/ProducerPro/libs/ext/**/*.*'],
    extlibs: ['build/AngularTS/libs/ext/**/*.*'],
    fonts: []
};

var buildpath = 'build/AngularTS'


gulp.task("bower-files-prod", function () {
    return gulp.src(mainBowerFiles({ env: 'production' }), { base: './app/libs/ext' }).pipe(gulp.dest("./lib"));
});

gulp.task('clean', function () {
    var basedir = buildpath;
    var files = fs.readdirSync(basedir);

    files.forEach(function (dir) {
        del.sync(basedir + '/' + dir);
    });
    return files;
});



gulp.task('cleanscripts', function () {
    return del.sync(buildpaths.scripts);
});

gulp.task('cleanimages', function () {
    return del.sync(buildpaths.images);
});

gulp.task('cleanhtml', function () {
    return del.sync(buildpaths.html);
});

gulp.task('cleanothers', function () {
    return del.sync(buildpaths.extlibs.concat(buildpaths.fonts).concat(buildpaths.css));
});


gulp.task('copy', ['cleanothers'], function () {
    gulp.src(paths.css.concat(paths.fonts), { base: './app' })
    .pipe(gulp.dest(buildpath));
    gulp.src(mainBowerFiles({ env: 'development' }), { base: './app' }).pipe(gulp.dest(buildpath));
    return gulp.src(paths.scss, { base: './app' })
    .pipe(sass())
    .pipe(gulp.dest(buildpath));
});

gulp.task('compilesass', function () {
    gulp.src(paths.scss, { base: './app' })
    .pipe(sass())
    .pipe(gulp.dest(buildpath));
});


gulp.task('html', ['cleanhtml'], function () {
    return gulp.src(paths.html, { base: './app/' }) // path to your files
     //.pipe(minifyHtml())
     .pipe(gulp.dest(buildpath));
});

gulp.task('compiletypescripts', ['scripts'], function () {
    return gulp.src(paths.typescripts.concat(paths.libs), { base: './app/', dot: true })
        .pipe(sourcemaps.init())
        .pipe(ts({ module: 'amd', emitError: false }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildpath));
});

gulp.task('scripts', ['cleanscripts'], function () {
    gulp.src(paths.typescripts.concat(paths.libs), { base: './app/', dot: true })
        .pipe(sourcemaps.init())
        .pipe(ts({ module: 'amd', emitError: false }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildpath));
    return gulp.src(paths.scripts.concat(paths.libs), { base: './app/', dot: true })
        .pipe(sourcemaps.init())
      //  .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(buildpath));
});

gulp.task('images', ['clean'], function () {
    return gulp.src(paths.images, { base: './app/' })
    // Pass in options to the task
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(buildpath));
});


gulp.task('buildprod', function () {

});

gulp.task('watch', function () {
    gulp.watch(paths.scripts.concat(paths.typescripts).concat(paths.libs), ['jsreload']);
    gulp.watch(paths.images, ['imagesreload']);
    gulp.watch(paths.html, ['htmlreload']);
    gulp.watch(paths.css, ['copy']);
    gulp.watch(paths.scss, ['compilesass']);
});


gulp.task('startServer', ['copy', 'scripts', 'images', 'html', 'watch'], function () {
    connect.server({
        root: [buildpath],
        livereload: true,
        port: 9000
    });
});

gulp.task('htmlreload', ['html'], function () {
    return gulp.src(buildpaths.html)
      .pipe(connect.reload());
});

gulp.task('imagesreload', ['images'], function () {
    gulp.src(buildpaths.images)
      .pipe(connect.reload());
});

gulp.task('jsreload', ['scripts'], function () {
    gulp.src(buildpaths.scripts)
    .pipe(connect.reload());
});

gulp.task('buildrelease', ['buildprod']);