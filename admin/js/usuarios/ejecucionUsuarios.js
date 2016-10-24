"use strict";

/**
 * funcion para obtener los datos y mandarlos al servidor con ajax en jquery
 * @param accion = acutalizar o registrar
 */
function registrarCliente(accion)
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
	var txtNombre = lee(form["txtNombre"]);
	var txtPaterno = lee(form["txtPaterno"]);
	var txtMaterno = lee(form["txtMaterno"]);
	var dtFechaNacimiento = lee(form["dtFechaNacimiento"]);
	var email = lee(form["txtCorreo"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtNombre =txtNombre.toUpperCase();
	txtPaterno = txtPaterno.toUpperCase();
	txtMaterno = txtMaterno.toUpperCase();
	
	
	var vacio = [campoVacio(txtNombre, "Falta Nombre","txtNombre"), 
	             campoVacio(txtPaterno, "Falta Apellido Paterno","txtPaterno"),
	             campoVacio(txtMaterno, "Falta Apellido Materno","txtMaterno"),
	             campoVacio(dtFechaNacimiento, "Falta Fecha de nacimiento","dtFechaNacimiento"),
	             campoVacio(email, "Falta Correo electronico","txtCorreo")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count === 5)
	{
		valido = [validaText(txtNombre,"ERROR de NOMBRE:2 o mas letras sin simbolos", "txtNombre"),
		          validaText(txtPaterno,"ERROR de A PATERNO:2 o mas letras sin simbolos", "txtPaterno"),
		          validaText(txtMaterno,"ERROR de A MATERNO:2 o mas letras sin simbolos", "txtMaterno"),
		          validaEmail(email, "ERROR de CORREO", "txtCorreo"),
		          validarFormatoFecha(dtFechaNacimiento, "ERROR FECHA INCORRECTA", "dtFechaNacimiento")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count === 5){
			objetoJSON = {
				"usuario": user,
				"funcion": "altaCliente",
				"tabla": txtTabla,
				//datos a almacenar en db
				"nombre": txtNombre,
				"paterno": txtPaterno,
				"materno": txtMaterno,
				"fechaNacimiento": dtFechaNacimiento,
				"correo": email,
				"boton": accion}
			
			presionSubmit(objetoJSON);
			
		}
	}
}

/**
 * funcion para obtener los datos y mandarlos al servidor con ajax en jquery
 * @param accion = actualizar o registrar
 */
function registrarEmpleado(accion)
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
	var txtRol = lee(form["rol"]);
	
	//valores vicibles
	var txtId = lee(form["txtId"]);
	var txtNombre = lee(form["txtNombre"]);
	var txtPaterno = lee(form["txtPaterno"]);
	var txtMaterno = lee(form["txtMaterno"]);
	var txtCurp = lee(form["txtCurp"]);
	var email = lee(form["txtCorreo"]);
	var slcMuseoId = lee(form["slcMuseo"]);
	
	//convercion de los campos correspondientes a mayusculas
	txtId = txtId.toUpperCase();
	txtNombre =txtNombre.toUpperCase();
	txtPaterno = txtPaterno.toUpperCase();
	txtMaterno = txtMaterno.toUpperCase();
	txtCurp = txtCurp.toUpperCase();
	
	//camptura de valores boleanos dentro de un array para las validaciones (campos vacios)
	var vacio = [campoVacio(txtId, "Falta ID","txtCurp"),
	             campoVacio(txtNombre, "Falta Nombre","txtNombre"), 
	             campoVacio(txtPaterno, "Falta Apellido Paterno","txtPaterno"),
	             campoVacio(txtMaterno, "Falta Apellido Materno","txtMaterno"),
	             campoVacio(txtCurp, "Falta CURP","txtCurp"),
	             campoVacio(email, "Falta Correo electronico","txtCorreo"),
	             campoVacio(slcMuseoId, "Selecciona un museo","slcMuseo")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count === 7)
	{
		//camptura de valores boleanos dentro de un array para las validaciones (textos)
		valido = [validaText(txtNombre,"ERROR de NOMBRE:2 o mas letras sin simbolos", "txtNombre"),
		          validaText(txtPaterno,"ERROR de A PATERNO:2 o mas letras sin simbolos", "txtPaterno"),
		          validaText(txtMaterno,"ERROR de A MATERNO:2 o mas letras sin simbolos", "txtMaterno"),
		          validaEmail(email, "ERROR de CORREO", "txtCorreo"),
		          validarCurp(txtCurp, "Formato de curp Invalido", "txtCurp"),
		          validaTextAndNumber(txtId, "ERROR de ID:2 o mas letras sin simbolos", "txtId")];
		
		count = 0;
		for(var o = 0; valido.length > o; o++)
			if(valido[o])
				count ++;
		
		if(count === 6){
			objetoJSON = {
				"usuario": user,
				"funcion": "altaCliente",
				"tabla": txtTabla,
				
				//datos a almacenar en db
				"nombre": txtNombre,
				"paterno": txtPaterno,
				"materno": txtMaterno,
				"correo": email,
				"curp": txtCurp,
				"idEmpleado": txtId,
				"idMuseo": slcMuseoId,
				"idRol": txtRol,
				"boton": accion
				}
			
				presionSubmit(objetoJSON, form);
			
		}
	}
}

/**
 * funcion par vizualizar el registro completo
 * @param id = identificador del registro de accion clic
 */
function regView(id)
{
	var accion = "ver";
	//console.log(id.length);
	//extracData(titulo, tabla, rol);
	//extracRegistro(tabla, rol);
	
	if(id.length == 12)
		actionButtonsList(empleado, id, accion);
	else
		actionButtonsList(cliente, id, accion);
		
}

/**
 * funcion para la eliminacion del registro 
 * @param id = identificador del registro de accion clic
 */
function regDelete(id)
{
	var accion = "eliminar";
	
	alertify.confirm("<p class='black'>Realmente deceas eliminar este registro</p>", function (e) 
			{
        if (e) 
        {
        	if(id.length == 12)
        		actionButtonsList(empleado, id, accion);
        	else
        		actionButtonsList(cliente, id, accion);
        } 
	}); 
	
}

/**
 * funcion para modificar un registro
 * @param id = identificador del registro de accion clic
 */
function regModify(id)
{
	var accion = "modificar";
	
	if(id.length == 12)
		actionButtonsList(empleado, id, accion);
	else
		actionButtonsList(cliente, id, accion);
}

/**
 * funcion para realizar el almacenado o actualizacion de los datos
 * @param objetoJSON
 */
function presionSubmit(objetoJSON)
{
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		beforeSend: notificacion("Enviando datos")
	})
	.done(function(data){ //true(si devuelve algo)
		console.log(data);
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
			else
			{
				alertify.alert("<p class='black'>Datos actualizados correctamente</p>", function () {
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
