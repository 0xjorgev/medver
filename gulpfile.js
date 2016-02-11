var gulp = require('gulp');
server = require( 'gulp-develop-server' );
livereload = require( 'gulp-livereload' );
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  // place code for your default task here
});

var options = {
    path: 'app.js'
};

var serverFiles = [
    './app.js',
    './Route/*.js',
    './Model/*.js',
    './Config/*.js'
];

gulp.task( 'server:start', function() {
    server.listen( options, livereload.listen );
});

// If server scripts change, restart the server and then livereload.
gulp.task( 'default', [ 'server:start' ], function() {

    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }
    gulp.watch( serverFiles ).on( 'change', restart );
});

gulp.task('jshint', function () {
	gulp.src(serverFiles)
  		.pipe(jshint())
  		.pipe(jshint.reporter('jshint-stylish'))
  		.pipe(jshint.reporter('fail'));
});

// gulp.task( 'server:start', function() {
//     server.listen( { path: './app.js' } );
// });

// // restart server if app.js changed
// gulp.task( 'server:restart', function() {
//     gulp.watch( [ './app.js' ], server.restart );
// });
