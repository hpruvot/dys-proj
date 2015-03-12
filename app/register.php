<?php
  // status = 0 -> get
  // status = 1 -> post success
  // status = 2 -> post fail
$status = 0;

if($_SERVER['REQUEST_METHOD'] == 'GET') {
//    $status = 0;
}
else if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
  $dns = 'mysql:host=localhost;dbname=dyskit_cs';
  $utilisateur = 'dyskit_cs';
  $motDePasse = 'dyskit_cs';
  $connection = new PDO( $dns, $utilisateur, $motDePasse );

  if(filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){

    $req = $connection->prepare("INSERT INTO newsletter_email VALUES(NULL, ?);");

    if($req->execute(array($_POST['email']))) {
      $status = true;
      $message = "Merci";
    }
    else {
      $status = false;
      $message = "Cet email est déjà enregistré";
    }
  }
  else{
   $status = false;
   $message = "L'email renseigné n'est pas correct";
 }

}
$response = array();
$response["status"] = $status;
$response["message"] = $message;

echo json_encode($response)

?>