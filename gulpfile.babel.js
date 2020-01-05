import gulp from "gulp"; // as like webpack
import sass from "gulp-sass"; // can compile Sass into CSS
import autoprefixer from "gulp-autoprefixer"; // make our code compatable in various websites automatically
import minifyCSS from "gulp-csso"; // make our CSS code minified

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  }
};

function styles() {
  return gulp
    .src(paths.styles.src) // from
    .pipe(sass()) // interpret or compile scss into CSS
    .pipe(
      autoprefixer({
        Browserslist: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest)); // to
}

function watchFiles() {
  gulp.watch(paths.styles.watch, styles);
}

const dev = gulp.series([styles, watchFiles]);

export default dev;
