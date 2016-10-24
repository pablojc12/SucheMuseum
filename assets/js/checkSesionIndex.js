sesionJSON = {
		"usuario": "global",
		"funcion": "checkSesion"
};

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
			$("#btnSesion").text("Mi Cuenta");
			$("#btnRegistro").hide();
			$("#sesion").text("Mi Cuenta");
			$("#registro").hide();
		}
		else
		{
			$("#btnSesion").text("Iniciar sesion");
			$("#btnRegistro").show();
			$("#sesion").text("Iniciar Sesion");
			$("#registro").show();
		}
	})
	.fail(function(data){
		console.log(data);
		er("Error de counicacion con la base de datos");
	});