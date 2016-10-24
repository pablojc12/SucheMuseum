<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$idMuseo = $_SESSION["tokenMuseo"];

	return sql($idMuseo);
}


function sql($idMuseo)
{
	$link = conection();
	$retorno = null;
	
	$query = "select * from direcciones where Museos_id_museo like '$idMuseo'";
	$result = mysqli_query($link, $query);
	
	$result = mysqli_fetch_assoc($result);
	
	if($result == null)
		$retorno = array("estado" => "sin datos");
	else
	{
		$retorno = ["calle" => utf8_encode($result["calle"]),
				"numero" => utf8_encode($result["numero"]),
				"colonia" => utf8_encode($result["colonia"]),
				"cp" => $result["cp"],
				"delegacion" => utf8_encode($result["delegacion"]),
				"estado" => utf8_encode($result["estado"]),
				"idDireccion" => $result["id_direccion"]
		];
	}
	mysqli_close($link);
	
	return $retorno;
}