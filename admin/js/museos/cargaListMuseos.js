/**
 * funcion para cargar la lista de museos correspondientes
 * @param titulo = titulo a mostrar
 * @param data = extraccion de la base de datos
 */
function cargaMuseos(titulo, data)
{
	var html = "<h2>";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].idMuseo +'" class="lsf symbol" onclick="regDelete(this.id, document.getElementById('+ "'slcCategoria'" +').value)">delete</span>';
		consulta += '<span id="'+ data[i].idMuseo +'" class="lsf symbol" onclick="regModify(this.id, document.getElementById('+ "'slcCategoria'" +').value)">edit</span>';
		consulta += '<span id="'+ data[i].idMuseo +'" class="lsf symbol" onclick="regView(this.id, document.getElementById('+ "'slcCategoria'" +').value)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].idMuseo;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].nombre;
		consulta += '</td>';
		consulta += '</tr>';
	}
	
	html += titulo;
	html += "</h2>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	//cabecera de la tabla (thead)
	html += '<div class="table-wrapper">';
	html += '<table>';
	html += '<thead>';
	html += '<tr>';
	html += '<th></th>';
	html += '<th>CLAVE</th>';
	html += '<th>NOMBRE</th>';
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
function cargaViewMuseos(data)
{
	var mensaje = "";
	
	mensaje += "<p class='black'>";
	mensaje += '<strong>"' + data["nombre"] + '"</strong>';
	mensaje += "<br>";
	mensaje += "CLAVE: <strong>" + data["id"];
	mensaje += "<br>";
	mensaje += "</strong>TIPO: <strong>" + data["tipo"];
	mensaje += "<br>";
	mensaje += "</strong>HORARIOS: <strong>" + data["horario"]; 
	mensaje += "<br>";
	mensaje += "</strong>TELEFONO: <strong>" + data["telefono"];
	mensaje += "</p>";
	
	alerta(mensaje, "");
}

/**
 * funcion para cargar el formulario del museo con los datos correspondientes del registro
 * @param titulo
 * @param tabla
 * @returns {String}
 */
function cargaFormMuseo(titulo, tabla, data)
{
	var html = "";
	
	var diaInicio = "";
	var diaFin = "";
	
	var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	
	for(var i = 0; dias.length > i; i++)
	{
		if(dias[i] == data["diaInicio"])
		{
			diaInicio += "<option selected value='";
			diaInicio += dias[i];
			diaInicio += "'>";
			diaInicio += dias[i];
			diaInicio +="</option>" +
			 			"";
		}
		else
		{
			diaInicio += "<option value='";
			diaInicio += dias[i];
			diaInicio += "'>";
			diaInicio += dias[i];
			diaInicio +="</option>" +
			 			"";
		}
	}
	
	for(var i = 0; dias.length > i; i++)
	{
		if(dias[i] == data["diaFin"])
		{
			diaFin += "<option selected value='";
			diaFin += dias[i];
			diaFin += "'>";
			diaFin += dias[i];
			diaFin +="</option>" +
			 			"";
		}
		else
		{
			diaFin += "<option value='";
			diaFin += dias[i];
			diaFin += "'>";
			diaFin += dias[i];
			diaFin +="</option>" +
			 			"";
		}
	}
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>" + titulo + "</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft ATRAS</span>';
	html += '</div>'

	//etiqueta para el campo de categoria escondido
	html += "<input type='hidden' value=" + tabla + " name='tabla' id='tabla'/>";
	
	//etiqueta para el campo de idMuseo escondido
	html += "<input type='hidden' value=" + data["idMuseo"] + " name='idMuseo' id='idMuseo'/>";
	
	//Etiqueta de nombre
	html += "<!-- Nombre de museo-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreMuseo' id='txtNombreMuseo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'"txtNombreMuseo"'+")' value='"+ data["nombre"]+"' placeholder='Nombre del museo'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>";
	html += "</div>";
	
	//tipo
	html += "<!-- Tipo -->";
	html +='<div class="6u 12u$(small)">';
	html +='	<div class="select-wrapper">';
	html +="		<select name='slcTipo' id='slcTipo' onblur='validaText(this.value, "+'"Selecciona un tipo de museo",'+' this.id'+")'>";
	html +='			<option value="">- Selecciona tipo de museo -</option>';
	html +='			<option selected value="ARTE Y CULTURA">ARTE Y CUTURA</option>';
	html +='		</select>';
	html +='	</div>';
	html +='</div>';
	
	//etiqueta de telefono
	html += "<!-- Telefono -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<input type='text' name='txtTelefono' id='txtTelefono' onblur='validarTelefono(this.value, "+'"Telefono incorrecto: sin espacios y simbolos",'+' this.id'+")' value='"+ data["telefono"]+"' placeholder='Numero de telefono'";
	html += "		autocomplete='off' maxlength='10' />";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta de dias
	html += "<div class='12u$'>";
	html += "	<strong>DIAS:</strong>";
	html += "</div>";
	
	//dia de inicio
	html += "<!-- dia de inicio -->";
	html +='<div class="5u 12u$(small)">';
	html +='	<div class="select-wrapper">';
	html +="		<select name='diaInicio' id='diaInicio'>";
	html +=			diaInicio;
	html +='		</select>';
	html +='	</div>';
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//dia de fin
	html += "<!-- dia de fin -->";
	html +='<div class="5u$ 12u$(small)">';
	html +='	<div class="select-wrapper">';
	html +="		<select name='diaFin' id='diaFin'>";
	html +=			diaFin;
	html +='		</select>';
	html +='	</div>';
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta de horarios
	html += "<div class='12u$'>";
	html += "	<strong>HORARIOS: (formato de 24 horas)</strong>";
	html += "</div>";
	
	//hora de inicio
	html += "<!-- hora de inicio -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaInicio' id='horaInicio' value='"+ data["horaInicio"] +"' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//hora de fin
	html += "<!-- hora de fin -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaFin' id='horaFin' value='"+ data["horaFin"] +"' onblur='campoVacio(this.value,"+'"Ingresa una hora de salida"'+", this.id); compararHoras(this.value, document.getElementById("+'"horaInicio"'+").value, "+'"horaInicio"'+")'/>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='Actualizar' class='special' onclick='registrarMuseo(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	
	newHTML.innerHTML = html;
}








