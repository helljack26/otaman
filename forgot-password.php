<?php
session_start();
error_reporting(0);
include('includes/config.php');
if(isset($_POST['change'])) {
    $email=$_POST['email'];
    $contact=$_POST['contact'];
    $password=md5($_POST['password']);
    $query=mysqli_query($con,"SELECT * FROM users WHERE email='$email' and contactno='$contact'");
    $num=mysqli_fetch_array($query);
if($num>0) {
    $extra="forgot-password.php";
    mysqli_query($con,"update users set password='$password' WHERE email='$email' and contactno='$contact' ");
    $host=$_SERVER['HTTP_HOST'];
    $uri=rtrim(dirname($_SERVER['PHP_SELF']),'/\\');
    header("location:http://$host$uri/$extra");
    $_SESSION['errmsg']="Password Changed Successfully";
    exit();
} else {
    $extra="forgot-password.php";
    $host  = $_SERVER['HTTP_HOST'];
    $uri  = rtrim(dirname($_SERVER['PHP_SELF']),'/\\');
    header("location:http://$host$uri/$extra");
    $_SESSION['errmsg']="Invalid email id or Contact no";
    exit();
}}
?>
<!DOCTYPE html>
<html  lang="uk">

<head>
    <!-- Meta -->
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="">
    <meta name="author" content="Кощенко Олександр">
    <meta name="keywords" content="MediaCenter, Template, eCommerce">
    <meta name="robots" content="all">
    <title>Вiдновлення пароля | Отаман</title>

    <?php include('includes/links.php');?>
</head>

<body class="cnt-home">
   <!-- Header -->
    <?php include('includes/main-header.php');?>
     
    <div class="breadcrumb">
        <div class="container">
            <div class="breadcrumb-inner">
                <ul class="list-inline list-unstyled">
                    <li><a href="/">Головна</a></li>
                    <li class='active'>Вiдновлення пароля</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="body-content outer-top-bd">
        <div class="container">
            <div class="sign-in-page inner-bottom-sm">
                <div class="row">
                    <!-- Sign-in -->
                    <div class="col-md-6 col-sm-6 sign-in">
                        <h1>Вiдновлення пароля</h1>
                        <form class="register-form outer-top-xs" name="register" method="post">
                            <span style="color:red;">
                                <?php echo htmlentities($_SESSION['errmsg']);?>
                                <?php echo htmlentities($_SESSION['errmsg']="");?>
                            </span>
                            <div class="form-group">
                                <label class="info-title" for="exampleInputEmail1">Адреса електронної пошти
                                    <span>*</span></label>
                                <input type="email" name="email" class="form-control unicase-form-control text-input"
                                    id="exampleInputEmail1" required>
                            </div>
                            <div class="form-group">
                                <label class="info-title" for="exampleInputPassword1">Контактний номер
                                    <span>*</span></label>
                                <input type="text" name="contact" class="form-control unicase-form-control text-input"
                                    id="contact" required>
                            </div>
                            <div class="form-group">
                                <label class="info-title" for="password">Пароль. <span>*</span></label>
                                <input type="password" class="form-control unicase-form-control text-input"
                                    id="password" name="password" required>
                            </div>
                            <div class="form-group">
                                <label class="info-title" for="confirmpassword">Підтвердьте пароль.
                                    <span>*</span></label>
                                <input type="password" class="form-control unicase-form-control text-input"
                                    id="confirmpassword" name="confirmpassword" required>
                            </div>
                            <button type="submit" class="btn-upper btn btn-primary checkout-page-button"
                                name="change">Змінити</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <?php include('includes/footer.php');?>


    <script type="text/javascript">
        function valid() {
            if (document.register.password.value != document.register.confirmpassword.value) {
                alert("Password and Confirm Password Field do not match  !!");
                document.register.confirmpassword.focus();
                return false;
            }
            return true;
        }
    </script>
</body>

</html>