exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('historias').del(),


    /*


            table.increments('id');
            table.string('historia_anterior');
            table.text('contenido');
            table.text('antecedente');
            table.boolean('active').notNullable().defaultTo(true);
            //table.integer('medico_id').references('medicos.id').index();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

    */
    // Inserts seed entries
    knex('historias').insert({id:1, historia_anterior:1222, contenido:'2-10-14  se cambia la sonda \n 28-12-07: UROTAC: Dilatacion Ureteral derecha   Probable estenosis de Union Ureteropieleica derecha LOE lateral derecha en vejiga \n Nota: Rarefacion de la grasa perivesical derecha   Adenomegalias en cadenas obsturatrices   Litiasis vesicular    Imagen quistica de 1 cm en riñon derecho CISTOSCOPIA: Tumor que ocupa todo el lateral derecho de la  vejiga  se toma una sola biopsia por lo sangrante que es. 5-12-07: Biopsia: de bajo grado de malignidad se decied cisrtectomia parcial con Reimplante ureteral y biopsia de los ganglios. 3-3-09:  Esta en tratamientyo en la Floresta, y  la controa el Dr. Abreu viene a control  Trae Urotac: no existe la hidronefrosis E.F: enb el Ecosonograma no hay Hidronefrosis y no hat residuo  se solcita una Videocistoscopia 21-4-08: CISTOSCOPIA:  sE OBSEREVA UNA VEHIGA DE BUENA CAPACIDADA CON UNA MUCOAS HIPOEREMICA, MEATO IZUIQERDO d.l.m. sE ONSERVA DESPARICION DEL TUMOR EN EL LADO DERECHO DE LA EJIGA, PARECIEr estar el Meatro D.L.N. se observa por detras y delante del meato derecho una zoa de edema buloso. hacia parte anterio del meato y hacia afura se observan microvellosidades en un ara de 3 mm que pordri ser inflamcion a tumor se obserrvara en 45 dias para repetir la Videocistoscopia con toima de Biopsia de toda la zona inflamada. imagenes desde la 014 a la 012 18-6-08: bIOPSAI cISTITIS pAPILAR 14-7-08:  se llevoa aquirofano el dia Marres se realizo una Nefrostomia no se pudo llevar el caterer hacia la vejiga existe tambien una Uretrohidornefrosis izuqierda. regresa hoy. Ecosonogram abdominal .  mejoro la hidronefrosis derecha no asi la izuiqerda se pide para nefrostomia izquierda 16-7-08: cistoscopia:  hay sangrameinto se debe llevara  colocar catere dobe jota y tomar bipsoa y resecar. 4-8-08: Esta  orinando bien, se pide Urea y Creatiunina. Se le indica medir lo que orina por uretra y por la sonda. 6-8-08: Creatinina 1,1 BUN  en 21 diascretamente elevada   Sonda 937cc  y por la orina 823  se pide para cateterismo. 11-8-08: hA TENIDO DSANGRAMIE TO IMPORTANTE POR LA VEJIGA QUE AMERITO UNA SONDA TRES VIAS,  orina hematuricas claras se reirara lka sonda el Dia Mierocles.  13-8-08: HHto 9,6 Hb 29.9   Hematiraes 3,03  urea en 17 creatina en 1,2 27-8-08: Se llevoa quirofano la semana pasada se practico Nefrostomia izuiqerda demoesrandose una INserrcion alta del Ureter que es la causa de la Hidronefrosis se toma bioopsa de la pared lateralk derecha el resultado fue: negativo apara atipias  se esperara 15 dias para tomar biopsia por puncion con aguja fina. 10-9-08: Se sien te mejor todo esta bien se deja igual expulsa liquido hematico por la uretra  se deja con control en 15 dias Se le indica  control con quimio terapia  17-9-08:  Se cambio sdonda derecha. 22-9-08: eSTA OBSTRUIDO EL RIÑON se debe reposicionar la sonda  Fue llevada a quirofano y tenia una PIOnefrosis se dejo sonad de Nefrosotmoa y se consulto a Regulo para contro de Vomitos 15-10-08: no se pudo cambiar se cristalizo el contraste 19-11-08: Viene a fin de practicarsele una cambio de  sonda  de Nefrostomia: que ingrese por emergencia mañana esta estreñida fue al Dr. Salazar le indico ua TACabdomin pelvico Urocultivo positivo a E, Coli resistente a las quinolonas   20-11-08: se cambiaron las sondas.  27-11-08:  sE SIENTE BIEN ORINAS CVLARAR SE ESPERAN LOS EXAMENES:  hEMATOLOGIA: NORMAL gLICEMIA NORMALÑ uREA EN 28 UN POCO ALTA CREATININA EN 1,3  RESTIO  NORN AL 15-1-09: Tuvo infeccion urinaria y sedebe cambiar la sonda, se realizara por emergencia .  19-1-08: Se cambiaron ambas sondas  tien ardor vaginal y orinas piuricas. 12-2-09: Se repite el examne de orina: se toma muestra para rpocultibo -18-3-09: Tiene orinar piuricas se toma cultivo  se da Cedax. 11-5-09:  Urea en 23  y creatinina 1,3   Salazar le indico TAC ab domioa pelvio y Rx  del torax  tiene glicemia en 140 20-5-09: Se realiza cambio de sonda: 22-6-09: se realiza cambio de sonda 2-9-09: SE CA,MBIA LAS SONDAS 5-10-09  se cambia la sondas 18-2-10: Se cambian las sondas y se troma muestra para cultivo.- 15-4-10: Se cambia ambas nefrostomias:  20/05/2010 Cultivo Bacteriano: positivo a E Coli, se da Cedax por 10 dias. 18-8-10: Se realiza cabio de sonda se toma muesra de ambos 14-10-10: SE CAMBIAN LAS SONDA SE PIDE  urotac  Cultivo positobvo a Candoda SAlbicans 25-10-10: tiene doo lumbatr derecho y le molesta la sonda Trae UROTAC : nedroftomia pareciera que la derecha esdtya muy incrustada llega a ureter. rsto normla se espera el urocultivo. esta en tyratamien to con Duiflucan  Urea 34 y creatinina en 1. UROTAC DE LA FLORESTA:   DISTENCION VESICULA BILIAR  CON LITIASI  nEFRIOSTOMIA BILATERAL Y ENGOSMEINTO DE LAS PAREDES VESICALES, RECTO SIGOMIDES Y ASA DELGADA AGDHERIDFA A LA VEJIGA tIENE UNA LEUCEMIA LINFOCITIOCA CRONICA. ESTA EN TRATAMIENTO 12-5-11: sE CAMBIA SONDA HOY 8-8-11: SE CAMBIA LA SONDA HOY  29-8-11: Se cambia la sonda se toma muestra para Uroculñtivo del riñon derecho 6-12-11: se reraliza cambio de sonda: . 17-1-12: se realiza cambio de sonda 8-2-12: cAMBIO de sonda: 7-3-12: se relaiza cambio de sonda 28-2-12: sE REALIZA CAMBIO DE SONDA HAY SECRECIO PURURLENTA POR EL RIÑON IZUQERDO  SE TOMAN MUESTRA PARA UROCULTIVO 16-4-12:  Se pide Urocultivo: 26-4-12:  Se toma muetsra para urocultivo y se cambia las sondas 23-7-12: Sew cambian las sondas 20-9-2: Se cambia la sonda 18-3-13:  Se relaiza cambio de sonda de nesfrostomia orinas muy fetidas 15-7-123.  tIENE INFECICON A pSEUDOMONA QUE ESTA SOIENO TARTAD CON cEDAX SE CMABIA LA SONMDA S 15-8-13:  SE CAMBIAN ALAS SONDAS 28-11-13:  se cambian las sondas 16-1-14. se cambian las sondas por # 20 Urocultivo: positoivo en derecho se da Ceax y Macrodatina 13-2-14: se fractura la muñeca izquierda y se cambio ñlas sondas. 13-3-14:  se cambia la sonda 10-4-14: Se cambia la sonda tien gripe tine urocultivo positivo: riñon derecho con Pseudomona Aeroginos   derecho E  coli sensivpbe a todo INVANZ y Levofloxacina 4-8-14: se cambio la sonda hoy 4-9-14: Se cambam las sondas hay infeccoin uroiaria positiva a E. Coli. 2-120-14: Se cambia la sonda 3-11-14: se cambian las sondas  20-11-14 se realiza cambio de sondas orinas claras se pide Urea y Creatiunina 15-12-14 se cambia la sdonda se toma muesrab para urocultivo: 13-1-15: se cambian ambas sondas 9-2-156 SE cambian ambas sondas 9-3-15 : se cambia  la sonda:', antecedente:'Not so many', evolucion:"Mejoras ...."}),
    knex('historias').insert({id:2, historia_anterior:1429, contenido:'Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta', antecedente:'Dolor en la ingle',evolucion:"Mejoras ...."}),
    knex('historias').insert({id:3, historia_anterior:437, contenido:'Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta, Motivo de consulta: Hematemesis Enfermedad actual: Paciente masculino de 53 años de edad que concurre al servicio de guardia del hospital Centenario por un cuadro caracterizado por un episodio de hematemesis de escasa intensidad, dos horas previas a la consulta', antecedente:'Dolor abdominal',evolucion:"Mejoras ...."})
    ).then(function(){
		//Add query
        return knex.raw('');
    });
};