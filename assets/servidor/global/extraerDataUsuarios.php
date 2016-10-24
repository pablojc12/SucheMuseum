<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	if(isset($_SESSION["tokenSession"]))
	{
		$sesion = $_SESSION["tokenSession"];
		$permiso = $_SESSION["tokenPermisos"];
		$tabla = null;
		$data = array();
		
		if($permiso == "comun")
			$tabla = "clientes";
		elseif($permiso == "Adm" || $permiso == "Dir" || $permiso == "Gui")
		$tabla = "empleados";
		
		$data[0] = $tabla;
		$data[1] = $sesion;
		$data[2] = $permiso;
		
		return sql($data);
	}
}

/**
 * 
 * @param array $data
 * @param $data[0] = $tabla
 * @param $data[1] = $sesion
 * @param $data[2] = $permiso
 */
function sql($data)
{
	$link = conection();
	$retorno = null;
	
	$query = "select * from $data[0] where sesion like '$data[1]'";
	$result = mysqli_query($link, $query);
	
	$retorno = mysqli_fetch_assoc($result);
	
	mysqli_close($link);
	
	return $retorno;
}

?>











