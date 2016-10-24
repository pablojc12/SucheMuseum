function cargarClientForm()
{
	$("#actions").hide();
	$("#imagen").hide();
	
	//variable cara cargar el contenido del form
	var html = "";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>Actualiza tus datos</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="inicio()">|arrowleft</span>ATRAS';
	html += '</div>'
	
	//Etiqueta de nombre
	html += "<!-- Nombre -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtNombre' id='txtNombre' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras sin simbolos",'+'"txtNombre"'+")' value='"+ dataUsuario["nombre"] +"' placeholder='Nombre(s)'";
	html += "		autocomplete='off' maxlength='20' autofocus val=''/>";
	html += "</div>";
	
	//etiqueta del apellido paterno
	html += "<!-- Apellido Paterno -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtPaterno' id='txtPaterno' onblur='validaText(this.value, "+'"ERROR de A PATERNO:2 o mas letras sin simbolos",'+'"txtPaterno"'+")' value='"+ dataUsuario["ap_paterno"] +"' placeholder='Apellido Paterno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";

	//etiqueta del apellido materno
	html += "<!-- Apellido Materno -->";
	html += "<div class='4u$ 12u$(small)'>";
	html += "	<input type='text' name='txtMaterno' id='txtMaterno' onblur='validaText(this.value, "+'"ERROR de A MATERNO:2 o mas letras sin simbolos",'+'"txtMaterno"'+")' value='"+ dataUsuario["ap_materno"] +"' placeholder='Apellido Materno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";
	
	//etiqueta de fecha de nacimiento
	html += "<!-- Fecha de Nacimiento -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<label for='dtFechaNacimiento'>Fecha de nacimiento";
	html += "	<input type='date' step='1' name='dtFechaNacimiento' id='dtFechaNacimiento' value='"+ dataUsuario["fecha_nacimiento"] +"' onblur='validarFormatoFecha(this.value, "+'"FECHA INCORRECTA",'+'"dtFechaNacimiento"'+")' max='2000-12-01'";
	html += "		value='' /></label>";
	html += "</div>";

	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='Actualizar' class='special' onclick='actualizarCliente(this.id)'/></li>";
	html += "		<li><input type='reset' value='Restablecer Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}