<?php 
    $row23 = get_info_page($con, 11);
    $title = $row23['title'];
    $text = $row23['text'];
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
    <meta property="og:title" content="<?=$row23['soc_info_title']?>" />

    <meta property="og:description" content="<? echo($soc_description);?>" />
    <meta name="description" content="<? echo($soc_description);?>">
    
    <meta name="author" content="">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">
    <title><?=getGoogleTitle($con,22)?></title>
    
    <?php include('includes/links.php');?>
    <link rel="stylesheet" href="assets/css/certificates.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css">
</head>

<body>
    <!-- Header -->
    <?php include('includes/main-header.php');?>
    <main>
        <div class="certificates_row">
            <!-- News title -->
            <h1>
                <?=$title?>
            </h1>
            <h2>
                <?=$text?>
            </h2>

            <!-- News results -->
            <div class="certificates_row_results wow fadeInUp">
                <? $sql2 = mysqli_query($con,"SELECT * from certificates ORDER BY id DESC");    
					while($row2 = mysqli_fetch_array($sql2)): 
                ?>
                <div class="certificates_row_results_item">
                    <a href="./information/img/<?=$row2['image'];?>" data-fancybox="gallery"
                        class="certificates_row_results_item_img">
                        <?if($row2['image']){?>

                        <img class="stores_container_row_media_item_img " src="./information/img/<?=$row2['image'];?>"
                            alt="picture 2" />
                        <?} ?>
                    </a>
                    <span>
                        <?=$row2['title']?>
                    </span>
                </div>
                <? endwhile; ?>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php include('includes/footer.php');?>

    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js"></script>
    <script>
        $(document).ready(function () {
            $('[data-fancybox]').fancybox({
                buttons: [
                    'close'
                ],
                wheel: false,
                transitionEffect: "slide",
                thumbs: false,
                loop: true,
                toolbar: false,
                clickContent: false
            });

            $("#map").html($(".maps").html());
        });
    </script>

</body>

</html>