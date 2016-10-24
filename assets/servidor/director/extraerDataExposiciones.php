<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$idMuseo = $_SESSION["tokenMuseo"];

	return sql($idMuseo);
}

function sql($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();

	$query = "select * from exposiciones where Museos_id_museo like '$data'";
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