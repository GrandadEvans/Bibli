var elixir = require('laravel-elixir');
var vueify = require('laravel-elixir-vueify');
var gulp = require('gulp');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    gulp.src("./bower_components/font-awesome/fonts/**/*")
        .pipe(gulp.dest("./public/fonts"));
    mix
        // .phpUnit()

        .styles([
                "../../../bower_components/bootstrap-sweetalert/dist/sweetalert.css",
                "../../../bower_components/animate.css/animate.css"
            ],
            "./public/css/plugins.css"
        )

        .sass([
            "../../../bower_components/font-awesome/scss/font-awesome.scss",
            "app.scss"
        ])

        .scripts(
            [
                "../../../bower_components/jquery/dist/jquery.js",
                "../../../bower_components/tether/dist/js/tether.js",
                "../../../bower_components/bootstrap/dist/js/bootstrap.js",
                // "../../../bower_components/typeahead.js/dist/typeahead.bundle.js",
                "../../../bower_components/bootstrap-sweetalert/dist/sweetalert.js"
            ],
            "./public/js/plugins.js"
        )

        .browserify([
            "main.js"
        ], "./public/js/main.js"
        )

        .browserSync({
            proxy: "http://bibli.app"
        });
});
