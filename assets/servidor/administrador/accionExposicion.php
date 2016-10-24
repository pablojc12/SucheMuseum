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
		$data[0] = $_POST["tabla"];
		$data[1] = $_POST["nombre"];
		$data[2] = $_POST["tipo"];
		$data[3] = $_POST["fechaInicio"];
		$data[4] = $_POST["fechaFin"];
		$data[5] = $_POST["horario"];
		$data[6] = $_POST["idMuseo"];
		
		if($metodo == "actualizar")
			$data[7] = $_POST["idExpo"];
	}
	else if($metodo == "listar")
	{
		$data[0] = $_POST["tabla"];
		$data[1] = $_POST["idMuseoPertenecia"];
	}
	else if($metodo == "ver" || $metodo == "eliminar" || $metodo == "modificar")
	{
		$data[0] = $_POST["tabla"];
		$data[1] = $_POST["id"];
	}
	return $metodo($data);
}

/**
 * funcion para realizar el almacenamiento de los campos del Exposicion
 * @param array $data
 * @param $data[0] = $_POST["tabla"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_POST["tipo"]
 * @param $data[3] = $_POST["fechaInicio"]
 * @param $data[4] = $_POST["fechaFin"]
 * @param $data[5] = $_POST["horario"]
 * @param $data[6] = $_POST["idMuseo"]
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;

	$campos = "nombre, tipo, fecha_inicio, fecha_termino, horario, Museos_id_museo";
	$valores = "'$data[1]', '$data[2]', '$data[3]', '$data[4]', '$data[5]', '$data[6]'";

	$query = "insert into $data[0]($campos)values($valores)";
	$result = mysqli_query($link, $query);

	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");

	mysqli_close($link);

	return $retorno;
}

/**
 * funcion para listar los datos de Exposiciones segun el id del museo
 * @param array $data
 * @param $data[0] = $_POST["tabla"]
 * @param $data[1] = $_POST["idMuseoPertenecia"]
 */
function listar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();
	$where = "";

	if($data[1] != "todos")
		$where = "where Museos_id_museo like '$data[1]'";

	$query = "select * from $data[0] $where";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result))
		{
			$retorno[] = ["idExposicion" => $row["id_exposicion"],
					"nombre" => utf8_encode($row["nombre"]),
					"tipo" => utf8_encode($row["tipo"])
			];
		}
	}
	else
		$retorno = ["estado" => "sin datos"];

	mysqli_close($link);

	return $retorno;
}

/**
 * funcion para extraer todos los datos dependiendo del id de consulta
 * @param array $data
 * @param $data[0] = tabla
 * @param $data[1] = id
 */
function ver($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();

	$query = "select * from $data[0] where id_exposicion like '$data[1]'";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	$result = mysqli_fetch_assoc($result);

	if($rows == 1)
		$retorno =
		[
				"id" => $result["id_exposicion"],
				"nombre" => utf8_encode($result["nombre"]),
				"tipo" => utf8_encode($result["tipo"]),
				"fechaInicial" => $result["fecha_inicio"],
				"fechaFinal" => $result["fecha_termino"],
				"horario" => $result["horario"],
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

	$query = "delete from $data[0] where id_exposicion like '$data[1]'";
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

	$query = "select * from $data[0] where id_exposicion like '$data[1]'";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	$result = mysqli_fetch_assoc($result);

	if ($rows > 0)
	{
		$dias = explode(" ", $result["horario"]);
			
		$diaInicio = $dias[0];
		$diaFin = $dias[2];
			
		$horas = explode("-", $dias[3]);
			
		$horaInicio = $horas[0];
		$horaFin = $horas[1];
		
		$retorno = [
				"id" => $result["id_exposicion"],
				"nombre" => utf8_encode($result["nombre"]),
				"tipo" => utf8_encode($result["tipo"]),
				"fechaInicial" => $result["fecha_inicio"],
				"fechaFinal" => $result["fecha_termino"],
				"diaInicio" => $diaInicio,
				"diaFin" => $diaFin,
				"horaInicio" => $horaInicio,
				"horaFin" => $horaFin,
				"idMuseoPerteneciente" => $result["Museos_id_museo"]
		];
	}
	else
		$retorno = ["estado" => "sin datos"];

	mysqli_close($link);

	return $retorno;

}

/**
 * funcion para realizar la actualizacion de los campos de la exposicion
 * @param array $data
 * @param $data[0] = $_POST["tabla"]
 * @param $data[1] = $_POST["nombre"]
 * @param $data[2] = $_POST["tipo"]
 * @param $data[3] = $_POST["fechaInicio"]
 * @param $data[4] = $_POST["fechaFin"]
 * @param $data[5] = $_POST["horario"]
 * @param $data[6] = $_POST["idMuseo"]
 * @param $data[7] = $_POST["idExpo"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;

	$query = "update $data[0] set nombre = '$data[1]', tipo = '$data[2]', fecha_inicio = '$data[3]', fecha_termino = '$data[4]', horario = '$data[5]', Museos_id_museo = '$data[6]' where id_exposicion like '$data[7]'";
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