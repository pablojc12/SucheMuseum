function cargaFormAltaExposicion()
{
	var html = "";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>agregar exposicion</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft</span><strong>ATRAS</strong>';
	html += '</div>'
		
	//Etiqueta de nombre de la exposicion
	html += "<!-- Nombre de exposicion-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreExpo' id='txtNombreExpo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Nombre de la exposicion'";
	html += "		autocomplete='off' maxlength='100' val=''/>";
	html += "</div>";
	
	//Etiqueta tipo de exposicion
	html += "<!-- Tipo de exposision-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtTipoExpo' id='txtTipoExpo' onblur='validaText(this.value, "+'"ERROR de TIPO DE SALA:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Tipo de exposicion'";
	html += "		autocomplete='off' maxlength='30' val=''/>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta de fechas
	html += "<div class='12u$'>";
	html += "	<strong>PERIODO DE LA EXPOSICION:</strong>";
	html += "</div>";
	
	//fecha de inicio
	html += "<!-- fecha de inicio -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='date' name='fechaInicio' id='fechaInicio' onblur='campoVacio(this.value,"+'"Ingresa una fecha de inicio"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//fecha de termino
	html += "<!-- fecha de termino-->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='date' name='fechaFin' id='fechaFin' onblur='campoVacio(this.value,"+'"Ingresa una fecha de termino"'+", this.id); compararFechas(this.value, document.getElementById("+'"fechaInicio"'+").value, "+'"fechaInicio"'+")'/>";
	html +='</div>';
	
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
	html +='			<option value="Lunes" selected>Lunes</option>';
	html +='			<option value="Martes">Martes</option>';
	html +='			<option value="Miercoles">Miercoles</option>';
	html +='			<option value="Jueves">Jueves</option>';
	html +='			<option value="Viernes">Viernes</option>';
	html +='			<option value="Sabado">Sabado</option>';
	html +='			<option value="Domingo">Domingo</option>';
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
	html +='			<option value="Lunes">Lunes</option>';
	html +='			<option value="Martes">Martes</option>';
	html +='			<option value="Miercoles">Miercoles</option>';
	html +='			<option value="Jueves">Jueves</option>';
	html +='			<option value="Viernes">Viernes</option>';
	html +='			<option value="Sabado">Sabado</option>';
	html +='			<option value="Domingo" selected>Domingo</option>';
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
	html += "		<li><input type='button' name='registrar' id='registrar' value='Registrar' class='special' onclick='registrarExposicion(this.id)'/></li>";
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
 * funcion para cargar la lista de las exposiciones dependiendo de los datos arrojados por la base de datos
 * @param titulo = titulo a mostrar
 * @param data = resultado de la busqueda en la base de datos (objetoJSON)
 */
function cargaListExposiciones(data)
{
	var html = "";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].idExposicion +'" class="lsf symbol" onclick="regDelete(this.id, document.getElementById('+ "'slcCategoria'" +').value)">delete</span>';
		consulta += '<span id="'+ data[i].idExposicion +'" class="lsf symbol" onclick="regModify(this.id, document.getElementById('+ "'slcCategoria'" +').value)">edit</span>';
		consulta += '<span id="'+ data[i].idExposicion +'" class="lsf symbol" onclick="regView(this.id, document.getElementById('+ "'slcCategoria'" +').value)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].idExposicion;
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
	html += "<div class='12u$'><span class='lsf symbol' onclick='cargaFormAltaExposicion()'>plus</span><strong>AGREGAR</strong></div>";
	
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
function cargaViewExpo(data)
{
var mensaje = "";
	
	mensaje += "<p class='black'>";
	mensaje += '<strong>"' + data["nombre"] + '"</strong>';
	mensaje += "<br>";
	mensaje += "CLAVE: <strong>" + data["id"];
	mensaje += "<br>";
	mensaje += "</strong>TIPO: <strong>" + data["tipo"];
	mensaje += "<br>";
	mensaje += "</strong>FECHA INICIAL: <strong>" + data["fechaInicial"]; 
	mensaje += "<br>";
	mensaje += "</strong>FEHCA DETERMINO: <strong>" + data["fechaFinal"];
	mensaje += "<br>";
	mensaje += "</strong>HORARIO: <strong>" + data["horario"];
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
function cargaFormExposicion(dataDeRegistro)
{
	var html = "";
	
	var diaInicio = "";
	var diaFin = "";
	
	var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
	
	for(var i = 0; dias.length > i; i++)
	{
		if(dias[i] == dataDeRegistro.diaInicio)
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
		if(dias[i] == dataDeRegistro.diaFin)
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
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>modificar mi exposicion</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft</span><strong>ATRAS</strong>';
	html += '</div>'
	
	//etiqueta para el campo de categoria escondido
	html += "<input type='hidden' value='" + dataDeRegistro.id + "' name='idExpo' id='idExpo'/>";
	
	//Etiqueta de nombre de la exposicion
	html += "<!-- Nombre de exposicion-->";
	html += "<div class='12u$'><label for='txtNombreExpo'>";
	html += "	<input type='text' name='txtNombreExpo' id='txtNombreExpo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro.nombre + "' placeholder='Nombre de la exposicion'";
	html += "		autocomplete='off' maxlength='100' val=''/>Nombre:</label>";
	html += "</div>";
	
	//Etiqueta tipo de exposicion
	html += "<!-- Tipo de exposision-->";
	html += "<div class='12u$'><label for'txtTipoExpo'>";
	html += "	<input type='text' name='txtTipoExpo' id='txtTipoExpo' onblur='validaText(this.value, "+'"ERROR de TIPO DE SALA:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + dataDeRegistro.tipo + "' placeholder='Tipo de exposicion'";
	html += "		autocomplete='off' maxlength='30' val=''/>Tipo de Exposicion:</label>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//etiqueta de fechas
	html += "<div class='12u$'>";
	html += "	<strong>PERIODO DE LA EXPOSICION:</strong>";
	html += "</div>";
	
	//fecha de inicio
	html += "<!-- fecha de inicio -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='date' name='fechaInicio' value='" + dataDeRegistro.fechaInicial + "' id='fechaInicio' onblur='campoVacio(this.value,"+'"Ingresa una fecha de inicio"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//fecha de termino
	html += "<!-- fecha de termino-->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='date' name='fechaFin' value='" + dataDeRegistro.fechaFinal + "' id='fechaFin' onblur='campoVacio(this.value,"+'"Ingresa una fecha de termino"'+", this.id); compararFechas(this.value, document.getElementById("+'"fechaInicio"'+").value, "+'"fechaInicio"'+")'/>";
	html +='</div>';
	
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
	html +="	<input type='time' name='horaInicio' value='" + dataDeRegistro.horaInicio + "' id='horaInicio' onblur='campoVacio(this.value,"+'"Ingresa una hora de entrada"'+", this.id)'/>";
	html +='</div>';
	
	//separador de componentes html con etiquetas
	html += "<div class='2u 12u$(small)'><input type='text' value='A' disabled></div>";
	
	//hora de fin
	html += "<!-- hora de fin -->";
	html +='<div class="5u  12u$(small)">';
	html +="	<input type='time' name='horaFin' value='" + dataDeRegistro.horaFin + "' id='horaFin' onblur='campoVacio(this.value,"+'"Ingresa una hora de salida"'+", this.id); compararHoras(this.value, document.getElementById("+'"horaInicio"'+").value, "+'"horaInicio"'+")'/>";
	html +='</div>';
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='Actualizar' class='special' onclick='registrarExposicion(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}