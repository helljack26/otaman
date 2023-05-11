<?
require_once '../../config.php';
include '../../../function.php';

    $sql = mysqli_query($con,"SELECT id,categoryName from category");  
    while($row4 = mysqli_fetch_array($sql)){   
?>
<li data="<?=$row4['id']?>">
        <a class='all_cat' href="/category/<?=transliterate($row4['categoryName'])?>" data="<?=$row4['id']?>">
            <?echo $row4['categoryName']?>
        </a>
        <span class="expand">
        </span>
    </a>
    <ul class="all_child">
        <span id="all_child_cat<?=$row4['id']?>">
        </span>
    </ul>
</li>
<?}?>


<script>
$(document).ready(function() {
    $(".all_cat").mouseenter(function() {
        id = $(this).attr("data");
        $.ajax({
            type: "POST",
            url: "/includes/header/side-menu-fetch.php",
            data: {
                'id': id,
                'menu': '1'
            },
            success: function(data) {
                $("#all_child_cat" + id).html(data);
            },
        });
    });
});
</script>