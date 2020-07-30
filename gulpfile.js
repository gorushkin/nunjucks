import gulp from 'gulp';
import njkRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import fs from 'fs';
// import * as qwe from './src/data.json';
const pageData = fs.readFileSync('./src/data.json', 'utf-8');

const render = () => {
  return gulp
    .src('./src/pages/*')
    .pipe(data(() => JSON.parse(pageData)))
    .pipe(
      njkRender({
        path: ['src/'],
      })
    )
    .pipe(gulp.dest('build'));
};



gulp.task('default', () => render());