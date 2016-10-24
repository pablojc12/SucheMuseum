<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	if(isset($_POST["idConsult"]))
	{
		$tabla = $_POST["tabla"];
		$idConsult = $_POST["idConsult"];
		
		if($_POST["accion"] == "ver" || $_POST["accion"] == "modificar") 
			$data = sqlExtraer($idConsult, $tabla);
		if($_POST["accion"] == "eliminar")
			$data = sqlEliminar($idConsult, $tabla);
			
		return $data;
	}
	else 
	{
		$rol = "";
		$tabla = $_POST["tabla"];
		
		if(isset($_POST["rol"]))
			$rol = $_POST["rol"];
		
		$data = sqlListar($rol, $tabla);
		
		return $data;
	}
}


function sqlListar($rol, $tabla)
{
	//variable de conexion al db
	$link = conection();
	$id = "";
	$where = "";
	
	//armado del query correspondiente segun la tabla
	if($tabla == "clientes")
		$id = "id_cliente";
	elseif($tabla == "empleados")
	{
		$id = "id_empleado";
		$where = "where Roles_id_rol like '$rol'"; 
	}
	$query = "select $id, nombre, ap_paterno, correo_electronico from $tabla " . $where;
	$result = mysqli_query($link, $query);
	
	$rows = mysqli_num_rows($result);
	
	$val = null;
	
	if ($rows > 0)
	{
		while ( $row = mysqli_fetch_assoc($result)){
			$val[] = ["id" => $row[$id], 
					  "nombre"=>$row["nombre"], 
					  "paterno"=>$row["ap_paterno"], 
					  "correo"=>$row["correo_electronico"]];
		}
	}
	else 
		$val = array("estado" => "sin datos");
	
	mysqli_close($link);
	
	return $val;
}


function sqlExtraer($idConsult, $tabla)
{
	//variable de conexion al db
	$link = conection();
	
	//armado del query correspondiente segun la tabla
	if($tabla == "clientes")
		$id = "id_cliente";
	elseif($tabla == "empleados")
		$id = "id_empleado";
	
	$query = "select * from $tabla where $id like '$idConsult'";
	$result = mysqli_query($link, $query);
	
	$val = mysqli_fetch_assoc($result);
	
	mysqli_close($link);
	
	return $val;
}

function sqlEliminar($idConsult, $tabla)
{
	//variable de conexion al db
	$link = conection();
	$estado = null;
	
	//armado del query correspondiente segun la tabla
	if($tabla == "clientes")
		$id = "id_cliente";
	elseif($tabla == "empleados")
		$id = "id_empleado";
	
	$query = "delete from $tabla where $id like '$idConsult'";
	$result = mysqli_query($link, $query);
	
	$resultSet = mysqli_affected_rows($link);
	
	mysqli_close($link);
	
	if($resultSet > 0)
		$estado = array("estado" => "borrado");
	
	return $estado;
}
