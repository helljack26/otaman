<?php
error_reporting(0);
include('../includes/config_vikar.php');
include('../function.php');

// Main header search field
if($_POST['search']=="1"):
    $q = htmlspecialchars($_POST["q"]);
    if(!empty($q)):
    $sql = mysqli_query($conVikar,"SELECT c_code, product_name, characteristic_uuid, product_spec
                                    from products 
                                    where organization='ТД ОТАМАН' 
                                    and product_name LIKE '%$q%' 
                                    LIMIT 5 
                                    GROUP BY product_work_name
                                    ");

    while($row = mysqli_fetch_array($sql)):
    
    $productLink = generateProductDetailsUrl($row['product_name'], $row['product_spec']);

        
    ?>
<p>
    <a href="<?=$productLink?>">
        <?=$row['product_name']?>
    </a>
</p>
<?endwhile; endif; exit; endif;?>
