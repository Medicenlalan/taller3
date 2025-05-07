<?php
    require 'db.php';

    $title = $_POST['title'];
    $content = $_POST['content'];
    $imagen =$_POST['content'];

     // Mover el archivo subido a una carpeta específica
     $uploadDir = 'Upload/'; // Carpeta donde se guardarán las imágenes
     $uploadFile = $uploadDir . basename($imagen);

      // Mover el archivo subido
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        // Archivo subido correctamente
    } 
    else {
        // Si falla, asignar un valor predeterminado o manejar el error
        $imagen = null;
    }

 



    $stmt = $conn->prepare("INSERT INTO posts (title, content, imagen) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $content, $imagen);
    $stmt->execute();


    $stmt->close();
    $conn->close();

    header("Location: post.php");
    exit();
?>