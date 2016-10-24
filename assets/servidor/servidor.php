<?php
if(isset($_POST["funcion"]) && isset($_POST["usuario"]))
{
	//variales para la declaracion del las peticionesJSON
	$file = $_POST["funcion"];
	$user = $_POST["usuario"];
	$metodo = "postDatos";
	$respuesta = "";
	
	$ruta = $user."/".$file.".php";
	
	require_once  $ruta;
	
	$respuesta = $metodo();
	
	header('Content-type: application/json');
	echo json_encode($respuesta);
}
else 
	echo "SIN PARAMETROS";
?>