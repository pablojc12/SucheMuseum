//evento 1 para subir las imagen 1de la sala

$(function() {
	// Botón para subir la imagen
	$("#imagenUpload").hide();
	$("#loader1").hide();
	
	var imagen1 = $('#img1'), interval;
	
		new AjaxUpload('#img1', {
			action: "../assets/servidor/director/uploadImagen.php",
			onSubmit : function(file , ext){
				if (! (ext && /^(jpg|png)$/.test(ext))){
					// extensiones permitidas
					alerta('<p class="black">Solo se permiten Imagenes .jpg o .png</p>', "");
					// cancela upload
					return false;
				} else {
					$('#loader1').show();
					this.disable();
				}
			},
			onComplete: function(file, response){
				// alert(response);
				
				var respuesta = $.parseJSON(response);
				
				nombreAnterior = $("#img3").attr("name");
				
				//console.log(respuesta);
				if(respuesta.respuesta == 'done')
				{
					imagenComplete(nombreAnterior, respuesta.fileName);
					
					$('#img1').removeAttr('src');
					$('#img1').removeAttr('name');
					$('#img1').attr('src','../images/salas/' + respuesta.fileName);
					$('#img1').attr('name', respuesta.fileName);
					$('#loader1').hide();
					// alert(respuesta.mensaje);
				}
				else{
					alerta('<p class="black">' + respuesta.mensaje + '</p>', "");
				}
				$('#loader1').hide();	
				this.enable();	
			}
	});
});

$(function() {
	// Botón para subir la imagen
	$("#imagenUpload").hide();
	$("#loader2").hide();
	
	var imagen1 = $('#img2'), interval;
	
		new AjaxUpload('#img2', {
			action: "../assets/servidor/director/uploadImagen.php",
			onSubmit : function(file , ext){
				console.log(file)
				if (! (ext && /^(jpg|png)$/.test(ext))){
					// extensiones permitidas
					alerta('<p class="black">Solo se permiten Imagenes .jpg o .png</p>', "");
					// cancela upload
					return false;
				} else {
					$('#loader2').show();
					this.disable();
				}
			},
			onComplete: function(file, response){
				// alert(response);
				
				var respuesta = $.parseJSON(response);
				
				nombreAnterior = $("#img3").attr("name");
				
				
				if(respuesta.respuesta == 'done')
				{
					imagenComplete(nombreAnterior, respuesta.fileName);
					
					$('#img2').removeAttr('src');
					$('#img2').removeAttr('name');
					$('#img2').attr('src','../images/salas/' + respuesta.fileName);
					$('#img2').attr('name', respuesta.fileName);
					$('#loader2').hide();
					// alert(respuesta.mensaje);
				}
				else{
					alerta('<p class="black">' + respuesta.mensaje + '</p>', "");
				}
				$('#loader2').hide();	
				this.enable();	
			}
	});
});

$(function() {
	// Botón para subir la imagen
	$("#imagenUpload").hide();
	$("#loader3").hide();
	
	var imagen1 = $('#img3'), interval;
	
		new AjaxUpload('#img3', {
			action: "../assets/servidor/director/uploadImagen.php",
			onSubmit : function(file , ext){
				//console.log(file)
				if (! (ext && /^(jpg|png)$/.test(ext))){
					// extensiones permitidas
					alerta('<p class="black">Solo se permiten Imagenes .jpg o .png</p>', "");
					// cancela upload
					return false;
				} else {
					$('#loader3').show();
					this.disable();
				}
			},
			onComplete: function(file, response){
				// alert(response);
				
				var respuesta = $.parseJSON(response);
				var nombreAnterior = "";
				
				nombreAnterior = $("#img3").attr("name");
				
				
				//console.log(respuesta);
				if(respuesta.respuesta == 'done')
				{
					imagenComplete(nombreAnterior, respuesta.fileName);
					
					$('#img3').removeAttr('src');
					$('#img3').removeAttr('name');
					$('#img3').attr('src','../images/salas/' + respuesta.fileName);
					$('#img3').attr('name', respuesta.fileName);
					$('#loader3').hide();
					// alert(respuesta.mensaje);
				}
				else{
					alerta('<p class="black">' + respuesta.mensaje + '</p>', "");
				}
				$('#loader3').hide();	
				this.enable();	
			}
	});
});


function imagenComplete(imagenVieja, imagenNueva)
{
	var objetoJSON = {
			"usuario": "director",
			"funcion": "checkImagen",
			"imagenVieja": imagenVieja,
			"imagenNueva": imagenNueva,
	}
	
	//console.log(objetoJSON);
	
	$.ajax({
		url: servidor,
		type: "post",
		dataType: "json",
		data: objetoJSON,
		success: 
			function(data){
				//console.log(data);
				if(data == "")
					er("Error con base de datos");
				else if(data == null)
					er("Sin respuesta del servidor");
				else if(data.estado == "sin datos")
					notificacion("puede agregar imagenes a su sala");
				else{
					console.log(data);
				}
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	});
}