<?php 
$row23 = get_info_page($con,7);
$title = $row23['title'];
$soc_description = $row23['soc_info_description'];
?>
<!DOCTYPE html>
<html lang="uk">

<head>
    <base href="<?php echo checkIsHttp() .  $_SERVER['SERVER_NAME']; ?>" />
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

    <meta property="og:image" content="assets/no_foto.png" />
    <meta property="og:title" content="<?=$row23['title']?>" />

    <meta property="og:description" content="<? echo($soc_description);?>" />
    <meta name="description" content="<? echo($soc_description);?>">

    <meta name="author" content="">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">
    <title><?=getGoogleTitle($con,13)?></title>
    <?php include('includes/links.php');?>
    <link rel="stylesheet" href="assets/css/contact.css" />

</head>

<body class="cnt-home">
    <!-- Header -->
    <?php include('includes/main-header.php');?>

    <div class="body-content outer-top-xs" id="top-banner-and-menu">
        <div class="container">
            <div class="furniture-container homepage-container">
                <div class="row">
                    <div class="html-code-output">
                        <div class="col-xs-12 col-sm-12 col-md-9" id="contact_wrpa">
                            <? echo '<h1>' . $title . '</h1>'; ?>
                            <h2>Філії та контакти</h2>

                            <?$sql = mysqli_query($con,"select * from contact");?>
                            <?while($row = mysqli_fetch_array($sql)):?>
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 contact_block">
                                <h3><?=$row['title']?></h3>
                                <p>
                                    <?=$row['adres']?><br />
                                    тел.: <a class="contacts-phone" href="tel:<?=$row['phone1']?>">
                                        <?=$row['phone1']?>
                                    </a><br>
                                    тел.: <a class="contacts-phone" href="tel:<?=$row['phone2']?>">
                                        <?=$row['phone2']?>
                                    </a><br>
                                    e-mail: <a href="mailto:<?=$row['email']?>">
                                        <?=$row['email']?>
                                    </a>
                                </p>
                            </div>
                            <?endwhile;?>
                            <div class="col-lg-8 col-md-7 col-sm-7 col-xs-12">
                                <span id="map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2544.4065180522557!2d30.919370315942118!3d50.37762000049077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4e7d3669c9c3b%3A0x903b7fcf98f4c890!2z0YPQuy4g0JfQsNC_0L7RgNC-0LbRgdC60LDRjywgMTAsINCR0L7RgNC40YHQv9C-0LvRjCwg0JrQuNC10LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgMDgzMDA!5e0!3m2!1sru!2sua!4v1657102280758!5m2!1sru!2sua"
                                        width="100%" height="320" style="border:0;" allowfullscreen="" loading="lazy"
                                        referrerpolicy="no-referrer-when-downgrade"></iframe></span>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-12 col-md-3">
                            <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12 form_header">
                                Зворотній зв'язок</div>
                            <div class="msg" onclick="gsapMsg.reverse()">Сообщение</div>
                            <form style="color:black;" enctype="multipart/form-data" method="post" id="form"
                                onsubmit="send(event, 'small_php_func/send_contact_form.php')">
                                <div class="group-input">
                                    <div class="group-text-input">
                                        <div class="input-wrap">
                                            <label for="name" class="input-label">Ваше ім'я</label>
                                            <input name="name" id="name" type="text" class="form-input aInput"
                                                autocomplete="off" placeholder="Андрій Шевченко">
                                        </div>
                                        <div class="input-wrap">
                                            <label for="company" class="input-label">Ваша компанія</label>
                                            <input name="company" id="company" type="text" class="form-input aInput"
                                                autocomplete="off" placeholder="Найкраща">
                                        </div>
                                        <div class="input-wrap">
                                            <label for="phone" class="input-label">Номер телефону</label>
                                            <input name="phone" id="phone" type="text" class="form-input aInput"
                                                autocomplete="off" placeholder="+38 (099) 999-99-99">
                                        </div>
                                        <ul>
                                            <div class="input-wrap">
                                                <label for="email" class="input-label">E-mail</label>
                                                <input name="email" id="email" type="text" class="form-input aInput"
                                                    autocomplete="off" placeholder="example@gmail.com">
                                            </div>
                                        </ul>
                                        <div class="input-wrap">
                                            <textarea name="text" id="texta" class="aInput"
                                                placeholder="Повідомлення"></textarea>
                                        </div>
                                        <div class="file-wrap">
                                            <label for="myfile" class="labelFile">
                                                <img src="https://img.icons8.com/ios/50/000000/upload-to-cloud.png" />
                                                <p class="count">Закріпити файл</p>
                                            </label>
                                            <input type="file" multiple class="inputFile" id="myfile" name="file[]"
                                                multiple="multiple" onchange="inputFile(event)" />
                                        </div>
                                        <button type="submit" class="button right" id="response">Відправити</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php include('includes/footer.php');?>

    <script src="assets/js/lib/gsap.min.js"></script>
    <script src="assets/js/contact.js"></script>
</body>

</html>