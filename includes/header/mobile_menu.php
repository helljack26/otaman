<?require_once 'function.php';?>

<!-- Mobile menu -->
<div class="mobile-navbar-collapse" data='0'>
    <ul class="mobile-navbar-nav">
        <!-- Всi товари -->
        <li class="mobile-navbar-item mobile-navbar-item_allproducts">
            <button class="allproduct_header">
                <div class="allproduct_header_button">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                Всі товари
            </button>
        </li>
        <div class="allproduct_collapsed">
            <? $sql1 = mysqli_query($con,"SELECT id,categoryName from category");  
                        while($row = mysqli_fetch_array($sql1)){   
                        ?>
            <div class="allproduct_parent">
                <span id="allproduct_category<?=$row['id']?>" class='allproduct_category'>
                    <a href="category/<?=transliterate($row['categoryName'])?>">
                        <?echo $row['categoryName']?>
                    </a>
                    <span class="allproduct_category_arrow" data-id="<?=$row['id']?>" data="<?=$row['id']?>"></span>
                </span>
            </div>
            <ul id="allproduct_child<?=$row['id']?>" class="allproduct_child">
                <span id="category<?=$row['id']?>">
                </span>
            </ul>
            <?}
        ?>
        </div>
        <li class="mobile-navbar-item">
            <a href="page/aboutus"><?=info_name($con,1)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/reviews'><?=info_name($con,2)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/news'><?=info_name($con,3)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='shares.php'><?=info_name($con,4)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/help'><?=info_name($con,5)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/delivery'><?=info_name($con,6)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/contact'><?=info_name($con,7)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/oferta'><?=info_name($con,8)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/personalDate'><?=info_name($con,9)?></a>
        </li>
        <li class="mobile-navbar-item">
            <a href='page/certificates'><?=info_name($con,11)?></a>
        </li>
    </ul>
</div>
<div class="mobile_menu_bg"></div>