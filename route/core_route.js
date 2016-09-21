// if (typeof define !== 'function') {
	// var define = require('amdefine')(module);
// }
// 
// define(['express', '../util/response_message_util', 'aws-sdk'], (express, Response, aws) => {
	// var router = express.Router()
// 
	// /*
	 // * Load the S3 information from environment variables.
	 // */
	// var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
	// var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
	// var S3_BUCKET = process.env.S3_BUCKET;
// 
	// /*
	// * Respond to GET requests to /s3_signed_url
	// * Upon request, return JSON containing the temporarily-signed S3 request and the
	// * anticipated URL of the image.
	// */
	// router.get('/s3_signed_url', (req, res) => {
// 
		// aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY })
		// var s3 = new aws.S3()
		// var s3_params = {
			// Bucket: S3_BUCKET,
			// Key: req.query.file_name,
			// Expires: 60,
			// ContentType: req.query.file_type,
			// ACL: 'public-read'
		// }
// 
		// s3.getSignedUrl('putObject', s3_params, (err, data) => {
			// if(err){
				// console.log('err', err);
				// return Response(res, null, err)
			// }
			// else{
				// var return_data = {
					// signed_request: data,
					// url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
				// }
				// return Response(res, return_data)
			// }
		// })
	// })
	// return router
// })