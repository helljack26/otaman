<?php 
$row23 = get_info_page($con,9);
$title = $row23['title'];
$soc_description = $row23['soc_info_description'];
?>
<!DOCTYPE html>
<html lang="uk">
 <head>
    <base href="<?php echo checkIsHttp() .  $_SERVER['SERVER_NAME']; ?>" />
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    
    <meta property="og:image" content="assets/no_foto.png" />
    <meta property="og:title" content="<?=$row23['title']?>" />

    <meta property="og:description" content="<? echo($soc_description);?>" />
    <meta name="description" content="<? echo($soc_description);?>">

    <meta name="author" content="">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">   
    <title><?=getGoogleTitle($con,9)?></title>

    <?php include('includes/links.php');?>

    <style>
    .btn {
        background: #a8a8a8 none repeat scroll 0 0;
        border: medium none;
        color: #fff;
        font-size: 13px;
        line-height: 22px;
        transition: all 0.2s linear 0s;
    }
    </style>
 
</head>

<body class="cnt-home">
   <!-- Header -->
    <?php include('includes/main-header.php');?>
     
    <div class="body-content outer-top-xs" id="top-banner-and-menu">
        <div class="container">
            <div class="furniture-container homepage-container">
                <div class="row">
                    <div class='col-md-12'>
                        <div style="word-wrap: break-word;padding:10px;">
                            <?
                            echo '<h1>' . $title . '</h1>';
                            $num = strlen($row23['text']);?>
                            <?=$row23['text'];?>
                        </div>
                        <?if($row23['image']):?>
                        <p align="center"><img src="information/img/<?=$row23['image']?>" width="300" /></p>
                        <?endif;?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <?php include('includes/footer.php');?>

</body>

</html>