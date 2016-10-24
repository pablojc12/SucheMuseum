
/**
 * variable para traer el valor correspondiente dependiendo de la variable anterior
 * @Element
 * @string
 */
var slcCategoria = sectionForm["slcCategoria"];

/**
 * variable para traer el componente a  vaciar dependiendo el id del componente 
 * @Element
 * @string
 */
var newHTML = document.getElementById("newCode");
sectionForm.addEventListener("input", procesa, true);

/**
 * funcion para la ejecucion del evento listener
 * @function
 */
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
			extracData("Directores", empleado, "Dir");
			break;
			
		case categoriaUsuario[2]: // caso de clientes
			extracData("CLIENTES", cliente, "");
			break;
			
		case categoriaUsuario[3]: // caso de guia de museos
			extracData("Guia de museos", empleado, "Gui");
			break;
			
		case categoriaUsuario[4]: // caso de administrador
			extracData("Administradores", empleado, "Adm");
		}
		
	}
	catch (e) 
	{
		newHTML.innerHTML = e.message;
	}
}

/**
 * funcion para cargar la lista de clientes
 * @param titulo
 * @param data
 */
function cargaCliente(titulo, data)
{
	var html = "<h2>";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regDelete(this.id)">delete</span>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regModify(this.id)">edit</span>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regView(this.id)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].id;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].nombre + " " + data[i].paterno;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].correo;
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
	html += '<th>ID</th>';
	html += '<th>NOMBRE</th>';
	html += '<th>CORREO</th>';
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
 * funcion para hacer la carga de la lista correspondiente
 * @param titulo
 * @param data (objeto JSON)
 */
function cargaEmpleado(titulo, data)
{
	var html = "<h2>";
	//consulta con ajax 
	var consulta = "";
	
	for(var i = 0; data.length > i ; i++)
	{
		consulta += '<tr>';
		consulta += '<td>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regDelete(this.id)">delete</span>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regModify(this.id)">edit</span>';
		consulta += '<span id="'+ data[i].id +'" class="lsf symbol" onclick="regView(this.id)">view</span>';
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].id;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].nombre + " " + data[i].paterno;
		consulta += '</td>';
		consulta += '<td>';
		consulta += data[i].correo;
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
	html += '<th>ID</th>';
	html += '<th>NOMBRE</th>';
	html += '<th>CORREO</th>';
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

function extracData(titulo, tabla, rol)
{
	var carga = null;
	
	var objetoJSON = {
			"usuario": user,
			"funcion": "extraeDataList",
			"rol": rol,
			"tabla": tabla
	}
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
			console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
				{
					alertify.alert("<p class='black'>No existen datos para mostrar</p>", function () {
			            //aqui introducimos lo que haremos tras cerrar la alerta.
			            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						for(var indice=0 ;indice<document.getElementById("slcCategoria").length;indice++)
					    {
					        if (document.getElementById("slcCategoria").options[indice].value == "categoria")
					            document.getElementById("slcCategoria").selectedIndex =indice;
					    } 
						
						procesa();
			      });
				}
				else{
					//console.log(data);
					
					if(tabla == cliente)
						cargaCliente(titulo, data);
					else if(tabla == empleado)
						cargaEmpleado(titulo, data);
				}
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

/**-----------------------------------------------------------------------------------------------------------------
 * funcion  para la realizacion de las acciones de los botones del lado izquierdo de cada lista
 * 
 * @param tabla (nombre de la tabla para la consulta) 
 * @param id (identificador de boton en cuestion)
 * @param accion (boton al que se le da clic)
 */
function actionButtonsList(tabla, id, accion)
{
	var user = "administrador";
	var carga = null;
	
	var objetoJSON = {
			"usuario": user,
			"funcion": "extraeDataList",
			"idConsult": id,
			"accion": accion,
			"tabla": tabla
	}
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
					er("NO se encontraron datos para mostrar");
				else{
					console.log(data);
					if(accion == "ver")
					{
						cargaView(data, tabla);
					}
					else if(accion == "modificar")
					{
						if(tabla == cliente)
						{
							cargarClientForm("Modificar Ciente", tabla, data)
						}
						else
						{
							extracMuseoID("modificar empleado", tabla, data["Roles_id_rol"], "actionButtonsList", data);
							//cargarEmpleadoForm("Modificar empleado", tabla, data)
						}
					}
					else if(accion == "eliminar")
					{
						//var category = document.getElementById("slcCategoria").value;
						
						alertify.alert("<p class='black'>Eliminacion correcta</p>", function () {
				            //aqui introducimos lo que haremos tras cerrar la alerta.
				            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
							//location.href = "listadoModificacion.html";
							procesa();
						});
					}	
				}
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

/**
 * funcion para la carga de los mensajes de la vista(alertas) 
 * @param data
 * @param tabla
 */
function cargaView(data, tabla)
{
	var mensaje = "";
	
	if(tabla == cliente)
	{
		mensaje += "<p class='black'>";
		mensaje += '<strong>"'+ data["nombre"] + " " + data["ap_paterno"] + " " + data["ap_materno"] + '"</strong>';
		mensaje += "<br>";
		mensaje += "ID: <strong>" + data["id_cliente"];
		mensaje += "<br>";
		mensaje += "</strong>FECHA DE NACIMIENTO: <strong>" + data["fecha_nacimiento"];
		mensaje += "<br>";
		mensaje += "</strong>CONTRASEÑA: <strong>" + data["contrasena"]; 
		mensaje += "<br>";
		mensaje += "</strong>CORREO ELECTRONICO: <strong>" + data["correo_electronico"];
		mensaje += "<br>";
		mensaje += "</strong>SESION: <strong>" + data["sesion"] + "</strong>";
		mensaje += "</p>";
		
		alerta(mensaje, "");
	}
	else if(tabla == empleado)
	{
		mensaje += "<p class='black'>";
		mensaje += '<strong>"'+ data["nombre"] + " " + data["ap_paterno"] + " " + data["ap_materno"] + '"</strong>';
		mensaje += "<br>";
		mensaje += "ID: <strong>" + data["id_empleado"];
		mensaje += "<br>";
		mensaje += "</strong>CURP: <strong>" + data["curp"];
		mensaje += "<br>";
		mensaje += "</strong>CONTRASEÑA: <strong>" + data["contrasena"]; 
		mensaje += "<br>";
		mensaje += "</strong>CORREO ELECTRONICO: <strong>" + data["correo_electronico"];
		mensaje += "<br>";
		mensaje += "</strong>ID MUSEO: <strong>" + data["Museos_id_museo"] + "</strong>";
		mensaje += "<br>";
		mensaje += "</strong>ID ROL: <strong>" + data["Roles_id_rol"] + "</strong>";
		mensaje += "<br>";
		mensaje += "</strong>SESION: <strong>" + data["sesion"] + "</strong>";
		mensaje += "</p>";
		
		alerta(mensaje, "");
	}
}


//------------------------------------------------------------------------------------------------------------------------
//Funcion para retornar el codigo nuevo(formulario) del caso cliente 
function cargarClientForm(titulo, tabla, data)
{
	//variable cara cargar el contenido del form
	var html = "";
	
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
	
	//Etiqueta de nombre
	html += "<!-- Nombre -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtNombre' id='txtNombre' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras sin simbolos",'+'"txtNombre"'+")' value='"+ data["nombre"] +"' placeholder='Nombre(s)'";
	html += "		autocomplete='off' maxlength='20' autofocus val=''/>";
	html += "</div>";
	
	//etiqueta del apellido paterno
	html += "<!-- Apellido Paterno -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtPaterno' id='txtPaterno' onblur='validaText(this.value, "+'"ERROR de A PATERNO:2 o mas letras sin simbolos",'+'"txtPaterno"'+")' value='"+ data["ap_paterno"] +"' placeholder='Apellido Paterno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";

	//etiqueta del apellido materno
	html += "<!-- Apellido Materno -->";
	html += "<div class='4u$ 12u$(small)'>";
	html += "	<input type='text' name='txtMaterno' id='txtMaterno' onblur='validaText(this.value, "+'"ERROR de A MATERNO:2 o mas letras sin simbolos",'+'"txtMaterno"'+")' value='"+ data["ap_materno"] +"' placeholder='Apellido Materno'";
	html += "		autocomplete='off' maxlength='20' />";
	html += "</div>";
	
	//etiqueta de fecha de nacimiento
	html += "<!-- Fecha de Nacimiento -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<label for='dtFechaNacimiento'>Fecha de nacimiento";
	html += "	<input type='date' step='1' name='dtFechaNacimiento' id='dtFechaNacimiento' value='"+ data["fecha_nacimiento"] +"' onblur='validarFormatoFecha(this.value, "+'"FECHA INCORRECTA",'+'"dtFechaNacimiento"'+")' max='2000-12-01'";
	html += "		value='' /></label>";
	html += "</div>";

	//etiqueta de correo
	html += "<!-- Correo -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<label for='txtCorreo'>Correo Electronico";
	html += "	<input type='email' name='txtCorreo' disabled id='txtCorreo' value='"+ data["correo_electronico"] +"'";
	html += "		placeholder='(example@hubART.com)' maxlength='30'onblur='validaEmail(this.value, "+'"CORREO NO VALIDO",'+'"txtCorreo"'+")' autocomplete='off' /></label>";
	html += "</div>";

	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='enviar' id='enviar' value='Actualizar' class='special' onclick='registrarCliente(this.id)'/></li>";
	html += "		<li><input type='reset' value='Restablecer Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}

//------------------------------------------------------------------------------------------------------------------------
//Funcion para retornar el codigo nuevo(formulario) del caso empleado (director, administrador, guia de museos) 
function cargarEmpleadoForm(titulo, tabla, data, datosDeCarga)
{
	var html = "";
	var select = "";
	
	for(var i = 0; data.length > i; i++){
		
		if(data[i].id == datosDeCarga["Museos_id_museo"])
		{
			select += "<option selected value='";
			select += data[i].id;
			select += "'>";
			select += data[i].nombre;
			select +="</option>" +
					 "";
		}
		else
		{
			select += "<option value='";
			select += data[i].id;
			select += "'>";
			select += data[i].nombre;
			select +="</option>" +
					"";
		}
	}
	
	//separador
	html += "<div class='12u$'>";
	html += "<hr>";
	html += "</div>";
	
	//Nombre de la categoria
	html += "<div class='10u'>";
	html += "<h2>" + titulo + "</h2>";
	html += "</div>";
	
	//navegacion
	html += "<div class='2u$'>";
	html += '<span id="" title="ATRAS" class="lsf symbol" onclick="procesa()">|arrowleft ATRAS</span>';
	html += '</div>'
		
	//etiqueta para el campo de tabla escondido
	html += "<input type='hidden' value=" + tabla + " name='tabla' id='tabla'/>";
	
	//etiqueta para el campo de roles escondido
	html += "<input type='hidden' value=" + datosDeCarga["Roles_id_rol"] + " name='rol' id='rol'/>";
	
	//Etiqueta de Id de empleado
	html += "<!-- Id de empleado -->";
	html += "<div class='3u$ 12u$(small)'>";
	html += "	<label for='txtCurp'>Identificador unico:";
	html += "	<input type='text' name='txtId' id='txtId' value='"+ datosDeCarga["id_empleado"] +"' placeholder='(AAAA########)')";
	html += "	disabled/></label>";
	html += "</div>";
	
	//Etiqueta de nombre
	html += "<!-- Nombre -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtNombre' autofocus id='txtNombre' onblur='validaText(this.value, "+'"ERROR de NOMBRE:2 o mas letras sin simbolos",'+'"txtNombre"'+")' value='"+ datosDeCarga["nombre"] +"' placeholder='Nombre(s)'";
	html += "		autocomplete='on' maxlength='20'  val=''/>";
	html += "</div>";

	//etiqueta del apellido paterno
	html += "<!-- Apellido Paterno -->";
	html += "<div class='4u 12u$(small)'>";
	html += "	<input type='text' name='txtPaterno' id='txtPaterno' onblur='validaText(this.value, "+'"ERROR de A PATERNO:2 o mas letras sin simbolos",'+'"txtPaterno"'+")' value='"+ datosDeCarga["ap_paterno"] +"' placeholder='Apellido Paterno'";
	html += "		autocomplete='on' maxlength='20' />";
	html += "</div>";

	//etiqueta del apellido materno
	html += "<!-- Apellido Materno -->";
	html += "<div class='4u$ 12u$(small)'>";
	html += "	<input type='text' name='txtMaterno' id='txtMaterno' onblur='validaText(this.value, "+'"ERROR de A MATERNO:2 o mas letras sin simbolos",'+'"txtMaterno"'+")' value='"+ datosDeCarga["ap_materno"] +"' placeholder='Apellido Materno'";
	html += "		autocomplete='on' maxlength='20' />";
	html += "</div>";
	
	//etiqueta del curp
	html += "<!-- CURP -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<label for='txtCurp'>CURP:";
	html += "	<input type='text' name='txtCurp' id='txtCurp' onblur='validarCurp(this.value, "+'"Formato de CURP Invalida",'+'"txtCurp"'+"); llenandoText(this.value,"+'"txtId")'+"' value='"+ datosDeCarga["curp"] +"' placeholder='(AAAA######AAAAAA##)'";
	html += "		autocomplete='on' maxlength='18'/></label>";
	html += "</div>";
	
	//etiqueta de correo
	html += "<!-- Correo -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<label for='txtCorreo'>Correo Electronico:";
	html += "	<input type='email' name='txtCorreo' disabled value='"+ datosDeCarga["correo_electronico"] +"' id='txtCorreo'";
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
	html += "		<li><input type='button' name='enviar' id='actualizar_empleado' value='actualizar' class='special' onclick='registrarEmpleado(this.id)'/></li>";
	html += "		<li><input type='reset' value='restablecer Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
	
}


