if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['express',
	'../model/index',
	'../util/response_message_util'],
	(express,
	Models,
	Response) => {
	let router = express.Router();

	router.get('/:subdiscipline_id/event', (req, res) => {
		const subdiscipline_id = req.params.subdiscipline_id;
		return Models.event
		.where({subdiscipline_id: subdiscipline_id, active:true})
		.fetchAll({withRelated: ['discipline'], debug: false})
		.then(result => {
			Response(res, result)
		})
		.catch(error => {
			Response(res, null, error)
		})
	})

	router.get('/', (req, res) => {
		const subdiscipline_id = req.params.subdiscipline_id
		return Models.subdiscipline
		.where({active: true})
		.fetchAll({withRelated: ['discipline']})
		.then(result => {
			Response(res, result)
		})
		.catch(error => {
			Response(res,null, error)
		})
	})

	router.get('/:subdiscipline_id/position', (req, res) => {
		var subdiscipline_id = req.params.subdiscipline_id
		return Models.position
		.where({'subdiscipline_id': subdiscipline_id, active: true})
		.fetchAll()
		.then(result => {
			Response(res, result)
		})
		.catch(error => {
			Response(res, null, error)
		})
	})

	return router
});
