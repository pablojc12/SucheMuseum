
/**
 * variable para traer el valor correspondiente dependiendo de la variable anterior
 * @Element
 * @string
 */
var slcCategoria = sectionForm["slcCategoria"];

/**
 * variabe general para la accion del listado
 * @string sqlListar = listar
 */
var sqlListar = "listar";
/**
 * variable para traer el componente a  vaciar dependiendo el id del componente 
 * @Element
 * @string
 */
var newHTML = document.getElementById("newCode");
sectionForm.addEventListener("input", procesa, false);

/**
 * funcion para la ejecucion del evento listener
 * @function
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
			
			newHTML.innerHTML = "<div class='12u$'>" +
									"	<hr>" +
								"</div>" +
								"<div class='12u$'>" +
									"<h2>Selecciona una categoria</h2>" +
								"</div>" +
								"<div class='12u'>" +
									"<p>.......................................</p>" +
								"</div>";
			newSelectMuseo.innerHTML = "";
			break;

		case categoriaMuseo[1]: // caso de museos
			newSelectMuseo.innerHTML = "";
			extracDataMuseos("Museo", categoria, sqlListar);
			break;
			
		case categoriaMuseo[2]: // caso de salas
			newHTML.innerHTML = "";
			extracMuseoID("", "", "TODAS LAS SALAS", "selectMuseo", null);
			break;
			
		case categoriaMuseo[3]: // caso de expociciones
			newHTML.innerHTML = "";
			extracMuseoID("", "", "TODAS LAS EXPOSICIONES", "selectMuseo", null);
			break;
		}
		
	}
	catch (e) 
	{
		newHTML.innerHTML = e.message;
	}
}

/**
 * @string  sectionMuseoSelect = parte del formulario dedicado al sub evento de select
 */
var sectionMuseoSelect = document["sectionSpecial"];

var newSelectMuseo = document.getElementById("newSelect");
sectionMuseoSelect.addEventListener("input", procesaSelectMuseo, false);

/**
 * funcion para el evento listener del select de museos
 */
function procesaSelectMuseo()
{
	var museoSelect = sectionMuseoSelect["museoSelect"];
	var categoria = lee(slcCategoria);
	var titulo = categoria;
	
	museoSelect = lee(museoSelect);
	
	if(museoSelect == "nada")
	{
		newHTML.innerHTML = "<div class='12u$'>" +
							"	<hr>" +
							"</div>" +
							"<div class='12u$'>" +
							"<h2>Selecciona un museo</h2>" +
							"</div>" +
							"<div class='12u'>" +
							"<p>.......................................</p>" +
							"</div>";
	}
	else
		extracDataMuseos(titulo, categoria, sqlListar, museoSelect);
	
	
}

/**
 * funcion para cargar el select del museo con los identificadore y nombres de los museos registrados 
 * @param data = respuestaJSON que contiene los identificadores y los nombres de los museos
 */
function selectMuseo(data, titulo)
{
	var html = "";
	var select = "";
	
	for(var i = 0; data.length > i; i++){
		select += "<option value='";
		select += data[i].id;
		select += "'>";
		select += data[i].id + " " + data[i].nombre;
		select +="</option>" +
				"";
	}
	
	html += "		<select name='museoSelect' id='museoSelect'>";
	html += 			"<option value='nada'>- Selecciona museo de pertenencia -</option>";
	html += 			"<option value='' disabled>------------------------</option>";
	html += 			"<option value='todos'>" + titulo + "</option>";
	html += 			"<option value='' disabled>------------------------</option>";
	html += 			select;
	html += "		</select>";
	
	newSelectMuseo.innerHTML = html;
}


