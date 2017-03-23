var Combinatorics = require('js-combinatorics')

//numero de equipos
//duracion de los partidos

//la duracion de un partido es
// d = numero_tiempos * minutos_partido + numero_extra_tiempos * minutos_extra + tiempo_entre_partidos

//numero de locaciones, el número de canchas en el venue

//calculo de numero de partidos en todos contra todos
var numPartidos = (n) => (1/2)*n*(n-1)

//si tengo n locaciones, la duracion de los partidos es d.

//1	determinar cuantos bloques de tiempo tengo en h horas.
//	el período de tiempo disponible es de h horas, h*60 minutos
//	-> (h*60)/d = numero de bloques disponibles para partidos = numero de partidos que se pueden jugar

//2	tomando en cuenta la duracion d de los partidos, determinar cuantos
//	partidos de duracion d se pueden jugar en una locacion
// -> el # de bloques es igual al # de partidos que se pueden jugar en el bloque de tiempo, en un location

//3 el # de locaciones multiplica el # de partidos que se pueden jugar simúltaneamente

//-------------------------------------------------------

// por otro lado, se necesita también repartir el # de equipos participantes entre
// los partidos generados.
// Cada equipo debe jugar al menos una vez contra los otros equipos

// Si los equipos son A, B y C, entonces: A->B; A->C; B->C
// https://github.com/dankogai/js-combinatorics

var teams = {
	 'A':[ 'AZTECAS (DALLAS)','FC THAL','KATY YOUTH' ]
	,'B':[ 'DALLAS ELITE FC','BAY AREA OILERS FC','MUSTANG HMSL' ]
	,'C':[ 'HORIZON','SHOOTOUT','SAN ANTONIO GENERALS' ]
	,'D':[ 'DALLAS UNITED','ATLETICO UNITED','GREEN EAGLES' ]
	,'E':[ 'JAGUARS', 'PORTUGAL', 'SW FC'  ]
	,'F':[ 'RGV','PUEBLA BLUE', 'AJAX SELECT' ]
	,'G':[ 'TAPATIOS','ISLANDERS FC', 'TYLER FC' ]
	,'H':[ 'ASC NEWSTARS', 'ORIZABA', 'CORSICANA FC' ]
}



const cmb = Combinatorics.combination([
	'AZTECAS (DALLAS)'
	,'FC THAL'
	,'KATY YOUTH'
	,'DALLAS ELITE FC'], 2);
// while(a = cmb.next()) console.log(a);

//alternar home y visitor en el partido n-1

//1 - crear combinaciones por grupo, para determinar los partidos a jugar
//2 - asignar ubicaciones a cada uno de los partidos

const teamCollection = Object.keys(teams).reduce((_teams, groupId, idx) => {
	let groupTeams = _teams[groupId] ? _teams[groupId] : []

	// console.log(groupTeams)

	let ts = teams[groupId].map(team => {
		return {
			id: idx, name: team
		}
	})

	groupTeams.push(ts)

	return groupTeams
},[])

console.log(teamCollection);
