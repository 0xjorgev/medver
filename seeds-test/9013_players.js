
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('players').del(),

    // Inserts seed entries
    //Team 1
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-01.png',first_name:'José Pablo',last_name:'Pérez Fernández',nickname:'PEPE',birthday:'05/01/2007',email:'PErezFernandez@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-02.png',first_name:'José Carlos',last_name:'Sandino Pérez Arce',nickname:'JOE',birthday:'05/01/2008',email:'SandinoPerez@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-03.png',first_name:'Iker',last_name:'Torrescano Sánchez ',nickname:'IKER',birthday:'02/01/2007',email:'TorrescanoSanchez@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-04.png',first_name:'José María',last_name:'Arizmendi Santamaría ',nickname:'CHEMA',birthday:'04/01/2007',email:'ArizmendiSantamaria@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-05.png',first_name:'Luc',last_name:'Deveruz Chávez ',nickname:'LUC',birthday:'02/01/2008',email:'DeveruzChavez@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-06.png',first_name:'Luis Gerardo',last_name:'Pablos Ralph ',nickname:'LUIGI',birthday:'09/01/2007',email:'PablosRalph@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-07.png',first_name:'Santiago',last_name:'Carrillo Angeles ',nickname:'SANTI',birthday:'05/01/2007',email:'CarrilloAngeles@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png',first_name:'Mariana',last_name:'Castillo Silva ',nickname:'MAR',birthday:'11/01/2007',email:'CastilloSilva@somos.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-08.png',first_name:'Max',last_name:'Sierra Guerra ',nickname:'MAX',birthday:'04/01/2007',email:'SierraGuerra@somos.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png',first_name:'Sofía',last_name:'Alarcón Diez De Bonilla',nickname:'SOFI',birthday:'03/01/2008',email:'AlarconDiez@somos.com', gender_id:2}),

    // //Team 2
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-09.png',first_name:'Enzo',last_name:'Lozada Oropeza ',nickname:'ENZO',birthday:'05/01/2007',email:'LozadaOropeza@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-10.png',first_name:'Pablo Emilio',last_name:'Contreras Lozoya',nickname:'PUL',birthday:'01/01/2007',email:'ContrerasLozoya@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png',first_name:'Karina',last_name:'Espinosa Cruz ',nickname:'KAR',birthday:'10/01/2007',email:'EspinosaCruz@sport.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-11.png',first_name:'Joaquín',last_name:'Guarín Correa ',nickname:'JOAK',birthday:'04/01/2006',email:'GuarinCorrea@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-12.png',first_name:'Diego',last_name:'Hernández Quevedo ',nickname:'DRAK',birthday:'08/01/2007',email:'HernandezQuevedo@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-13.png',first_name:'Andrés Gerardo',last_name:'Rosas Camarena ',nickname:'ANDY',birthday:'10/01/2007',email:'RosasCamarena@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png',first_name:'Mirna',last_name:'Delgado Escobar',nickname:'MIR',birthday:'02/01/2007',email:'DelgadoEscobar@sport.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-14.png',first_name:'Santiago',last_name:'Esqueda Rivas ',nickname:'CHANCHA',birthday:'10/01/2007',email:'EsquedaRivas@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-15.png',first_name:'José Emilio',last_name:'Cedillo Estrada ',nickname:'EMI',birthday:'09/01/2007',email:'Cedillo@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-16.png',first_name:'Santiago',last_name:'Arizmendi Santamaría ',nickname:'SAN',birthday:'04/01/2007',email:'Santamaria@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-17.png',first_name:'Bruno',last_name:'Serrano Rodríguez ',nickname:'BRU',birthday:'08/01/2005',email:'Serrano@sport.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png',first_name:'Nicol',last_name:'Quezada Paul',nickname:'NICOL',birthday:'01/01/2007',email:'Paul@sport.com', gender_id:2}),

    //Team 3
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-18.png',first_name:'Javier',last_name:'Alvarez Rodríguez ',nickname:'JAVI',birthday:'01/01/2007',email:'Javier@nity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-19.png',first_name:'Luis',last_name:'Corominas Peralta ',nickname:'LUIS',birthday:'07/01/2007',email:'Luisnity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-20.png',first_name:'Diego',last_name:'Delgado Melchor ',nickname:'DI',birthday:'05/01/2007',email:'Diegonity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png',first_name:'Isadora',last_name:'Talamantes Ontiveros ',nickname:'ISA',birthday:'01/01/2007',email:'Isadoranity.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-21.png',first_name:'Alonso',last_name:'Quintanilla Fuste ',nickname:'ALONS',birthday:'10/01/2007',email:'Alonsonity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png',first_name:'Alejandra',last_name:'Catañeda ',nickname:'PALETA',birthday:'01/01/2007',email:'Alejandranity.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-22.png',first_name:'Alberto',last_name:'Quezada Paul ',nickname:'BETO',birthday:'05/01/2007',email:'Albertonity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-23.png',first_name:'Santiago Emilio',last_name:'Cruz Espinosa',nickname:'TIAGO',birthday:'03/01/2008',email:'Santiagonity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-24.png',first_name:'Ricardo',last_name:'LatAPÍ Gómez ',nickname:'RICH',birthday:'05/01/2007',email:'Ricardonity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png',first_name:'Sofia',last_name:'Oñate De la Riva ',nickname:'SOF',birthday:'12/01/2003',email:'Sofianity.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-25.png',first_name:'Edgar',last_name:'Illanes Piña',nickname:'EDI',birthday:'06/01/2007',email:'Edgarnity.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-26.png',first_name:'Emiliano',last_name:'Valdez Santiago ',nickname:'EMI',birthday:'09/01/2007',email:'Emilianonity.com', gender_id:1}),

    //Team 4
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png',first_name:'Maria Fernanda',last_name:'Rosas Macouzet ',nickname:'MARIFER',birthday:'04/01/2099',email:'MARIFER@ghs.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-27.png',first_name:'Rocío',last_name:'Gaytán Fornelli ',nickname:'ROCIO',birthday:'04/01/2007',email:'ROCIOghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-28.png',first_name:'Roger Alejandro',last_name:'Góngora aure ',nickname:'ROGER',birthday:'07/01/2007',email:'ROGERghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png',first_name:'Camila',last_name:'Sales Cruz ',nickname:'CAM',birthday:'04/01/2007',email:'CAMghs.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-29.png',first_name:'Diego',last_name:'Guerrero Cota ',nickname:'DI',birthday:'02/01/2008',email:'DIghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-30.png',first_name:'Manuel',last_name:'Acosta Blanco ',nickname:'MA',birthday:'11/01/2003',email:'MAghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-31.png',first_name:'Diego',last_name:'Arellano Aguilar ',nickname:'DIEGO',birthday:'11/01/2007',email:'DIEGOghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-32.png',first_name:'Rodrigo',last_name:'Muñoz De Cote Mejía ',nickname:'ROCH',birthday:'04/01/2008',email:'ROCHghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-33.png',first_name:'Cristóbal',last_name:'Alatorre Ramírez',nickname:'CRIS',birthday:'04/01/2008',email:'CRISghs.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png',first_name:'Ana Paulina',last_name:'Rosas Macouzet ',nickname:'ANI',birthday:'06/01/2008',email:'ANIghs.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png',first_name:'María José',last_name:'Osa Moreira ',nickname:'MARIJO',birthday:'01/01/2007',email:'MARIJOghs.edu', gender_id:2}),

    // //Team 5
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png',first_name:'Ezeta María',last_name:'Jauregui Hurtado ',nickname:'MARIA',birthday:'05/01/2008',email:'Ezeta@csb.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-34.png',first_name:'Diego',last_name:'Puerto García',nickname:'CUCO',birthday:'10/01/2005',email:'Diego@csb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-35.png',first_name:'José Pablo',last_name:'Oseguera McDonald',nickname:'PAPO',birthday:'11/01/2005',email:'Pablo@csb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png',first_name:'Andrea',last_name:'Olivares Crespo',nickname:'DREA',birthday:'12/01/2007',email:'Andrea@csb.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png',first_name:'Paulina',last_name:'González Oses ',nickname:'PAU',birthday:'02/01/2008',email:'Paulina@csb.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-36.png',first_name:'Santiago',last_name:'A Del Muro',nickname:'LOCO',birthday:'12/01/2007',email:'Santiago@csb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-37.png',first_name:'Rafael',last_name:'Cumplido Mendoza',nickname:'FAFA',birthday:'06/01/2007',email:'Rafael@csb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png',first_name:'Julieta',last_name:'Hernández Auza ',nickname:'JULI',birthday:'09/01/2007',email:'Julieta@csb.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-38.png',first_name:'Jorge',last_name:'Hernández',nickname:'GEORGE',birthday:'02/01/2008',email:'Jorg@ecsb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-39.png',first_name:'Michelle',last_name:'Estrada Maqueo',nickname:'MICH',birthday:'09/01/2007',email:'Michelle@csb.com', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png',first_name:'Ana Karen',last_name:'González Rodríguez ',nickname:'ANA',birthday:'02/01/2008',email:'Karen@csb.com', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-40.png',first_name:'Gael',last_name:'Saen González',nickname:'GAEL',birthday:'10/01/2007',email:'Gael@csb.com', gender_id:1}),

    // //Team 6
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png',first_name:'ALEXA',last_name:'PRUNEDA HANEL',nickname:'ALEX',birthday:'12/01/2007',email:'ALEX@oxford.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png',first_name:'INES',last_name:'TOPETE MADRIGAL',nickname:'INES',birthday:'/2/1/008',email:'INES@oxford.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png',first_name:'VICTORIA',last_name:'AGUILAR ARZT',nickname:'VIKY',birthday:'/2/7/007',email:'VIKY@oxford.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png',first_name:'MARIA',last_name:'HERNANDEZ BERRERA',nickname:'MARIA',birthday:'/2/4/008',email:'MARIA@oxford.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png',first_name:'ISABELLA',last_name:'PRUNEDA HANEL',nickname:'ISA',birthday:'4//8/2007',email:'ISA@oxford.edu', gender_id:2}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-41.png',first_name:'FERNANDO',last_name:'WATERS FILLOY',nickname:'FER',birthday:'3//7/2007',email:'FER@oxford.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-42.png',first_name:'JOAQUIN',last_name:'ROMAN MARTINEZ',nickname:'JOAQ',birthday:'7//2/2008',email:'JOAQ@oxford.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-43.png',first_name:'PABLO',last_name:'PRUNEDA HANEL',nickname:'PAUL',birthday:'1//1/2008',email:'PAUL@oxford.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-44.png',first_name:'MATHIAS',last_name:'GURRIA NUÑEZ',nickname:'MATH',birthday:'/2/7/007',email:'MATH@oxford.edu', gender_id:1}),
    knex('players').insert({img_url:'https://s3.amazonaws.com/somosport-s3/male-players/Boy-45.png',first_name:'ALEXANDER',last_name: 'REYES HERNANDEZ',nickname:'ALEX',birthday:'9//5/2007',email:'ALEX@oxford.edu', gender_id:1})

    );
};

console.log(__filename.slice(__dirname.length + 1) + ' OK')
