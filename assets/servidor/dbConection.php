<?php
session_start();

function conection()
{
	$link = mysqli_connect('localhost','root','','dbchaman')
	or die(error());

	return $link;
}

function error(){
	return "Error con la base de datos";
}
?>