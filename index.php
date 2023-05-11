<?php 
error_reporting(0);
session_start();

if($_SERVER['REQUEST_URI'] === '/index.php'){
    echo('<script>window.location.href = "/";</script>');
 }
include('includes/config.php');
include('includes/config_vikar.php');
include('function.php');

$get_soc_data = mysqli_query($con,"SELECT * from social_info_pages where newid='1'");
$row_soc_data = mysqli_fetch_array($get_soc_data);
$soc_title = $row_soc_data['title'];
$soc_image = $row_soc_data['image'];
$soc_description = $row_soc_data['soc_info_description'];
?>
<!DOCTYPE html>
<html lang="uk">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta property="og:title" content="<?=$soc_title?>" />
    <meta property="og:image" content="information/img/<?=$soc_image?>" />
    <meta property="og:description" content="<? echo($soc_description);?>" />

    <meta name="description" content="<? echo($soc_description);?>">
    <meta name="author" content="">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">

    <meta name="google-site-verification" content="tz-iKO36VsJcg4-7NuZpdWcFA5ePyc11K7O-UqnlSPE" />

    <title><?=getGoogleTitle($con,1)?></title>

    <!-- Styles -->
    <?php include('includes/links.php');?>
    <link rel="stylesheet" href="assets/css/index.css">
    <link rel="stylesheet" href="assets/css/discounts_slider.css">
</head>

<body class="cnt-home">
    <!-- Header -->
    <?php include('includes/main-header.php');?>
    <main>
        <!-- Main slider -->
        <div id="main_index_slider">
            <?$sql = mysqli_query($con,"SELECT * from baners");?>
            <?while($row = mysqli_fetch_array($sql)):?>
            <div class="main_index_slider_item">
                <a href="<?=$row['banner_url']?>">
                    <img src="/banerImage/<?=$row['image']?>" width="100%">
                </a>
            </div>
            <?endwhile;?>
        </div>

        <h1>Військторг «ОТАМАН»</h1>

        <!-- Categories -->
        <div class="categories_container wow fadeInUp">
            <? 
            $sql1 = mysqli_query($con,"SELECT * from category ORDER BY index_position");  
            $id = 0;
            while($row = mysqli_fetch_array($sql1)){   
                ++$id;
                $position = $row['index_position'];
                if ($row['show_index'] == '1') {
            ?>
            <a class="categories_container_item" href="category/<?=transliterate($row['categoryName'])?>">
                <img src="./img/index_categories/<?=$row['image_url_index']?>"
                    alt="Зображення категорії <?php $row['categoryName']?>">
                <span>
                    <?php 
                        echo $row['categoryName'];
                    ?>
                </span>
            </a>
            <?}; }; ?>
        </div>

        <!-- Recommend slider -->
        <?php include('includes/recommend_slider.php');?>

        <!-- Video news block -->
        <div class="video_news">
            <div class="video_news_block">
                <!-- News -->
                <div class="video_news_item">
                    <div class="video_news_item_header">
                        <a class="video_news_item_header_link" href="page/news">
                            Новини
                        </a>
                        <a class="video_news_item_header_arrow" href="page/news">
                        </a>
                    </div>
                    <div class="video_news_item_news">
                        <? 
                        // mysql_set_charset('utf8mb4');
                        $sql2 = mysqli_query($con,"SELECT * from news ORDER BY date DESC");
                        $i = 0;
						while($row2 = mysqli_fetch_array($sql2)):
                            $text = $row2['text'];

                            $title_en = $row2['title_en']; 
                            if ($i < 2) {
                        ?>
                        <div class="video_news_item_news_item">
                            <?if($row2['image']){?>
                            <a href="news/<?=$title_en?>" class="video_news_item_news_item_img">
                                <img src="./information/img/news/<?echo $row2['image'];?>" width="200px" height="200px"
                                    alt="<?=$row2['title']?>">
                            </a>
                            <?}?>
                            <div class="video_news_item_news_item_content">
                                <a href="news/<?=$title_en?>">
                                    <h4>
                                        <?=$row2['title']?>
                                    </h4>
                                </a>
                                <span id="video_news_item_news_item_content_text">

                                    <?
                                        $text= html_decoding($text);
                                        $text= trim($text);
                                        echo(mb_substr($text, 0, 300, 'UTF-8'));
                                    ?>...
                                </span>
                            </div>
                            <div class="video_news_item_news_item_footer">
                                <span class="video_news_item_news_item_footer_date">
                                    <?
                                        $rawDate = explode(' ', $row2['date']);
                                        $explodeDate = explode('-', $rawDate[0]);
                                        $reverseDate = array_reverse($explodeDate);
                                        $correctData = implode('.',$reverseDate);
                                        echo($correctData);
                                    ?>
                                </span>
                                <a href="news/<?=$title_en?>" class="video_news_item_news_item_footer_more">
                                    Читати далі
                                </a>
                            </div>
                        </div>

                        <? ++$i;    
                        } endwhile;?>
                    </div>
                </div>
                <!-- Video -->
                <div class="video_news_item">
                    <div class="video_news_item_header">
                        <a class="video_news_item_header_link" href="page/reviews">
                            Відеоогляди
                        </a>
                        <a class="video_news_item_header_arrow" href="page/reviews">
                        </a>
                    </div>
                    <div class="video_news_item_video">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/zWvr42zL9nU"
                            title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                </div>

            </div>
        </div>
    </main>
    <!-- Footer -->
    <?php include('includes/footer.php');?>
    <script>
    $(document).ready(function() {
        $(".header_second_row_block_logo_link").css("pointer-events", "none");

        $('#main_index_slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            dots: false,
            centerMode: true,
            centerPadding: '0px',
        });

        $('#discount_slider').slick({
            infinite: true,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            responsive: [{
                    breakpoint: 1650,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        dots: false,
                    }
                }
            ]
        });
    });
    </script>
</body>


</html>