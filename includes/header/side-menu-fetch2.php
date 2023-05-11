<?require_once '../config.php';
include '../../function.php';

if(isset($_POST['menu'])){
    $cat = $_POST['cat'];
    $sub = $_POST['sub'];
    $sql = mysqli_query($con,"SELECT productcategoryname,product_category_id,category_id,subcategoryid from product_category where category_id='$cat' and subcategoryid='$sub'");
    ?>
<? while($row = mysqli_fetch_array($sql)){?>
<li class="three_lvl">
    <a href="product-category/<?=transliterate($row['productcategoryname'])?>"
        class="three_lvl_a">
        <?=$row['productcategoryname']?>
    </a>
</li>
<?}?>
<?}?>