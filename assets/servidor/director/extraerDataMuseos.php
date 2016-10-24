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
	$link = conection();
	$retorno = null;
	
	$query = "select * from museos where id_museo like '$data'";
	$result = mysqli_query($link, $query);
	
	$result = mysqli_fetch_assoc($result);
	
	if($result == null)
		$retorno = array("nombre" => "sin datos");
	else 
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
	
	mysqli_close($link);
	
	return $retorno;
}
?>