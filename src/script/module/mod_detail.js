define(['jquery'], function () {
    return {
        init: (function () {
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

                function Viewpic() {
                    this.pViewdiv = $('#pView'); //大盒子
                    this.picitemsdiv = $('.pic-items'); //小图列表div
                    this.picitemsul = $('.pic-items ul'); //小图列表ul
                    this.picitemsimg = $('.pic-items ul li img'); //小图列表图片
                    this.picitemsli = $('.pic-items ul li'); //小图列表li
                    this.szoompicdiv = $('#zoom-jpg'); //小放图片div
                    this.szoompic = $('#zoom-jpg img'); //小放图片
                    this.szoomdiv = $('.jqZoomLens') //小放div
                    this.bzoomdiv = $('.zoomdiv') //大放div
                    this.bzoomdivimg = $('.bigimg') //大放图片
                    this.forward = $('#btn-forward b') //上箭头
                    this.bacward = $('#btn-bacward b') //下箭头
                }
                Viewpic.prototype.init = function () {
                    this.picshow(); //显示图片的效果
                    this.arrowdisable(); //箭头显示
                    this.arrow(); //上下箭头点击事件
                    this.zoom(); //鼠标移入放大镜效果
                };
                Viewpic.prototype.picshow = function () {
                    let _this = this;
                    this.picitemsli.on('mouseenter', function () {
                        $(this).children('img').addClass('img-hover').parent().siblings('li').children('img').removeClass('img-hover');
                        let src = $(this).children('img').attr('src');
                        _this.szoompic.attr('src', src);
                        _this.bzoomdivimg.attr('src', src);
                    });
                };
                Viewpic.prototype.arrowdisable = function () {
                    if (this.picitemsli.size() <= 5) {
                        this.bacward.addClass('disabled');
                    } else {
                        this.bacward.removeClass('disabled');
                    }
                };
                Viewpic.prototype.arrow = function () {
                    let _this = this;
                    let $num = 5;
                    this.bacward.on('click', function () { //下箭头点击事件
                        let picitemsliheight = _this.picitemsli.height(); //存储一个li的高度
                        if ($num < _this.picitemsli.length) {
                            _this.forward.removeClass('disabled');
                            $num++;
                            if ($num === _this.picitemsli.length) {
                                _this.bacward.addClass('disabled');
                            }
                            _this.picitemsul.animate({
                                top: -($num - 5) * picitemsliheight
                            });
                        }
                    });
                    this.forward.on('click', function () { //上箭头点击事件
                        let picitemsliheight = _this.picitemsli.height(); //存储一个li的高度
                        if ($num > 5) {
                            _this.bacward.removeClass('disabled');
                            $num--;
                            console.log($num);
                            if ($num === 5) {
                                _this.forward.addClass('disabled');
                            }
                            _this.picitemsul.animate({
                                top: -($num - 5) * picitemsliheight
                            });
                        }
                    });
                };
                Viewpic.prototype.zoom = function () {
                    let _this = this;
                    const szoompicdivW = _this.szoompicdiv.width(); //小放图片div的宽度
                    const szoompicdivH = _this.szoompicdiv.height();
                    const bzoomdivW = _this.bzoomdiv.width(); //大放div的宽度
                    const bzoomdivH = _this.bzoomdiv.height();
                    const bzoomdivimgW = _this.bzoomdivimg.width(); //大放div图片的宽度
                    const bzoomdivimgH = _this.bzoomdivimg.height();
                    let bili = bzoomdivimgW / szoompicdivW; //比例
                    this.szoompicdiv.on('mouseenter', function () {
                        _this.szoomdiv.css({ visibility: "visible" });
                        _this.bzoomdiv.css({ display: "block" });
                        // ↓计算小放的尺寸
                        _this.szoomdiv.css('width', szoompicdivW * bzoomdivW / bzoomdivimgW);
                        _this.szoomdiv.css('height', szoompicdivH * bzoomdivH / bzoomdivimgH);
                        // 求比例
                        $(this).on('mousemove', function (ev) {
                            let $l = ev.clientX - _this.szoompicdiv.offset().left - _this.szoomdiv.width() / 2; //小放div的宽度_this.szoomdiv.width()
                            let $t = ev.clientY - _this.szoompicdiv.offset().top - _this.szoomdiv.height() / 2;
                            if ($l <= 0) {
                                $l = 0;
                            } else if ($l >= szoompicdivW - _this.szoomdiv.width()) {
                                $l = szoompicdivW - _this.szoomdiv.width();
                            }
                            if ($t <= 0) {
                                $t = 0;
                            } else if ($t >= szoompicdivH - _this.szoomdiv.height()) {
                                $t = szoompicdivH - _this.szoomdiv.height();
                            }
                            _this.szoomdiv.css("left", $l);
                            _this.szoomdiv.css("top", $t);

                            _this.bzoomdivimg.css("left", -bili * $l);
                            _this.bzoomdivimg.css("top", -bili * $t);
                        });
                    });
                    this.szoompicdiv.on('mouseleave',function(){
                        _this.szoomdiv.css({ visibility: "hidden" });
                        _this.bzoomdiv.css({ display: "none" });
                    })
                }
                function Savecookie(){
                    this.pBtn=$('.pBtn'); //加入购物车按钮
                    this.addcartbox=$('#addcartbox'); //点击加入购物车按钮弹出的窗口
                    this.pClose=$('.pClose'); //弹窗关闭按钮
                    this.goodsamount=$('.text'); //数量
                }
                Savecookie.prototype.init=function(){
                    this.pBtnonclick();
                };
                Savecookie.prototype.pBtnonclick=function(){
                    let _this=this;
                    //点击加入购物车按钮，添加购物车
                    //思路：利用两个数组存放商品的id和数量
                    let sidarr = []; //存放sid
                    let amountarr = []; //存放数量
                    //提前预定cookie的key值，才能应用判断
                    if ($.cookie('cookiesid') && $.cookie('cookieamount')) {
                        sidarr = $.cookie('cookiesid').split(',');
                        amountarr = $.cookie('cookieamount').split(',');
                    }
                    //第一次加入购物车，创建商品列表，第二次只需要数量累加,提前获取cookie来验证。
                    //点击加入购物车按钮，将当前页面商品的sid存放到sidarr数组中，一起存入cookie
                    this.pBtn.on('click',function(){
                        _this.addcartbox.css({display: "block"});
                        //当前取出的cookie里面存放sid的数组
                        if (sidarr.indexOf(id)!== -1){ //第二次只需要数量累加
                            //获取当前sid对应的数量，取出数量，和当前的新的数量进行累加
                            //sidarr.indexOf(sid)//当前的sid在存入cookie数组的索引位置
                            let index=sidarr.indexOf(id)
                            $(amountarr)[index] = parseInt(amountarr[index])+ parseInt(goodsamount.value);
                            $.cookie('cookienum', amountarr.toString(), 10);
                        }else{ //第一次加入购物车，创建商品列表
                            sidarr.push(id);
                            $.cookie('cookiesid', sidarr.toString(), 10);
                            amountarr.push(goodsamount.value);
                            $.cookie('cookienum', amountarr.toString(), 10);
                        }
                        });
                    this.pClose.on('click',function(){
                        _this.addcartbox.css({display: "none"});
                    });
                };

                
                // let amount=0;
                // function Pamount(){
                //     this.padd=$('.p-add'); //+号
                //     this.preduce=$('.p-reduce'); //-号
                // }
                // Pamount.prototype.init=function(){

                // };

                new Viewpic().init();
                new Savecookie().init();
            }, 'json')
        })
    }
});