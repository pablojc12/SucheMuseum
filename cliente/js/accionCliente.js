

function registrarVisita(accion)
{
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	//esta variable solo sirve para la forma de actualizacion
	var idVisita = "";
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var fecha = lee(form["fecha"]);
	var hora = lee(form["hora"]);
	var personas = lee(form["personas"]);
	var duracion = lee(form["duracion"]);
	var comentario = lee(form["comentario"]);
	var idMuseo = lee(form["museoId"]);
	
	if(accion == "actualizar")
		idVisita = lee(form["idVisita"]);
	
	
	var vacio = [campoVacio(fecha, "Falta fecha","fecha"), 
	             campoVacio(hora, "Falta hora","hora"),
	             campoVacio(personas, "Falta numero de personas","personas"),
	             campoVacio(duracion, "Falta duracion","duracion"),
	             campoVacio(comentario, "Falta comentario", "comentario"),
	             campoVacio(idMuseo, "Falta seleccionar museo", "museoId")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaTextAndNumber(comentario,"NO se pueden escribir simbolos extraños en el comentario", "comentario"),];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			objetoJSON = {
				"usuario": "cliente",
				"funcion": "accionVisitas",
				//datos a almacenar en db
				"fecha": fecha,
				"hora": hora,
				"personas": personas,
				"duracion": duracion,
				"comentario": comentario,
				"idMuseo": idMuseo,
				"idCliente": dataUsuario.id_cliente,
				"accion": accion,
				"idVisita": idVisita
				}
			
			presionSubmit(objetoJSON);
			
		}
	}
}

function actualizarCliente(accion)
{
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	
	//variables para cachar los valores del form
	var form = document["form"];
	
	var nombre = lee(form["txtNombre"]);
	var paterno = lee(form["txtPaterno"]);
	var materno = lee(form["txtMaterno"]);
	var fechaNacimiento = lee(form["dtFechaNacimiento"]);
	
	//convercion de los campos correspondientes a mayusculas
	nombre =nombre.toUpperCase();
	paterno = paterno.toUpperCase();
	materno = materno.toUpperCase();
	
	var vacio = [campoVacio(nombre, "Falta Nombre","txtNombre"), 
	             campoVacio(paterno, "Falta Apellido Paterno","txtPaterno"),
	             campoVacio(materno, "Falta Apellido Materno","txtMaterno"),
	             campoVacio(fechaNacimiento, "Falta Fecha de nacimiento","dtFechaNacimiento")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(nombre,"ERROR de NOMBRE:2 o mas letras sin simbolos", "txtNombre"),
			      validaText(paterno,"ERROR de A PATERNO:2 o mas letras sin simbolos", "txtPaterno"),
			      validaText(materno,"ERROR de A MATERNO:2 o mas letras sin simbolos", "txtMaterno")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count == valido.length){
			
			objetoJSON = {
				"usuario": "cliente",
				"funcion": "accionCliente",
				//datos a almacenar en db
				"nombre": nombre,
				"paterno": paterno,
				"materno": materno,
				"fechaNacimiento": fechaNacimiento,
				"idCliente": dataUsuario.id_cliente,
				"accion": accion
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
function regView(id)
{
	var accion = "ver";
	
	actionButtons(id, accion);
	
}

/**
 * funcion para eliminar el registro correspondiente segun id 
 * @param id = identificador para hacer where en la base de datos
 * @param tabla = tabla hacia donde sa va la consulta
 */
function regDelete(id)
{
	var accion = "eliminar";
	
	alertify.confirm("<p class='black'>Realmente deceas eliminar este registro</p>", function (e) 
			{
        if (e) 
        {
        	actionButtons(id, accion);
        } 
	});
}

/**
 * funcion para traer todos los datos segun la tabla ingresada para su posterior carga de formulario y modificacion
 * @param id = identificador para hacer where en la base de datos
 * @param tabla = tabla hacia donde sa va la consulta
 */
function regModify(id)
{
	var accion = "modificar";
	actionButtons(id, accion)
}

/**-----------------------------------------------------------------------------------------------------------------
 * funcion  para la realizacion de las acciones de los botones del lado izquierdo de cada lista
 * 
 * @param tabla (nombre de la tabla para la consulta) 
 * @param id (identificador de boton en cuestion)
 * @param accion (boton al que se le da clic)
 */
function actionButtons(id, accion)
{
	var funcion = "";
	
	var objetoJSON = {
			"usuario": "cliente",
			"funcion": "accionVisitas",
			"id": id,
			"accion": accion
	}
	
	//console.log(objetoJSON);
	
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
					//console.log(data);
					if(accion == "ver")
						cargaViewVisita(data);
					else if(accion == "modificar")
						cargaFormModifyVisita(data);
					else if(accion == "eliminar")
					{
						//var category = document.getElementById("slcCategoria").value;
						if(data["estado"] == "eliminado")
						{
							alertify.alert("<p class='black'>Eliminacion correcta</p>", function () {
								inicio();
							});
						}else 
							alertify.alert("<p class='black'>No se pudo eliminar el registro</p>", function () {
								inicio();
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
 * funcion para el evento clic del boton registrar o actualizar del formulario correspondiente
 * @param objetoJSON = datos del formulario
 */
function presionSubmit(objetoJSON)
{
	console.log(objetoJSON);
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
			if(data.estado == "almacenado") 
			{
				form.reset();
				ok("Datos almacenados correctamente");
				inicio();
			}
			else if(data.estado == "no almacenado")
			{
				er("La Visita no se pudo registrar");
				inicio();
			}
			else if(data.estado == "actualizado")
			{
				alertify.alert("<p class='black'>Datos actualizados correctamente</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					inicio()
				});
			}
			else if(data.estado == "no actualizado")
			{
				alertify.alert("<p class='black'>Los datos no se pudieron actualizar</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					inicio();
				});
			}
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	})
}