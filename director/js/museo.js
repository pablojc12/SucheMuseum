/**
 * funcion para cargar el formulario del museo con los datos correspondientes del registro
 * @param titulo
 * @param tabla
 * @param data
 */
function cargaFormMuseo(tabla, data)
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

	//Nombre de la categoria
	html += "<div class='12u$'>";
	html += "<h2>datos generales del museo</h2>";
	html += "</div>";
	
	//etiqueta para el campo de categoria escondido
	html += "<input type='hidden' value=" + tabla + " name='tabla' id='tabla'/>";
	
	//Etiqueta de nombre
	html += "<!-- Nombre de museo-->";
	html += "<div class='12u$'><label for='txtNombreMuseo'>";
	html += "	<input type='text' name='txtNombreMuseo' id='txtNombreMuseo' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras y sin simbolos",'+'"txtNombreMuseo"'+")' value='"+ data["nombre"]+"' placeholder='Nombre del museo'";
	html += "		autocomplete='off' maxlength='100' autofocus val=''/>Nombre del museo:</label>";
	html += "</div>";
	
	//tipo
	html += "<!-- Tipo -->";
	html +='<div class="6u 12u$(small)">';
	html +='	<div class="select-wrapper"><label for="slcTipo">';
	html +="		<select name='slcTipo' id='slcTipo' onblur='validaText(this.value, "+'"Selecciona un tipo de museo",'+' this.id'+")'>";
	html +='			<option value="">- Selecciona tipo de museo -</option>';
	html +='			<option selected value="ARTE Y CULTURA">ARTE Y CUTURA</option>';
	html +='		</select>Tipo de Museo:</label>';
	html +='	</div>';
	html +='</div>';
	
	//etiqueta de telefono
	html += "<!-- Telefono -->";
	html += "<div class='6u$ 12u$(small)'><label for='txtTelefono'>";
	html += "	<input type='text' name='txtTelefono' id='txtTelefono' onblur='validarTelefono(this.value, "+'"Telefono incorrecto: sin espacios y simbolos",'+' this.id'+")' value='"+ data["telefono"]+"' placeholder='Numero de telefono'";
	html += "		autocomplete='off' maxlength='10' />Telefono:</label>";
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
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='Actualizar' class='special' onclick='registrarMuseo()'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	
	newHTML.innerHTML = html;
}