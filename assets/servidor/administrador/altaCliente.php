<?php
//llamada de la conexion desde el archivo servidor.php
require_once 'dbConection.php';

function postDatos()
{
	//arreglo para mandar los datos a la funcion
	$dataComposed = array(); 
	
	//areglo para almacenar el estado del almacenamiento
	$estado = null;
	
	//datos de tabla para hacer el almacenamiento adecuado
	$tabla = $_POST["tabla"];
	
	if($tabla == "clientes")
	{
		//traemos los datos con post
		$nombre = $_POST["nombre"];
		$paterno = $_POST["paterno"];
		$materno = $_POST["materno"];
		$fechaNacimiento = $_POST["fechaNacimiento"];
		$correo = $_POST["correo"];
		
		//datos extras de las tablas
		$contrasena = generatePass();
		$sesion = sha1(md5($correo));
		
		//captura de los datos que recogimos con post
		$dataComposed[0] = $tabla;
		$dataComposed[1] = $nombre;
		$dataComposed[2] = $paterno;
		$dataComposed[3] = $materno;
		$dataComposed[4] = $fechaNacimiento;
		$dataComposed[5] = $correo;
		$dataComposed[6] = $contrasena;
		$dataComposed[7] = $sesion;
		
		if(isset($_POST["boton"]))
		{	//metodo de almacenamiento en db, este retorna un valor 1 si la consulta es correcta
			if(sqlActualizar($dataComposed) > 0)
				$estado = array("estado" => "actualizado");
		}
		else
		{
			if(sql($dataComposed) > 0)
				$estado = array("estado" => "almacenado");
		}
			return $estado;
	}
	else 
	{
		//traemos los datos con post
		$nombre = $_POST["nombre"];
		$paterno = $_POST["paterno"];
		$materno = $_POST["materno"];
		$correo = $_POST["correo"];
		$curp = $_POST["curp"];
		$idEmpleado = $_POST["idEmpleado"];
		$idMuseo = $_POST["idMuseo"];
		$idRol = $_POST["idRol"];
		
		//datos extras de las tablas
		$contrasena = generatePass();
		$sesion = sha1(md5($correo));
		
		//captura de los datos que recogimos con post
		$dataComposed[0] = $tabla;
		$dataComposed[1] = $nombre;
		$dataComposed[2] = $paterno;
		$dataComposed[3] = $materno;
		$dataComposed[4] = $curp;
		$dataComposed[5] = $correo;
		$dataComposed[6] = $contrasena;
		$dataComposed[7] = $sesion;
		$dataComposed[8] = $idMuseo;
		$dataComposed[9] = $idRol;
		$dataComposed[10] = $idEmpleado;
		
		if(isset($_POST["boton"]))
		{	//metodo de almacenamiento en db, este retorna un valor 1 si la consulta es correcta
			if(sqlActualizar($dataComposed) > 0)
				$estado = array("estado" => "actualizado");
		}
		else
		{
			if(sql($dataComposed) > 0)
				$estado = array("estado" => "almacenado");
		}
			return $estado;
	}
	
	
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// funcion para agregar los datos del usuario y empleados
function sql($data)
{
	$link = conection();

	$campos = "";
	$valores = "";

	if($data[0] == "clientes")
	{
		/*valores cuando es enviado por el caso clientes
		 $addReg[0] = $tabla
		 $addReg[1] = nombre
		 $addReg[2] = paterno
		 $addReg[3] = materno
		 $addReg[4] = fecha nacimiento
		 $addReg[5] = correo
		 $addReg[6] = contraseña
		 $addReg[7] = sesion
		 */
		$campos = "nombre,ap_paterno,ap_materno,fecha_nacimiento,correo_electronico,contrasena,sesion";
		$valores = "'$data[1]','$data[2]','$data[3]','$data[4]','$data[5]','$data[6]','$data[7]'";
	}
	else
	{
		/*valores cuando es enviado por el caso empleados (director, guia de museo, administrador)
		 $addReg[0] = $tabla
		 $addReg[1] = nombre
		 $addReg[2] = paterno
		 $addReg[3] = materno
		 $addReg[4] = curp
		 $addReg[5] = correo
		 $addReg[6] = contraseña
		 $addReg[7] = sesion
		 $addReg[8] = id museo
		 $addReg[9] = id Rol
		 $addReg[10] = id Empleado
		 */
		$campos = "nombre,ap_paterno,ap_materno,curp,correo_electronico,contrasena,sesion,Museos_id_museo,Roles_id_rol,id_empleado";
		$valores = "'$data[1]','$data[2]','$data[3]','$data[4]','$data[5]','$data[6]','$data[7]','$data[8]', '$data[9]', '$data[10]'";
	}
		

	$query = "insert into $data[0]($campos)
	values($valores)";
	$result = mysqli_query($link, $query);

	$resultSet = mysqli_affected_rows($link);

	mysqli_close($link);

	return $resultSet;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//funcion para actualizar los datos
function sqlActualizar($data)
{
	$link = conection();
	
	$campos = "";
	
	if($data[0] == "clientes")
	{
		/*valores cuando es enviado por el caso clientes
		 $addReg[0] = $tabla
		 $addReg[1] = nombre
		 $addReg[2] = paterno
		 $addReg[3] = materno
		 $addReg[4] = fecha nacimiento
		 $addReg[5] = correo
		 $addReg[6] = contraseña
		 $addReg[7] = sesion
		 */
		$campos = " nombre = '$data[1]', 
					ap_paterno = '$data[2]', 
					ap_materno = '$data[3]', 
					fecha_nacimiento = '$data[4]', 
					correo_electronico = '$data[5]', 
					contrasena = '$data[6]', 
					sesion = '$data[7]'";
	}
	else
	{
		/*valores cuando es enviado por el caso empleados (director, guia de museo, administrador)
		 $addReg[0] = $tabla
		 $addReg[1] = nombre
		 $addReg[2] = paterno
		 $addReg[3] = materno
		 $addReg[4] = curp
		 $addReg[5] = correo
		 $addReg[6] = contraseña
		 $addReg[7] = sesion
		 $addReg[8] = id museo
		 $addReg[9] = id Rol
		 $addReg[10] = id Empleado
		 */
		$campos = "nombre = '$data[1]',
					ap_paterno = '$data[2]',
					ap_materno = '$data[3]',
					curp = '$data[4]',
					contrasena = '$data[6]', 
					sesion = '$data[7]',
					Museos_id_museo = '$data[8]',
					Roles_id_rol = '$data[9]',
					id_empleado = '$data[10]'";
	}
	
	$query = "update $data[0] set $campos where correo_electronico='$data[5]'";
	$result = mysqli_query($link, $query);
	
	$resultSet = mysqli_affected_rows($link);
	
	mysqli_close($link);
	
	return $resultSet;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//funcion para generar contraseñas aleatorias de 8 caracteres
function generatePass()
{
	$str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
	$cad = "";
	for($i=0;$i<8;$i++)
		$cad .= substr($str,rand(0,62),1);

	return $cad;
}
?>