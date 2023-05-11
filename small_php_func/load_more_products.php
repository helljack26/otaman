<?php
include('../includes/config.php');
include('../includes/config_vikar.php');
include('../function.php');

    $searchProduct= $_POST['searchQuery'];
    $startId=$_POST['start'];
    $endId=$_POST['end'];

    $retDistinct=mysqli_query($conVikar,"SELECT c_code, characteristic_uuid, product_work_name
                                            FROM products
                                            WHERE organization='ТД ОТАМАН' 
                                            and product_name 
                                            like '$searchProduct'
                                            and product_price > 1
                                            ORDER BY product_availability DESC
                                        ");
    $numDistinct=mysqli_num_rows($retDistinct);
    if($numDistinct>0):
        $i=0;
        $iLoadMoreItem = 0;
        $existedNames = [];
        
        while($rowDisctinct=mysqli_fetch_array($retDistinct)):   
            $isExist = array_search($rowDisctinct['product_work_name'], $existedNames); 
            if ($isExist === false):                            
                
                ++$iLoadMoreItem;

                if($iLoadMoreItem > $startId && $iLoadMoreItem < $endId){
                    array_push($existedNames, $rowDisctinct['product_work_name']);
                    $ret=mysqli_query($conVikar,"SELECT *
                                                    from products 
                                                    where organization='ТД ОТАМАН' 
                                                    and c_code='$rowDisctinct[c_code]' 
                                                    and characteristic_uuid='$rowDisctinct[characteristic_uuid]'
                                                    ");
                    $row=mysqli_fetch_array($ret);
                
                    include('../includes/display_product_card_item.php');
                };
        endif;
    endwhile;
endif;
?>