<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	//variable funcion
	$metodo = "";

	//arreglo para enviar los datos
	$data = array();

	$metodo = $_POST["boton"];

	if($metodo == "registrar" || $metodo == "actualizar")
	{
		$data[0] = $_POST["calle"];
		$data[1] = $_POST["numero"];
		$data[2] = $_POST["colonia"];
		$data[3] = $_POST["codigoPostal"];
		$data[4] = $_POST["delegacion"];
		$data[5] = $_POST["estado"];
		$data[6] = $_SESSION["tokenMuseo"];
		
		if($metodo == "actualizar")
			$data[7] = $_POST["idDireccion"];
	}
	else if($metodo == "modificar")
	{
		$data[0] = $_POST["id"];
	}

	return $metodo($data);
}

/**
 * funcion para realizar el almacenamiento de los campos de la direccion
 * @param array $data
 * @param $data[0] = $_POST["calle"]
 * @param $data[1] = $_POST["numero"]
 * @param $data[2] = $_POST["colonia"]
 * @param $data[3] = $_POST["codigoPostal"]
 * @param $data[4] = $_POST["delegacion"]
 * @param $data[5] = $_POST["estado"]
 * @param $data[6] = $_SESSION["tokenMuseo"]
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;

	$campos = "calle, numero, colonia, cp, delegacion, estado, Museos_id_museo";
	$valores = "'$data[0]', '$data[1]', '$data[2]', '$data[3]', '$data[4]', '$data[5]', '$data[6]'";

	$query = "insert into direcciones ($campos) values($valores)";
	$result = mysqli_query($link, $query);

	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");

	mysqli_close($link);

	return $retorno;
}

/**
 * funcion para realizar el almacenamiento de los campos de la direccion
 * @param array $data
 * @param $data[0] = $_POST["calle"]
 * @param $data[1] = $_POST["numero"]
 * @param $data[2] = $_POST["colonia"]
 * @param $data[3] = $_POST["codigoPostal"]
 * @param $data[4] = $_POST["delegacion"]
 * @param $data[5] = $_POST["estado"]
 * @param $data[6] = $_SESSION["tokenMuseo"]
 * @param $data[7] = $_POST["idDireccion"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;

	$query = "update direcciones set calle = '$data[0]', numero = '$data[1]', colonia = '$data[2]', cp = $data[3], 
			delegacion = '$data[4]', estado = '$data[5]' 
			where id_direccion like '$data[7]' and Museos_id_museo like '$data[6]'";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	if($resultSet > 0)
		$retorno = array("estado" => "actualizado");
	else
		$retorno = array("estado" => "no actualizado");

	return $retorno;

}