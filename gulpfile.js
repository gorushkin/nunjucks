import gulp from 'gulp';
import njkRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import fs from 'fs';
import del from 'del';
const pageData = fs.readFileSync('./src/data.json', 'utf-8');

const render = () => {
  return gulp
    .src('./src/templates/*')
    .pipe(data(() => JSON.parse(pageData)))
    .pipe(
      njkRender({
        path: ['src/'],
      })
    )
    .pipe(gulp.dest('build'));
};

const clean = () => del('./build');
const build = gulp.series(clean, render);

gulp.task('render', () => render());
gulp.task('clean', () => clean());
gulp.task('default', () => build());