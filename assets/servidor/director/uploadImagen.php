<?php
require_once '../dbConection.php';
	// Tiempo de espera del script
	// Este lo usamos para emular mas o menos el comportamiento en un servidor web no local
	// Ya que muchas veces al ejecutarlo de fomra local no se aprecia bien el funcionamiento.
	//sleep(3);
	// ini_set("display_errors", 1);
	// Definimos variables generales
	define("maxUpload", 1000500);
	define("maxWidth", 1000);
	define("maxHeight", 1000);
	define("uploadURL", '../../../images/salas/');
	define("fileName", 'foto_');
	// Tipos MIME
	$fileType = array('image/jpeg','image/pjpeg','image/png');
	// Bandera para procesar imagen
	$pasaImgSize = false;
	//bandera de error al procesar la imagen
	$respuestaFile = false;
	// nombre por default de la imagen a subir
	$fileName = '';
	// error del lado del servidor
	$mensajeFile = 'ERROR EN EL SCRIPT';
	// Obtenemos los datos del archivo
	$tamanio = $_FILES['userfile']['size'];
	$tipo = $_FILES['userfile']['type'];
	$archivo = $_FILES['userfile']['name'];
	// Tama�o de la imagen
	$imageSize = getimagesize($_FILES['userfile']['tmp_name']);
	
	// Verificamos la extensi�n del archivo independiente del tipo mime
	$extension = explode('.',$_FILES['userfile']['name']);
	$num = count($extension)-1;
	// Creamos el nombre del archivo dependiendo la opci�n
	$imgFile = fileName.time().'.'.$extension[$num];
	// Verificamos el tama�o v�lido para los logotipos
	if($imageSize[0] <= maxWidth && $imageSize[1] <= maxHeight)
		$pasaImgSize = true;
	// Verificamos el status de las dimensiones de la imagen a publicar
	if($pasaImgSize == true)
	{
		// Verificamos Tama�o y extensiones
		if(in_array($tipo, $fileType) && $tamanio>0 && $tamanio<=maxUpload && ($extension[$num]=='jpg' || $extension[$num]=='png'))
		{
			// Intentamos copiar el archivo
			if(is_uploaded_file($_FILES['userfile']['tmp_name']))
			{
				if(move_uploaded_file($_FILES['userfile']['tmp_name'], uploadURL.$imgFile))
				{
					$respuestaFile = 'done';
					$fileName = $imgFile;
					$mensajeFile = $imgFile;
				}
				else
					// error del lado del servidor
					$mensajeFile = 'No se pudo subir el archivo';
			}
			else
				// error del lado del servidor
				$mensajeFile = 'No se pudo subir el archivo';
		}
		else
			// Error en el tama�o y tipo de imagen
			$mensajeFile = 'Verifique el tama�o y tipo de imagen';
	}
	else
		// Error en las dimensiones de la imagen
		$mensajeFile = 'Verifique las dimensiones de la Imagen';
	
	$salidaJson = array("respuesta" => $respuestaFile,
			"mensaje" => utf8_encode($mensajeFile),
			"fileName" => $fileName);
	
	echo json_encode($salidaJson);

?>