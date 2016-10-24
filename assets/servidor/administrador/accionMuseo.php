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
		$data[0] = $_POST["horario"];
		$data[1] = $_POST["nombre"];
		$data[2] = $_POST["tabla"];
		$data[3] = $_POST["telefono"];
		$data[4] = $_POST["tipo"];	
		
		if($metodo == "actualizar")
			$data[5] = $_POST["idMuseo"];
	}
	else if($metodo == "listar")
	{
		$data[0] = $_POST["tabla"];
	}
	else if($metodo == "ver" || $metodo == "eliminar" || $metodo == "modificar")
	{
		$data[0] = $_POST["tabla"];
		$data[1] = $_POST["id"];
	}
	
	return $metodo($data);
}

/**
 * funcion para realizar el almacenamiento de los campos del museo
 * @param array $data
 * @param $data[0] = $_POST["horario"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_POST["tabla"]
 * @param $data[3] = $_POST["telefono"]
 * @param $data[4] = $_POST["tipo"]
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;
	
	$campos = "nombre, tipo, horarios, telefono";
	$valores = "'$data[1]', '$data[4]', '$data[0]', '$data[3]'";
	
	$query = "insert into $data[2]($campos)values($valores)";
	$result = mysqli_query($link, $query);
	
	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");
	
	mysqli_close($link);
	
	return $retorno;
}

/**
 * funcion para listar todos los museos
 * @param $data[0] = tabla 
 */
function listar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();
	$rows = 0;
	
	$query = "select * from $data[0]";
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows($result);
	
	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result))
		{
			$retorno[] = ["idMuseo" => $row["id_museo"],
						"nombre" => utf8_encode($row["nombre"]),
						];
		}
	}
	else 
		$retorno = ["estado" => "sin datos"];
	
	mysqli_close($link);
	
	return $retorno;
	
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
	
	$query = "select * from $data[0] where id_museo like '$data[1]'";
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows($result);
	
	$result = mysqli_fetch_assoc($result);
	
	if ($rows > 0)
	{		
			$dias = explode(" ", $result["horarios"]);
			
			$diaInicio = $dias[0];
			$diaFin = $dias[2];
			
			$horas = explode("-", $dias[3]);
			
			$horaInicio = $horas[0];
			$horaFin = $horas[1];
			
			$retorno = ["idMuseo" => $result["id_museo"],
						"nombre" => utf8_encode($result["nombre"]),
						"tipo" => $result["tipo"],
						"diaInicio" => $diaInicio,
						"diaFin" => $diaFin,
						"horaInicio" => $horaInicio,
						"horaFin" => $horaFin,
						"telefono" => $result["telefono"]
						];
	}
	else 
		$retorno = ["estado" => "sin datos"];
	
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
	
	$query = "select * from $data[0] where id_museo like '$data[1]'";
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows($result);
	
	$result = mysqli_fetch_assoc($result);
	
	if($rows == 1)
		$retorno = 
		[
				"id" => $result["id_museo"],
				"nombre" => utf8_encode($result["nombre"]),
				"tipo" => $result["tipo"],
				"horario" => $result["horarios"],
				"telefono" => $result["telefono"]
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
	
	$query = "delete from $data[0] where id_museo like '$data[1]'";
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
 * funcion para realizar la actualizacion de los campos del museo
 * @param array $data
 * @param $data[0] = $_POST["horario"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_POST["tabla"]
 * @param $data[3] = $_POST["telefono"]
 * @param $data[4] = $_POST["tipo"]
 * @param $data[5] = $_POST["idMuseo"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;
	
	$query = "update $data[2] set nombre = '$data[1]', tipo = '$data[4]', horarios = '$data[0]', telefono = '$data[3]' where id_museo like '$data[5]'";
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