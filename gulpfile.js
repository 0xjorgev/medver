const gulp = require('gulp')
const jshint = require('gulp-jshint')
const env = require('gulp-env')
const nodemon = require('nodemon')
const nodeInspector = require('gulp-node-inspector')

gulp.task('debug', function() {
	gulp.src([])
	.pipe(nodeInspector({
		webHost: 'localhost',
		webPort: 3003,
		saveLiveEdit: false
	}))
})

const options = {
	path: 'app.js'
}

const serverFiles = [
	'./app.js',
	'./gulpfile.js',
	'./route/*.js',
	'./model/*.js',
	'./config/*.js'
]

gulp.task('jshint', function () {
	gulp.src(serverFiles)
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jshint.reporter('fail'));
})

gulp.task('nodemon', () => {

	var configFile = null;
	var environmentType = process.env.NODE_ENV || 'development';

	//let's set NODE_ENV, just in case its undefined
	process.env.NODE_ENV = environmentType;
	//defaults to development unless explicitly stated
	switch(environmentType){
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
			// 'PORT': 3003
		}
	});

	nodemon({
		exec: 'node --debug --use_strict',
		script: 'app.js',
		ext: 'js html'
	})
	.on('restart', () => {
		console.info('Restarting... ⎈ \n\n');
	})
	.on('start', () => {
		console.info('Loading ' + environmentType + ' environment on port ' + process.env.PORT);
	})
	.on('quit', () => {
		// nodemon.emit('bye!');
	});

});

gulp.task('default', ['nodemon','debug'], () => {
	//add stuff here
});
