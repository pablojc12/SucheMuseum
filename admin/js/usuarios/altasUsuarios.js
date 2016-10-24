"use strict";
//variable para traer el valor correspondiente dependiendo de la variable anterior
var slcCategoria = sectionForm["slcCategoria"];

//variable para traer el componente a  vaciar dependiendo el id del componente 
var newHTML = document.getElementById("newCode");
sectionForm.addEventListener("input", procesa, false);


function procesa()
{
	try
	{
		var categoria = lee(slcCategoria);
		
		//validacion para ver que categoria es y lanzar su respectivo formulario a mostrar
		switch (categoria) 
		{
		case categoriaUsuario[0]: //en caso de que no seleccione la categoria
			
			newHTML.innerHTML = "<div class='12u$'>" +
									"	<hr>" +
								"</div>" +
								"<div class='12u$'>" +
									"<h2>Selecciona una categoria</h2>" +
								"</div>" +
								"<div class='12u'>" +
									"<p>.......................................</p>" +
								"</div>";
			break;

		case categoriaUsuario[1]: // caso de director
			extracMuseoID("Alta de Director", empleado, "Dir");
			break;
			
		case categoriaUsuario[2]: // caso de clientes
			newHTML.innerHTML = catClient("Alta de Cliente", cliente);
			break;
			
		case categoriaUsuario[3]: // caso de guia de museos
			newHTML.innerHTML = extracMuseoID("Alta de Guia de Museo", empleado, "Gui");
			break;
			
		case categoriaUsuario[4]: // caso de administrador
			newHTML.innerHTML = extracMuseoID("Alta de Administrador", empleado, "Adm");
			break;
		}
		
	}
	catch (e) 
	{
		newHTML.innerHTML = e.message;
	}
}

//------------------------------------------------------------------------------------------------------------------------
//Funcion para retornar el codigo nuevo(formulario) del caso cliente 
function catClient(titulo, tabla)
{
	//variable cara cargar el contenido del form
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
	html += "<!-- Nombre -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtNombre' id='txtNombre' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras sin simbolos",'+'"txtNombre"'+")' value='' placeholder='Nombre(s)'";
	html += "		autocomplete='off' maxlength='20' autofocus val=''/>";
	html += "</div>";
	
	//etiqueta del apellido paterno
	html += "<!-- Apellido Paterno -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtPaterno' id='txtPaterno' onblur='validaText(this.value, "+'"ERROR de A PATERNO:2 o mas letras sin simbolos",'+'"txtPaterno"'+")' value='' placeholder='Apellido Paterno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";

	//etiqueta del apellido materno
	html += "<!-- Apellido Materno -->";
	html += "<div class='4u$ 12u$(small)'>";
	html += "	<input type='text' name='txtMaterno' id='txtMaterno' onblur='validaText(this.value, "+'"ERROR de A MATERNO:2 o mas letras sin simbolos",'+'"txtMaterno"'+")' value='' placeholder='Apellido Materno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";
	
	//etiqueta de fecha de nacimiento
	html += "<!-- Fecha de Nacimiento -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<label for='dtFechaNacimiento'>Fecha de nacimiento";
	html += "	<input type='date' step='1' name='dtFechaNacimiento' id='dtFechaNacimiento' onblur='validarFormatoFecha(this.value, "+'"FECHA INCORRECTA",'+'"dtFechaNacimiento"'+")' max='2000-12-01'";
	html += "		value='' /></label>";
	html += "</div>";

	//etiqueta de correo
	html += "<!-- Correo -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<label for='txtCorreo'>Correo Electronico";
	html += "	<input type='email' name='txtCorreo' id='txtCorreo'";
	html += "		placeholder='(example@hubART.com)' maxlength='30'onblur='validaEmail(this.value, "+'"CORREO NO VALIDO",'+'"txtCorreo"'+")' autocomplete='off' /></label>";
	html += "</div>";

	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='enviar' id='' value='Registrar' class='special' onclick='registrarCliente()'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	return html;
}

//------------------------------------------------------------------------------------------------------------------------
//Funcion para retornar el codigo nuevo(formulario) del caso empleado (director, administrador, guia de museos) 
function catEmpleado(titulo, tabla, rol, data)
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

	//etiqueta para el campo de tabla escondido
	html += "<input type='hidden' value=" + tabla + " name='tabla' id='tabla'/>";
	
	//etiqueta para el campo de roles escondido
	html += "<input type='hidden' value=" + rol + " name='rol' id='rol'/>";
	
	//Etiqueta de Id de empleado
	html += "<!-- Id de empleado -->";
	html += "<div class='3u$ 12u$(small)'>";
	html += "	<label for='txtCurp'>Identificador unico:";
	html += "	<input type='text' name='txtId' id='txtId' placeholder='(AAAA########)')";
	html += "	disabled/></label>";
	html += "</div>";
	
	//Etiqueta de nombre
	html += "<!-- Nombre -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtNombre' autofocus id='txtNombre' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras sin simbolos",'+'"txtNombre"'+")' value='' placeholder='Nombre(s)'";
	html += "		autocomplete='on' maxlength='20'  val=''/>";
	html += "</div>";

	//etiqueta del apellido paterno
	html += "<!-- Apellido Paterno -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtPaterno' id='txtPaterno' onblur='validaText(this.value, "+'"ERROR de A PATERNO:2 o mas letras sin simbolos",'+'"txtPaterno"'+")' value='' placeholder='Apellido Paterno'";
	html += "		autocomplete='on' maxlength='20' />";
	html += "</div>";

	//etiqueta del apellido materno
	html += "<!-- Apellido Materno -->";
	html += "<div class='4u$ 12u$(small)'>";
	html += "	<input type='text' name='txtMaterno' id='txtMaterno' onblur='validaText(this.value, "+'"ERROR de A MATERNO:2 o mas letras sin simbolos",'+'"txtMaterno"'+")' value='' placeholder='Apellido Materno'";
	html += "		autocomplete='on' maxlength='20' />";
	html += "</div>";
	
	//etiqueta del curp
	html += "<!-- CURP -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<label for='txtCurp'>CURP:";
	html += "	<input type='text' name='txtCurp' id='txtCurp' onblur='validarCurp(this.value, "+'"Formato de CURP Invalida",'+'"txtCurp"'+"); llenandoText(this.value,"+'"txtId")'+"' value='' placeholder='(AAAA######AAAAAA##)'";
	html += "		autocomplete='on' maxlength='18'/></label>";
	html += "</div>";
	
	//etiqueta de correo
	html += "<!-- Correo -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<label for='txtCorreo'>Correo Electronico:";
	html += "	<input type='email' name='txtCorreo' id='txtCorreo'";
	html += "		placeholder='(example@hubART.com)' maxlength='30'onblur='validaEmail(this.value, "+'"CORREO NO VALIDO",'+'"txtCorreo"'+")' autocomplete='off' /></label>";
	html += "</div>";
	
	//etiqueta del select para el idMuseo
	html += "<div class='12u$'>";
	html += "	<div class='select-wrapper'>";
	html += "		<select name='slcMuseo' id='slcMuseo'>";
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
	html += "		<li><input type='button' name='enviar' id='' value='Registrar' class='special' onclick='registrarEmpleado()'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
	
}


