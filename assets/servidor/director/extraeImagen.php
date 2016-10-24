<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$_SESSION["tokenIdSala"] = "";
	
	$id = $_POST["id"];
	$_SESSION["tokenIdSala"] = $id;
	
	return sql($id);
}


function sql($id)
{
	//variable de conexion al db
	$link = conection();
	$retorno = array();
	$rows = 0;
	$result = "";
	
	$query = "select * from imagenes where Salas_id_sala like '$id'";
	$result = mysqli_query($link, $query);
	
	$rows = @mysqli_num_rows($result);
	
	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result))
		{
			$retorno[] = ["imagen" => utf8_encode($row["imagen"])];
		}
	}else
		$retorno = ["estado" => "sin datos"];
	
	mysqli_close($link);
	
	return $retorno;
}
?>