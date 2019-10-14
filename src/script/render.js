define([],function(){
    return{
        Lunbo:(function(){
            // alert($);
            $.ajax({
                url:'http://10.31.155.53/SF/php/data.php',
                dataType:'json',
            }).done(function(data){
                // 渲染轮播图
                let lunbostr='';
                for(var value of data.lunbo){
                    lunbostr +=`
                    <li>
                        <a class="fore_pic trackref" href="javascript:;" target="_blank" title="${value.title}">
                            <img id="lunbo_1" alt="${value.title}" src="${value.url}">
                        </a>
                    </li>
                    `
                }
                $('.slide_wrap ol').append(lunbostr);
                // 渲染优选必买图片
                let indexpicstr1='';
                // 渲染水果蔬菜图片
                let indexpicstr2='';
                let num=0;
                for(var value of data.indexpic){
                    num++;
                    if(num<=8){
                        indexpicstr1 +=`
                        <li class="price_list0">
                            <a class="a_buy" href="javascript:;" target="_blank" title="${value.title}">
                                ${value.title}
                            </a>
                            <div class="a_price">
                                <span><i>￥</i>${value.price}</span>
                            </div>
                            <a class="trackref" href="javascript:;" target="_blank" title="${value.title}">
                                <img src="${value.url}" class="lazy" data="${value.url}" alt="${value.title}">
                            </a>
                            <div class="bbtn">
                                <a href="javascript:;">加入购物车</a>
                            </div>
                        </li>
                        `
                    }else if(num>8){
                        indexpicstr2 +=`
                        <li class="price_list1">
                            <div class="pImg pImg_vip">
                                <a href="javascript:;" title="${value.title}">
                                    <img class="lazy" data="${value.url}" alt="${value.title}" src="${value.url}" style="display: block;">
                                </a>
                                <div class="gBtn">
                                    <a href="javascript:;">加入购物车</a>
                                </div>
                            </div>
                            <div class="title-a">
                                <a href="javascript:;" title="${value.title}">${value.title}</a>
                            </div>
                            <div class="a_price f_price">
                                <span><i>￥</i>${value.price}</span>
                            </div>
                        </li>
                        `
                    }
                }
                $('.bbig').append(indexpicstr1);
                $('.pList').append(indexpicstr2);
                // 渲染为你推荐图片
                let tuijianstr='';
                for(var value of data.tuijian){
                    tuijianstr +=`
                    <li class="price_list2">
                        <div class="pImg pImg_vip">
                            <a href="javascript:;" title="${value.title}" target="_blank" >
                                <img class="lazy" data="${value.url}" src="${value.url}" alt="${value.title}" style="display: block;">
                            </a>
                            <div class="p-btn">
                                <a href="javascript:;">加入购物车</a>
                            </div>
                        </div>
                        <div class="title-a">
                            <a href="javascript:;" title="${value.title}" target="_blank" >${value.title}</a>
                        </div>
                        <div class="a_price f_price">
                            <span><i>￥</i>${value.price}</span>
                        </div>
                    </li>
                    `
                }
                $('#guess_you_like').append(tuijianstr);
                // 渲染底部文章优选味道
                let youxuanstr='';
                for(var value of data.youxuan){
                    youxuanstr +=
                    `<li>
                        <a class="trackref" href="" title="${value.title}" target="_blank">
                            <img data="${value.url}" class="lazy" src="${value.url}" alt="${value.title}" style="display: inline;">
                        </a>
                    </li>`
                }
                $('.zhiwei .slide ul').append(youxuanstr);
                // 渲染底部文章热门晒单
                let sharestr='';
                console.log(data.share.url);
                for(var value of data.share){
                    sharestr +=
                    `<li>
                        <div class="share_c">
                            <div class="l">
                                <a href="javascript:;" title="${value.title}"  target="_blank">
                                    <img src="${value.url}" alt="${value.title}">
                                </a>
                            </div>
                            <div class="r">
                                <p><a href="javascript:;" title="${value.title}">${value.title}</a></p>
                                <p class="s_title"><a class="s_content" href="javascript:;">${value.comm}</a></p>
                            </div>
                        </div>
                    </li>`
                }
                $('#toplist').append(sharestr);
            });
        })()
    }
});