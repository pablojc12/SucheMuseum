<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	return sql();
}


function sql()
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();
	
	$query = "select * from museos";
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows($result);
	
	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result))
		{
			$retorno[] = ["idMuseo" => $row["id_museo"],
						"nombre" => utf8_encode($row["nombre"]),
						"tipo" => utf8_encode($row["tipo"]),
						"horarios" => $row["horarios"],
						"telefono" => $row["telefono"]
			];
		}
	}
	else 
		$retorno = ["estado" => "sin datos"];
	
	mysqli_close($link);
	
	return $retorno;
}