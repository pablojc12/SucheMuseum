//variable para traer el valor correspondiente dependiendo de la variable anterior
var slcCategoria = sectionForm["slcCategoria"];
$("#bienbenida").text("menu");

/**
 * Extrae el elemeno por ID para su posterior carga con etiquetas html
 * @string newHTML = codigo en html
 */ 
var newHTML = document.getElementById("newCode");
sectionForm.addEventListener("input", procesa, false);

/**
 * funcion del evento listener
 */
function procesa()
{
	try
	{
		var categoria = lee(slcCategoria);
		
		//validacion para ver que categoria es y lanzar su respectivo formulario a mostrar
		switch (categoria) 
		{
		case categoriaMuseo[0]: //en caso de que no seleccione la categoria
			$("#bienbenida").text("menu");
			newHTML.innerHTML = "<div class='12u$'>" +
									"<h2>Selecciona una opcion</h2>" +
								"</div>" +
								"<div class='12u'>" +
									"<p>.......................................</p>" +
								"</div>";
			$("#imagenUpload").hide();
			break;

		case categoriaMuseo[1]: // caso de museos
			$("#bienbenida").text("mi museo");
			$("#imagenUpload").hide();
			extraeDataMuseos();
			break;
			
		case categoriaMuseo[2]: // caso de salas
			$("#bienbenida").text("Salas disponibles");
			$("#imagenUpload").hide();
			extraeDataSalas();
			break;
			
		case categoriaMuseo[3]: // caso de expociciones
			$("#bienbenida").text("Exposiciones disponibles");
			$("#imagenUpload").hide();
			extraeDataExposicion();
			break;
		case categoriaMuseo[4]: // caso de direccion
			$("#bienbenida").text("Direccion del Museo");
			$("#imagenUpload").hide();
			extraeDataDireccion();
			break;
		}
		
	}
	catch (e) 
	{
		newHTML.innerHTML = e.message;
	}
}


/**
 * funcion para etraer los datos del museo 
 */
function extraeDataMuseos()
{	
	var objetoJSON = {
			"usuario": "director",
			"funcion": "extraerDataMuseos",
	}
	//console.log(objetoJSON);
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else
					cargaFormMuseo("museos", data);
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

/**
 * funcion para extraer los datos de la salas
 */
function extraeDataSalas()
{	
	var objetoJSON = {
			"usuario": "director",
			"funcion": "extraerDataSalas",
	}
	//console.log(objetoJSON);
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
				{
					notificacion("No se encontraron Salas");
					newHTML.innerHTML = "<div class='12u$'><span class='lsf symbol' onclick='cargaFormSalaAltas()'>plus</span></div>";
				}
				else
					cargaListSalas(data);
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

/**
 * funcion para extraer los datos de la direccion unica
 */
function extraeDataDireccion()
{	
	var objetoJSON = {
			"usuario": "director",
			"funcion": "extraerDataDireccion",
	}
	//console.log(objetoJSON);
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
				{
					notificacion("No se encontro Direccion");
					newHTML.innerHTML = "<div class='12u$'><span class='lsf symbol' onclick='cargaFormAltaDireccion()'>plus</span></div>";
				}
				else 
					cargaFormDireccion(data);
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

/**
 * funcion para extraer los datos de las exposiciones
 */
function extraeDataExposicion()
{
	var objetoJSON = {
			"usuario": "director",
			"funcion": "extraerDataExposiciones",
	}
	//console.log(objetoJSON);
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
				{
					notificacion("No se encontraron Exposiciones");
					newHTML.innerHTML = "<div class='12u$'><span class='lsf symbol' onclick='cargaFormAltaExposicion()'>plus</span></div>";
				}
				else 
					cargaListExposiciones(data);
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
}