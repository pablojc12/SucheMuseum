/**
 * objeto JSON para mandar la ubicacion de la extraccion de los usuarios
 */
var JSONUsuario = {
			"usuario": "global",
			"funcion": "extraerDataUsuarios"
	}
/**
 * objeto JSON para mandar la ubicacion de la extraccion de los museos
 */
var JSONMuseos = {
		"usuario": "global",
		"funcion" : "extraeDataMuseos"
}
/**
 * variable para declarar los datos del usuario
 * @param array dataUsuario 
 * @string dataUsuario.nombre = nombre de usuario
 * @string dataUsuario.ap_paterno = apellido paterno
 * @string dataUsuario.ap_materno = apellido materno
 * @string dataUsuario.correo_electronico = correo
 * @string dataUsuario.id_cliente = clave unica del cliente
 * @string dataUsuario.fecha_nacimiento = fecha de nacimiento
 */
var dataUsuario;
	//console.log(objetoJSON);
	
/**
 * variable para almacenar los datos de todos los useos
 * @param array dataMuseos
 * @string dataMuseos[].nombre = nombre del museo
 * @string dataMuseos[].horarios = horarios del museo
 * @string dataMuseos[].telefono = telefono del museo
 * @string dataMuseos[].tipo = tipo de museo
 * @string dataMuseos[].idMuseo = clave del museo
 */
var dataMuseos;

/**
 * variable para hacer la carga de todos los elementos dentro del html original
 */
var newHTML = document.getElementById("newCode");

/**
 * metodo ajax para traer los datos del usuario
 */
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: JSONUsuario,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else 
				{
					var nombreBienvenida = data.nombre + " " + data.ap_paterno;
					$("#bienbenida").text(nombreBienvenida);
					
					dataUsuario = data;
					
					var JSONVisitas = {
							"usuario": "cliente",
							"funcion" : "accionVisitas",
							"idUsuario": data.id_cliente,
							"accion": "listar"
					};
					console.log(JSONVisitas);
					/**
					 * metodo ajax para traer los datos las visitas y listarlas
					 */
						$.ajax({
							url: servidor,
							type: "post",
							dataType: "json",
							data: JSONVisitas,
							success: 
								function(dataVistas){
									console.log(dataVistas);
									if(dataVistas == "")
										er("Error con base de datos");
									else if(dataVistas == null)
										er("Sin respuesta del servidor");
									else if(dataVistas.estado == "sin datos")
										notificacion("No tienes visitas registradas");
									else
										listarVisitas(dataVistas);
								},
							error: function(data){
								er("Respuesta del servidor invalida");
								console.log(data)
							}
						});
				}
					
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	});
	
/**
 * metodo ajax para traer los datos de los museos
 */
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: JSONMuseos,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else 
					dataMuseos = data;
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	});
	


	
function inicio()
{
	location.reload();
	$("#actions").show();
	$("#imagen").show();
	newHTML.innerHTML = "";
}
