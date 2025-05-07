<?php
$conn = new mysqli('localhost', 'root', '', 'lalan_blogdb');
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

$imageData = null;
 // Definir la variable por defecto como null
if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
    // Leer la imagen y almacenarla en la variable $imageData
    $imageData = file_get_contents($_FILES['imagen']['tmp_name']);
}
?>
