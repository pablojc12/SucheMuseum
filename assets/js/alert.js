function alerta(message, abrir){
      //un alert
      alertify.alert(message, function () {
            //aqui introducimos lo que haremos tras cerrar la alerta.
            //por ejemplo -->  location.href = 'http://www.google.es/';  <-- Redireccionamos a GOOGLE.
    	  
    	  if(abrir === ""){}
    	  else
    		  location.href = abrir;
      });
}
                   
function confirmar(/*mensaje*/mensaje){
      //un confirm
      alertify.confirm(mensaje, function (e) {
            if (e) {
            	/*
            	 *codigo ejecutado cuado se pulsa en el boton de aceptar 
            	 */
            } else { 
            	/*
            	 *codigo ejecutado cuado se pulsa en el boton de cancelar
            	 */
            }
      }); 
      return false
}
                   
function datos(/*mensaje*/mensaje){
      //un prompt
      alertify.prompt(mensaje, function (/*valor de la pusacion*/e, /*datos escritos*/str) { 
            if (e){
            	/*
            	 *codigo ejecutado cuado se pulsa en el boton de aceptar 
            	 */
                  return str;
            }else{
            	/*
            	 *codigo ejecutado cuado se pulsa en el boton de cancelar
            	 */
            }
      });
      return false;
}
                   
function notificacion(/*se pueden incluir enlaces*/mensaje){
        //una notificación normal
      alertify.log(/*se pueden incluir enlaces*/mensaje); 
      return false;
}
                   
function ok(/*se pueden incluir enlaces*/mensaje){
        //una notificación correcta
      alertify.success(/*se pueden incluir enlaces*/mensaje); 
      return false;
}
                   
function er(/*se pueden incluir enlaces*/mensaje){
        //una notificación de error
      alertify.error(/*se pueden incluir enlaces*/mensaje); 
      return false; 
}