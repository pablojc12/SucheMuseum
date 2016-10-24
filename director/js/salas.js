/**
 * funcion para cargar el codigo html del formulario alta salas
 * @param tabla = tabla dentro de la base de datos (se extrae del valor del select categoria)
 * @param data = objetoJSON que contiene objetos de la tabla de museos
 */
function cargaFormSalaAltas()
{
	var html = "";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>agregar Sala</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft</span><strong>ATRAS</strong>';
	html += '</div>'
		
	//Etiqueta de nombre de la sala
	html += "<!-- Nombre de la sala-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreSala' id='txtNombreSala' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Nombre de la sala'";
	html += "		autocomplete='off' maxlength='100' val=''/>";
	html += "</div>";
	
	//Etiqueta tipo de sala
	html += "<!-- Tipo de sala-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtTipoSala' id='txtTipoSala' onblur='validaText(this.value, "+'"ERROR de TIPO DE SALA:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Tipo de sala'";
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
	html +="	<input type='time' name='horaInicio' id='horaInicio' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//hora de fin
	html += "<!-- hora de fin -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaFin' id='horaFin' onblur='campoVacio(this.value,"+'"Ingresa una hora de salida"'+", this.id); compararHoras(this.value, document.getElementById("+'"horaInicio"'+").value, "+'"horaInicio"'+")'/>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='registrar' id='registrar' value='Registrar' class='special' onclick='registrarSala(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}

/**
 * funcion para cargar la lista de las salas dependiendo de los datos arrojados por la base de datos
 * @param data = resultado de la busqueda en la base de datos
 */
function cargaListSalas(data)
{
	var html = "";
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

	
	//separador
	html += "<div class='12u$'><span class='lsf symbol' onclick='cargaFormSalaAltas()'>plus</span><strong>AGREGAR</strong></div>";
	
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
 * funcion para hacer la carga del formulario de salas con datos del registro correspodiente del evento clic  
 * @param titulo = titulo a mostrar dentro del formulario
 * @param tabla = tabla para hacer la actualizacion
 * @param dataIdMuseo = todos los museos
 * @param dataDeRegistro = informacion par llenar el formulario
 */
function cargaFormSalas(dataDeRegistro)
{
	var html = "";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>modificar mi sala</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft</span><strong>ATRAS</strong>';
	html += '</div>'
	
	//etiqueta para el campo de id de la sala escondido
	html += "<input type='hidden' value=" + dataDeRegistro["idSala"] + " name='idSala' id='idSala'/>";
	
	//Etiqueta de nombre de la sala
	html += "<!-- Nombre de la sala-->";
	html += "<div class='12u$'><label for='txtNombreSala'>";
	html += "	<input type='text' name='txtNombreSala' id='txtNombreSala' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro["nombre"] + "' placeholder='Nombre de la sala'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>Nombre de la Sala:</label>";
	html += "</div>";
	
	//Etiqueta tipo de sala
	html += "<!-- Tipo de sala-->";
	html += "<div class='12u$'><label for='txtTipoSala'>";
	html += "	<input type='text' name='txtTipoSala' id='txtTipoSala' onblur='validaText(this.value, "+'"ERROR de TIPO DE SALA:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro["tipo"] + "' placeholder='Tipo de sala'";
	html += "		autocomplete='off' maxlength='20' val=''/>Tipo de Sala:</label>";
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
	
	$("#imagenUpload").show();
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
	mensaje += "</p>";
	
	alerta(mensaje, "");
}