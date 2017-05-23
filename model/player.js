if (typeof define !== 'function')
	var define = require('amdefine')(module);

define(['./base_model'
		,'./entity'
		,'../util/logger_util']
	, function (DB
		, Entity
		, logger
	){
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
        	let newPlayer = {}
			//Creamos el player
			if(_p.number !== undefined && _p.number !== null) player.number = _p.number
			if(_p.person_id !== undefined && _p.person_id !== null) player.person_id = _p.person_id
			if(_p.team_id !== undefined && _p.team_id !== null) player.team_id = _p.team_id
			if(_p.position_id !== undefined && _p.position_id !== null) player.position_id = _p.position_id
			if(_p.active !== undefined && _p.active !== null) player.active = _p.active
			if(_p.img_url !== undefined && _p.img_url !== null) player.img_url = _p.img_url

			logger.debug(_p)
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
					.fetch({withRelated: ['entity', 'person.gender']})
	        })
	    }

	    , savePlayer:function(_p)
	    {
	    	let player = {}
        	let newPlayer = {}
	    	let person = {}
        	let newPerson = {}
			//Creamos el player
			if(_p.number !== undefined ) player.number = _p.number
			if(_p.person_id !== undefined) player.person_id = _p.person_id
			if(_p.team_id !== undefined ) player.team_id = _p.team_id
			if(_p.position_id !== undefined ) player.position_id = _p.position_id
			if(_p.active !== undefined ) player.active = _p.active
			if(_p.img_url !== undefined ) player.img_url = _p.img_url
			if(_p.id !== undefined ) player.id = _p.id

			return new DB._models.Player(player).save()
			.then(result => {
	            newPlayer = result.toJSON()
	        })
	        .then(_result => {
	        	return DB._models.Player
					.where({id: newPlayer.id})
					.fetch({withRelated: ['entity', 'person.gender']})
	        })
	    }
	});
	// uses Registry plugin
	return DB.model('Player', Player);
});
