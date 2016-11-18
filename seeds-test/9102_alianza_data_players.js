
console.log(__filename.slice(__dirname.length + 1) + ' START')

exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Players_Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Abigail',last_name:'Viconcio',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Katia',last_name:'Parada',birthday:'02/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Samantha',last_name:'Garcia',birthday:'06/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Perla',last_name:'Martinez',birthday:'01/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Fatima',last_name:'Valente',birthday:'03/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Stephane',last_name:'Ramirez',birthday:'07/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Alexandra',last_name:'Reyes',birthday:'07/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Jessica',last_name:'Martinez',birthday:'12/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Pamela',last_name:'Luna',birthday:'03/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Kaitlyn',last_name:'Portillo',birthday:'08/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Brianna',last_name:'Hernandez',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Bianca',last_name:'Medeiros',birthday:'04/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Natalia',last_name:'Meduros',birthday:'10/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Magaly',last_name:'Desales',birthday:'08/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Nacia',last_name:'Basto',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Natalie',last_name:'Alamn',birthday:'09/01/01', gender_id:2}),
    //==========================================================================
    // Team 2: Coesta Checa - Players
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Leslye',last_name:'Alcantara',birthday:'10/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Lydie',last_name:'Casanova',birthday:'06/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Alejandra',last_name:'Aguilera',birthday:'03/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Elizabeth',last_name:'Taliaferro',birthday:'02/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Stephany',last_name:'Hernandez',birthday:'09/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Briana',last_name:'Luz de la Roa',birthday:'10/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Emely',last_name:'Herrera',birthday:'07/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Larissa',last_name:'Da Silva',birthday:'01/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Cielo',last_name:'Casanova',birthday:'06/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Thais',last_name:'Chavez',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Brittany',last_name:'Avila',birthday:'01/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Ashley',last_name:'Rios',birthday:'04/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Jennifer',last_name:'Herrera',birthday:'05/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Romina',last_name:'Ampudia',birthday:'04/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Jennifer',last_name:'Ortiz',birthday:'12/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Yasmilet',last_name:'Morales',birthday:'06/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Kimberly',last_name:'Estrada',birthday:'02/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Diana',last_name:'Jimenez',birthday:'01/01/04', gender_id:2}),
    //==========================================================================
    // Team 3: Norcross Eagles - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Jennifer',last_name:'Price',birthday:'06/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Brittany',last_name:'Cornejo',birthday:'06/01/05', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Cheyenne',last_name:'Bailey',birthday:'12/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Alondra',last_name:'Reyes',birthday:'09/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Jalin',last_name:'Delcid',birthday:'03/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Emily',last_name:'Alcocer',birthday:'09/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Vade',last_name:'Martinez',birthday:'07/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Dana',last_name:'Martinez',birthday:'09/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Jasmin',last_name:'Flores',birthday:'09/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Emily',last_name:'Ramos',birthday:'04/01/05', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Shirley',last_name:'Flores',birthday:'01/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Jessica',last_name:'Donjuan',birthday:'05/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Brenda',last_name:'Otero',birthday:'04/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Liliana',last_name:'Ramos',birthday:'06/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Lillian',last_name:'Johnson',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Erika',last_name:'Hernandez',birthday:'07/01/08', gender_id:2}),

    //==========================================================================
    // Team 4: Sur Carolina (Del) - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Araceli',last_name:'Bautista',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Katherine',last_name:'Sojo',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Angie',last_name:'Garoes',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Michelle',last_name:'Esteban',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Sherlin',last_name:'Escobar',birthday:'06/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Stephanie',last_name:'Zaragoza',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Haliyan',last_name:'Martin',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Carolina',last_name:'Vazquez',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Candy',last_name:'Cano',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Angie',last_name:'Garces',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Jonelin',last_name:'Crisantos',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Lexis',last_name:'Parota',birthday:'05/01/2004', gender_id:2}),
    //==========================================================================
    // Team 5: United Academia - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Crystal',last_name:'Barajas',birthday:'02/01/07', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Giselle',last_name:'Cantalero',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Devani',last_name:'Rodriguez',birthday:'05/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Timbeny',last_name:'Petars',birthday:'03/01/07', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Kelly',last_name:'Rubio',birthday:'08/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Yahaira',last_name:'Patricio',birthday:'10/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Kimberly',last_name:'Zavalla',birthday:'05/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Maribella',last_name:'Navarrete',birthday:'05/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Karen',last_name:'Batista',birthday:'12/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Evelyn',last_name:'Rios',birthday:'04/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Nathaly',last_name:'Rios',birthday:'08/01/04', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Emily',last_name:'Gorduno',birthday:'01/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Judith',last_name:'Ravelo',birthday:'04/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Pavan',last_name:'Rodriguez',birthday:'05/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Celene',last_name:'Vargas',birthday:'12/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Ashly',last_name:'Motan',birthday:'02/01/01', gender_id:2}),

    //==========================================================================
    // Team 6: Archi - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Gabriela',last_name:'Garcia',birthday:'05/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Josselyn',last_name:'Mendez',birthday:'04/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Shyler',last_name:'Ortiz',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Anna',last_name:'Ruiz',birthday:'08/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Aydan',last_name:'Turner',birthday:'11/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Serenity',last_name:'Castillo',birthday:'04/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Natalie',last_name:'Hernandez',birthday:'06/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Giselle',last_name:'Vargas',birthday:'07/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Carla',last_name:'Avalos',birthday:'10/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Isabella',last_name:'Portes',birthday:'09/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Cindy',last_name:'Bonilla',birthday:'03/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Araceli',last_name:'Bonilla',birthday:'12/01/02', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Magali',last_name:'Bonilla',birthday:'10/01/03', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Glorismel',last_name:'Velazquez',birthday:'07/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Jennifer',last_name:'Perez',birthday:'06/01/01', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Eilin',last_name:'Cruz',birthday:'06/01/03', gender_id:2}),

    //==========================================================================
    // Team 7: Archi - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Player F1',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Player F2',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Player F3',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Player F4',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Player F5',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Player F6',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Player F7',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Player F8',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Player F9',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Player F10',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Player F11',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Player F12',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Player F13',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Player F14',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Player F15',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Player F16',last_name:'',birthday:'05/01/2004', gender_id:2}),
    //==========================================================================
    // Team 8: Archi - Teams
    //==========================================================================
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Player PE1',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Player PE2',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Player PE3',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Player PE4',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Player PE5',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Player PE6',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-07.png', first_name:'Player PE7',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-08.png', first_name:'Player PE8',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-09.png', first_name:'Player PE9',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-10.png', first_name:'Player PE10',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-01.png', first_name:'Player PE11',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-02.png', first_name:'Player PE12',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-03.png', first_name:'Player PE13',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-04.png', first_name:'Player PE14',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-05.png', first_name:'Player PE15',last_name:'',birthday:'05/01/2004', gender_id:2}),
    knex('players').insert({img_url: 'https://s3.amazonaws.com/somosport-s3/female-players/girl-06.png', first_name:'Player PE16',last_name:'',birthday:'05/01/2004', gender_id:2})
  )
}

console.log(__filename.slice(__dirname.length + 1) + ' OK')