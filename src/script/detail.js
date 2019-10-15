define([], function() {
    return{
        Detail:(function(){
            $.ajax({
                url:'http://10.31.155.53/SF/php/data.php',
                dataType:'json'
            }).done(function(data){
                let detailstrh1=''; //标题
                let detailstryj=''; //原价
                let detailstrprice=''; //价格
                let detailstrpicitems=''; //小图列表
                for(var value of data.detail){
                    detailstrh1 +=
                    `<h1 title="${value.title}">${value.title}</h1>`;
                    detailstryj +=
                    `<div class="yj">${value.yj}</div>`;
                    detailprice +=
                    `<strong class="price">${value.price}</strong>`;
                    detailstrpicitems +=
                    `<li>
                        <img title="" alt="" src="">
                    </li>`
                }
                $('.cm').append(detailstrh1);
                $('.pItemsPrice').append(detailstryj);
                $('.priceBox').append(detailprice);
                $('.pic-items').append(detailstrpicitems);
            });
        })()
    }
});