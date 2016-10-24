<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	if(isset($_SESSION["tokenSession"]) && isset($_SESSION["tokenPermisos"]))
	{
		return $data = array("sesion" => "iniciada", "permisos" => $_SESSION["tokenPermisos"]); 
	}
	elseif(!isset($_SESSION["tokenSession"]) && isset($_SESSION["tokenPermisos"]))
		return $data = array("sesion" => "iniciada", "permisos" => $_SESSION["tokenPermisos"]);
	
	return $data = array("sesion" => "no iniciada");
}