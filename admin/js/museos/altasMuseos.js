function cargaFormMuseo(titulo, tabla)
{
	var html = "";
	
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
	
	//Etiqueta de nombre
	html += "<!-- Nombre de museo-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtNombreMuseo' id='txtNombreMuseo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'"txtNombreMuseo"'+")' value='' placeholder='Nombre del museo'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>";
	html += "</div>";
	
	//tipo
	html += "<!-- Tipo -->";
	html +='<div class="6u 12u$(small)">';
	html +='	<div class="select-wrapper">';
	html +="		<select name='slcTipo' id='slcTipo' onblur='validaText(this.value, "+'"Selecciona un tipo de museo",'+' this.id'+")'>";
	html +='			<option value="">- Selecciona tipo de museo -</option>';
	html +='			<option value="ARTE Y CULTURA">ARTE Y CUTURA</option>';
	html +='		</select>';
	html +='	</div>';
	html +='</div>';
	
	//etiqueta de telefono
	html += "<!-- Telefono -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<input type='text' name='txtTelefono' id='txtTelefono' onblur='validarTelefono(this.value, "+'"Telefono incorrecto: sin espacios y simbolos",'+' this.id'+")' value='' placeholder='Numero de telefono'";
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

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='registrar' id='registrar' value='Registrar' class='special' onclick='registrarMuseo(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	
	return html;
}