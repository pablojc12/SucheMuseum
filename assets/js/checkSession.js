sesionJSON = {
		"usuario": "global",
		"funcion": "checkSesion"
}

	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: sesionJSON
	})
	.done(function(data){ //true(si devuelve algo)
		//console.log(data);
		if(data == "")
			er("Los datos no se pudieron almacenar");
		else if(data == null)
			er("Sin respuesta del servidor");
		else if(data.sesion == "no iniciada")
			location.href = "../login.html";
		else if(data.sesion == "iniciada")
		{
			var URLactual = window.location.href;
			URLactual = URLactual.split("/")
			var URLFinal = URLactual.length;
			var locacion = URLactual[URLFinal-1];
			
			if(data.permisos == "comun" && locacion != "usuario.html")
			{
				alertify.alert("<p class='black'>SIN PERMISOS PARA ABRIR ESTA DIRECCION</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					location.href = "../cliente/usuario.html";
				});
			}
			else if(data.permisos == "Dir" && locacion != "director.html")
			{
				alertify.alert("<p class='black'>SIN PERMISOS PARA ABRIR ESTA DIRECCION</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					location.href = "../director/director.html";
				});
			}
			else if(data.permisos == "Adm" && locacion != "director.html")
			{
				alertify.alert("<p class='black'>SIN PERMISOS PARA ABRIR ESTA DIRECCION</p>", function () {
		            //aqui introducimos lo que haremos tras cerrar la alerta.
		            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
					location.href = "../director/director.html";
				});
			}
			else if(data.permisos == "todo")
			{
				if(locacion == "altasMuseos.html")
					console.log(locacion);
				else if(locacion == "altasUsuarios.html")
					console.log(locacion);
				else if(locacion == "modificacionesMuseos.html")
					console.log(locacion);
				else if(locacion == "modificacionesUsuarios.html")
					console.log(locacion);
				else if(locacion == "menu.html")
					console.log(locacion);
				else 
					llamar();
			}
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	});

function llamar()
{
	alertify.alert("<p class='black'>Variables de sesion no iniciadas y puede aver algun error al ingresar a esta direccion</p>", function () {
        //aqui introducimos lo que haremos tras cerrar la alerta.
        //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
		location.href = "../admin/menu.html"
	});
}