<?php
include('../../includes/config.php');
include('../../includes/config_vikar.php');

include('../../function.php');

$sqlQuery = $_POST['sqlQuery'];
$isPopularSort = $_POST['isPopularSort'];
$current_filter_url = $_POST['current_filter_url'];

$category = $_POST['category'];
$sub_сategory = $_POST['sub_сategory'];
$product_category = "and product_category='$_POST[product_category]'";
$product_subspec = "and product_subspec='$_POST[product_subspec]'";

if ($_POST['product_category'] == '') {
    $product_category = '';
    $product_subspec = '';
}

if ($_POST['product_subspec'] == '') {
    $product_subspec = '';
}

$filterClause = filter_db_query_from_url($current_filter_url);

$filter_db_query = $filterClause['filter_db_query'];

$ret = $ret=mysqli_query($conVikar, "SELECT * 
          FROM products 
          WHERE organization='ТД ОТАМАН' 
          and category='$category' 
          and sub_сategory='$sub_сategory' 
          $product_category 
          $product_subspec 
          $filter_db_query
          $sqlQuery ");


    if ($ret) {
        $num=mysqli_num_rows($ret);
        // New array with field reviewsCount  
        $popularSortedItems = [];
        
        if($num>0){
            if ($isPopularSort == 'true') { 
                while ($row=mysqli_fetch_array($ret)): 
                    
                    // Get reviews count from productreviews
                    $reviewRow = mysqli_query($con,"SELECT * 
                                                    from productreviews 
                                                    where productId='$row[c_code]'");
                    $numReview = mysqli_num_rows($reviewRow);
                    if($numReview > 0){
                        $newRow = $row ;
                        $newRow += ["reviewsCount" => $numReview];
                        array_push($popularSortedItems, $newRow);
                    }else{
                        $newRow = $row;
                        $newRow += ["reviewsCount" => 0];
                        array_push($popularSortedItems, $newRow);
                    }
                endwhile; 
                usort($popularSortedItems, function($a, $b){
                    return ($b['reviewsCount'] - $a['reviewsCount']);
                });
                $i = 0;
                while ($i < count($popularSortedItems)): 
                    $row = $popularSortedItems[$i];
                    include('../../includes/display_product_card_item.php');
                    $i++;
                endwhile; 
            }else{
                while ($row=mysqli_fetch_array($ret)): 
                    include('../../includes/display_product_card_item.php');
                endwhile; 
            }
        } else {
            echo('<h2 class="product_category_row_results_block_empty">За цим запитом товари не знайдені.</h2>');
        } 
    }
 
?>