$("#phone").mask("+38 (999) 99-99-999");

// Объявления
var msg = document.querySelector(".msg");
var gsapMsg = gsap.to(".msg", 0.25, {
    autoAlpha: 1,
    y: -40,
    ease: Expo.inOut,
    paused: true,
});
var arrInput = document.querySelectorAll(".aInput");

// Функция появления статуса отправки сообщения
function showMsg(message, color) {
    msg.innerText = message;
    msg.style.background = color;
    gsapMsg.restart();
}

// Оформление input file
function inputFile(e) {
    el = e.target.parentNode.querySelector(".count");
    if (e.target.value != "")
        el.innerHTML = "Выбрано файлов: " + e.target.files.length;
    else el.innerHTML = "Прикрепить файлы";
}

$(document).ready(function () {
    var dis = false;
    $("#email").on("keyup input", function () {
        if ($("#email").val() !== "") {
            dis = true;
        } else {
            dis = false;
            $("#email").addClass("inpt");
        }
    });
    $("#name").on("keyup input", function () {
        if ($("#name").val().length > 0) {
            dis = true;
        } else {
            dis = false;
            $("#name").css("border", "1px solid #A30000");
        }
    });
    $("#phone").on("keyup input", function () {
        if ($("#phone").val().length > 0) {
            dis = true;
        } else {
            dis = false;
            $("#phone").css("border", "1px solid #A30000");
        }
    });
    $("#texta").on("keyup input", function () {
        if ($("#texta").val().length > 0) {
            dis = true;
        } else {
            dis = false;
            $("#texta").css("border", "1px solid #A30000");
        }
    });
});