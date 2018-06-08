const gulp = require('gulp')
const watch = require("gulp-watch")
const babel = require('gulp-babel')
const rollup = require('gulp-rollup')
const replace = require('rollup-plugin-replace')
const sequence = require('gulp-sequence')

const SRC = './src/server/**/*.js'
const DEST = './dist'
const CLEANJS = './src/server/config/index.js'

gulp.task('build:dev', () =>
  watch(SRC, {ignoreInitial: false}, () => gulp.src(SRC)
    .pipe(babel({
      babelrc: false,
      plugins: [ 'transform-decorators-legacy' ]
    }))
    .pipe(gulp.dest(DEST))
  )
)

gulp.task('build:prod', () => {
  gulp.src(SRC)
  .pipe(babel({
    babelrc: false,
    ignore: CLEANJS,
    plugins: [ 'transform-decorators-legacy' ]
  }))
  .pipe(gulp.dest(DEST))
})

gulp.task('clean:config', () => {
  gulp.src(SRC)
  .pipe(rollup({
    format: 'cjs',
    input: CLEANJS,
    plugins: [
      replace({ 'process.env.NODE_ENV': "'production'" })
    ]
  }))
  .pipe(gulp.dest(DEST))
})

let _task = ['build:dev']

if (process.env.NODE_ENV === 'production') {
  _task = sequence('build:prod', 'clean:config')
}

gulp.task('default', _task)
