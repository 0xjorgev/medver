var gulp = require('gulp');
server = require( 'gulp-develop-server' );
livereload = require( 'gulp-livereload' );
var jshint = require('gulp-jshint');
var git = require('gulp-git');
var prompt = require('gulp-prompt');

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
    .pipe(git.add({args: '-u'}));
});

// Run git commit, passing multiple messages as if calling
// git commit -m "initial commit" -m "additional message"
gulp.task('commit', function(){
    // var message;
    // gulp.src('./*', {buffer:false})
    // .pipe(prompt.prompt({
    //     type: 'input',
    //     name: 'commit',
    //     message: 'Please enter commit message...'
    // }, function(res){
    //     message = res.commit;
    // }))
    // .pipe(git.commit(message));

     // just source anything here - we just wan't to call the prompt for now
    gulp.src('./*')
    .pipe(prompt.prompt({
        type: 'input',
        name: 'commit',
        message: 'Please enter commit message...'
    },  function(res){
      // now add all files that should be committed
      // but make sure to exclude the .gitignored ones, since gulp-git tries to commit them, too
      return gulp.src([ '!node_modules/', './*' ], {buffer:false})
      .pipe(git.commit(res.commit));
    }));
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

gulp.task('gitool', ['add', 'commit']);


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
