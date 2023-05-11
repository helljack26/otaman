<!-- Footer -->
<footer id="footer" class="wow fadeInUp">
    <div class="footer_container">
        <!-- CONTACT INFO -->
        <div class="footer_container_info">
            <h5>www.<?=footer_name($con,"logo")?></h5>
            <span>
                <?=footer_name($con,"adress")?>
            </span>
            <div>
                <a href="tel:<?=footer_name($con,"number")?>">
                    <?=footer_name($con,"number")?>
                </a>
                <span>
                    (пн — нд: <?=footer_name($con,"time1")?>)
                </span>
            </div>
            <a href="mailto:sales@vikar.center">
                <?=footer_name($con,"email")?>
            </a>
            <div class="footer_container_info_social">
                <span class="footer_container_info_social_title">Наші соцмережі:</span>
                <div class="footer_container_info_social_block">
                    <a target="_blank" href="https://www.facebook.com/otamann">
                        <span class="footer_container_info_social_fb"></span>
                    </a>
                    <a target="_blank" href="https://instagram.com/otaman_uk?igshid=YmMyMTA2M2Y=">
                        <span class="footer_container_info_social_instagram"></span>
                    </a>
                    <a target="_blank" href="https://t.me/otaman_uk">
                        <span class="footer_container_info_social_telegram"></span>
                    </a>
                    <a target="_blank" href="https://www.youtube.com/channel/UCukJVUgwCY9Am_Yg1huTWtQ">
                        <span class="footer_container_info_social_youtube"></span>
                    </a>
                </div>
            </div>
        </div>

        <!-- CONTACT TIMIN -->
        <div class="footer_container_stores">
            <div class="footer_container_stores_address">
                <h5><?=footer_name($con,"title")?></h5>
                <span><?=footer_name($con,"adres1")?></span>
            </div>
            <div class="footer_container_stores_schedule">
                <h6>
                    Графiк роботи
                </h6>
                <span>
                    пн — нд: <?=footer_name($con,"time1")?>
                </span>
            </div>
        </div>

        <!-- INFORMATION -->
        <div class="footer_container_information">
            <h5>Інформація</h5>
            <ul>
                <li>
                    <a href="page/aboutus"><?=info_name($con,1)?></a>
                </li>
                <li>
                    <a href='page/reviews'><?=info_name($con,2)?></a>
                </li>
                <li>
                    <a href='page/news'><?=info_name($con,3)?></a>
                </li>
                <li>
                    <a href='shares.php'><?=info_name($con,4)?></a>
                </li>
                <li>
                    <a href='page/help'><?=info_name($con,5)?></a>
                </li>
                <li>
                    <a href='page/delivery'><?=info_name($con,6)?></a>
                </li>
                <li>
                    <a href='page/contact'><?=info_name($con,7)?></a>
                </li>
                <li>
                    <a href='page/oferta'><?=info_name($con,8)?></a>
                </li>
                <li>
                    <a href='page/personalDate'><?=info_name($con,9)?></a>
                </li>
                <li>
                    <a href='page/certificates'><?=info_name($con,11)?></a>
                </li>
            </ul>
        </div>

        <!-- SUBSCRIBE -->
        <div class="footer_container_subscribe">
            <h5>Підписатись на розсилку</h5>
            <div class="footer_container_subscribe_form">
                <input type="email" placeholder="Email" name="subcribe_email" class="footer_container_subscribe_input" />
                <button type="button" class="footer_container_subscribe_button">
                    <span></span>
                </button>
            </div>
            <span class="footer_container_subscribe_success"></span>
            <span>Будьте в курсі наших новинок та акцій</span>

            <span class="footer_container_subscribe_linkToOnix">Розроблено onixlab.com.ua</span>
        </div>

    </div>
</footer>

<!-- Slider -->
<script type="text/javascript" src="assets/js/slick-1.8.1/slick/slick.min.js"></script>

<!-- Libs -->
<script type="text/javascript" src="assets/js/lib/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/lib/bootstrap-hover-dropdown.min.js"></script>
<script type="text/javascript" src="assets/js/lib/bootstrap-select.min.js"></script>
<script type="text/javascript" src="assets/js/lib/echo.min.js"></script>
<script type="text/javascript" src="assets/js/lib/jquery.easing-1.3.min.js"></script>
<script type="text/javascript" src="assets/js/lib/wow.min.js"></script>
<!-- Binotel -->
<script type="text/javascript">
(function(d, w, s) {
    var widgetHash = '1oyqdw84v6x963f8ubwp',
        gcw = d.createElement(s);
    gcw.type = 'text/javascript';
    gcw.async = true;
    gcw.src = '//widgets.binotel.com/getcall/widgets/' + widgetHash + '.js';
    var sn = d.getElementsByTagName(s)[0];
    sn.parentNode.insertBefore(gcw, sn);
})(document, window, 'script');
</script>
<!--binotel end -->

<!-- Main script -->
<script type="text/javascript" src="assets/js/scripts.js"></script>
<script type="text/javascript" src="assets/js/product_details_popup.js"></script>

<style>
#bingc-passive {
    top: 10% !important;
    z-index: 99900000909999 !important;
}
</style>