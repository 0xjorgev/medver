var gulp = require('gulp');
server = require( 'gulp-develop-server' );
livereload = require( 'gulp-livereload' );
var jshint = require('gulp-jshint');
var git = require('gulp-git');
var prompt = require('gulp-prompt');
var env = require('gulp-env');
var nodemon = require('nodemon');
var nodeInspector = require('gulp-node-inspector');

gulp.task('debug', function() {
  gulp.src([])
    .pipe(nodeInspector({
      webHost: 'localhost',
      webPort: 3003,
      saveLiveEdit: false
    }));
});

var options = {
    path: 'app.js'
};

var serverFiles = [
    './app.js',
    './gulpfile.js',
    './route/*.js',
    './model/*.js',
    './config/*.js'
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

gulp.task('gitcommit', ['add', 'commit']);
gulp.task('gitdeploy', ['add', 'commit', 'push']);

gulp.task('nodemon', function() {

  var configFile = null;
  var environmentType = process.env.NODE_ENV || 'development';

  //let's set NODE_ENV, just in case its undefined
  process.env.NODE_ENV = environmentType;
  //defaults to development unless explicitly stated
  switch(environmentType)
  {
    case 'development':
      configFile = './config/environments/development.json'
      break;
    case 'test':
      configFile = './config/environments/test.json'
      break;
    case 'production':
      configFile = './config/environments/production.json'
      break;
  }

  env({
    file: configFile,
    vars: {
      //this overrides configFile file
      //'PORT': 3003
      ///var/log/nginx/vhost-deluxe.codefuel.me-error_log
      ///var/log/nginx/nginx-deluxe.codefuel.me
      //12x3.12x3.
    }
  });

  nodemon({
    exec: 'node --debug',
    script: 'tasks/load_sample_data.js',
    // script: 'app.js',
    ext: 'js html'
    // other config ...
  }).on('restart', function () {
    console.info('Restarting... ⎈ \n\n\n\n\n');
  }).on('start', () => {
    console.info('Loading ' + environmentType + ' environment on port ' + process.env.PORT);
  }).on('quit', () => {
    // nodemon.emit('bye!');
  });

});

gulp.task( 'default', ['nodemon','debug'], function() {
  //add stuff here
});
