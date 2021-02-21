const gulp = require('gulp');

// Определяем константы Gulp
const { src, dest, parallel, series, watch } = require('gulp');

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass');
const less = require('gulp-less');

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем модуль 'gulp-watch
const watching = require('gulp-watch');

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем Browsersync
const browserSync = require('browser-sync').create();

const project = "dist";

const source = "src";

const postcss = require('gulp-postcss');




function styles() {
    return src('app/main.sass') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
        .pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
        .pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
        .pipe(cleancss({ level: { 1: { specialComments: 0 } }, format: 'beautify' }))
        .pipe(dest('src/app/css/')) // Выгрузим результат в папку "app/css/"
        .pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function browsersync() {
    browserSync.init({
        server: { baseDir: "src/app/index.html" },
        port: 3000,
        notify: false,
        online: false
    })
}


function html() {
    return src(app.index.html)
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}



gulp.task('watch', function() {
    gulp.watch('src/app/sass/**/*.sass', ['styles']);
    gulp.watch('app/libs/**/*.js', ['scripts']);
    gulp.watch('app/js/*.js').on("change", browserSync.reload);
    gulp.watch('src/app/*.html').on('change', browserSync.reload);
});

// Мониторим файлы препроцессора на изменения
watch('src/app/sass/**/*.sass', styles);

// Мониторим файлы HTML на изменения
watch('src/app/index.html').on('change', browserSync.reload);





// Экспортируем функцию styles() 
exports.watch = watch;

// Экспортируем функцию styles() 
exports.styles = styles;

// Экспортируем функцию browsersync() 
exports.browsersync = browsersync;

// Экспортируем функцию html() 
exports.html = html;



// Экспорт функции images() в таск images
exports.img = img;


// Экспортируем дефолтный таск с нужным набором функций
exports.default = parallel(browsersync, html, watch);