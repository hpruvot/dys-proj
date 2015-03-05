<?php
$fileName = $_FILES["file"]["name"];
$fileTmp = $_FILES["file"]["tmp_name"];
$fileType = $_FILES["file"]["type"];
$fileSize = $_FILES["file"]["size"];
$fileErrorMsg = $_FILES["file"]["error"];
if (!$fileTmp) { // if file not chosen
 echo $fileType.'message derreur';
 exit();
}
if(move_uploaded_file($fileTmp, 'dossier/'.$fileName)){
 echo $fileName.' upload reussi';
} else {
 echo 'Upload php Failed';
}
?>