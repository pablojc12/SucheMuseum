<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	//arreglo para enviar los datos
	$data = array();
	
	$data[0] = $_POST["horario"];
	$data[1] = $_POST["nombre"];
	$data[2] = $_SESSION["tokenMuseo"];
	$data[3] = $_POST["telefono"];
	$data[4] = $_POST["tipo"];
	
	
	return actualizar($data);
}

/**
 * funcion para realizar la actualizacion de los campos del museo
 * @param array $data
 * @param $data[0] = $_POST["horario"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_SESSION["tokenMuseo"]
 * @param $data[3] = $_POST["telefono"]
 * @param $data[4] = $_POST["tipo"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;

	$query = "update museos set nombre = '$data[1]', tipo = '$data[4]', horarios = '$data[0]', telefono = '$data[3]' where id_museo like '$data[2]'";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	if($resultSet > 0)
		$retorno = array("estado" => "actualizado");
	else
		$retorno = array("estado" => "no actualizado");

	return $retorno;

}?>
