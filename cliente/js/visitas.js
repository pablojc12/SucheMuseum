function cargarFormVisitas()
{
	$("#actions").hide();
	$("#imagen").hide();
	
	var html = "";
	
	var select = "";
	
	for(var i = 0; dataMuseos.length > i; i++){
		select += "<option value='";
		select += dataMuseos[i].idMuseo;
		select += "'>";
		select += dataMuseos[i].nombre;
		select +="</option>" +
				"";
	}
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>Registrar vsita</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="inicio()">|arrowleft</span>ATRAS';
	html += '</div>'
	
	//etiqueta d etexto
	html += "<div class='12u$'>";
	html += "Fecha y Hora de la Visita";
	html += "</div>";
	
	//fecha
	html += "<!-- fecha-->";
	html +='<div class="6u  12u$(small)"><label for="fecha">';
	html +="	<input type='date' name='fecha' value='' id='fecha' onblur='campoVacio(this.value,"+'"Ingresa una fecha de termino"'+", this.id)'/>Fecha:</label>";
	html +='</div>';
	
	//hora
	html += "<!-- hora -->";
	html +='<div class="6u$  12u$(small)"><label for= "hora">';
	html +="	<input type='time' name='hora' id='hora' value='' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>Hora:</label>";
	html +='</div>';
	
	//personas
	html += '<!-- personas -->';
	html += '<div class="6u 12u$(small)"><label for="personas">';
	html += "	<input type='number' id='personas' name='personas' onblur='campoVacio(this.value,"+'"Ingresa una cantidad de personas"'+", this.id)'/>Cuantas Personas</label>";
	html +='</div>';
		
	//duracion
	html += "<!-- duracion -->";
	html +='<div class="6u$  12u$(small)"><label for="duracion">';
	html +="	<input type='time' name='duracion' id='duracion' value='' onblur='campoVacio(this.value,"+'"Ingresa la duracion"'+", this.id)'/>Duracion</label>";
	html +='</div>';
	
	//etiqueta
	html += "<div class='12u$'>";
	html += "";
	html += "</div>";
	
	
	//etiqueta del select para el idMuseo
	html += "<div class='12u$'>";
	html += "	<div class='select-wrapper'>";
	html += "		<select name='museoId' id='museoId' onblur='campoVacio(this.value," + '"Selecciona un museo"' + ", this.id)'>";
	html += 			"<option value=''>- Selecciona el museo a visitar-</option>";
	html += 			select;
	html += "		</select>";
	html += "	</div>";
	html += "</div>";
	
	//etiqueta
	html += "<div class='12u$'>";
	html += "";
	html += "</div>";
	
	//comentario
	html += "<!-- comentario-->";
	html +='<div class="12u$"><label for="comentario">Comentario:';
	html +="	<textarea name='comentario' id='comentario' value='' onblur='campoVacio(this.value,"+'"Escriba un comentario"'+", this.id)' placeholder='Ingrese su comentario'></textarea></label>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='registrar' id='registrar' value='Regisrar' class='special' onclick='registrarVisita(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}

function listarVisitas(data)
{
	var html = "";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].idVisita +'" class="lsf symbol" onclick="regDelete(this.id)">delete</span>';
		consulta += '<span id="'+ data[i].idVisita +'" class="lsf symbol" onclick="regModify(this.id)">edit</span>';
		consulta += '<span id="'+ data[i].idVisita +'" class="lsf symbol" onclick="regView(this.id)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].idVisita;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].fecha;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].horario;
		consulta += '</td>';
		consulta += '</tr>';
	}
	
	html = "<h2>Visitas registradas</h2>";
	
	//cabecera de la tabla (thead)
	html += '<div class="table-wrapper">';
	html += '<table>';
	html += '<thead>';
	html += '<tr>';
	html += '<th></th>';
	html += '<th>CLAVE</th>';
	html += '<th>FECHA:</th>';
	html += '<th>HORA:</th>';
	html += '</tr>';
	html += '</thead>';
	
	//cuerpo de la tabla
	html += '<tbody>';
	html += consulta;
	html += '</tbody>';
	html += '</table>';
	html += '</div>';
	
	newHTML.innerHTML = html;
}


/**
 * funcion para mandar un mensaje (alert) con todos los datos del registro
 * @param data = informacion arrojada desde la base de datos  
 */
function cargaViewVisita(data)
{
	var mensaje = "";
	var museo = null;
	
	for(var i = 0; dataMuseos.length > i; i++)
	{
		if(dataMuseos[i].idMuseo == data.idMuseo)
			museo = dataMuseos[i].nombre;
	}
	
	mensaje += "<p class='black'>";
	mensaje += '<strong>"' + museo + '"</strong>';
	mensaje += "<br>";
	mensaje += "CLAVE: <strong>" + data.id;
	mensaje += "<br>";
	mensaje += "</strong>FECHA: <strong>" + data.fecha;
	mensaje += "<br>";
	mensaje += "</strong>HORARIO: <strong>" + data.horario; 
	mensaje += "<br>";
	mensaje += "</strong>PERSONAS: <strong>" + data.personas;
	mensaje += "<br>";
	mensaje += "</strong>DURACION: <strong>" + data.duracion;
	mensaje += "<br>";
	mensaje += "</strong>COENTARIO: <strong>" + data.comentario;
	mensaje += "</p>";
	
	alerta(mensaje, "");
}

/**
 * funcion para abrir el formulario de visita con los datos de la visita para su actualizacion
 * @param data
 */
function cargaFormModifyVisita(data)
{
	$("#actions").hide();
	$("#imagen").hide();
	
	var html = "";
	
	var select = "";
	
	for(var i = 0; dataMuseos.length > i; i++)
	{
		console.log(dataMuseos[i].idMuseo + " " + data.idMuseo);
		if(dataMuseos[i].idMuseo == data.idMuseo)
		{
			select += "<option selected value='";
			select += dataMuseos[i].idMuseo;
			select += "'>";
			select += dataMuseos[i].nombre;
			select +="</option>" +
					"";
		}
		else
		{
			select += "<option value='";
			select += dataMuseos[i].idMuseo;
			select += "'>";
			select += dataMuseos[i].nombre;
			select +="</option>" +
					"";
		}
	}
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>modificar vsita</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="inicio()">|arrowleft</span>ATRAS';
	html += '</div>'
	
	//etiqueta d etexto
	html += "<div class='12u$'>";
	html += "Fecha y Hora de la Visita";
	html += "</div>";
	
	//id visita
	html += "<!-- id visita -->";
	html +='<div class="12u$">';
	html +="	<input type='hidden' name='idVisita' value='" + data.id + "' id='idVisita'/>";
	html +='</div>';
	
	//fecha
	html += "<!-- fecha-->";
	html +='<div class="6u  12u$(small)"><label for="fecha">';
	html +="	<input type='date' name='fecha' value='" + data.fecha + "' id='fecha' onblur='campoVacio(this.value,"+'"Ingresa una fecha de termino"'+", this.id)'/>Fecha:</label>";
	html +='</div>';
	
	//hora
	html += "<!-- hora -->";
	html +='<div class="6u$  12u$(small)"><label for= "hora">';
	html +="	<input type='time' name='hora' id='hora' value='" + data.horario + "' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>Hora:</label>";
	html +='</div>';
	
	//personas
	html += '<!-- personas -->';
	html += '<div class="6u 12u$(small)"><label for="personas">';
	html += "	<input type='number' id='personas' name='personas' value='" + data.personas + "' onblur='campoVacio(this.value,"+'"Ingresa una cantidad de personas"'+", this.id)'/>Cuantas Personas</label>";
	html +='</div>';
		
	//duracion
	html += "<!-- duracion -->";
	html +='<div class="6u$  12u$(small)"><label for="duracion">';
	html +="	<input type='time' name='duracion' id='duracion' value='" + data.duracion + "' onblur='campoVacio(this.value,"+'"Ingresa la duracion"'+", this.id)'/>Duracion</label>";
	html +='</div>';
	
	//etiqueta
	html += "<div class='12u$'>";
	html += "";
	html += "</div>";
	
	
	//etiqueta del select para el idMuseo
	html += "<div class='12u$'>";
	html += "	<div class='select-wrapper'>";
	html += "		<select name='museoId' id='museoId' onblur='campoVacio(this.value," + '"Selecciona un museo"' + ", this.id)'>";
	html += 			"<option value=''>- Selecciona el museo a visitar-</option>";
	html += 			select;
	html += "		</select>";
	html += "	</div>";
	html += "</div>";
	
	//etiqueta
	html += "<div class='12u$'>";
	html += "";
	html += "</div>";
	
	//comentario
	html += "<!-- comentario-->";
	html +='<div class="12u$"><label for="comentario">Comentario:';
	html +="	<textarea name='comentario' id='comentario' onblur='campoVacio(this.value,"+'"Escriba un comentario"'+", this.id)' placeholder='Ingrese su comentario'>" + data.comentario + "</textarea></label>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='actualizar' class='special' onclick='registrarVisita(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}













