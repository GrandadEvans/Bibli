var elixir = require('laravel-elixir');
var vueify = require('laravel-elixir-vueify');
var clear  = require('laravel-elixir-clear');
var images = require('laravel-elixir-images');
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
    mix
        // Clear the published files and replace them with new ones
        .clear([
            'public/css/**/*',
            'public/images/',
            'public/js',
            'public/fonts'
        ])

        /**
         *  Copy the fonts across
         *
         *  @todo Create a laravel-elixir-copyfonts package
         */
        .copy('./bower_components/font-awesome/fonts/**/*', './public/fonts')
        .copy('./resources/fonts/**/*', './public/fonts')

        // Copy the images across
        .images(null, 'public/images')

        // .phpUnit()

        // Copy the normal stylesheets across
        .styles([
                "../../../bower_components/bootstrap-sweetalert/dist/sweetalert.css",
                "../../../bower_components/animate.css/animate.css"
            ], "./public/css/plugins.css")

        // Process the SCSS files
        .sass([
            "../../../bower_components/font-awesome/scss/font-awesome.scss",
            "app.scss"
        ])

        // Process the plugin javascript files and concatenate them into one
        .scripts([
                "../../../bower_components/jquery/dist/jquery.js",
                "../../../bower_components/tether/dist/js/tether.js",
                "../../../bower_components/bootstrap/dist/js/bootstrap.js",
                // "../../../bower_components/typeahead.js/dist/typeahead.bundle.js",
                "../../../bower_components/bootstrap-sweetalert/dist/sweetalert.js"
            ], "./public/js/plugins.js")

        // Run browserify and process Vue files
        .browserify([
            "main.js"
        ], "./public/js/main.js")

        // Run Browsersync so that we have live dev environment
        .browserSync({
            proxy: "http://bibli.app"
        });
});
