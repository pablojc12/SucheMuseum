/**
 * funcion para cargar el codigo html del formulario alta salas
 * @param titulo = titulo para mostrar
 * @param tabla = tabla dentro de la base de datos (se extrae del valor del select categoria)
 * @param data = objetoJSON que contiene objetos de la tabla de museos
 */
function cargaFormSala(titulo, tabla, data)
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
	
	//Etiqueta de nombre de la sala
	html += "<!-- Nombre de la sala-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreSala' id='txtNombreSala' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Nombre de la sala'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>";
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

