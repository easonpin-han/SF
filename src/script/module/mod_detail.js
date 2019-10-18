define(['jquery','jqcookie'], function () {
    return {
        init:(function () {
            let id = location.search.slice(1).split('=')[1];
            $.get('http://10.31.155.53/SF/php/detail.php', { 'id': id }, function (data) {
                let h1str = '';
                let pricestr = '';
                let yjstr = '';
                let picitemsstr = '';
                let jqZoomLensstr = '';
                let zoomdivstr = '';
                h1str += `<h1 title="">${data.titledetail}</h1>`;
                pricestr += `<strong class="price">${data.price}</strong>`;
                yjstr += `<div class="yj">原价：${data.yj}</div>`;
                for (let value of data.urls.split(',')) {
                    picitemsstr += `
                    <li>
                        <img title="${data.titledetail}" alt="${data.titledetail}" src="${value}">
                    </li>`;
                }
                jqZoomLensstr += `<img alt="${data.titledetail}" width="330" height="330" src="${data.url}">`;
                zoomdivstr += `<img class="bigimg" src="${data.url}">`
                $('.cm').append(h1str);
                $('.priceBox').append(pricestr);
                $('.pItemsPrice').append(yjstr);
                $('.pic-items ul').append(picitemsstr);
                $('#zoom-jpg').append(jqZoomLensstr);
                $('.zoomdiv').append(zoomdivstr);
                    const pViewdiv=$('#pView');//大盒子
                    const picitemsdiv=$('.pic-items');//小图列表div
                    const picitemsul=$('.pic-items ul');//小图列表ul
                    const picitemsimg=$('.pic-items ul li img');//小图列表图片
                    const picitemsli=$('.pic-items ul li');//小图列表li
                    const szoompicdiv=$('#zoom-jpg');//小放图片div
                    const szoompic=$('#zoom-jpg img');//小放图片
                    const szoomdiv=$('.jqZoomLens');//小放div
                    const bzoomdiv=$('.zoomdiv');//大放div
                    const bzoomdivimg=$('.bigimg');//大放图片
                    const forward=$('#btn-forward b');//上箭头
                    const bacward=$('#btn-bacward b');//下箭头
                // ---------------左边图片效果+放大镜
                // 显示图片的效果
                let picshow = () =>{
                    picitemsli.on('mouseenter', ()=> {
                        $(this).children('img').addClass('img-hover').parent().siblings('li').children('img').removeClass('img-hover');
                        let src = $(this).children('img').attr('src');
                        szoompic.attr('src', src);
                        bzoomdivimg.attr('src', src);
                    });
                };
                picshow();
                //箭头是否显示
                let  arrowdisable = () =>{
                    console.log(picitemsli.size());
                    if (picitemsli.size() <= 5) {
                        bacward.addClass('disabled');
                    } else {
                        bacward.removeClass('disabled');
                    }
                };
                arrowdisable();
                // 上下箭头点击事件
                let  arrow = () => {
                    let $num = 5;
                    bacward.on('click', ()=> { //下箭头点击事件
                        let picitemsliheight = picitemsli.height(); //存储一个li的高度
                        if ($num < picitemsli.length) {
                            forward.removeClass('disabled');
                            $num++;
                            if ($num === picitemsli.length) {
                                bacward.addClass('disabled');
                            }
                            picitemsul.animate({
                                top: -($num - 5) * picitemsliheight
                            });
                        }
                    });
                    forward.on('click', ()=> { //上箭头点击事件
                        let picitemsliheight = picitemsli.height(); //存储一个li的高度
                        if ($num > 5) {
                            bacward.removeClass('disabled');
                            $num--;
                            // console.log($num);
                            if ($num === 5) {
                                forward.addClass('disabled');
                            }
                            picitemsul.animate({
                                top: -($num - 5) * picitemsliheight
                            });
                        }
                    });
                };
                arrow();
                // 鼠标移入放大镜效果
                let  zoom = ()=> {
                    const szoompicdivW = szoompicdiv.width(); //小放图片div的宽度
                    const szoompicdivH = szoompicdiv.height();
                    const bzoomdivW = bzoomdiv.width(); //大放div的宽度
                    const bzoomdivH = bzoomdiv.height();
                    const bzoomdivimgW = bzoomdivimg.width(); //大放div图片的宽度
                    const bzoomdivimgH = bzoomdivimg.height();
                    let bili = bzoomdivimgW / szoompicdivW; //比例
                    szoompicdiv.on('mouseenter', ()=> {
                        szoomdiv.css({ visibility: "visible" });
                        bzoomdiv.css({ display: "block" });
                        // ↓计算小放的尺寸
                        szoomdiv.css('width', szoompicdivW * bzoomdivW / bzoomdivimgW);
                        szoomdiv.css('height', szoompicdivH * bzoomdivH / bzoomdivimgH);
                        // 求比例
                        szoompicdiv.on('mousemove', (ev)=> {
                            let $l = ev.clientX - szoompicdiv.offset().left - szoomdiv.width() / 2; //小放div的宽度szoomdiv.width()
                            let $t = ev.clientY - szoompicdiv.offset().top - szoomdiv.height() / 2;
                            if ($l <= 0) {
                                $l = 0;
                            } else if ($l >= szoompicdivW - szoomdiv.width()) {
                                $l = szoompicdivW - szoomdiv.width();
                            }
                            if ($t <= 0) {
                                $t = 0;
                            } else if ($t >= szoompicdivH - szoomdiv.height()) {
                                $t = szoompicdivH - szoomdiv.height();
                            }
                            szoomdiv.css("left", $l);
                            szoomdiv.css("top", $t);
                            bzoomdivimg.css("left", -bili * $l);
                            bzoomdivimg.css("top", -bili * $t);
                        });
                    });
                    szoompicdiv.on('mouseleave', ()=>{
                        szoomdiv.css({ visibility: "hidden" });
                        bzoomdiv.css({ display: "none" });
                    })
                };
                zoom();
                // -------------------存取cookie
                    let pBtn=$('.pBtn'); //加入购物车按钮
                    let addcartbox=$('#addcartbox'); //点击加入购物车按钮弹出的窗口
                    let pClose=$('.pClose'); //弹窗关闭按钮
                    let goodsamount=$('.goodsamount'); //数量
                    let padd=$('.p-add'); //+
                    let preduce=$('.p-reduce'); //-
        
                    //点击加入购物车按钮效果
                    let  pBtnonclick= () => {
                        //点击加入购物车按钮，添加购物车
                        //思路：利用两个数组存放商品的id和数量
                        let sidarr = []; //存放sid
                        let amountarr = []; //存放数量
                        //提前预定cookie的key值，才能应用判断
                        if ($.cookie('cookiesid') && $.cookie('cookieamount')) {
                            sidarr = $.cookie('cookiesid').split(',');
                            amountarr = $.cookie('cookieamount').split(',');
                        }
                        // console.log(this.goodsamount);
                        //第一次加入购物车，创建商品列表，第二次只需要数量累加,提前获取cookie来验证。
                        //点击加入购物车按钮，将当前页面商品的sid存放到sidarr数组中，一起存入cookie
        
                        // 点击加入购物车
                        pBtn.on('click',() => {
                            addcartbox.css({display: "block"});
                            //当前取出的cookie里面存放sid的数组
                            if (sidarr.indexOf(id)!== -1){ //第二次只需要数量累加
                                //获取当前sid对应的数量，取出数量，和当前的新的数量进行累加
                                //sidarr.indexOf(sid)//当前的sid在存入cookie数组的索引位置
                                // console.log(0);
                                let index=sidarr.indexOf(id)
                                amountarr[index] = parseInt(amountarr[index])+ parseInt(goodsamount.val());
                                $.cookie('cookieamount', amountarr.toString(),{expires:10});
                            }else{ //第一次加入购物车，创建商品列表
                                sidarr.push(id);
                                $.cookie('cookiesid', sidarr.toString(),{expires:10});
                                amountarr.push(goodsamount.val());
                                $.cookie('cookieamount',amountarr.toString(),{expires:10});
                            }
                        });
                        // 点击关闭按钮
                        pClose.on('click',() => {
                            addcartbox.css({display: "none"});
                            goodsamount.val('1');
                        });
                    };
                    pBtnonclick();
                    // 数量改变
                    // amountchage = () => {
                    //     goodsamount.on('change',() => {
                            
                    //     })
                    //     let i=parseInt(goodsamount.val());
                    //     padd.on('click',() => {
                    //         i++;
                    //         goodsamount.val(i.toString());
                    //     });
                    // }
            }, 'json')
        }),
    }
});