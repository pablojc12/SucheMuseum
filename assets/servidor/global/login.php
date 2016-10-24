<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$metodo = $_POST["accion"];

	if($metodo == "iniciarSesion")
	{
		$data = array();
		
		$usuario = $_POST["name"];
		$pasword = $_POST["pasword"];
		
		if($usuario === "miguel" && $pasword === "Miguel1234")
		{
			session_name("administradorGeneral");
			$_SESSION["tokenPermisos"] = "todo";
			$data = array();
			"entro";
			return $data = ["estado" => "sesion iniciada", "nombre" => "Administrador", 
				"paterno" => "General"];
		}
		
		$tabla = $_POST["tabla"];
		
		$data[0] = $usuario;
		$data[1] = $pasword;
		$data[2] = $tabla;
		
		return $metodo($data);
	}
	else 
		return $metodo();
}

/**
 * funcion para el inicio de sesion
 * @param array $data
 * @param $data[0] = $usuario
 * @param $data[1] = $pasword
 * @param $data[2] = $tabla
 */
function iniciarSesion($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();
	$query = null;
	$rows = 0;
	
	if($data[2] == "empleados")
		$query = "select nombre, ap_paterno, Roles_id_rol, Museos_id_museo, sesion from $data[2] where id_empleado like '$data[0]' and contrasena like '$data[1]'";
	else 
		$query = "select nombre, ap_paterno, sesion from $data[2] where correo_electronico like '$data[0]' and contrasena like '$data[1]'";
	
	$result = mysqli_query($link, $query);
	
	$rows = @mysqli_num_rows($result);
	
	
	if($rows > 0)
	{
		$result = mysqli_fetch_assoc($result);
		
		session_name($result["nombre"]);
		$_SESSION["tokenSession"] = $result["sesion"];
		
		if($data[2] == "empleados")
		{
			$_SESSION["tokenPermisos"] = $result["Roles_id_rol"];
			$_SESSION["tokenMuseo"] = $result["Museos_id_museo"];
		}
		else
			$_SESSION["tokenPermisos"] = "comun";
		
		$retorno = ["estado" => "sesion iniciada", "nombre" => utf8_encode($result["nombre"]), 
				"paterno" => utf8_encode($result["ap_paterno"])
		];
	}
	else 
		$retorno = ["estado" => "datos incorrectos"];
	
	mysqli_close($link);
	
	return $retorno;
}


function cerrarSesion()
{
	$_SESSION["tokenSession"] = null;
	$_SESSION = array();
	
	if (ini_get("session.use_cookies")) {
		$params = session_get_cookie_params();
		setcookie(session_name(), '', time() - 42000,
				$params["path"], $params["domain"],
				$params["secure"], $params["httponly"]
		);
	}
	
	session_destroy();
	return $retorno = array("estado" => "sesion cerrada");
}
?>















