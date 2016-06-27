
console.log(__filename.slice(__dirname.length + 1) + ' START')

console.log('9013 seeding player')
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('players').del(),

    // Inserts seed entries
    //Team 1
    knex('players').insert({id:1, first_name:'José Pablo',last_name:'Pérez Fernández',nickname:'PEPE',birthday:'28/05/07',email:'PErezFernandez@somos.com', gender_id:1}),
    knex('players').insert({id:2, first_name:'José Carlos',last_name:'Sandino Pérez Arce',nickname:'JOE',birthday:'30/05/08',email:'SandinoPerez@somos.com', gender_id:1}),
    knex('players').insert({id:3, first_name:'Iker',last_name:'Torrescano Sánchez ',nickname:'IKER',birthday:'24/02/07',email:'TorrescanoSanchez@somos.com', gender_id:1}),
    knex('players').insert({id:4, first_name:'José María',last_name:'Arizmendi Santamaría ',nickname:'CHEMA',birthday:'27/04/07',email:'ArizmendiSantamaria@somos.com', gender_id:1}),
    knex('players').insert({id:5, first_name:'Luc',last_name:'Deveruz Chávez ',nickname:'LUC',birthday:'08/02/08',email:'DeveruzChavez@somos.com', gender_id:1}),
    knex('players').insert({id:6, first_name:'Luis Gerardo',last_name:'Pablos Ralph ',nickname:'LUIGI',birthday:'03/09/07',email:'PablosRalph@somos.com', gender_id:1}),
    knex('players').insert({id:7, first_name:'Santiago',last_name:'Carrillo Angeles ',nickname:'SANTI',birthday:'21/05/07',email:'CarrilloAngeles@somos.com', gender_id:1}),
    knex('players').insert({id:8, first_name:'Mariana',last_name:'Castillo Silva ',nickname:'MAR',birthday:'29/11/07',email:'CastilloSilva@somos.com', gender_id:2}),
    knex('players').insert({id:9, first_name:'Max',last_name:'Sierra Guerra ',nickname:'MAX',birthday:'19/04/07',email:'SierraGuerra@somos.com', gender_id:1}),
    knex('players').insert({id:10, first_name:'Sofía',last_name:'Alarcón Diez De Bonilla',nickname:'SOFI',birthday:'03/03/08',email:'AlarconDiez@somos.com', gender_id:2}),

    // //Team 2
    knex('players').insert({id:11, first_name:'Enzo',last_name:'Lozada Oropeza ',nickname:'ENZO',birthday:'30/05/07',email:'LozadaOropeza@sport.com', gender_id:1}),
    knex('players').insert({id:12, first_name:'Pablo Emilio',last_name:'Contreras Lozoya',nickname:'PUL',birthday:'07/01/07',email:'ContrerasLozoya@sport.com', gender_id:1}),
    knex('players').insert({id:13, first_name:'Karina',last_name:'Espinosa Cruz ',nickname:'KAR',birthday:'15/10/07',email:'EspinosaCruz@sport.com', gender_id:2}),
    knex('players').insert({id:14, first_name:'Joaquín',last_name:'Guarín Correa ',nickname:'JOAK',birthday:'16/04/06',email:'GuarinCorrea@sport.com', gender_id:1}),
    knex('players').insert({id:15, first_name:'Diego',last_name:'Hernández Quevedo ',nickname:'DRAK',birthday:'17/08/07',email:'HernandezQuevedo@sport.com', gender_id:1}),
    knex('players').insert({id:16, first_name:'Andrés Gerardo',last_name:'Rosas Camarena ',nickname:'ANDY',birthday:'20/10/07',email:'RosasCamarena@sport.com', gender_id:1}),
    knex('players').insert({id:17, first_name:'Mirna',last_name:'Delgado Escobar',nickname:'MIR',birthday:'15/02/07',email:'DelgadoEscobar@sport.com', gender_id:2}),
    knex('players').insert({id:18, first_name:'Santiago',last_name:'Esqueda Rivas ',nickname:'CHANCHA',birthday:'15/10/07',email:'EsquedaRivas@sport.com', gender_id:1}),
    knex('players').insert({id:19, first_name:'José Emilio',last_name:'Cedillo Estrada ',nickname:'EMI',birthday:'30/09/07',email:'Cedillo@sport.com', gender_id:1}),
    knex('players').insert({id:20, first_name:'Santiago',last_name:'Arizmendi Santamaría ',nickname:'SAN',birthday:'16/04/07',email:'Santamaria@sport.com', gender_id:1}),
    knex('players').insert({id:21, first_name:'Bruno',last_name:'Serrano Rodríguez ',nickname:'BRU',birthday:'08/08/05',email:'Serrano@sport.com', gender_id:1}),
    knex('players').insert({id:22, first_name:'Nicol',last_name:'Quezada Paul',nickname:'NICOL',birthday:'07/01/07',email:'Paul@sport.com', gender_id:2}),

    //Team 3
    knex('players').insert({id:23, first_name:'Javier',last_name:'Alvarez Rodríguez ',nickname:'JAVI',birthday:'28/01/07',email:'Javier@nity.com', gender_id:1}),
    knex('players').insert({id:24, first_name:'Luis',last_name:'Corominas Peralta ',nickname:'LUIS',birthday:'28/07/07',email:'Luisnity.com', gender_id:1}),
    knex('players').insert({id:25, first_name:'Diego',last_name:'Delgado Melchor ',nickname:'DI',birthday:'13/05/07',email:'Diegonity.com', gender_id:1}),
    knex('players').insert({id:26, first_name:'Isadora',last_name:'Talamantes Ontiveros ',nickname:'ISA',birthday:'17/01/07',email:'Isadoranity.com', gender_id:2}),
    knex('players').insert({id:27, first_name:'Alonso',last_name:'Quintanilla Fuste ',nickname:'ALONS',birthday:'25/10/07',email:'Alonsonity.com', gender_id:1}),
    knex('players').insert({id:28, first_name:'Alejandra',last_name:'Catañeda ',nickname:'PALETA',birthday:'16/01/07',email:'Alejandranity.com', gender_id:2}),
    knex('players').insert({id:29, first_name:'Alberto',last_name:'Quezada Paul ',nickname:'BETO',birthday:'20/05/07',email:'Albertonity.com', gender_id:1}),
    knex('players').insert({id:30, first_name:'Santiago Emilio',last_name:'Cruz Espinosa',nickname:'TIAGO',birthday:'10/03/08',email:'Santiagonity.com', gender_id:1}),
    knex('players').insert({id:31, first_name:'Ricardo',last_name:'LatAPÍ Gómez ',nickname:'RICH',birthday:'07/05/07',email:'Ricardonity.com', gender_id:1}),
    knex('players').insert({id:32, first_name:'Sofia',last_name:'Oñate De la Riva ',nickname:'SOF',birthday:'22/12/03',email:'Sofianity.com', gender_id:2}),
    knex('players').insert({id:33, first_name:'Edgar',last_name:'Illanes Piña',nickname:'EDI',birthday:'18/06/07',email:'Edgarnity.com', gender_id:1}),
    knex('players').insert({id:34, first_name:'Emiliano',last_name:'Valdez Santiago ',nickname:'EMI',birthday:'09/09/07',email:'Emilianonity.com', gender_id:1}),

    //Team 4
    knex('players').insert({id:35, first_name:'Maria Fernanda',last_name:'Rosas Macouzet ',nickname:'MARIFER',birthday:'10/04/99',email:'MARIFER@ghs.edu', gender_id:2}),
    knex('players').insert({id:36, first_name:'Rocío',last_name:'Gaytán Fornelli ',nickname:'ROCIO',birthday:'23/04/07',email:'ROCIOghs.edu', gender_id:1}),
    knex('players').insert({id:37, first_name:'Roger Alejandro',last_name:'Góngora aure ',nickname:'ROGER',birthday:'12/07/07',email:'ROGERghs.edu', gender_id:1}),
    knex('players').insert({id:38, first_name:'Camila',last_name:'Sales Cruz ',nickname:'CAM',birthday:'06/04/07',email:'CAMghs.edu', gender_id:2}),
    knex('players').insert({id:39, first_name:'Diego',last_name:'Guerrero Cota ',nickname:'DI',birthday:'16/02/08',email:'DIghs.edu', gender_id:1}),
    knex('players').insert({id:40, first_name:'Manuel',last_name:'Acosta Blanco ',nickname:'MA',birthday:'23/11/03',email:'MAghs.edu', gender_id:1}),
    knex('players').insert({id:41, first_name:'Diego',last_name:'Arellano Aguilar ',nickname:'DIEGO',birthday:'10/11/07',email:'DIEGOghs.edu', gender_id:1}),
    knex('players').insert({id:42, first_name:'Rodrigo',last_name:'Muñoz De Cote Mejía ',nickname:'ROCH',birthday:'16/04/08',email:'ROCHghs.edu', gender_id:1}),
    knex('players').insert({id:43, first_name:'Cristóbal',last_name:'Alatorre Ramírez',nickname:'CRIS',birthday:'06/04/08',email:'CRISghs.edu', gender_id:1}),
    knex('players').insert({id:44, first_name:'Ana Paulina',last_name:'Rosas Macouzet ',nickname:'ANI',birthday:'12/06/08',email:'ANIghs.edu', gender_id:2}),
    knex('players').insert({id:45, first_name:'María José',last_name:'Osa Moreira ',nickname:'MARIJO',birthday:'25/01/07',email:'MARIJOghs.edu', gender_id:2}),

    // //Team 5
    knex('players').insert({id:46, first_name:'Ezeta María',last_name:'Jauregui Hurtado ',nickname:'MARIA',birthday:'19/05/08',email:'Ezeta@csb.com', gender_id:2}),
    knex('players').insert({id:47, first_name:'Diego',last_name:'Puerto García',nickname:'CUCO',birthday:'21/10/05',email:'Diego@csb.com', gender_id:1}),
    knex('players').insert({id:48, first_name:'José Pablo',last_name:'Oseguera McDonald',nickname:'PAPO',birthday:'06/11/05',email:'Pablo@csb.com', gender_id:1}),
    knex('players').insert({id:49, first_name:'Andrea',last_name:'Olivares Crespo',nickname:'DREA',birthday:'17/12/07',email:'Andrea@csb.com', gender_id:2}),
    knex('players').insert({id:50, first_name:'Paulina',last_name:'González Oses ',nickname:'PAU',birthday:'13/02/08',email:'Paulina@csb.com', gender_id:2}),
    knex('players').insert({id:51, first_name:'Santiago',last_name:'A Del Muro',nickname:'LOCO',birthday:'16/12/07',email:'Santiago@csb.com', gender_id:1}),
    knex('players').insert({id:52, first_name:'Rafael',last_name:'Cumplido Mendoza',nickname:'FAFA',birthday:'10/06/07',email:'Rafael@csb.com', gender_id:1}),
    knex('players').insert({id:53, first_name:'Julieta',last_name:'Hernández Auza ',nickname:'JULI',birthday:'03/09/07',email:'Julieta@csb.com', gender_id:2}),
    knex('players').insert({id:54, first_name:'Jorge',last_name:'Hernández',nickname:'GEORGE',birthday:'13/02/08',email:'Jorg@ecsb.com', gender_id:1}),
    knex('players').insert({id:55, first_name:'Michelle',last_name:'Estrada Maqueo',nickname:'MICH',birthday:'11/09/07',email:'Michelle@csb.com', gender_id:1}),
    knex('players').insert({id:56, first_name:'Ana Karen',last_name:'González Rodríguez ',nickname:'ANA',birthday:'11/02/08',email:'Karen@csb.com', gender_id:2}),
    knex('players').insert({id:57, first_name:'Gael',last_name:'Saen González',nickname:'GAEL',birthday:'21/10/07',email:'Gael@csb.com', gender_id:1}),

    // //Team 6
    knex('players').insert({id:58, first_name:'ALEXA',last_name:'PRUNEDA HANEL',nickname:'ALEX',birthday:'11/12/07',email:'ALEX@oxford.edu', gender_id:2}),
    knex('players').insert({id:59, first_name:'INES',last_name:'TOPETE MADRIGAL',nickname:'INES',birthday:'1/9/08',email:'INES@oxford.edu', gender_id:2}),
    knex('players').insert({id:60, first_name:'VICTORIA',last_name:'AGUILAR ARZT',nickname:'VIKY',birthday:'7/5/07',email:'VIKY@oxford.edu', gender_id:2}),
    knex('players').insert({id:61, first_name:'MARIA',last_name:'HERNANDEZ BERRERA',nickname:'MARIA',birthday:'4/5/08',email:'MARIA@oxford.edu', gender_id:2}),
    knex('players').insert({id:62, first_name:'ISABELLA',last_name:'PRUNEDA HANEL',nickname:'ISA',birthday:'8/14/07',email:'ISA@oxford.edu', gender_id:2}),
    knex('players').insert({id:63, first_name:'FERNANDO',last_name:'WATERS FILLOY',nickname:'FER',birthday:'7/13/07',email:'FER@oxford.edu', gender_id:1}),
    knex('players').insert({id:64, first_name:'JOAQUIN',last_name:'ROMAN MARTINEZ',nickname:'JOAQ',birthday:'2/17/08',email:'JOAQ@oxford.edu', gender_id:1}),
    knex('players').insert({id:65, first_name:'PABLO',last_name:'PRUNEDA HANEL',nickname:'PAUL',birthday:'1/11/08',email:'PAUL@oxford.edu', gender_id:1}),
    knex('players').insert({id:66, first_name:'MATHIAS',last_name:'GURRIA NUÑEZ',nickname:'MATH',birthday:'7/5/07',email:'MATH@oxford.edu', gender_id:1}),
    knex('players').insert({id:67, first_name:'ALEXANDER',last_name: 'REYES HERNANDEZ',nickname:'ALEX',birthday:'5/29/07',email:'ALEX@oxford.edu', gender_id:1})

    );
};

console.log('9013 OK')


console.log(__filename.slice(__dirname.length + 1) + ' OK')