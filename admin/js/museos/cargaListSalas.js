/**
 * funcion para cargar la lista de las salas dependiendo de los datos arrojados por la base de datos
 * @param titulo = titulo a mostrar
 * @param data = resultado de la busqueda en la base de datos
 */
function cargaSalas(titulo, data)
{
	var html = "<h2>";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].idSala +'" class="lsf symbol" onclick="regDelete(this.id, document.getElementById('+ "'slcCategoria'" +').value)">delete</span>';
		consulta += '<span id="'+ data[i].idSala +'" class="lsf symbol" onclick="regModify(this.id, document.getElementById('+ "'slcCategoria'" +').value)">edit</span>';
		consulta += '<span id="'+ data[i].idSala +'" class="lsf symbol" onclick="regView(this.id, document.getElementById('+ "'slcCategoria'" +').value)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].idSala;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].nombre;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].tipo;
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
	html += '<th>TIPO</th>';
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
function cargaViewSalas(data)
{
var mensaje = "";
	
	mensaje += "<p class='black'>";
	mensaje += '<strong>"' + data["nombre"] + '"</strong>';
	mensaje += "<br>";
	mensaje += "CLAVE: <strong>" + data["id"];
	mensaje += "<br>";
	mensaje += "</strong>TIPO: <strong>" + data["tipo"];
	mensaje += "<br>";
	mensaje += "</strong>HORA INICIAL: <strong>" + data["horaInicial"] + "hrs"; 
	mensaje += "<br>";
	mensaje += "</strong>HORA FINAL: <strong>" + data["horaFinal"] + "hrs";
	mensaje += "<br>";
	mensaje += "</strong>CLAVE DE MUSEO DE PERTENENCIA: <strong>" + data["idMuseoPerteneciente"];
	mensaje += "</p>";
	
	alerta(mensaje, "");
}

/**
 * funcion para hacer la carga del formulario de salas con datos del registro correspodiente del evento clic  
 * @param titulo = titulo a mostrar dentro del formulario
 * @param tabla = tabla para hacer la actualizacion
 * @param dataIdMuseo = todos los museos
 * @param dataDeRegistro = informacion par llenar el formulario
 */
function cargaFormSalas(titulo, tabla, dataIdMuseo, dataDeRegistro)
{

	var html = "";
	var museoSelect = "";
	
	for(var i = 0; dataIdMuseo.length > i; i++){
		
		if(dataIdMuseo[i].id == dataDeRegistro["idMuseoPertenencia"])
		{
			museoSelect += "<option selected value='";
			museoSelect += dataIdMuseo[i].id;
			museoSelect += "'>";
			museoSelect += dataIdMuseo[i].nombre;
			museoSelect +="</option>" +
					 "";
		}
		else
		{
			museoSelect += "<option value='";
			museoSelect += dataIdMuseo[i].id;
			museoSelect += "'>";
			museoSelect += dataIdMuseo[i].nombre;
			museoSelect +="</option>" +
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
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesaSelectMuseo()">|arrowleft ATRAS</span>';
	html += '</div>'

	//etiqueta para el campo de categoria escondido
	html += "<input type='hidden' value=" + tabla + " name='tabla' id='tabla'/>";
	
	//etiqueta para el campo de id de la sala escondido
	html += "<input type='hidden' value=" + dataDeRegistro["idSala"] + " name='idSala' id='idSala'/>";
	
	//Etiqueta de nombre de la sala
	html += "<!-- Nombre de la sala-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreSala' id='txtNombreSala' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro["nombre"] + "' placeholder='Nombre de la sala'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>";
	html += "</div>";
	
	//Etiqueta tipo de sala
	html += "<!-- Tipo de sala-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtTipoSala' id='txtTipoSala' onblur='validaText(this.value, "+'"ERROR de TIPO DE SALA:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro["tipo"] + "' placeholder='Tipo de sala'";
	html += "		autocomplete='off' maxlength='20' val=''/>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta de horarios
	html += "<div class='12u$'>";
	html += "	<strong>HORARIO DE ATENCION: (formato de 24 horas)</strong>";
	html += "</div>";
	
	//hora de inicio
	html += "<!-- hora de inicio -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaInicio' id='horaInicio' value='" + dataDeRegistro["horaInicio"] + "' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//hora de fin
	html += "<!-- hora de fin -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaFin' id='horaFin' value='" + dataDeRegistro["horaFin"] + "' onblur='campoVacio(this.value,"+'"Ingresa una hora de salida"'+", this.id); compararHoras(this.value, document.getElementById("+'"horaInicio"'+").value, "+'"horaInicio"'+")'/>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta del select para el idMuseo
	html += "<div class='12u$'>";
	html += "	<div class='select-wrapper'>";
	html += "		<select name='slcMuseoId' id='slcMuseoId' onblur='campoVacio(this.value," + '"Selecciona un museo"' + ", this.id)'>";
	html += 			"<option value=''>- Selecciona museo de pertenencia -</option>";
	html += 			museoSelect;
	html += "		</select>";
	html += "	</div>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='Actualizar' class='special' onclick='registrarSala(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
	
}















