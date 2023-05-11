<?require_once 'includes/config.php';?>

<nav class="nav__wrapper">
    <ul class="nav__main">
        <li class="nav__main_allProducts">
            <p class='nav__main_allProducts_cat'>
                <span class="cat_text">
                    Всі товари
                </span>
            </p>
            <ul class="nav__main_allProducts_results">
            </ul>
        </li>
        <span class="cat_separator"></span>

        <li class='cat_disable_hover'>
            <a class='cat' href="/shares">
                <span class="cat_text">
                    АКЦІЇ
                </span>
            </a>
            <ul class="child">
                <span id="cat<?=$row4['id']?>">
                </span>
            </ul>
        </li>
        <span class="cat_separator"></span>
        <?
            $i = 0;
            $sql = mysqli_query($con,"SELECT id,categoryName FROM category");  
            while($row4 = mysqli_fetch_array($sql)){
            $i++;
            if ($i <= 6 ) {
        ?>
        <li data="<?=$row4['id']?>">
            <a class='cat' href="/category/<?=transliterate($row4['categoryName'])?>" data="<?=$row4['id']?>">
                <span class="cat_text">
                    <?echo $row4['categoryName']?>
                </span>
            </a>
            <ul class="child">
                <span id="cat<?=$row4['id']?>">
                </span>
            </ul>
        </li>

        <? if ($i <= 5){ ?>
        <span class="cat_separator"></span>
        <?}
        }
    }?>
    </ul>
</nav>

<script>
$(document).ready(function() {
    $(".cat").mouseenter(function() {
        id = $(this).attr("data");
        $.ajax({
            type: "POST",
            url: "/includes/header/side-menu-fetch.php",
            data: {
                'id': id,
                'menu': '1'
            },
            success: function(data) {
                $("#cat" + id).html(data);
            },
        });
    });
    $(".nav__main_allProducts").mouseenter(function() {
        $.ajax({
            type: "POST",
            url: "/includes/header/nav_all/all_products_fetch.php",
            success: function(data) {
                $(".nav__main_allProducts_results").html(data);
            },
        });
    });
});
</script>