// var gulp = require('gulp');
// var nodemon = require('nodemon');
// var nodeInspector = require('gulp-node-inspector');
//
// gulp.task('debug', () => {
// 	gulp.src([])
// 	.pipe(nodeInspector({
// 		webHost: 'localhost',
// 		webPort: 3003,
// 		saveLiveEdit: false
// 	}))
// })
//
// gulp.task('nodemon', () => {
// 	nodemon({
// 		exec: 'node',
// 		script: 'app.js',
// 		ext: 'js csv'
// 	})
// 	.on('start', () => console.info('starting...'))
// 	.on('restart', () => console.info('\n\n\n\n\n---------------------- restarting ----------------------'))
// 	.on('quit', () => {})
// })
//
// gulp.task('server', () => {
// 	nodemon({
// 		exec: 'node --debug',
// 		script: 'server.js',
// 		ext: 'js html'
// 	})
// 	.on('start', () => console.info('starting...'))
// 	.on('restart', () => console.info('\n\n\n\n\n---------------------- restarting ----------------------'))
// 	.on('quit', () => {})
// })
//
// gulp.task( 'default', ['nodemon'], () => {})
var gulp = require('gulp');
var server = require( 'gulp-develop-server' );
var livereload = require( 'gulp-livereload' );
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
      webPort: 3000,
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
    exec: 'node',
    // script: 'tasks/cocacola_sf_20160813/load_cocacola_sf_20160813_data.js',
    script: 'app.js',
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

gulp.task( 'default', ['nodemon'], function() {
  //add stuff here
});
