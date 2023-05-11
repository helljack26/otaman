<? require_once 'function.php';

// Get count items from basket
$get_basketCountItems = $_SESSION['cart'] !== NULL ? count($_SESSION['cart']) : 0;
?>
<div id="preloader">
    <img src="assets/logo.png" width="416px">
</div>
<header class="header">
    <!-- First row -->
    <div class="header_first_row">
        <nav class="header_first_row_nav">
            <!-- Mobile burger button -->
            <button class="mobile-navbar-toggle" type="button">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- Mobile menu -->
            <?php include("header/mobile_menu.php") ?>

            <ul class="header_first_row_nav_links">
                <li class="header_first_row_nav_links_item">
                    <a href="page/aboutus">
                        <?=info_name($con, 1)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="page/reviews">
                        <?=info_name($con, 2)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="page/news">
                        <?=info_name($con, 3)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="shares">
                        <?=info_name($con, 4)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="page/help">
                        <?=info_name($con, 5)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="page/delivery">
                        <?=info_name($con, 6)?>
                    </a>
                </li>
                <li class="header_first_row_nav_links_item">
                    <a href="page/contact">
                        <?=info_name($con, 7)?>
                    </a>
                </li>
            </ul>

            <!-- Social links -->
            <ul class="header_first_row_nav_social">
                <li>
                    <a href="https://www.facebook.com/otamann" target="_blank">
                        <i class="header_first_row_nav_social_icon bi-facebook"></i>
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/otaman_uk?igshid=YmMyMTA2M2Y=" target="_blank">
                        <span class="header_first_row_nav_social_icon bi-instagram"></span>
                    </a>
                </li>
                <li>
                    <a href="https://t.me/otaman_uk" target="_blank">
                        <span class="header_first_row_nav_social_icon bi-telegram"></span>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/channel/UCukJVUgwCY9Am_Yg1huTWtQ" target="_blank">
                        <span class="header_first_row_nav_social_icon bi-youtube"></span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Second row -->
    <div class="header_second_row">
        <div class="header_second_row_block">
            <!-- Logo -->
            <a href="/" class="header_second_row_block_logo_link">
                <img class="header_second_row_block_logo" src="../assets/logo.png" alt="logo">
            </a>

            <!-- Search -->
            <form class="header_second_row_block_search" name="search" method="get" action="search-result.php">

                <input class="header_second_row_block_search_input search-field" placeholder="Пошук" name="search"
                    autocomplete="off" />

                <button class="header_second_row_block_search_button">
                    <i class="header_second_row_block_search_button_icon bi-search"></i>
                </button>

                <div class="header_second_row_block_search_results"></div>
            </form>

            <!-- Phone button -->
            <a href="tel:+38 063 408 83 04" class="header_second_row_block_phone">
                +38 (063) 408 83 04
            </a>

            <div class="header_second_row_block_buttons">

                <!-- Mobile phones button -->
                <a href="tel:+38 063 408 83 04" class="desktop_navbar_phones_btn_mobile">
                </a>

                <!-- Basket button -->
                <div class="header_second_row_basket">
                    <button class="header_second_row_basket_btn">
                        <div class="header_second_row_basket_btn_icon">
                            <span class="basket_btn_icon"></span>
                            <span class='header_second_row_basket_btn_icon_badge count' style="display:
                        <?
                        if($get_basketCountItems == 0) {
                            echo(" none"); } ?>;">
                                <? echo($get_basketCountItems);?>
                            </span>
                        </div>
                        <span class="header_second_row_basket_btn_icon_price valuee">0 ₴</span>
                    </button>
                    <!-- Basket results -->
                    <div class="header_second_row_basket_block">
                    </div>
                </div>

                <!-- Mobile basket button -->
                <a href="my-cart.php" class="header_second_row_basket_mobile">
                    <div class="header_second_row_basket_mobile_btn_icon">
                        <span class="basket_btn_icon"></span>
                        <span class='header_second_row_basket_mobile_btn_icon_badge count' style="display:
                        <? if($get_basketCountItems == 0) { echo(" none"); }?>;">
                            <? echo($get_basketCountItems);?>
                        </span>
                    </div>
                </a>

                <?
                $user_email = $_SESSION['login'];
                if(gettype($user_email) === 'NULL'){
                    ?>
                <!-- Login -->
                <a href="login" style="display: flex; align-items: center; column-gap: 5px;">
                    <i class="header__loginIcon bi-person-fill"></i>
                    <span class="header__loginText">Увiйти</span>
                </a>
                <? } else{ ?>
                <!-- Wish button -->
                <?php
                    $get_wishCount=mysqli_query($con,"SELECT * from wishlist where userid='$_SESSION[id]'");
                    $wishCountNum=mysqli_num_rows($get_wishCount);
                    ?>
                <a class="header_second_row_block_buttons_wish" href="wishlist">
                    <i class="header_second_row_block_buttons_wish_icon bi-heart"></i>
                    <span class="header_second_row_block_buttons_wish_count"><?=$wishCountNum?></span>
                </a>
                <!-- My cabinet -->
                <a href="my-account" style="display: flex; align-items: center; column-gap: 5px;">
                    <i class="header__loginIcon bi-person-fill"></i>
                </a>
                <!-- Logout -->
                <a href="logout">
                    <span class="header_first_row_log_block_login_icon_exit"></span>
                </a>
                <? } ?>
            </div>
        </div>
    </div>
</header>

<!-- Mobile search form -->
<form class="header_second_row_block_search header_second_row_block_search--mobile" name="search" method="get"
    action="search-result.php">
    <input class="header_second_row_block_search_input search-field" placeholder="Пошук" name="search"
        autocomplete="off" />
    <button class="header_second_row_block_search_button">
        <i class="header_second_row_block_search_button_icon bi-search"></i>
    </button>
    <div class="header_second_row_block_search_results"></div>
</form>

<div class="mobile_menu_bg"></div>

<!-- Navigation -->
<?php include('header/nav.php') ?>

<!-- Product details popup -->
<?php include('header/product_details_popup.php');?>