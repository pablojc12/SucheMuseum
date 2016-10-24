function cargaFormAltaDireccion()
{
	var html = "";
	
	//Etiqueta de calle
	html += "<!-- calle del museo-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtCalle' id='txtCalle' onblur='validaText(this.value, "+'"ERROR de CALLE:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Calle'";
	html += "		autocomplete='off' maxlength='50' val=''/>";
	html += "</div>";
	
	//Etiqueta de colonia
	html += "<!-- colonia del museo-->";
	html += "<div class='12u$'>";
	html += "	<input type='text' name='txtColonia' id='txtCcolonia' onblur='validaText(this.value, "+'"ERROR de COLONIA:2 o mas letras y sin simbolos",'+'this.id'+")' value='' placeholder='Colonia'";
	html += "		autocomplete='off' maxlength='50' val=''/>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//numero
	html += "<!-- numero -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<input type='text' name='txtNumero' id='txtNumero' onblur='validaNumber(this.value, " + '"ERROR de NUMERO: solo numeros o S/N",' + 'this.id'+")'  placeholder='Numero'";
	html += "		autocomplete='off' maxlength='4' val=''/>";
	html += "</div>";
	
	//codigo postal
	html += "<!-- codigo postal -->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<input type='text' name='txtCP' id='txtCP' onblur='validaNumberPuro(this.value, " + '"ERROR de CODIGO POSTAL: solo numeros",' + 'this.id'+")'  placeholder='CP'";
	html += "		autocomplete='off' maxlength='11' val=''/>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//estado
	html += "<!-- estado -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<input type='text' name='txtEstado' id='txtEstado' onblur='validaText(this.value, " + '"ERROR de ESTADO: 2 o mas letras y sin simbolos",' + 'this.id'+")'  placeholder='estado'";
	html += "		autocomplete='off' maxlength='30' val=''/>";
	html += "</div>";
	
	//delegacion
	html += "<!-- delegacion-->";
	html += "<div class='6u$ 12u$(small)'>";
	html += "	<input type='text' name='txtDelegacion' id='txtDelegacion' onblur='validaText(this.value, " + '"ERROR de DELEGACION: 2 o mas letras y sin simbolos",' + 'this.id'+")'  placeholder='delegacion'";
	html += "		autocomplete='off' maxlength='50' val=''/>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='registrar' id='registrar' value='registrar' class='special' onclick='registrarDireccion(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}

function cargaFormDireccion(data)
{
	var html = "";

	//id direccion
	html += "<!-- id direccion -->";
	html += "<div class='6u 12u$(small)'>";
	html += "	<input type='hidden' name='idDireccion' id='idDireccion' value='" + data.idDireccion + "' placeholder='Numero'";
	html += "		autocomplete='off' maxlength='4' val=''/>";
	html += "</div>";
	
	//Etiqueta de calle
	html += "<!-- calle del museo-->";
	html += "<div class='12u$'><label for='txtCalle'>";
	html += "	<input type='text' name='txtCalle' id='txtCalle' onblur='validaText(this.value, "+'"ERROR de CALLE:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + data.calle + "' placeholder='Calle'";
	html += "		autocomplete='off' maxlength='50' val=''/>Calle:</label>";
	html += "</div>";
	
	//Etiqueta de colonia
	html += "<!-- colonia del museo-->";
	html += "<div class='12u$'><label for='txtColonia'>";
	html += "	<input type='text' name='txtColonia' id='txtColonia' onblur='validaText(this.value, "+'"ERROR de COLONIA:2 o mas letras y sin simbolos",'+'this.id'+")' value='" + data.colonia + "' placeholder='Colonia'";
	html += "		autocomplete='off' maxlength='50' val=''/>Colonia:</label>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//numero
	html += "<!-- numero -->";
	html += "<div class='6u 12u$(small)'><label for='txtNumero'>";
	html += "	<input type='text' name='txtNumero' id='txtNumero' onblur='validaNumber(this.value, " + '"ERROR de NUMERO: solo numeros o S/N",' + 'this.id'+")' value='" + data.numero + "' placeholder='Numero'";
	html += "		autocomplete='off' maxlength='4' val=''/>Numero:</label>";
	html += "</div>";
	
	//codigo postal
	html += "<!-- codigo postal -->";
	html += "<div class='6u$ 12u$(small)'><label for='txtCP'>";
	html += "	<input type='text' name='txtCP' id='txtCP' onblur='validaNumberPuro(this.value, " + '"ERROR de CODIGO POSTAL: solo numeros",' + 'this.id'+")' value='" + data.cp + "' placeholder='CP'";
	html += "		autocomplete='off' maxlength='11' val=''/>C.P:</label>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";
	
	//estado
	html += "<!-- estado -->";
	html += "<div class='6u 12u$(small)'><label for='txtEstado'>";
	html += "	<input type='text' name='txtEstado' id='txtEstado' onblur='validaText(this.value, " + '"ERROR de ESTADO: 2 o mas letras y sin simbolos",' + 'this.id'+")' value='" + data.estado + "' placeholder='estado'";
	html += "		autocomplete='off' maxlength='30' val=''/>Estado</label>";
	html += "</div>";
	
	//delegacion
	html += "<!-- delegacion-->";
	html += "<div class='6u$ 12u$(small)'><label for='txtDelegacion'>";
	html += "	<input type='text' name='txtDelegacion' id='txtDelegacion' onblur='validaText(this.value, " + '"ERROR de DELEGACION: 2 o mas letras y sin simbolos",' + 'this.id'+")' value='" + data.delegacion + "' placeholder='delegacion'";
	html += "		autocomplete='off' maxlength='50' val=''/>Delegacion:</label>";
	html += "</div>";
	
	//separador de componentes html
	html += "<div class='12u$'></div>";

	//Botones
	html += "<div class='12u$'>";
	html += "	<ul class='actions'>";
	html += "		<li><input type='button' name='actualizar' id='actualizar' value='actualizar' class='special' onclick='registrarDireccion(this.id)'/></li>";
	html += "		<li><input type='reset' value='Borrar Campos' /></li>";
	html += "	</ul>";
	html += "</div>";
	
	//separador
	html += "<div class='12u$'>";
	html += "	<hr>";
	html += "</div>";
	
	newHTML.innerHTML = html;
}