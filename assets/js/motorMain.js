"use strict";

/**
 * almacenamieto de la ruta hacia el servidor 
 * 
 * @String servidor
 */
const servidor = "../assets/servidor/servidor.php";

/**
 * constante para indicar a que carpeta se dirige el servidor (parte de la ruta)
 * @string user = "administrador"
 */
const user = "administrador";

/**
 * constantes para la categoria a seleccionar
 * ["categoria", "director", "clientes", "guia", "administrador"];
 * 
 * @array cat
 * 
 * @string cat[0] = categoria
 * @string cat[1] = director
 * @string cat[2] = clientes
 * @string cat[3] = guia
 * @string cat[5] = administrador
 */
var categoriaUsuario = ["categoria", "director", "clientes", "guia", "administrador"];


/**
 * constantes para la categoria a seleccionar
 * ["categoria", "director", "clientes", "guia", "administrador"];
 * 
 * @array cat
 * 
 * @string cat[0] = categoria
 * @string cat[1] = museos
 * @string cat[2] = salas
 * @string cat[3] = exposiciones
 */
var categoriaMuseo = ["categoria", "museos", "salas", "exposiciones", "direcciones"];

/**
 * constante para hacer la seleccion de las tablas correspondientes
 * @string cliente
 * @value "clientes"
 */
const cliente = "clientes";

/**
 * contante para hacer la seleccion de las tablas correspondientes
 * @string empleado
 * @value "empleados"
 */
const empleado = "empleados";

/**
 * variable para hacer la seleccion del formulario general dentro del html
 * @form
 */
const sectionForm = document["sectionForm"];

/**
 * funcion para comparar dos fechas, fecha inicial y fecha final
 * @param fechaFin
 * @param fechaInicio
 * @param idElement = elemento de la fecha inicial
 * @returns {Boolean}
 */
function compararFechas(fechaFin, fechaInicio, idElement)
{
	var estado = false;
	
	try
	{
		if(fechaFin !="" && fechaInicio != "")
		{
			estado = true;
			
			fechaInicio = fechaInicio.split("-");
			fechaFin = fechaFin.split("-");
			
			var diaIni = parseInt(fechaInicio[2]);
			var mesIni = parseInt(fechaInicio[1]);
			var anioIni = parseInt(fechaInicio[0]);
			
			var diaFin = parseInt(fechaFin[2]);
			var mesFin = parseInt(fechaFin[1]);
			var anioFin = parseInt(fechaFin[0]);
			
			if(anioIni == anioFin && mesIni == mesFin && diaIni == diaFin)
			{
				estado = false;
				er("las fechas no pueden ser iguales");
				if(idElement != "")
					foco(idElement);
			}
			else if(mesIni == mesFin && anioIni == anioFin)
			{
				if(diaIni > diaFin)
				{
					estado = false;
					er("El dia de la fecha inicial NO PUEDE SER MAYOR al dia de la fecha final");
					if(idElement != "")
						foco(idElement);
				}
			}
			else if(anioIni == anioFin && mesIni > mesFin)
			{
				estado = false;
				er("El mes de la fecha inicial NO PUEDE SER MAYOR al de la fecha final");
				if(idElement != "")
					foco(idElement);
			}
			else if(anioIni > anioFin)
			{
				estado = false
				er("El año de la fecha inicial NO PUEDE SER MAYOR al de la fecha final");
				if(idElement != "")
					foco(idElement);
			}
		}
		else
		{
			estado = false;
			er("INGRESA LAS FECHAS COMPLETAS");
		}
			
	}
	catch (e) 
	{
		er("error de programacion: " + e);
		console.log(e);
	}
	
	return estado;
}

/**
 * funcion para comparar dos horas, hora inicial y hora final
 * @param horaFinal
 * @param horaInicial
 * @param idElement = elemento de la fecha inicial
 * @returns {Boolean}
 */
function compararHoras(horaFinal, horaInicial, idElement)
{
	var estado = false;
	
	try
	{
		if(horaFinal != "" && horaInicial !="")
		{
			estado = true;
			
			horaInicial = horaInicial.split(":");
			horaFinal = horaFinal.split(":");
			
			var horaIni = parseInt(horaInicial[0]);
			var minutoIni = parseInt(horaInicial[1]);
			
			var horaFin = parseInt(horaFinal[0]);
			var minutoFin = parseInt(horaFinal[1]);
			
			if(horaIni == horaFin && minutoIni > minutoFin)
			{
				estado = false;
				er("El minuto de la hora Inicial NO PUEDE SER MAYOR al de la hora final ");
				if(idElement != "")
					foco(idElement);
			}
			else if(horaIni > horaFin)
			{
				estado = false;
				er("La hora inicial NO PUEDE SER MAYOR a la hora final");
				if(idElement != "")
					foco(idElement);
			}
			else if(horaIni == horaFin && minutoIni == minutoFin)
			{
				estado = false;
				er("La hora inicial NO PUEDE SER IGUAL a la hora final")
				if(idElement != "")
					foco(idElement);
			}
		}
		else 
		{
			estado = false;
			er("INGRESA LOS HORARIOS COMPLETOS");
		}
		
	}
	catch (e) 
	{
		er("error de programacion: " + e);
		console.log(e);
	}
	
	return estado;
}

/**
 * @print console.log(elemento);
 */
//console.log(categoriaUsuario);

/**
 * funcion para retornar el valor del componente (universal)
 * @param campo (elemento a axtraer el valor)
 * @returns (retorna el valor sin espacios al final e inicio)
 */
function lee(campo)
{
	return campo.value.trim();
}

/**
 * funcion para la validacion del correo electronico
 * @param email
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validaEmail(email, mensaje, idElement) {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) ){
    	if(mensaje != "")
    		er(mensaje);
    	if(idElement != "")
    		foco(idElement);
    	return false;
    }
    else
    	return true;
}
/**
 * funcion para hacer la validacion de una cadena con tildes
 * @param valor
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validaText(valor, mensaje, idElement)
{
    var reg = /^([a-z ñáéíóú]{2,})$/i;
    if(reg.test(valor)) 
    	return true;
    else {
    	if(mensaje != "")
    		er(mensaje)
    	foco(idElement);
    	return false;
    }
    	
}

/**
 * funcion para hacer la validacion de una cadena con tildes
 * @param valor
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validaTextAndNumber(valor, mensaje, idElement)
{
    var reg = /^([a-z 0-9ñáéíóú]{2,})$/i;
    if(reg.test(valor)) 
    	return true;
    else {
    	if(mensaje != "")
    		er(mensaje)
    	foco(idElement);
    	return false;
    }
    	
}

/**
 * funcion para hacer la validacion de una cadena de numeros
 * @param valor
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validaNumber(valor, mensaje, idElement)
{
    var reg = /^([0-9]{1,})$/i;
    var reg1 = /^([s/n]{3,})$/i;
    if(reg.test(valor)) 
    	return true;
    else if(reg1.test(valor))
    	return true;
    else
    {
    	if(mensaje != "")
    		er(mensaje)
    	foco(idElement);
    	return false;
    }
    	
}

/**
 * funcion para hacer la validacion de una cadena de numeros
 * @param valor
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validaNumberPuro(valor, mensaje, idElement)
{
    var reg = /^([0-9]{1,})$/i;
    if(reg.test(valor)) 
    	return true;
    else
    {
    	if(mensaje != "")
    		er(mensaje)
    	foco(idElement);
    	return false;
    }
    	
}

/**
 * funcion para validar fechas
 * @param campo
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validarFormatoFecha(campo, mensaje, idElement) {
    var RegExPattern = /^\d{2,4}\-\d{1,2}\-\d{1,2}$/;
    if ((campo.match(RegExPattern)) && (campo!='')) 
    	return true;
    else 
    {
    	if(mensaje != "")
    		er(mensaje)
    	if(idElement != "")
    		foco(idElement);
        return false;
    }
}

/**
 * funcion para validar los campos vacios
 * @param dato
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function campoVacio(dato, mensaje, idElement)
{
	if(dato == "")
	{
		if(mensaje != "")
			er(mensaje);
		if(idElement != "")
			foco(idElement);
		return false;
	}
	else
		return true;
}

/**
 * funcion para comparar contraseñas
 * 
 * @param val1 = contraseña 1
 * @param val2 = contraseña 2
 * @param idElement = elemento de la primera posicion (opcional)
 * @returns {Boolean}
 */
function compararContrasenia(val1, val2, idElement)
{
	if(val1 == val2)
	{
		if(val1.length >= 5)
			return true;
		
		if(idElement != "")
			foco(idElement);
		
		document.getElementById("txtPasword2").value = "";
		document.getElementById(idElement).value = "";
		
		notificacion("La contraseña debe contener por los menos 5 caracteres");
		
		return false
	}
	else
	{
		if(idElement != "")
			foco(idElement);
		
		document.getElementById("txtPasword2").value = "";
		document.getElementById(idElement).value = "";
		
		notificacion("Las contraseñas ingresadas son diferentes");
		return false;
	}
}

/**
 * funcion para la validacion de curp
 * 
 * @element curp.match(/^([a-z]{4})([0-9]{6})([a-z]{6})([0-9]{2})$/i))
 * @param curp
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validarCurp(curp, mensaje, idElement)
{
	if((curp.match(/^([a-z]{4})([0-9]{6})([a-z]{6})([0-9]{2})$/i)) && curp!='')
	//AAAA######AAAAAA##
		return true;
	else
	{
		if(mensaje !='')
			er(mensaje);
		if(idElement !='')
			foco(idElement);
		return false;
	}
}

/**
 * funcion para validar el telefono
 * 
 * @param telefono
 * @param mensaje
 * @param idElement
 * @returns {Boolean}
 */
function validarTelefono(telefono, mensaje, idElement){

	var expresion1=/^([0-9]+){8,10}$/;//<--- con esto vamos a validar el numero
	var expresion2=/\s/;//<--- con esto vamos a validar que no tenga espacios en blanco
	
	if(expresion2.test(telefono) || !expresion1.test(telefono))
	{
		if(mensaje != "")
			er(mensaje);
		if(idElement != "")
			foco(idElement)
	  	return false;
	}
	else		
		return true;
	  
}

/**
 * funcion para encodear cadenas de texto 
 * @param valor
 * @returns
 */
function utf8_encode(value)
{
	return unescape(encodeURIComponent(value));
}

/**
 * funcion para decodificar cadenas de texto
 * @param value
 * @returns
 */
function utf8_decode(value)
{
	return decodeURIComponent(escape(value));
}

/**
 * funcion para llenar el id de EMPLEADOS en base al curp
 * @param value
 * @param idElement
 */
function llenandoText(value, idElement)
{
	var newValue = "";
	
	if(value.length == 18)
	{
		for(var i = 0; i < 10; i++)
			newValue += value.charAt(i); 
				
		newValue += value.charAt(16);
		newValue += value.charAt(17);
	}
	
	document.getElementById(idElement).value = newValue;
}

/**
 * funcion para realizar el foco hacia el elemento correspondiente
 * @param idElement (elemeno hacia donde dirige el foco)
 */
function foco(idElement)
{
	document.getElementById(idElement).focus();
}

function validaFechamayor(dateInicio, dateFin)
{
	var date = dateInicio.split("-");
}

/**
 * funcion para extraer el id de museos desde base de datos
 * 
 * @param titulo = titulo a mostrar
 * @param tabla = tabla de para carga de componetes del form en especifico
 * @param datoExtra = rol que es en caso de usuarios la invocaion del metodo y accion en caso de salas y expociciones
 * @param lanzado = funcion de donde o hacia donde se lanza el metodo en caso de estar vacio se invocara la funcion por defecto;
 * @param datosDeCarga = objeto json si se tiene
 * 
 * @funcionPorDefecto catEmpleado(titulo, tabla, datoExtra, data)
 */
function extracMuseoID(titulo, tabla, datoExtra, lanzadoDe, datosDeCarga)
{	
	var objetoJSON = {
			"usuario": user,
			"funcion": "consultaIdMuseo"
	}
	
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
				{
					alertify.alert("<p class='black'>No existen museos</p>", function () {
			            //aqui introducimos lo que haremos tras cerrar la alerta.
			            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
						if(tabla == "salas" || tabla == "exposiciones")
						{
							for(var indice=0 ;indice<document.getElementById("museoSelect").length;indice++)
						    {
						        if (document.getElementById("museoSelect").options[indice].value == "nada")
						            document.getElementById("museoSelect").selectedIndex =indice;
						    }
							
							procesaSelectMuseo();
						}
						else
						{
							for(var indice=0 ;indice<document.getElementById("slcCategoria").length;indice++)
						    {
						        if (document.getElementById("slcCategoria").options[indice].value == "categoria")
						            document.getElementById("slcCategoria").selectedIndex =indice;
						    } 
							
							procesa();
						}
			      });
				}
				else
				{
					//console.log(lanzadoDe);
					if(lanzadoDe == "actionButtonsList")
						cargarEmpleadoForm(titulo, tabla, data, datosDeCarga);
					else if(lanzadoDe == "cargaFormSala")
						cargaFormSala(titulo, tabla, data);
					else if(lanzadoDe == "cargaFormExposicion")
						cargaFormExposicion(titulo, tabla, data);
					else if(lanzadoDe == "selectMuseo")
						selectMuseo(data, datoExtra);
					else if(lanzadoDe == "cargaFormSalas")
						cargaFormSalas(titulo, tabla, data, datosDeCarga);
					else if(lanzadoDe == "cargarFormExposicion")
						cargaFormExposicion(titulo, tabla, data, datosDeCarga);
					else
						catEmpleado(titulo, tabla, /*rol->*/datoExtra, data);
				}
			},
		error: function(data){
			er("Respuesta del servidor invalida");
			console.log(data)
		}
	})
	
}

function sleep(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
	    if ((new Date().getTime() - start) > milliseconds){
	      break;
	    }
	  }
}