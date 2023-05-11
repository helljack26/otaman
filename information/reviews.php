<?php 
$row23 = get_info_page($con,2);
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
    <meta name="author" content="">

    <meta property="og:image" content="assets/no_foto.png" />
    <meta property="og:title" content="<?=$row23['title']?>" />

    <meta property="og:description" content="<? echo($soc_description);?>" />
    <meta name="description" content="<? echo($soc_description);?>">

    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">
    <title><?=getGoogleTitle($con,11)?></title>

    <?php include('includes/links.php');?>
    <link rel="stylesheet" href="assets/css/info_reviews.css">
</head>

<body>
    <!-- Header -->
    <?php include('includes/main-header.php');?>

    <main>
        <!-- Breadcrumbs -->
        <ul class="reviews_breadcrumb">
            <li>
                <a href="/">
                    Головна
                </a>
            </li>
            <li>
                <?=$row23['title']?>
            </li>
        </ul>

        <div class="reviews_row">
            <!-- Review title -->
            <h1>
                <?=$row23['title']?>
            </h1>

            <!-- Review results -->
            <div class="reviews_row_results wow fadeInUp">
                <? $sql2 = mysqli_query($con,"SELECT * from video_reviews ORDER BY date DESC");    
					while($row2 = mysqli_fetch_array($sql2)): 
                ?>
                <div class="reviews_row_results_item">
                    <?if($row2['video']){?>
                    <div class="reviews_row_results_item_img">
                        <?echo$row2['video'];?>
                    </div>
                    <?}?>
                    <div class="reviews_row_results_item_content">
                        <div class="reviews_row_results_item_content_block">
                            <h4>
                                <?=$row2['title']?>
                            </h4>
                            <span>
                                <?=$row2['text']?>
                            </span>
                        </div>
                        <div class="reviews_row_results_item_content_footer">
                            <!-- Review date -->
                            <span class="reviews_row_results_item_content_footer_date">
                                <? $rawDate = explode(' ', $row2['date']);
                                $explodeDate = explode('-', $rawDate[0]);
                                $reverseDate = array_reverse($explodeDate);
                                $correctData = implode('.',$reverseDate);
                                echo($correctData);
                            ?>
                            </span>
                        </div>
                    </div>
                </div>
                <? endwhile; ?>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <?php include('includes/footer.php');?>
</body>

</html>