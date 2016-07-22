
console.log(__filename.slice(__dirname.length + 1) + ' START')


exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('events').del(),

    // Inserts seed entries
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_gol.png', name:'Gol', description:'Score the rival with one gol!', level:1, increments_by:1, subdiscipline_id:2, code:'#GOL'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_card_red.png', name:'Red Card', description:'Game amonstation for bad behaviour on the field, requires player expulsion', level:1, increments_by:1, subdiscipline_id:2, code:'#RED'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_card_yellow.png', name:'Yellow Card', description:'Game amonstation for bad behaviour on the field', level:1, increments_by:1, subdiscipline_id:2, code:'#YELLOW'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_autogol.png', name:'Auto Gol', description:'Scored agains your own team', level:1, increments_by:1, subdiscipline_id:2, code:'#AGOL'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_change.png', name:'Change', description:'Requires a player to leave the game and be sustituted by another team player', level:1, increments_by:1, subdiscipline_id:2, code:'#CHANGE'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/event_penal.png', name:'Penalty', description:'A straigth gol oportunity because of a fault in the field', level:1, increments_by:1, subdiscipline_id:2, code:'#PENAL'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/Term-Starts+copy.png', name:'Start Match', description:'Match started', level:2, increments_by:1, subdiscipline_id:2, code:'#GSTART'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/Term-Ends.png', name:'Match Ends', description:'Match ends', level:2, increments_by:1, subdiscipline_id:2, code:'#GEND'}),
    knex('events').insert({img_url:'https://s3.amazonaws.com/codefuel/media/Term-Starts+copy.png', name:'Regular term starts', description:'Regular term starts', level:2, increments_by:1, subdiscipline_id:2, code:'#TSTART'}),
    knex('events').insert({ img_url:'https://s3.amazonaws.com/codefuel/media/Term-Ends.png', name:'Regular term finish', description:'Regular term finish', level:2, increments_by:1, subdiscipline_id:2, code:'#TEND'}),
    knex('events').insert({ img_url:'', name:'Extra Time', description:'Assigned by the referees to avoid the accumulated time on the field while playing', level:2, increments_by:1, subdiscipline_id:2, code:'#TEXTRA'}),
    knex('events').insert({ img_url:'', name:'Extra Term starts', description:'When the match requieres a match winner there migth be able to allow 2 extra terms to find one', level:2, increments_by:1, subdiscipline_id:2, code:'#TEXTRASTARTS'}),
    knex('events').insert({ img_url:'', name:'Extra Term finish', description:'The end of the extra term time', level:2, increments_by:1, subdiscipline_id:2, code:'#TEXTRAENDS'}),
    knex('events').insert({ img_url:'', name:'Penalty round', description:'When the match requieres a match winner', level:2, increments_by:1, subdiscipline_id:2, code:'#PR'}),
    knex('events').insert({ img_url:'', name:'Match suspended', description:'Match started but not finished', level:2, increments_by:1, subdiscipline_id:2, code:'#MS'}),
    knex('events').insert({ img_url:'', name:'Match Cancel', description:'Match not played', level:2, increments_by:1, subdiscipline_id:2,code:'#MC'})
    );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
