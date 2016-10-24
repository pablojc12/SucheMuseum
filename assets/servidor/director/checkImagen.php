<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	$data = array();
	
	$imagenVieja = $_POST["imagenVieja"];
	$imagenNueva = $_POST["imagenNueva"];
	$idSala = $_SESSION["tokenIdSala"];

	$data[0] = $imagenVieja;
	$data[1] = $imagenNueva;
	$data[2] = $idSala;

	if($imagenVieja == "sin nombre")
		return agregarFoto($data);
	elseif($imagenVieja != "sin nombre")
		return actualizarFoto($data);
}

function actualizarFoto($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;
	$rows = 0;
	$result = "";
	
	$direccion = "../../images/salas";
	$retorno = null;
	
	if(file_exists($direccion . "/" . $data[0]))
	{
		unlink($direccion . "/" . $data[0]);
	
		$query = "update imagenes set imagen = '$data[1]' where Salas_id_sala like '$data[2]' and imagen like '$data[0]'";
		$result = mysqli_query($link, $query);
	
		$rows = mysqli_affected_rows($link);
	
		mysqli_close($link);
	
		if($rows > 0)
			$retorno = ["estado" => "foto actualizada"];
	
		return $retorno;
	}
	else
	{
		$retorno = array("estado" => "no actualizado");
		return $retorno;
	}
}

function agregarFoto($data)
{
	//variable de conexion al db
	$link = conection();
	$retorno = null;
	
	$query = "insert into imagenes(imagen, Salas_id_sala)values('$data[1]', '$data[2]')";
	$result = mysqli_query($link, $query);
	
	if(mysqli_affected_rows($link) > 0)
		$retorno = array("estado" => "almacenado");
	
	mysqli_close($link);
	
	return  $retorno;
}




?>