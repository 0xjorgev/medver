var gulp = require('gulp');
server = require( 'gulp-develop-server' );
livereload = require( 'gulp-livereload' );
var jshint = require('gulp-jshint');
var git = require('gulp-git');

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

gulp.task('jshint', function () {
  gulp.src(serverFiles)
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('fail'));
});

// Run git add
// src is the file(s) to add (or ./*)
gulp.task('add', function(){
  return gulp.src('./*')
    .pipe(git.add( {args: '--all', quiet: false}));
});

// Run git commit, passing multiple messages as if calling
// git commit -m "initial commit" -m "additional message"
gulp.task('commit', function(){
  return gulp.src('./git-test/*')
    .pipe(git.commit(['Gulp automated message by Jorge']));
});

// Run git push
// remote is the remote repo
// branch is the remote branch to push to
gulp.task('push', function(){
  git.push('heroku', 'master', function (err) {
    if (err) throw err;
  });
});

gulp.task( 'server:start', function() {
    server.listen( options, livereload.listen );
});

gulp.task('gitool', ['add', 'commit', 'push',]);


// If server scripts change, restart the server and then livereload.
gulp.task( 'default', [ 'server:start' ], function() {

    function restart( file ) {
        server.changed( function( error ) {
            if( ! error ) livereload.changed( file.path );
        });
    }
    gulp.watch( serverFiles ).on( 'change', restart );
});


// gulp.task( 'server:start', function() {
//     server.listen( { path: './app.js' } );
// });

// // restart server if app.js changed
// gulp.task( 'server:restart', function() {
//     gulp.watch( [ './app.js' ], server.restart );
// });
