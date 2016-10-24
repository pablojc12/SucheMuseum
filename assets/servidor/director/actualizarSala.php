<?php
require_once 'dbConection.php';

function postDatos()
{
	//variable funcion
	$metodo = "";
	
	$metodo = $_POST["boton"];
	
	if($metodo == "registrar" || $metodo == "actualizar")
	{
		$data[0] = $_POST["horaFin"];
		$data[1] = $_POST["horaInicio"];
		$data[2] = $_SESSION["tokenMuseo"];
		$data[3] = $_POST["nombre"];
		$data[4] = $_POST["tipoSala"];
	
		if($metodo == "actualizar")
			$data[5] = $_POST["idSala"];
	}
	else if($metodo == "ver" || $metodo == "eliminar" || $metodo == "modificar")
	{
		$data[0] = "salas";
		$data[1] = $_POST["id"];
	}
	return $metodo($data);
}

/**
 * funcion para realizar el almacenamiento de los campos del museo
 * @param array $data
 * @param $data[0] = $_POST["horaFin"]
 * @param $data[1] = $_POST["horaInicio"]
 * @param $data[2] = idMuseo
 * @param $data[3] = $_POST["nombre"]
 * @param $data[4] = $_POST["tipoSala"]
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;

	$campos = "nombre, tipo, hora_inicial, hora_final, Museos_id_museo";
	$valores = "'$data[3]', '$data[4]', '$data[1]', '$data[0]', '$data[2]'";

	$query = "insert into salas ($campos)values($valores)";
	$result = mysqli_query($link, $query);

	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");

	mysqli_close($link);

	return $retorno;
}

/**
 * funcion para extraer todos los datos dependiendo del id ingresado
 * @param array $data
 * @param $data[0] = tabla
 * @param $data[1] = id
 */
function ver($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();

	$query = "select * from $data[0] where id_sala like '$data[1]'";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	$result = mysqli_fetch_assoc($result);

	if($rows == 1)
		$retorno =
		[
				"id" => $result["id_sala"],
				"nombre" => utf8_encode($result["nombre"]),
				"tipo" => utf8_encode($result["tipo"]),
				"horaInicial" => $result["hora_inicial"],
				"horaFinal" => $result["hora_final"],
				"idMuseoPerteneciente" => $result["Museos_id_museo"]
		];
		else
			$retorno = ["estado" => "sin datos"];

		return $retorno;
}


/**
 * funcion para hacer el eliminado del registro dependiendo el id
 * @param array $data
 * @param $data[0] = $_POST["tabla"]
 * @param $data[1] = $_POST["id"];
 */
function eliminar($data)
{
	//variable de conexion al db
	$link = conection();
	$estado = null;

	$query = "delete from $data[0] where id_sala like '$data[1]'";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	if($resultSet > 0)
		$estado = array("estado" => "eliminado");
	else
		$estado = array("estado" => "no eliminado");

	return $estado;
}

/**
 * funcion para hacer el modificado del registro dependiendo el id
 * @param array $data
 * @param $data[0] = $_POST["tabla"]
 * @param $data[1] = $_POST["id"];
 */
function modificar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();

	$query = "select * from $data[0] where id_sala like '$data[1]'";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	$result = mysqli_fetch_assoc($result);

	if ($rows > 0)
	{
		$retorno = ["idSala" => $result["id_sala"],
				"nombre" => utf8_encode($result["nombre"]),
				"tipo" => utf8_encode($result["tipo"]),
				"horaInicio" => $result["hora_inicial"],
				"horaFin" => $result["hora_final"],
				"idMuseoPertenencia" => $result["Museos_id_museo"]
		];
	}
	else
		$retorno = ["estado" => "sin datos"];

	mysqli_close($link);

	return $retorno;

}

/**
 * funcion para realizar la actualizacion de los campos de la sala
 * @param array $data
 * @param $data[0] = $_POST["horaFin"]
 * @param $data[1] = $_POST["horaInicio"]
 * @param $data[2] = $_POST["idMuseo"]
 * @param $data[3] = $_POST["nombre"]
 * @param $data[4] = $_POST["tipoSala"]
 * @param $data[5] = $_POST["idSala"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;

	$query = "update salas set nombre = '$data[3]', tipo = '$data[4]', hora_inicial = '$data[1]', hora_final = '$data[0]', Museos_id_museo = '$data[2]' where id_sala like '$data[5]'";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	if($resultSet > 0)
		$retorno = array("estado" => "actualizado");
	else
		$retorno = array("estado" => "no actualizado");

	return $retorno;

}
?>