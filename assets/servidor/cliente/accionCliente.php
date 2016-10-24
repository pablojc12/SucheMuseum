<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$data = array();
	
	$metodo = $_POST["accion"];
	
	if($metodo == "actualizar" || $metodo == "registrar")
	{	
		//captura de los datos que recogimos con post
		$data[0] = $_POST["fechaNacimiento"];
		$data[1] = $_POST["nombre"];
		$data[2] = $_POST["paterno"];
		$data[3] = $_POST["materno"];
		
		if($metodo == "actualizar")
			$data[4] = $_POST["idCliente"];
		elseif($metodo == "registrar")
		{
			$data[4] = $_POST["contrasenia"];
			$data[5] = $_POST["correo"];
			$data[6] = sha1(md5($data[5]));
		}
	}
	
	return $metodo($data);
}

function actualizar($data)
{
	$link = conection();
	$retorno = null;
	$campos = "";
	
	$campos = " nombre = '$data[1]', ap_paterno = '$data[2]', ap_materno = '$data[3]', fecha_nacimiento = '$data[0]'";
	
	$query = "update clientes set $campos where id_cliente like '$data[4]'";
	$result = mysqli_query($link, $query);
	
	$resultSet = mysqli_affected_rows($link);
	
	mysqli_close($link);
	
	if($resultSet > 0)
		$retorno = array("estado" => "actualizado");
	else
		$retorno = array("estado" => "no actualizado");
	
	return $retorno;
}

/**
 * 
 * @param array $data
 * @param $data[0] = $_POST["fechaNacimiento"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_POST["paterno"]
 * @param $data[3] = $_POST["materno"]
 * @param $data[4] = $_POST["contrasenia"]
 * @param $data[5] = $_POST["correo"]
 * @param $data[6] = sha1(md5($data[5])) = sesion
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;
	$campos = "";
	$valores = "";
	
	$campos = "nombre, ap_paterno, ap_materno, fecha_nacimiento, correo_electronico, contrasena, sesion";
	$valores = "'$data[1]', '$data[2]', '$data[3]', '$data[0]', '$data[5]', '$data[4]', '$data[6]'";
	
	$query = "insert into clientes($campos)values($valores)";
	$result = mysqli_query($link, $query);
	
	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");
	else
		$retorno = array("estado" => "no almacenado");
	
	mysqli_close($link);
	
	return $retorno;
}




?>