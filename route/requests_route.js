/**
 * Created by greg on 16/03/16.
 */
if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(['express'
    ,'../model/index'
    ,'../util/request_message_util'
    ,'../util/knex_util'
    ,'../util/response_message_util'
    ,'../util/logger_util'
    ],
    function (express
        ,Models
        ,Message
        ,Knex
        ,Response
        ,logger){

    var router = express.Router();

    
    //==========================================================================
    // Obtiene todos los request realizados a un entidad
    //==========================================================================
    router.get('/:id/type/:type', function (req, res) {
        //Para obtener las solicitudes que fueron enviadas a una entidad que estan pendientes
        var obj_type = req.params.type
        var id = req.params.id
        console.log('Id: ', id)
        console.log('obj_type: ', obj_type)
        var status_id = 0
        //Obtenemos el id del estatus de las solicitudes pendientes
        Models.status_type
        .where({code: 'request-pending'})
        .fetch()
        .then(found => {
            status_id = found.attributes.id
            console.log('Status', status_id)
            return status_id
        })
        .then(status_id => {
            //Obtenemos la entidad asociada al id y el tipo de objeto
            Models.entity
            .where({ object_id: id })
            .where({ object_type: obj_type })
            .fetch()
            .then((entity) => {
                    console.log('Entidad', entity)
                    return entity.attributes.id
            })
            .then((entity_id) => {
                console.log('Entidad Id:', entity_id)
                Models.entity_request
                .where({active: true})
                .where({ent_ref_to_id: entity_id})
                .where({status_id: status_id})
                .fetchAll({withRelated: ['status_type','to', 'from', 'from.object', 'to.object']})
                .then((requests) => Response(res, requests))
            })
            .catch(error => Response(res, null, error))
        })
    });

    return router;
});