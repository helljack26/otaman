<? $product_cat_name = strlen($product_cat_name) > 0 ? $product_cat_name : $subCatName; ?>

<div class="product_category_row">
    <!-- Filters -->
    <? include('includes/product_filters/product_filters.php'); ?>

    <!-- Product results -->
    <div class="product_category_row_results">
        <div class="product_category_row_results_header">
            <div class="product_category_row_results_header_row">
                <h1>
                    <?=$product_cat_name?>
                </h1>
                <!-- Sort buttons -->
                <? include('includes/product_filters/sort_button.php'); ?>
            </div>
        </div>
        <div id="load_more_results" class="product_category_row_results_block">
            <?php
            $isProduct_cat = $product_cat ? "and product_category='$product_cat'" : '';

            $retDistinct=mysqli_query($conVikar,"SELECT c_code, characteristic_uuid, product_work_name,
                                                attributes->'$.*.value' AS value
                                                FROM products
                                                WHERE organization='ТД ОТАМАН' 
                                                AND category='$cat' 
                                                AND sub_сategory='$cid' 
                                                $isProduct_cat
                                                $filter_db_query
                                                AND product_price > 0
                                                ORDER BY product_availability DESC
                                                ");
                $numDistinct=mysqli_num_rows($retDistinct);
                $existedNames = [];
                if($numDistinct>0):
                    $i=0;
                    while($rowDisctinct=mysqli_fetch_array($retDistinct)):   
                        $isExist = array_search($rowDisctinct['product_work_name'], $existedNames); 
                        if ($isExist === false) {
                            $ret=mysqli_query($conVikar,"SELECT * FROM products WHERE organization='ТД ОТАМАН' and c_code='$rowDisctinct[c_code]' and characteristic_uuid='$rowDisctinct[characteristic_uuid]'");
                            $row=mysqli_fetch_array($ret);                                                              
                            include('includes/display_product_card_item.php');
                            array_push($existedNames, $rowDisctinct['product_work_name']);
                        }
                    endwhile;
                else:
                
                    echo('<h2 class="product_category_row_results_block_empty">За цим запитом товари не знайдені.</h2>');
                endif;
            ?>
        </div>
    </div>
</div>