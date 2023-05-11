<?require_once 'function.php';?>

<div class="discount_container ">
    <div class="discount_container_header">
        <h3 class="discount_container_header_text">Рекомендуємо</h3>

    </div>

    <div id="discount_slider" class="discount_slider">
        <?php
            $retDistinct=mysqli_query($conVikar,"SELECT c_code, characteristic_uuid, product_work_name
                                                        FROM products
                                                        WHERE organization='ТД ОТАМАН' 
                                                        and product_recommended = '1'
                                                        and product_price > 1
                                                        ORDER BY product_availability DESC");
            $numDistinct=mysqli_num_rows($retDistinct);
            $existedNames = [];
            if($numDistinct>0):
                $i=0;
                while($rowDisctinct=mysqli_fetch_array($retDistinct)):   
                    $isExist = array_search($rowDisctinct['product_work_name'], $existedNames); 
                    if ($isExist === false):
                        $ret=mysqli_query($conVikar,"SELECT * 
                                                        FROM products 
                                                        WHERE organization='ТД ОТАМАН'
                                                        and c_code='$rowDisctinct[c_code]' 
                                                        and characteristic_uuid='$rowDisctinct[characteristic_uuid]'");
                        $row=mysqli_fetch_array($ret);                                
                        array_push($existedNames, $rowDisctinct['product_work_name']);
                        $c_product_name = $row['product_name'];
                        $product_spec = $row['product_spec'];
                        $productLink = generateProductDetailsUrl($c_product_name, $product_spec);
        ?>
        <div>
            <div class="discount_slider_item">
                <div class="<?php if($row['product_availability'] == 0 || $row['product_count'] ==0){
                        echo('discount_slider_item_disabled');   
                }?>">

                    <span class="discount_slider_item_discount">
                        НОВИНКА
                    </span>

                    <!-- Product image -->
                    <div class="discount_slider_item_image">
                        <a
                            href="<?=$productLink?>">

                            <img src="<?if($row['productImage1']=='') {echo'categoryImage/no_foto.png'; }else{echo '../images/'.$row['productImage1'];}?>"
                                data-echo="<?if($row['productImage1']=='') {echo'categoryImage/no_foto.png'; }else{echo '../images/'.$row['productImage1'];}?>"
                                height="210px" alt="">
                        </a>
                    </div>

                    <div class="discount_slider_item_info">
                        <!-- Product rating -->
                        <?php 
                            $rawDiscountAverageRating = getAverageRating($con, $row['c_code']);
                            $averageRating = $rawDiscountAverageRating['averageRating'];
                            $discountReviewsNum = $rawDiscountAverageRating['num'];

                        {?>
                        <div class="discount_slider_item_info_reviews">
                            <?
                        if ($discountReviewsNum == 0) :?>
                            <div class="reviews">
                                <a
                                    href="<?=$productLink?>#review">
                                    <span class='content_info_reviews_icon'></span>
                                    Залишити відгук
                                </a>
                            </div>
                            <? else: ?>

                            <span class='reviews_item_rate'>
                                <? getAverageRatingStars($averageRating) ?>
                            </span>
                            <div class="reviews">
                                <span class="lnk">(<?php echo htmlentities($discountReviewsNum);?> Відгуки)</span>
                            </div>
                            <? endif; ?>
                        </div>
                        <!-- Product name -->
                        <h3 class="discount_slider_item_info_name">
                            <a
                                href="<?=$productLink?>">
                                <?php echo htmlentities($c_product_name);?>
                            </a>
                        </h3>
                        <!-- Product code -->
                        <span class="discount_slider_item_info_code">Код товару:
                            <span>
                                <?php echo $row['c_code']?>
                            </span>
                        </span>
                        <?php } ?>
                        <!-- Product price -->
                        <div class="discount_slider_item_info_price">
                            <?if($row['product_old_price']!=='0.00'):?>
                            <span class="discount_slider_item_info_price_discount">
                                <?php echo htmlentities($row['product_old_price']);?>
                                грн.
                                <span></span>
                            </span>
                            <span class="discount_slider_item_info_price_text">
                                <?php echo htmlentities($row['product_price']);?> грн.
                            </span>
                            <?else:?>
                            <span class="discount_slider_item_info_price_text" style="color:#212322;">
                                <?php echo htmlentities($row['product_price']);?> грн.
                            </span>
                            <?endif;?>
                        </div>
                    </div>
                </div>
                <!-- Product buttons -->
                <div class="discount_slider_item_footer">

                    <?php if($row['product_availability'] >=1 || $row['product_count'] >=1){?>
                    <!-- Buy button -->
                    <button type="button" data-prices="<?php echo htmlentities($row['product_price']);?>"
                        data-unit="<?=$row['product_price'], $row['second_value']?>" data-code="<?=$row['c_code']?>"
                        data-char='<?=$row['characteristic_uuid']?>' class="discount_slider_item_footer_basket
                        <? if (isExistInBasket($row['c_code'], $row['characteristic_uuid']) != 'Купити') {
                                echo('discount_slider_item_footer_basket_active');
                            }
                        ?>">
                        <? echo(isExistInBasket($row['c_code'], $row['characteristic_uuid']));?>
                    </button>

                    <?php } else {?>

                    <button type="button" class="discount_slider_item_footer_isAvailable product_info_isAvailable"
                        data-product-code="<?php echo $row['c_code']?>" data-char='<?=$row['characteristic_uuid']?>'>
                        Уточнити наявність
                    </button>
                    <?php } ?>

                    <!-- Wishlist button -->
                    <?
                    $isInWishList = mysqli_query($con,"SELECT productId from wishlist where productId='$row[c_code]' and characteristic_uuid='$row[characteristic_uuid]'  and userid='$_SESSION[id]'");
                    $isExistInWishList = false;
                        while ($isInWishListItem = mysqli_fetch_array($isInWishList)) {
                            if($row['c_code']) {
                                $isExistInWishList= true;
                        }};
                    ?>
                    <button type="button" class="results_item_content_info_wishList
                    <?
                        if($isExistInWishList=== true) {
                            echo('results_item_content_info_wishList_active');
                        }?>" data-id-wishList="<?php echo $row['c_code'];?>"
                        data-is-login="<?echo $_SESSION['login']?>" data-char='<?=$row['characteristic_uuid']?>'>
                        <!-- Icon -->
                        <?  if($isExistInWishList=== true) {
                                echo('<span class="results_item_content_info_wishList_icon results_item_content_info_wishList_icon_active"></span>');
                            }else{
                                echo('<span class="results_item_content_info_wishList_icon"></span>');
                        }?>
                    </button>
                </div>
            </div>
        </div>
        <?php endif; endwhile; endif; ?>
    </div>
</div>