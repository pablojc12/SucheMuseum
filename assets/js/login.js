var global = "assets/servidor/servidor.php";


function iniciarSesion()
{
	var usuario = $("#txtUsuario").val();
	var contrasenia = $("#txtPasword").val();
	var objetoJSON = null;
	
	usuario = usuario.trim();
	contrasenia = contrasenia.trim();
	var tabla = null;
	
	if(validaEmail(usuario, "", ""))
		tabla = "clientes";
	else 
		tabla = "empleados";
	
	if(campoVacio(usuario, "Ingrese un nombre de usuario", "txtUsuario") && campoVacio(contrasenia, "Ingrese una contraseña", "txtPasword"))
	{	
		objetoJSON = {
			"usuario": "global",
			"funcion": "login",
			"accion": "iniciarSesion",
			"tabla": tabla,
			"name": usuario,
			"pasword": contrasenia
		};
	
		console.log(objetoJSON);
		$.ajax({
			url: global,
			type: "post",
			dataType: "json",
			data: objetoJSON
		})
		.done(function(data){ //true(si devuelve algo)
			console.log(data);
			if(data == "")
				er("Error en el servidor");
			else if(data == null)
				er("Sin respuesta del servidor");
			else if(data.estado == "sesion iniciada")
			{
				ok("Bienvenido " + data.nombre + " " + data.paterno);
				location.reload();
			}
			else if(data.estado == "datos incorrectos")
				er("Usuario o Contraseña invalidos");
		})
		.fail(function(data){
			console.log(data);
			er("Error de comunicacion con la base de datos");
		});
	}
	
}

function cerrarSesion(extra)
{
	var objetoJSON = {
			"usuario" : "global",
			"funcion" : "login",
			"accion" : "cerrarSesion"
	};
	
	$.ajax({
		url: extra+""+global,
		type: "post",
		dataType: "json",
		data: objetoJSON
	})
	.done(function(data){ //true(si devuelve algo)
		//console.log(data);
		if(data == "")
			er("Error en el servidor");
		else if(data == null)
			er("Sin respuesta del servidor");
		else
		{
			location.href = extra+"index.html";
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de comunicacion con la base de datos");
	});
}