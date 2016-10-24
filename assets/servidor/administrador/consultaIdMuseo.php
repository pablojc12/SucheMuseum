<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$id = sql(); 
	
	return $id;
}

function sql()
{
	//variable de conexion al db
	$link = conection();
	
	$query = "select id_museo, nombre from museos;";
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows ($result);
	
	$val = array();
	
	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result)){
			$val[] = ["id" => $row["id_museo"],"nombre"=>utf8_encode($row["nombre"])];
			//echo $row["nombre"];
		}
	}
	else 
		$val = ["estado" => "sin datos"];
	
	mysqli_close($link);
	
	return $val;
}
?>