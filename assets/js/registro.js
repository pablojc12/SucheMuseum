/**
 * funcion para obtener los datos y mandarlos al servidor con ajax en jquery
 */
function registrarCliente()
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
	var correo = lee(form["txtCorreo"]);
	var contrasenia = lee(form["txtPasword1"]);
	var contrasenia1 = lee(form["txtPasword2"]);
	
	//convercion de los campos correspondientes a mayusculas
	nombre = nombre.toUpperCase();
	paterno = paterno.toUpperCase();
	materno = materno.toUpperCase();
	
	
	var vacio = [campoVacio(nombre, "Falta Nombre","txtNombre"), 
	             campoVacio(paterno, "Falta Apellido Paterno","txtPaterno"),
	             campoVacio(materno, "Falta Apellido Materno","txtMaterno"),
	             campoVacio(fechaNacimiento, "Falta Fecha de nacimiento","dtFechaNacimiento"),
	             campoVacio(correo, "Falta Correo electronico","txtCorreo"),
	             campoVacio(contrasenia, "Falta Contraseña", "txtPasword1")];
	
	for(var i = 0; vacio.length > i; i++)
		if(vacio[i])
			count ++;
	
	if(count == vacio.length)
	{
		valido = [validaText(nombre,"Nombre NO puede contener caracteres !#$%&/()=", "txtNombre"),
		          validaText(paterno,"Apellido paterno NO puede contener caracteres !#$%&/()=", "txtPaterno"),
		          validaText(materno,"Apellido materno NO puede contener caracteres !#$%&/()=", "txtMaterno"),
		          validaEmail(correo, "Correo invalido", "txtCorreo"),
		          compararContrasenia(contrasenia, contrasenia1, "txtPasword1")];
		
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
				"correo": correo,
				"accion": "registrar",
				"contrasenia": contrasenia
				}
			
			console.log(objetoJSON);
			presionSubmit(objetoJSON);
			
		}
	}
}


/**
 * funcion para el evento clic del boton registrar o actualizar del formulario correspondiente
 * @param objetoJSON = datos del formulario
 */
function presionSubmit(objetoJSON)
{
	//console.log(objetoJSON);
	$.ajax({
		url: "assets/servidor/servidor.php",
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
		else if(data.estado == "almacenado") 
		{
			alertify.alert("<p class='black'>Al cerrar esta alerta podra ingresar con su correo electronico</p>", function () {
	            //aqui introducimos lo que haremos tras cerrar la alerta.
	            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
				location.href = "login.html";
			});
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	})
}