const gulp = require("gulp");
const pkg = require("./package.json");

const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const header = require("gulp-header");
const size = require("gulp-size");
const stylus = require("gulp-stylus");

const comment = `/**
 * Swush v${pkg.version}
 * Copyright 2016-2017 Ohans Emmanuel
 * Released under the MIT License
 * http://swush.xyz
 */\r\n`;

gulp.task("build", function () {
  return gulp.src(["./src/list.styl", "./src/text.styl", "./src/viewport.styl"])
    .pipe(concat("swush.styl"))
    .pipe(stylus())
    .pipe(header(comment + "\r\n"))
    .pipe(size())
    .pipe(gulp.dest("./dist/"));
});

gulp.task("minify", ["build"], function() {
  return gulp.src(["./dist/swush.css"])
    .pipe(minifyCSS())
    .pipe(header(comment))
    .pipe(size())
    .pipe(size({
      gzip: true
    }))
    .pipe(concat("swush.min.css"))
    .pipe(gulp.dest("./dist/"));
});


gulp.task("watch", function() {
  gulp.watch(["src/*.css"], ["default"]);
});


gulp.task("default", ["build", "minify"]);
