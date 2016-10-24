<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	//variable funcion
	$metodo = "";

	//arreglo para enviar los datos
	$data = array();

	$metodo = $_POST["accion"];

	if($metodo == "registrar" || $metodo == "actualizar")
	{
		$data[0] = $_POST["idMuseo"];
		$data[1] = $_POST["comentario"];
		$data[2] = $_POST["duracion"];
		$data[3] = $_POST["fecha"];
		$data[4] = $_POST["hora"];
		$data[5] = $_POST["personas"];
		$data[6] = $_POST["idCliente"];

		if($metodo == "actualizar")
			$data[7] = $_POST["idVisita"];
	}
	else if($metodo == "listar")
	{
		$data[0] = $_POST["idUsuario"];
	}
	else if($metodo == "ver" || $metodo == "eliminar" || $metodo == "modificar")
	{
		if($metodo == "modificar")
			$metodo = "ver";
		
		$data[0] = $_POST["id"];
	}
	return $metodo($data);
}

/**
 * funcion para realizar la actualizacion de los campos de la exposicion
 * @param array $data
 * @param $data[0] = $_POST["idMuseo"]
 * @param $data[1] = $_POST["comentario"]
 * @param $data[2] = $_POST["duracion"]
 * @param $data[3] = $_POST["fecha"]
 * @param $data[4] = $_POST["hora"]
 * @param $data[5] = $_POST["personas"]
 * @param $data[6] = $_POST["idCliente"]
 * @param $data[7] = $_POST["idVisita"]
 */
function actualizar($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;

	$query = "update visitas set fecha = '$data[3]', horario = '$data[4]', personas = '$data[5]', comentario = '$data[1]', 
				Museos_id_museo = '$data[0]' where Clientes_id_cliente like '$data[6]' and id_visita like '$data[7]'";
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
 * funcion para realizar el almacenamiento de los campos del museo
 * @param array $data
 * @param $data[0] = $_POST["idMuseo"]
 * @param $data[1] = $_POST["comentario"]
 * @param $data[2] = $_POST["duracion"]
 * @param $data[3] = $_POST["fecha"]
 * @param $data[4] = $_POST["hora"]
 * @param $data[5] = $_POST["personas"]
 * @param $data[6] = $_POST["idCliente"]
 */
function registrar($data)
{
	$link = conection();
	$retorno = null;

	$campos = "fecha, horario, personas, duracion, comentario, Museos_id_museo, Clientes_id_cliente";
	$valores = "'$data[3]', '$data[4]', '$data[5]', '$data[2]', '$data[1]', '$data[0]', '$data[6]'";

	$query = "insert into visitas($campos)values($valores)";
	$result = mysqli_query($link, $query);

	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");
	else
		$retorno = array("estado" => "no almacenado");
	
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
	$result = null;
	$rows = 0;
	
	$query = "select * from visitas where Clientes_id_cliente like '$data[0]'";
	$result = mysqli_query($link, $query);

	$rows = @mysqli_num_rows($result);

	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result))
		{
			$retorno[] = ["idVisita" => $row["id_visita"],
					"fecha" => $row["fecha"],
					"horario" => $row["horario"]
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
 * @param $data[0] = id
 */
function ver($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();

	$query = "select * from visitas where id_visita like '$data[0]'";
	$result = mysqli_query($link, $query);

	$rows = mysqli_num_rows($result);

	$result = mysqli_fetch_assoc($result);

	if($rows == 1)
		$retorno =
		[
				"id" => $result["id_visita"],
				"fecha" => $result["fecha"],
				"horario" =>$result["horario"],
				"personas" => $result["personas"],
				"duracion" => $result["duracion"],
				"comentario" => $result["comentario"],
				"idMuseo" => $result["Museos_id_museo"]
		];
		else
			$retorno = ["estado" => "sin datos"];

		return $retorno;
}

/**
 * funcion para hacer el eliminado del registro dependiendo el id
 * @param array $data
 * @param $data[0] = $_POST["id"];
 */
function eliminar($data)
{
	//variable de conexion al db
	$link = conection();
	$estado = null;

	$query = "delete from visitas where id_visita like '$data[0]'";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	if($resultSet > 0)
		$estado = array("estado" => "eliminado");
	else
		$estado = array("estado" => "no eliminado");

	return $estado;
}
