<?php
session_start();
include("includes/config.php");
include("includes/config_google.php");

$_SESSION['login'] = "";
if ($_SESSION['id_token_token']) {
    $gClient->revokeToken();
  }
  unset($_SESSION['id_token_token']);


date_default_timezone_set('Europe/Kiev');
$ldate=date( 'd-m-Y h:i:s A', time () );

mysqli_query($con,"UPDATE userlog  SET logout = '$ldate' WHERE userEmail = '".$_SESSION['login']."' ORDER BY id DESC LIMIT 1");
session_unset();
$_SESSION['errmsg']="You have successfully logout";
?>

<script language="javascript">document.location="login.php";</script>
