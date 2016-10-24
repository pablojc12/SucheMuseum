sesionJSON = {
		"usuario": "global",
		"funcion": "checkSesion"
}

	$.ajax({
		url: "assets/servidor/servidor.php",
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
		else if(data.sesion == "iniciada")
		{
			if(data.permisos == "comun")
				location.href = "cliente/usuario.html";
			else if(data.permisos == "Dir")
				location.href = "director/director.html";
			else if(data.permisos == "Adm")
				location.href = "director/director.html";
			else if(data.permisos == "todo")
				location.href = "admin/menu.html";
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	})