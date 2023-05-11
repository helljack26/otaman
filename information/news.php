<?php 
$row23 = get_info_page($con,3);
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
    <title><?=getGoogleTitle($con,12)?></title>

    <?php include('includes/links.php');?>
    <link rel="stylesheet" href="assets/css/info_news.css">
</head>

<body>
    <!-- Header -->
    <?php include('includes/main-header.php');?>


    <main>
        <!-- Breadcrumbs -->
        <ul class="news_breadcrumb">
            <li>
                <a href="/">
                    Головна
                </a>
            </li>
            <li>
                <?=$row23['title']?>
            </li>
        </ul>

        <div class="news_row">
            <!-- News title -->
            <h1>
                <?=$row23['title']?>
            </h1>

            <!-- News results -->
            <div class="news_row_results wow fadeInUp">
                <? $sql2 = mysqli_query($con,"SELECT * from news ORDER BY date DESC");    
					while($row2 = mysqli_fetch_array($sql2)): 
                        $text = $row2['text'];
                        $title_en = $row2['title_en'];
                ?>
                <div class="news_row_results_item">
                    <?if($row2['image']){?>
                    <div class="news_row_results_item_img">
                        <a href="news/<?=$title_en?>">
                            <img src="./information/img/news/<?echo $row2['image'];?>" width="200px" height="200px"
                                alt="<?=$row2['title']?>">
                        </a>
                    </div>
                    <?} ?>

                    <div class="news_row_results_item_content">
                        <div class="news_row_results_item_content_block">
                            <h4>
                                <a href="news/<?=$title_en?>">
                                    <?=$row2['title']?>
                                </a>
                            </h4>
                            <span id="news_row_results_item_content_block_text">

                                <?
                                    $text= html_decoding($text);
                                    $text= trim($text);
                                    echo(mb_substr($text, 0, 500, 'UTF-8'));
                                ?>...
                            </span>
                        </div>

                        <div class="news_row_results_item_content_footer">
                            <a href="news/<?=$title_en?>" class="read-more-btn">Читати далі</a>
                            <!-- News date -->
                            <span class="news_row_results_item_content_date">
                                <?
                                $rawDate = explode(' ', $row2['date']);
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