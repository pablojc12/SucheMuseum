//variable para traer el valor correspondiente dependiendo de la variable anterior
var slcCategoria = sectionForm["slcCategoria"];

/**
 * Extrae el elemeno por ID para su posterior carga con etiquetas html
 * @string newHTML = codigo en html
 */ 
var newHTML = document.getElementById("newCode");
sectionForm.addEventListener("input", procesa, false);


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
			break;

		case categoriaMuseo[1]: // caso de museos
			newHTML.innerHTML = cargaFormMuseo("Registrar museo", categoria);
			break;
			
		case categoriaMuseo[2]: // caso de salas
			extracMuseoID("Registrar sala", categoria, null, "cargaFormSala", null);
			break;
			
		case categoriaMuseo[3]: // caso de expociciones
			extracMuseoID("Registrar exposicion", categoria, null, "cargaFormExposicion", null);
			break;
			
		}
		
	}
	catch (e) 
	{
		newHTML.innerHTML = e.message;
	}
}
