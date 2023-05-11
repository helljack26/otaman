<?php 
error_reporting(0);
session_start();

include('includes/config.php');
include('function.php');

$sql23 = mysqli_query($con,"SELECT * from info_pages where newid='11'");
$row23 = mysqli_fetch_array($sql23);

$soc_title = $row23['soc_info_title'];
$soc_description = $row23['soc_info_description'];

$parsedData = unserialize($row23['text']);
?>
<!DOCTYPE html>
<html lang="uk">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <meta property="og:title" content="<?=$soc_title?>" />
    <meta property="og:image" content="categoryImage/no_foto.png" />

    <meta property="og:description" content="<? echo($soc_description);?>" />
    <meta name="description" content="<? echo($soc_description);?>">

    <meta name="author" content="">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">

    <title><?=getGoogleTitle($con,14)?></title>

    <!-- Styles -->
    <?php include('includes/links.php');?>

    <link rel="stylesheet" href="assets/css/404.css">
</head>

<body>
    <!-- Header -->
    <?php include('includes/main-header.php');?>

    <main>
        <div class="notFound_block">
            <h1>
                <?=$parsedData['title']?>
            </h1>
            <div class="notFound_block_round">
                <span>404</span>
            </div>
            <span>
                <?=$parsedData['text']?>
            </span>
            <a href="/">
                Повернутись до головної
            </a>
        </div>
    </main>

    <!-- Footer -->
    <?php include('includes/footer.php');?>
</body>

</html>