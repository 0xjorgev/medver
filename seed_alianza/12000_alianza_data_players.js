
console.log('12000 seeding alianza Teams')
exports.seed = function(knex, Promise) {
  return Promise.join(
    //==========================================================================
    // Team 1: Cholitas - Players_Teams
    //==========================================================================
    knex('players').insert({id:72, first_name:'Abigail',last_name:'Viconcio',birthday:'09/28/01', gender_id:2}),
    knex('players').insert({id:73, first_name:'Katia',last_name:'Parada',birthday:'02/08/02', gender_id:2}),
    knex('players').insert({id:74, first_name:'Samantha',last_name:'Garcia',birthday:'06/04/04', gender_id:2}),
    knex('players').insert({id:75, first_name:'Perla',last_name:'Martinez',birthday:'01/30/03', gender_id:2}),
    knex('players').insert({id:76, first_name:'Fatima',last_name:'Valente',birthday:'03/20/02', gender_id:2}),
    knex('players').insert({id:77, first_name:'Stephane',last_name:'Ramirez',birthday:'07/25/02', gender_id:2}),
    knex('players').insert({id:78, first_name:'Alexandra',last_name:'Reyes',birthday:'07/13/01', gender_id:2}),
    knex('players').insert({id:79, first_name:'Jessica',last_name:'Martinez',birthday:'12/28/02', gender_id:2}),
    knex('players').insert({id:80, first_name:'Pamela',last_name:'Luna',birthday:'03/12/02', gender_id:2}),
    knex('players').insert({id:81, first_name:'Kaitlyn',last_name:'Portillo',birthday:'08/23/01', gender_id:2}),
    knex('players').insert({id:82, first_name:'Brianna',last_name:'Hernandez',birthday:'09/18/01', gender_id:2}),
    knex('players').insert({id:83, first_name:'Bianca',last_name:'Medeiros',birthday:'04/30/02', gender_id:2}),
    knex('players').insert({id:84, first_name:'Natalia',last_name:'Meduros',birthday:'10/20/03', gender_id:2}),
    knex('players').insert({id:85, first_name:'Magaly',last_name:'Desales',birthday:'08/12/02', gender_id:2}),
    knex('players').insert({id:86, first_name:'Nacia',last_name:'Basto',birthday:'09/01/01', gender_id:2}),
    knex('players').insert({id:87, first_name:'Natalie',last_name:'Alamn',birthday:'09/07/01', gender_id:2}),
    //==========================================================================
    // Team 2: Coesta Checa - Players
    //==========================================================================
    knex('players').insert({id:88 ,first_name:'Leslye',last_name:'Alcantara',birthday:'10/16/01', gender_id:2}),
    knex('players').insert({id:89 ,first_name:'Lydie',last_name:'Casanova',birthday:'06/29/04', gender_id:2}),
    knex('players').insert({id:90 ,first_name:'Alejandra',last_name:'Aguilera',birthday:'03/01/04', gender_id:2}),
    knex('players').insert({id:91 ,first_name:'Elizabeth',last_name:'Taliaferro',birthday:'02/07/02', gender_id:2}),
    knex('players').insert({id:92 ,first_name:'Stephany',last_name:'Hernandez',birthday:'09/11/02', gender_id:2}),
    knex('players').insert({id:93 ,first_name:'Briana',last_name:'Luz de la Roa',birthday:'10/24/02', gender_id:2}),
    knex('players').insert({id:94 ,first_name:'Emely',last_name:'Herrera',birthday:'07/23/02', gender_id:2}),
    knex('players').insert({id:95 ,first_name:'Larissa',last_name:'Da Silva',birthday:'01/03/03', gender_id:2}),
    knex('players').insert({id:96 ,first_name:'Cielo',last_name:'Casanova',birthday:'06/29/01', gender_id:2}),
    knex('players').insert({id:97 ,first_name:'Thais',last_name:'Chavez',birthday:'09/15/01', gender_id:2}),
    knex('players').insert({id:98 ,first_name:'Brittany',last_name:'Avila',birthday:'01/13/04', gender_id:2}),
    knex('players').insert({id:99 ,first_name:'Ashley',last_name:'Rios',birthday:'04/08/03', gender_id:2}),
    knex('players').insert({id:100 ,first_name:'Jennifer',last_name:'Herrera',birthday:'05/23/02', gender_id:2}),
    knex('players').insert({id:101 ,first_name:'Romina',last_name:'Ampudia',birthday:'04/12/04', gender_id:2}),
    knex('players').insert({id:102 ,first_name:'Jennifer',last_name:'Ortiz',birthday:'12/18/01', gender_id:2}),
    knex('players').insert({id:103 ,first_name:'Yasmilet',last_name:'Morales',birthday:'06/09/01', gender_id:2}),
    knex('players').insert({id:104 ,first_name:'Kimberly',last_name:'Estrada',birthday:'02/08/04', gender_id:2}),
    knex('players').insert({id:105 ,first_name:'Diana',last_name:'Jimenez',birthday:'01/11/04', gender_id:2}),
    //==========================================================================
    // Team 3: Norcross Eagles - Teams
    //==========================================================================
    knex('players').insert({id:106, first_name:'Jennifer',last_name:'Price',birthday:'06/25/04', gender_id:2}),
    knex('players').insert({id:107, first_name:'Brittany',last_name:'Cornejo',birthday:'06/25/05', gender_id:2}),
    knex('players').insert({id:108, first_name:'Cheyenne',last_name:'Bailey',birthday:'12/24/04', gender_id:2}),
    knex('players').insert({id:109, first_name:'Alondra',last_name:'Reyes',birthday:'09/22/02', gender_id:2}),
    knex('players').insert({id:110, first_name:'Jalin',last_name:'Delcid',birthday:'03/08/04', gender_id:2}),
    knex('players').insert({id:111, first_name:'Emily',last_name:'Alcocer',birthday:'09/30/02', gender_id:2}),
    knex('players').insert({id:112, first_name:'Vade',last_name:'Martinez',birthday:'07/19/03', gender_id:2}),
    knex('players').insert({id:113, first_name:'Dana',last_name:'Martinez',birthday:'09/18/03', gender_id:2}),
    knex('players').insert({id:114, first_name:'Jasmin',last_name:'Flores',birthday:'09/18/03', gender_id:2}),
    knex('players').insert({id:115, first_name:'Emily',last_name:'Ramos',birthday:'04/21/05', gender_id:2}),
    knex('players').insert({id:116, first_name:'Shirley',last_name:'Flores',birthday:'01/21/02', gender_id:2}),
    knex('players').insert({id:117, first_name:'Jessica',last_name:'Donjuan',birthday:'05/11/04', gender_id:2}),
    knex('players').insert({id:118, first_name:'Brenda',last_name:'Otero',birthday:'04/30/04', gender_id:2}),
    knex('players').insert({id:119, first_name:'Liliana',last_name:'Ramos',birthday:'06/22/03', gender_id:2}),
    knex('players').insert({id:120, first_name:'Lillian',last_name:'Johnson',birthday:'09/21/01', gender_id:2}),
    knex('players').insert({id:121, first_name:'Erika',last_name:'Hernandez',birthday:'07/19/08', gender_id:2}),

    //==========================================================================
    // Team 4: Sur Carolina (Del) - Teams
    //==========================================================================
    knex('players').insert({ id: 122,first_name:'Araceli',last_name:'Bautista',birthday:'', gender_id:2}),
    knex('players').insert({ id: 123,first_name:'Katherine',last_name:'Sojo',birthday:'', gender_id:2}),
    knex('players').insert({ id: 124,first_name:'Angie',last_name:'Garoes',birthday:'', gender_id:2}),
    knex('players').insert({ id: 125,first_name:'Michelle',last_name:'Esteban',birthday:'', gender_id:2}),
    knex('players').insert({ id: 126,first_name:'Sherlin',last_name:'Escobar',birthday:'06/22/01', gender_id:2}),
    knex('players').insert({ id: 127,first_name:'Stephanie',last_name:'Zaragoza',birthday:'', gender_id:2}),
    knex('players').insert({ id: 128,first_name:'Haliyan',last_name:'Martin',birthday:'', gender_id:2}),
    knex('players').insert({ id: 129,first_name:'Carolina',last_name:'Vazquez',birthday:'', gender_id:2}),
    knex('players').insert({ id: 130,first_name:'Candy',last_name:'Cano',birthday:'', gender_id:2}),
    knex('players').insert({ id: 131,first_name:'Angie',last_name:'Garces',birthday:'', gender_id:2}),
    knex('players').insert({ id: 132,first_name:'Jonelin',last_name:'Crisantos',birthday:'', gender_id:2}),
    knex('players').insert({ id: 133,first_name:'Lexis',last_name:'Parota',birthday:'', gender_id:2}),
    //==========================================================================
    // Team 5: United Academia - Teams
    //==========================================================================
    knex('players').insert({ id: 134,first_name:'Crystal',last_name:'Barajas',birthday:'02/02/07', gender_id:2}),
    knex('players').insert({ id: 135,first_name:'Giselle',last_name:'Cantalero',birthday:'09/21/01', gender_id:2}),
    knex('players').insert({ id: 136,first_name:'Devani',last_name:'Rodriguez',birthday:'05/20/03', gender_id:2}),
    knex('players').insert({ id: 137,first_name:'Timbeny',last_name:'Petars',birthday:'03/22/07', gender_id:2}),
    knex('players').insert({ id: 138,first_name:'Kelly',last_name:'Rubio',birthday:'08/08/01', gender_id:2}),
    knex('players').insert({ id: 139,first_name:'Yahaira',last_name:'Patricio',birthday:'10/23/02', gender_id:2}),
    knex('players').insert({ id: 140,first_name:'Kimberly',last_name:'Zavalla',birthday:'16/05/03', gender_id:2}),
    knex('players').insert({ id: 141,first_name:'Maribella',last_name:'Navarrete',birthday:'16/05/03', gender_id:2}),
    knex('players').insert({ id: 142,first_name:'Karen',last_name:'Batista',birthday:'12/17/02', gender_id:2}),
    knex('players').insert({ id: 143,first_name:'Evelyn',last_name:'Rios',birthday:'04/19/01', gender_id:2}),
    knex('players').insert({ id: 144,first_name:'Nathaly',last_name:'Rios',birthday:'08/13/04', gender_id:2}),
    knex('players').insert({ id: 145,first_name:'Emily',last_name:'Gorduno',birthday:'01/09/01', gender_id:2}),
    knex('players').insert({ id: 146,first_name:'Judith',last_name:'Ravelo',birthday:'04/12/01', gender_id:2}),
    knex('players').insert({ id: 147,first_name:'Pavan',last_name:'Rodriguez',birthday:'05/03/02', gender_id:2}),
    knex('players').insert({ id: 148,first_name:'Celene',last_name:'Vargas',birthday:'12/03/02', gender_id:2}),
    knex('players').insert({ id: 149,first_name:'Ashly',last_name:'Motan',birthday:'02/09/01', gender_id:2}),

    //==========================================================================
    // Team 6: Archi - Teams
    //==========================================================================
    knex('players').insert({ id: 150,first_name:'Gabriela',last_name:'Garcia',birthday:'05/19/01', gender_id:2}),
    knex('players').insert({ id: 151,first_name:'Josselyn',last_name:'Mendez',birthday:'04/07/01', gender_id:2}),
    knex('players').insert({ id: 152,first_name:'Shyler',last_name:'Ortiz',birthday:'09/10/01', gender_id:2}),
    knex('players').insert({ id: 153,first_name:'Anna',last_name:'Ruiz',birthday:'08/20/02', gender_id:2}),
    knex('players').insert({ id: 154,first_name:'Aydan',last_name:'Turner',birthday:'11/05/02', gender_id:2}),
    knex('players').insert({ id: 155,first_name:'Serenity',last_name:'Castillo',birthday:'04/17/03', gender_id:2}),
    knex('players').insert({ id: 156,first_name:'Natalie',last_name:'Hernandez',birthday:'06/27/02', gender_id:2}),
    knex('players').insert({ id: 157,first_name:'Giselle',last_name:'Vargas',birthday:'07/19/02', gender_id:2}),
    knex('players').insert({ id: 158,first_name:'Carla',last_name:'Avalos',birthday:'10/26/01', gender_id:2}),
    knex('players').insert({ id: 159,first_name:'Isabella',last_name:'Portes',birthday:'09/08/02', gender_id:2}),
    knex('players').insert({ id: 160,first_name:'Cindy',last_name:'Bonilla',birthday:'03/01/01', gender_id:2}),
    knex('players').insert({ id: 161,first_name:'Araceli',last_name:'Bonilla',birthday:'12/09/02', gender_id:2}),
    knex('players').insert({ id: 162,first_name:'Magali',last_name:'Bonilla',birthday:'10/30/03', gender_id:2}),
    knex('players').insert({ id: 163,first_name:'Glorismel',last_name:'Velazquez',birthday:'07/23/01', gender_id:2}),
    knex('players').insert({ id: 164,first_name:'Jennifer',last_name:'Perez',birthday:'06/11/01', gender_id:2}),
    knex('players').insert({ id: 165,first_name:'Eilin',last_name:'Cruz',birthday:'06/03/03', gender_id:2}),

    //==========================================================================
    // Team 7: Archi - Teams
    //==========================================================================
    knex('players').insert({ id: 166,first_name:'Player F1',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 167,first_name:'Player F2',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 168,first_name:'Player F3',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 169,first_name:'Player F4',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 170,first_name:'Player F5',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 171,first_name:'Player F6',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 172,first_name:'Player F7',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 173,first_name:'Player F8',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 174,first_name:'Player F9',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 175,first_name:'Player F10',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 176,first_name:'Player F11',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 177,first_name:'Player F12',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 178,first_name:'Player F13',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 179,first_name:'Player F14',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 180,first_name:'Player F15',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 181,first_name:'Player F16',last_name:'',birthday:'', gender_id:2}),
    //==========================================================================
    // Team 8: Archi - Teams
    //==========================================================================
    knex('players').insert({ id: 182,first_name:'Player PE1',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 183,first_name:'Player PE2',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 184,first_name:'Player PE3',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 185,first_name:'Player PE4',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 186,first_name:'Player PE5',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 187,first_name:'Player PE6',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 188,first_name:'Player PE7',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 189,first_name:'Player PE8',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 190,first_name:'Player PE9',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 191,first_name:'Player PE10',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 192,first_name:'Player PE11',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 193,first_name:'Player PE12',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 194,first_name:'Player PE13',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 195,first_name:'Player PE14',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 196,first_name:'Player PE15',last_name:'',birthday:'', gender_id:2}),
    knex('players').insert({ id: 197,first_name:'Player PE16',last_name:'',birthday:'', gender_id:2})
  )
}

console.log('12000 OK')
