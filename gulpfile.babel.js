import gulp from "gulp"; // as like webpack
import sass from "gulp-sass"; // can compile SCSS into CSS
import autoprefixer from "gulp-autoprefixer"; // make our code compatible in various websites automatically
import minifyCSS from "gulp-csso"; // make our CSS code minified
import del from "del"; // delete files automatically
import browserify from "gulp-browserify"; //
import babelify from "babelify";

sass.compiler = require("node-sass");

const paths = {
  styles: {
    src: "assets/scss/styles.scss",
    dest: "src/static/styles",
    watch: "assets/scss/**/*.scss"
  },
  js: {
    src: "assets/js/main.js",
    dest: "src/static/js",
    watch: "assets/js/**/*.js"
  }
};

const clean = () => del(["src/static"]);

const styles = () =>
  gulp
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

const js = () =>
  gulp
    .src(paths.js.src)
    .pipe(
      browserify({
        transform: [
          babelify.configure({
            presets: ["@babel/preset-env", "@babel/preset-react"]
          })
        ]
      })
    )
    .pipe(gulp.dest(paths.js.dest));

const watchFiles = () => {
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
};

const dev = gulp.series(clean, styles, js, watchFiles);

export default dev;
