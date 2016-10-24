/**
 * funcion para cargar el codigo html del formulario alta de exposiciones
 * @param titulo = titulo para mostrar
 * @param tabla = tabla dentro de la base de datos (se extrae del valor del select categoria)
 * @param data = objetoJSON que contiene objetos de la tabla de museos
 */
function cargaFormExposicion(titulo, tabla, data)
{
	var html = "";
	var select = "";
	
	for(var i = 0; data.length > i; i++){
		select += "<option value='";
		select += data[i].id;
		select += "'>";
		select += data[i].nombre;
		select +="</option>" +
				"";
	}
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	//Nombre de la categoria
	html += "<div class='12u$'>";
	html += "<h2>" + titulo + "</h2>";
	html += "</div>";

	//etiqueta para el campo de categoria escondido
	html += "<input type='hidden' value='" + tabla + "' name='tabla' id='tabla'/>";
	
	//Etiqueta de nombre de la exposicion
	html += "<!-- Nombre de exposicion-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreExpo' id='txtNombreExpo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Nombre de la exposicion'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>";
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
	
	//etiqueta del select para el idMuseo
	html += "<div class='12u$'>";
	html += "	<div class='select-wrapper'>";
	html += "		<select name='slcMuseoId' id='slcMuseoId' onblur='campoVacio(this.value," + '"Selecciona un museo"' + ", this.id)'>";
	html += 			"<option value=''>- Selecciona museo de pertenencia -</option>";
	html += 			select;
	html += "		</select>";
	html += "	</div>";
	html += "</div>";
	
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