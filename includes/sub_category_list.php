<?php include('includes/config.php'); ?>

<div class="sub_category_row">
   <h1>
      <?= $subCatName ?>
   </h1>

   <!-- Category results -->
   <div class="sub_category_row_results">
      <?php
      $ret_sub=mysqli_query($con,"SELECT * from product_category where subcategoryid='$cid' and category_id='$cat'");
      $num=mysqli_num_rows($ret_sub);
      if($num>0):
      while ($row_sub=mysqli_fetch_array($ret_sub)):?>

      <div class="sub_category_row_results_item wow fadeInUp">
         <!-- Image -->
         <a class="sub_category_row_results_item_image"
            href="product-category/<?=transliterate($row_sub['productcategoryname'])?>">
            <img src="categoryImage/<?=$row_sub['product_image']?>" alt="<?=replaceDoubleQuote($row_sub['productcategoryname'])?>" width="200" height="200">
         </a>

         <!-- Name -->
         <a class="sub_category_row_results_item_name"
            href="product-category/<?=transliterate($row_sub['productcategoryname'])?>">
            <?php echo htmlentities($row_sub['productcategoryname']);?>
         </a>
      </div>
      <? endwhile; endif;  ?>
   </div>
</div>