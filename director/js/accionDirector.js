
/**
 * funcion para registrar o actualizar el Museo
 * @param accion = registrar o actualizar
 */
function registrarMuseo()
{
	
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var txtTabla = lee(form["tabla"]);
	var txtNombreMuseo = lee(form["txtNombreMuseo"]);
	var slcTipo = lee(form["slcTipo"]);
	var txtTelefono = lee(form["txtTelefono"]);
	var diaInicio = lee(form["diaInicio"]);
	var diaFin = lee(form["diaFin"]);
	var horaInicio = lee(form["horaInicio"]);
	var horaFin = lee(form["horaFin"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtNombreMuseo =txtNombreMuseo.toUpperCase();
	
	
	var vacio = [campoVacio(txtNombreMuseo, "Falta Nombre del museo","txtNombreMuseo"), 
	             campoVacio(slcTipo, "Falta tipo de museo","slcTipo"),
	             campoVacio(txtTelefono, "Falta Telefono","txtTelefono"),
	             campoVacio(horaInicio, "Falta hora de entrada","horaInicio"),
	             campoVacio(horaFin, "Falta hora de salida", "horaFin")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(txtNombreMuseo,"ERROR de NOMBRE:2 o mas letras sin simbolos", "txtNombreMuseo"),
		          validarTelefono(txtTelefono, "Telefono incorrecto: sin espacios y simbolos", "txtTelefono"),
		          compararHoras(horaFin, horaInicio,"horaInicio")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			var horario = diaInicio + " a " + diaFin + " " + horaInicio + "-" + horaFin;
			
			objetoJSON = {
				"usuario": "director",
				"funcion": "actualizarMuseo",
				//datos a almacenar en db
				"nombre": txtNombreMuseo,
				"tipo": slcTipo,
				"telefono": txtTelefono,
				"horario": horario
				}
			
			presionSubmit(objetoJSON);
			
		}
	}
	
}
/**
 * funcion para captural los datos del formulario del registro de exposiciones
 * @param accion = actualizar o registrar
 */
function registrarExposicion(accion)
{
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	//esta variable solo sirve para la forma de actualizacion
	var idExpo = "";
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var txtNombreExpo = lee(form["txtNombreExpo"]);
	var txtTipoExpo = lee(form["txtTipoExpo"]);
	var fechaInicio = lee(form["fechaInicio"]);
	var fechaFin = lee(form["fechaFin"]);
	var diaInicio = lee(form["diaInicio"]);
	var diaFin = lee(form["diaFin"]);
	var horaInicio = lee(form["horaInicio"]);
	var horaFin = lee(form["horaFin"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtNombreExpo = txtNombreExpo.toUpperCase();
	txtTipoExpo = txtTipoExpo.toUpperCase();
	
	if(accion == "actualizar")
		idExpo = lee(form["idExpo"]);
	
	var vacio = [campoVacio(txtNombreExpo, "Falta Nombre de la exposicion","txtNombreExpo"), 
	             campoVacio(txtTipoExpo, "Falta Tipo Exposcion","txtTipoExpo"),
	             campoVacio(fechaInicio, "Falta Fecha de inicio", "fechaInicio"),
	             campoVacio(fechaFin, "Falta Fecha de termino", "fechaFin"),
	             campoVacio(horaInicio, "Falta Hora de inicio", "horaInicio"),
	             campoVacio(horaFin, "Falta Hora de termino", "horaFin")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(txtNombreExpo,"ERROR de NOMBRE de EXPOSICION:2 o mas letras sin simbolos", "txtNombreExpo"),
		          validaText(txtTipoExpo, "ERROR de TIPO de EXPOSICION:2 o mas letras sin simbolos", "txtTipoExpo"),
		          compararHoras(horaFin, horaInicio,"horaInicio"),
		          compararFechas(fechaFin, fechaInicio, "fechaInicio")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			var horario = diaInicio + " a " + diaFin + " " + horaInicio + "-" + horaFin;
			
			objetoJSON = {
				"usuario": "director",
				"funcion": "actualizarExposicion",
				//datos a almacenar en db
				"nombre": txtNombreExpo,
				"tipo": txtTipoExpo,
				"fechaInicio": fechaInicio,
				"fechaFin": fechaFin,
				"horario": horario,
				"boton": accion,
				"donde": "exposicion",
				"id": idExpo}
			
			presionSubmit(objetoJSON);
			
		}
	}	
}

/**
 * funcion para registrar o actualizar el Museo
 * @param accion = registrar o actualizar
 */
function registrarDireccion(accion)
{
	
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//variable en caso de la actualizacion
	var idDireccion = "";
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var calle = lee(form["txtCalle"]);
	var colonia= lee(form["txtColonia"]);
	var numero = lee(form["txtNumero"]);
	var codigoPostal = lee(form["txtCP"]);
	var estado = lee(form["txtEstado"]);
	var delegacion = lee(form["txtDelegacion"]);
	
	if(accion == "actualizar")
		idDireccion = lee(form["idDireccion"]);
	
	//convercion de los campos correspondientes a mayusculas
	calle = calle.toUpperCase();
	colonia = colonia.toUpperCase();
	estado = estado.toUpperCase();
	delegacion = delegacion.toUpperCase();
	
	var vacio = [campoVacio(calle, "Falta Calle","txtCalle"), 
	             campoVacio(colonia, "Falta Colonia","txtColonia"),
	             campoVacio(numero, "Falta Numero","txtNumero"),
	             campoVacio(codigoPostal, "Falta Codigo Postal","txtCP"),
	             campoVacio(estado, "Falta Estado", "txtEstado"),
	             campoVacio(delegacion, "Falta Delegacion", "txtDelegacion")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(calle,"ERROR de CALLE:2 o mas letras y sin simbolos", "txtCalle"),
		          validaText(colonia, "ERROR de COLONIA:2 o mas letras y sin simbolos", "txtColonia"),
		          validaNumber(numero, "ERROR de NUMERO: solo numeros o S/N", "txtNumero"),
		          validaNumberPuro(codigoPostal, "ERROR de CODIGO POSTAL: solo numeros", "txtCP"),
		          validaText(estado, "ERROR de ESTADO: 2 o mas letras y sin simbolos", "txtEstado"),
		          validaText(delegacion, "ERROR de DELEGACION: 2 o mas letras y sin simbolos", "txtDelegacion")
		          ];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			objetoJSON = {
				"usuario": "director",
				"funcion": "actualizarDireccion",
				//datos a almacenar en db
				"calle": calle,
				"colonia": colonia,
				"numero": numero,
				"codigoPostal": codigoPostal,
				"estado": estado,
				"delegacion": delegacion,
				"boton": accion,
				"donde": "direccion",
				"idDireccion": idDireccion
				}
			
			presionSubmit(objetoJSON);
			
		}
	}
	
}

/**
 * funcion para captural los datos del formulario del registro de salas
 * @param accion = actualizar o registrar
 */
function registrarSala(accion)
{
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	//esta variable solo sirve para la forma de actualizacion
	var idSala = "";
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var txtNombreSala = lee(form["txtNombreSala"]);
	var txtTipoSala = lee(form["txtTipoSala"]);
	var horaInicio = lee(form["horaInicio"]);
	var horaFin = lee(form["horaFin"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtNombreSala = txtNombreSala.toUpperCase();
	txtTipoSala = txtTipoSala.toUpperCase();
	
	if(accion == "actualizar")
		idSala = lee(form["idSala"]);
		
	
	var vacio = [campoVacio(txtNombreSala, "Falta Nombre de la sala","txtNombreSala"), 
	             campoVacio(txtTipoSala, "Falta tipo de sala","txtTipoSala"),
	             campoVacio(horaInicio, "Falta hora de entrada","horaInicio"),
	             campoVacio(horaFin, "Falta hora de salida","horaFin")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(txtNombreSala,"ERROR de NOMBRE: 2 o mas letras sin simbolos", "txtNombreSala"),
		          validaText(txtTipoSala, "ERROR de TIPO DE SALA: 2 o mas letras sin simbolos", "txtTipoSala"),
		          compararHoras(horaFin, horaInicio,"horaInicio")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			objetoJSON = {
				"usuario": "director",
				"funcion": "actualizarSala",
				//datos a almacenar en db
				"nombre": txtNombreSala,
				"tipoSala": txtTipoSala,
				"horaInicio": horaInicio,
				"horaFin": horaFin,
				"boton": accion,
				"idSala": idSala,
				"donde": "sala"
			}
			
			presionSubmit(objetoJSON);
			
		}
	}
}

/**
 * funcion para visualizar todos los campos del registro correspondiente
 * @param id = identificador para hacer where de la base da detos
 * @param tabla = tabla hacia donde se va la consulta
 */
function regView(id, tabla)
{
	var accion = "ver";
	actionButtons(tabla, id, accion);
}

/**
 * funcion para eliminar el registro correspondiente segun id 
 * @param id = identificador para hacer where en la base de datos
 * @param tabla = tabla hacia donde sa va la consulta
 */
function regDelete(id, tabla)
{
	var accion = "eliminar";
	
	alertify.confirm("<p class='black'>Realmente deceas eliminar este registro</p>", function (e) 
			{
        if (e) 
        {
        	actionButtons(tabla, id, accion);
        } 
	});
}

/**
 * funcion para traer todos los datos segun la tabla ingresada para su posterior carga de formulario y modificacion
 * @param id = identificador para hacer where en la base de datos
 * @param tabla = tabla hacia donde sa va la consulta
 */
function regModify(id, tabla)
{
	var accion = "modificar";
	checkImagen(id);
	actionButtons(tabla, id, accion)
}

/**
 * funcion para el evento clic del boton registrar o actualizar del formulario correspondiente
 * @param objetoJSON = datos del formulario
 */
function presionSubmit(objetoJSON)
{
	//console.log(objetoJSON);
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		beforeSend: notificacion("Enviando datos")
	})
	.done(function(data){ //true(si devuelve algo)
		//console.log(data);
		if(data == "")
			er("Los datos no se pudieron almacenar");
		else if(data == null)
			er("Sin respuesta del servidor");
		else
		{
			if(data.estado == "actualizado")
			{
				alertify.alert("<p class='black'>Datos actualizados correctamente</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					procesa();
				});
			}
			else if(data.estado == "no actualizado")
			{
				alertify.alert("<p class='black'>Los datos no se pudieron actualizar</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					procesa();
				});
			}
			else if(data.estado == "almacenado")
			{
				if(objetoJSON.donde == "sala")
					alertify.alert("<p class='black'>Sala agregada con exito</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
				else if(objetoJSON.donde == "exposicion")
					alertify.alert("<p class='black'>Exposicion almacenada con exito</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
				else
					alertify.alert("<p class='black'>Direccion almacenada con exito</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
			}
			else if(data.estado == "no almacenado")
			{
				if(objetoJSON.donde == "sala")
					alertify.alert("<p class='black'>Problemas al agregar la Sala, intente de nuevo</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
				else if(objetoJSON.donde == "exposicion")
					alertify.alert("<p class='black'>Problemas al agregar la Exposicion, intente de nuevo</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
				else
					alertify.alert("<p class='black'>Problemas al agregar la Direccion, intente de nuevo</p>", function () {
						//aqui introducimos lo que haremos tras cerrar la alerta.
						//por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						procesa();
					});
			}
				
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	})
}

/**-----------------------------------------------------------------------------------------------------------------
 * funcion  para la realizacion de las acciones de los botones del lado izquierdo de cada lista
 * 
 * @param tabla (nombre de la tabla para la consulta) 
 * @param id (identificador de boton en cuestion)
 * @param accion (boton al que se le da clic)
 */
function actionButtons(tabla, id, accion)
{
	var funcion = "";
	
	if(tabla == "salas")
		funcion = "actualizarSala";
	else if(tabla == "exposiciones")
		funcion = "actualizarExposicion";
	
	var objetoJSON = {
			"usuario": "director",
			"funcion": funcion,
			"id": id,
			"boton": accion
	}
	
	//console.log(objetoJSON);
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
					er("NO se encontraron datos para mostrar");
				else{
					//console.log(data);
					if(accion == "ver")
					{
						if(tabla == "salas")
							cargaViewSalas(data);
						else if(tabla == "exposiciones")
							cargaViewExpo(data);
					}
					else if(accion == "modificar")
					{
						if(tabla == "salas")
							cargaFormSalas(data);
						else if(tabla == "exposiciones")
							cargaFormExposicion(data);
							
					}
					else if(accion == "eliminar")
					{
						//var category = document.getElementById("slcCategoria").value;
						if(data["estado"] == "eliminado")
						{
							alertify.alert("<p class='black'>Eliminacion correcta</p>", function () {
								procesa();
							});
						}else 
							alertify.alert("<p class='black'>No se pudo eliminar el registro</p>", function () {
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

/**-----------------------------------------------------------------------------------------------------------------
 * funcion  para la realizacion de las acciones de los botones del lado izquierdo de cada lista
 *  
 * @param id (identificador de boton en cuestion)
 */
function checkImagen(id)
{	
	var objetoJSON = {
			"usuario": "director",
			"funcion": "extraeImagen",
			"id": id
	}
	
	//console.log(objetoJSON);
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
				{
					$("#img1").removeAttr("src");
					$("#img1").attr("src", "../images/pic03.jpg");
					$("#img1").removeAttr("name");
					$("#img1").attr("name", "sin nombre");
					$("#img2").removeAttr("src");
					$("#img2").attr("src", "../images/pic03.jpg");
					$("#img2").removeAttr("name");
					$("#img2").attr("name", "sin nombre");
					$("#img3").removeAttr("src");
					$("#img3").attr("src", "../images/pic03.jpg");
					$("#img3").removeAttr("name");
					$("#img3").attr("name", "sin nombre");
					
					notificacion("puede agregar imagenes a su sala");
				}
				else{
					if(data.length == 1)
					{
						$("#img1").removeAttr("src");
						$("#img1").attr("src", "../images/salas/" + data[0].imagen);
						$("#img1").removeAttr("name");
						$("#img1").attr("name", data[0].imagen);
						$("#img2").removeAttr("src");
						$("#img2").attr("src", "../images/pic03.jpg");
						$("#img2").removeAttr("name");
						$("#img2").attr("name", "sin nombre");
						$("#img3").removeAttr("src");
						$("#img3").attr("src", "../images/pic03.jpg");
						$("#img3").removeAttr("name");
						$("#img3").attr("name", "sin nombre");
					}
					else if(data.length == 2)
					{
						$("#img1").removeAttr("src");
						$("#img1").attr("src", "../images/salas/" + data[0].imagen);
						$("#img1").removeAttr("name");
						$("#img1").attr("name", data[0].imagen);
						$("#img2").removeAttr("src");
						$("#img2").removeAttr("name");
						$("#img2").attr("src", "../images/salas/" + data[1].imagen);
						$("#img2").attr("name", data[1].imagen);
						$("#img3").removeAttr("src");
						$("#img3").attr("src","../images/pic03.jpg");
						$("#img3").removeAttr("name");
						$("#img3").attr("name", "sin nombre");
					}
					else if(data.length == 3)
					{
						$("#img1").removeAttr("src");
						$("#img1").attr("src", "../images/salas/" + data[0].imagen);
						$("#img1").removeAttr("name");
						$("#img1").attr("name", data[0].imagen);
						$("#img2").removeAttr("src");
						$("#img2").attr("src", "../images/salas/" + data[1].imagen);
						$("#img2").removeAttr("name");
						$("#img2").attr("name", data[1].imagen);
						$("#img3").removeAttr("src");
						$("#img3").attr("src", "../images/salas/" + data[2].imagen);
						$("#img3").removeAttr("name");
						$("#img3").attr("name", data[2].imagen);
					}
				}
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	});
	
}





