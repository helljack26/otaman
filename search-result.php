<?php
session_start();
error_reporting(0);
include('includes/config.php');
include('includes/config_vikar.php');
include('function.php');
$find="%{$_GET['search']}%";
$get_soc_data = mysqli_query($con,"SELECT * from social_info_pages where newid='3'");
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
    <title>"<? echo($_GET['search']);?>" <?=getGoogleTitle($con,3)?></title>
        
    <?php include('includes/links.php');?>

    <link rel="stylesheet" href="assets/css/product_category.css">
</head>

<body>
    <!-- Header -->
    <?php include('includes/main-header.php');?>


    <main class="product_category_container">
        <!-- Breadcrumbs -->
        <ul class="product_category_breadcrumb">
            <li>
                <a href="/">
                    Головна
                </a>
            </li>
            <li>
                Пошук
            </li>
        </ul>
        <div class="product_category_row">
            <?php
			if(mb_strlen($_GET['search']) > 0):
                $existedNames = [];
                $retDistinct=mysqli_query($conVikar,"SELECT c_code, characteristic_uuid, product_work_name
                                                        from products 
                                                        where organization='ТД ОТАМАН'
                                                        and product_price > 1
                                                        and product_name like '$find'
                                                        ORDER BY product_availability DESC");
                $numDistinct=mysqli_num_rows($retDistinct);
                if($numDistinct>0):
            ?>
            <!-- Search results -->
            <h1>
                Результат пошуку: <span>"<? echo($_GET['search']);?>"</span>
            </h1>
            <div id="product_category_row_results" class="product_category_row_results">
                <? 
                    $iItem = 1;
                    
                    while($rowDisctinct=mysqli_fetch_array($retDistinct)){
                    
                    $isExist = array_search($rowDisctinct['product_work_name'], $existedNames); 
                    
                        if($iItem < 30 && $isExist === false){
                            $ret=mysqli_query($conVikar,"SELECT * from products 
                                                            where organization='ТД ОТАМАН' 
                                                            and c_code='$rowDisctinct[c_code]' 
                                                            and characteristic_uuid='$rowDisctinct[characteristic_uuid]'
                                                            ");
                            $row=mysqli_fetch_array($ret);
                            include('includes/display_product_card_item.php');
                            array_push($existedNames, $rowDisctinct['product_work_name']);
                            $iItem++;
                        } 
                    }
                ?>
            </div>

            <div id='loadMore'></div>
            <? else: ;?>
            <h2 style="text-align: center; width: 100%; display: inline-block;">
                Товар не знайдено</h2>
            <?php endif;endif; ?>
        </div>
    </main>


    <!-- Footer -->
    <?php include('includes/footer.php');?>

    <script>
        let alreadyExist = 30;
        const step = 30;
        let isCanGet = 0;
        $(document).ready(function () {
            $(window).on('scroll', function (e) {
                var loadMore = $('#loadMore');
                const offsetTop = loadMore[0].offsetTop - 1500;
                const offsetWindowTop = $(window).scrollTop();
                let isSeeLoader = offsetTop < offsetWindowTop;
                if (isSeeLoader && isCanGet === 0) {
                    isCanGet = 1;
                    $('#loadMore').hide();
                    setTimeout(() => {
                        async function asyncCall() {
                            const result = await load_more_data({
                                start: alreadyExist,
                                end: alreadyExist + step,
                            });
                        }
                        asyncCall();
                    }, 2000);
                }
            });
        });

        function load_more_data({
            start,
            end
        }) {
            return new Promise(resolve => {
                // return
                $.ajax({
                    type: 'POST',
                    url: '../small_php_func/load_more_products.php',
                    data: {
                        start: start,
                        end: end,
                        searchQuery: `<?echo($find);?>`,
                    },
                    success: function (data) {
                        alreadyExist += step;
                        $('#product_category_row_results').append(data);
                        setTimeout(function () {
                            $('#loadMore').show();
                            isCanGet = 0;
                        }, 3000);
                        return
                    }
                });
            });
        }
    </script>

</body>

</html>