
/**
 * funcion para registrar o actualizar el Museo
 * @param accion = registrar o actualizar
 */
function registrarMuseo(accion)
{
	
	//contador general
	var count = 0; 
	//variable para validaciones
	var valido = null;
	//objeto JSON para hacer las peticiones con php
	var objetoJSON;
	//esta variable solo sirve para la forma de actualizacion
	var idMuseo = "";
	
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
	
	if(accion == "actualizar")
		idMuseo = lee(form["idMuseo"]);
	
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
				"usuario": user,
				"funcion": "accionMuseo",
				"tabla": txtTabla,
				//datos a almacenar en db
				"nombre": txtNombreMuseo,
				"tipo": slcTipo,
				"telefono": txtTelefono,
				"horario": horario,
				"boton": accion,
				"idMuseo": idMuseo}
			
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
	
	var txtTabla = lee(form["tabla"]);
	var txtNombreSala = lee(form["txtNombreSala"]);
	var txtTipoSala = lee(form["txtTipoSala"]);
	var horaInicio = lee(form["horaInicio"]);
	var horaFin = lee(form["horaFin"]);
	var idMuseo = lee(form["slcMuseoId"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtNombreSala = txtNombreSala.toUpperCase();
	txtTipoSala = txtTipoSala.toUpperCase();
	
	if(accion == "actualizar")
		idSala = lee(form["idSala"]);
		
	
	var vacio = [campoVacio(txtNombreSala, "Falta Nombre de la sala","txtNombreSala"), 
	             campoVacio(txtTipoSala, "Falta tipo de sala","txtTipoSala"),
	             campoVacio(horaInicio, "Falta hora de entrada","horaInicio"),
	             campoVacio(horaFin, "Falta hora de salida","horaFin"),
	             campoVacio(idMuseo, "Selecciona el museo", "slcMuseoId")];
	
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
				"usuario": user,
				"funcion": "accionSala",
				"tabla": txtTabla,
				//datos a almacenar en db
				"nombre": txtNombreSala,
				"tipoSala": txtTipoSala,
				"horaInicio": horaInicio,
				"horaFin": horaFin,
				"idMuseo": idMuseo,
				"boton": accion,
				"idSala": idSala}
			
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
	
	var txtTabla = lee(form["tabla"]);
	var txtNombreExpo = lee(form["txtNombreExpo"]);
	var txtTipoExpo = lee(form["txtTipoExpo"]);
	var fechaInicio = lee(form["fechaInicio"]);
	var fechaFin = lee(form["fechaFin"]);
	var diaInicio = lee(form["diaInicio"]);
	var diaFin = lee(form["diaFin"]);
	var horaInicio = lee(form["horaInicio"]);
	var horaFin = lee(form["horaFin"]);
	var idMuseo = lee(form["slcMuseoId"]);
	
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
	             campoVacio(horaFin, "Falta Hora de termino", "horaFin"),
	             campoVacio(idMuseo, "Selecciona un Museo", "slcMuseo")];
	
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
				"usuario": user,
				"funcion": "accionExposicion",
				"tabla": txtTabla,
				//datos a almacenar en db
				"nombre": txtNombreExpo,
				"tipo": txtTipoExpo,
				"fechaInicio": fechaInicio,
				"fechaFin": fechaFin,
				"horario": horario,
				"idMuseo": idMuseo,
				"boton": accion,
				"idExpo": idExpo}
			
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
			if(data.estado == "almacenado") 
			{
				form.reset();
				ok("Datos almacenados correctamente");
			}
			else if(data.estado == "actualizado")
			{
				alertify.alert("<p class='black'>Datos actualizados correctamente</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					if(objetoJSON.tabla == "salas" || objetoJSON.tabla == "exposiciones")
						procesaSelectMuseo();
					else
						procesa();
				});
			}
			else if(data.estado == "no actualizado")
			{
				alertify.alert("<p class='black'>Los datos no se pudieron actualizar</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					if(objetoJSON.tabla == "salas" || objetoJSON.tabla == "exposiciones")
						procesaSelectMuseo();
					else
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

/**
 * funcion para extraer los datos de los registros para las listas de modificaciones
 * @param titulo
 * @param tabla
 * @param accion 
 * @param id = este campo es opcional, se utiliza para hacer un where dentro de la base de datos 
 */
function extracDataMuseos(titulo, tabla, accion, id)
{
	var carga = null;
	var funcion = "";
	
	if(tabla == "museos")
		funcion = "accionMuseo";
	else if(tabla == "salas")
		funcion = "accionSala";
	else if(tabla == "exposiciones")
		funcion = "accionExposicion";
			
	var objetoJSON = {
			"usuario": user,
			"funcion": funcion,
			"tabla": tabla,
			"boton": accion,
			"idMuseoPertenecia": id
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
					alertify.alert("<p class='black'>No existen datos para mostrar</p>", function () {
			            //aqui introducimos lo que haremos tras cerrar la alerta.
			            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						if(tabla == "salas" || tabla == "exposiciones")
						{
							for(var indice=0 ;indice<document.getElementById("museoSelect").length;indice++)
						    {
						        if (document.getElementById("museoSelect").options[indice].value == "nada")
						            document.getElementById("museoSelect").selectedIndex =indice;
						    }
							
							procesaSelectMuseo();
						}
						else
						{
							for(var indice=0 ;indice<document.getElementById("slcCategoria").length;indice++)
						    {
						        if (document.getElementById("slcCategoria").options[indice].value == "categoria")
						            document.getElementById("slcCategoria").selectedIndex =indice;
						    } 
							
							procesa();
						}
			      });
				}
				else{
					//console.log(data);
					
					if(tabla == "museos")
						cargaMuseos(titulo, data);
					else if(tabla == "salas")
						cargaSalas(titulo, data);
					else if(tabla == "exposiciones")
						cargaExposiciones(titulo, data);
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
function actionButtons(tabla, id, accion)
{
	var funcion = "";
	
	if(tabla == "museos")
		funcion = "accionMuseo";
	else if(tabla == "salas")
		funcion = "accionSala";
	else if(tabla == "exposiciones")
		funcion = "accionExposicion";
	
	var objetoJSON = {
			"usuario": user,
			"funcion": funcion,
			"id": id,
			"boton": accion,
			"tabla": tabla
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
						if(tabla == "museos")
							cargaViewMuseos(data);
						else if(tabla == "salas")
							cargaViewSalas(data);
						else if(tabla == "exposiciones")
							cargaViewExpo(data);
					}
					else if(accion == "modificar")
					{
						if(tabla == "museos")
							cargaFormMuseo("Modificar museo", tabla, data)
						else if(tabla == "salas")
							extracMuseoID("modificar sala", tabla, "", "cargaFormSalas", data);
						else if(tabla == "exposiciones")
							extracMuseoID("modificar exposicion", tabla, "", "cargarFormExposicion", data);
							
					}
					else if(accion == "eliminar")
					{
						//var category = document.getElementById("slcCategoria").value;
						if(data["estado"] == "eliminado")
						{
							alertify.alert("<p class='black'>Eliminacion correcta</p>", function () {
								if(tabla == "salas" || tabla == "exposiciones")
									procesaSelectMuseo();
								else
									procesa();
							});
						}else 
							alertify.alert("<p class='black'>No se pudo eliminar el registro</p>", function () {
								if(tabla == "salas" || tabla == "exposiciones")
									procesaSelectMuseo();
								else
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







