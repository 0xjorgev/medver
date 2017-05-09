if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model','./entity','./gender', './player_team', './event_match_player']
	, function (DB, Entity) {
	var Player = DB.Model.extend({
		tableName: 'players'
		,hasTimestamps: true
		,initialize: function(){
			this.on('created', attrs => {
				new DB._models.Entity({
					object_type: 'players'
					,object_id: this.id
				}).save()
			})
		}
		//relations
		// ,gender: function(){
		// 	return this.belongsTo('Gender', 'gender_id');
		// }
		// ,player_team: function(){
		// 	return this.hasMany('Player_team');
		// }
		,player_in: function(){
			return this.hasMany('Event_match_player', 'player_in');
		}
		,player_out: function() {
			return this.hasMany('Event_match_player', 'player_out');
		}
		,entity : function(){
			return this.morphOne('Entity', 'object');
		}
		,person : function(){
			return this.belongsTo('Person', 'person_id');
		}
		,position : function(){
			return this.belongsTo('Position', 'position_id');
		}
		,team: function(){
			return this.belongsTo('Team', 'team_id');
		}
		,createEntity: function(){
			console.log('creating player entity');
			return DB._models.Entity.forge({
				object_type: 'players'
				,object_id: this.id
			}).save()
		}
	}
	,{
		findOrCreate: function(_p){
        	let player = {}
        	let person = {}
        	let newPlayer = {}
			//Creamos el player
			if(_p.number !== undefined && _p.number !== null) player.number = _p.number
			if(_p.person_id !== undefined && _p.person_id !== null) player.person_id = _p.person_id
			if(_p.team_id !== undefined && _p.team_id !== null) player.team_id = _p.team_id
			if(_p.position_id !== undefined && _p.position_id !== null) player.position_id = _p.position_id


			
        	return DB._models.Player
	            .where({person_id: player.person_id,
	            		team_id: player.team_id})
	            .fetch()
	        .then(_result => {
	            //Si encontramos el jugador lo retornamos
	            if(_result != undefined)
	            {
	                return _result
	            }
	            //Si no existe  el jugador lo creamos
	            else
	            {
			        return new DB._models.Player(player)
			        .save()
	            }
	        })
	        .then(result => {
	            newPlayer = result.toJSON()
	            //Se crea un objeto entidad
	            let entity = {}
		        entity.object_id = newPlayer.id
		        entity.object_type = 'players'
				return DB._models.Entity.findOrCreate(entity)
	        })
	        .then(_result => {
	        	return DB._models.Player
					.where({id: newPlayer.id})
					.fetch({withRelated: ['entity']})
	        })
	    }
		// findOrCreate: function(_p){
  //       	let player = {}
  //       	let newPlayer = {}
		// 	//Creamos el player
		// 	if(_p.first_name !== undefined && _p.first_name !== null) player.first_name = _p.first_name.trim()
		// 	if(_p.last_name !== undefined && _p.last_name !== null) player.last_name = _p.last_name.trim()
		// 	if(_p.nickname !== undefined && _p.nickname !== null) player.nickname	= _p.nickname.trim()
		// 	if(_p.gender_id !== undefined && _p.gender_id !== null) player.gender_id = _p.gender_id
		// 	if(_p.email !== undefined && _p.email !== null) player.email = _p.email.trim()
		// 	if(_p.img_url !== undefined && _p.img_url !== null) player.img_url = _p.img_url.trim()
		// 	if(_p.birthday !== undefined && _p.birthday !== null) player.birthday = _p.birthday
		// 	if(_p.document_number !== undefined && _p.document_number !== null)
		// 		player.document_number = _p.document_number.trim()
		// 	if(_p.document_img_url !== undefined && _p.document_img_url !== null)
		// 		player.document_img_url = _p.document_img_url.trim()
		// 	if(_p.meta !== undefined && _p.meta !== null) player.meta = _p.meta

  //       	return DB._models.Player
	 //            .where({email: player.email})
	 //            .fetch()
	 //        .then(_result => {
	 //            //Si encontramos el jugador lo retornamos
	 //            if(_result != undefined)
	 //            {
	 //                return _result
	 //            }
	 //            //Si no existe  el jugador lo creamos
	 //            else
	 //            {
		// 	        return new DB._models.Player(player)
		// 	        .save()
	 //            }
	 //        })
	 //        .then(result => {
	 //            newPlayer = result.toJSON()
	 //            //Se crea un objeto entidad
	 //            let entity = {}
		//         entity.object_id = newPlayer.id
		//         entity.object_type = 'players'
		// 		return DB._models.Entity.findOrCreate(entity)
	 //        })
	 //        .then(_result => {
	 //        	return DB._models.Player
		// 			.where({id: newPlayer.id})
		// 			.fetch({withRelated: ['entity']})
	 //        })
	 //    }
	});
	// uses Registry plugin
	return DB.model('Player', Player);
});
