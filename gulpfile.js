import gulp from 'gulp';
import njkRender from 'gulp-nunjucks-render';
import data from 'gulp-data';
import fs from 'fs';
import del from 'del';
import path from 'path';

const paths = {
  getDir: () => path.resolve(),
  getPathToData: () => './src/data/',
  getPathToTemplate: () => './src/templates/',
  getDataFileName: () => 'data.json',
}

const getPath = (filePath, fileName) => path.join(filePath, fileName);
const dataPath = getPath(paths.getPathToData(), paths.getDataFileName());
const pageData = fs.readFileSync(dataPath, 'utf-8');

const render = () => {
  return gulp
    .src(`${paths.getPathToTemplate()}*.html`)
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
