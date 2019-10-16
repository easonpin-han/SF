define([], function() {
    return{
        Detail:(function(){
            let id=location.search.slice(1).split('=')[1];
            $.get('http://10.31.155.53/SF/php/detail.php',{'id':id},function(data){
                let h1str='';
                let pricestr='';
                let yjstr='';
                let picitemsstr='';
                let jqZoomLensstr='';
                let zoomdivstr='';
                h1str +=`<h1 title="">${data.titledetail}</h1>`;
                pricestr +=`<strong class="price">${data.price}</strong>`;
                yjstr +=`<div class="yj">原价：${data.yj}</div>`;
                for (let value of data.urls.split(',')){
                    picitemsstr +=`
                    <li>
                        <img title="${data.titledetail}" alt="${data.titledetail}" src="${value}">
                    </li>`;
                }
                jqZoomLensstr +=`<img alt="${data.titledetail}" width="330" height="330" src="${data.url}">`;
                zoomdivstr +=`<img class="bigimg" src="${data.url}">`
                $('.cm').append(h1str);
                $('.priceBox').append(pricestr);
                $('.pItemsPrice').append(yjstr);
                $('.pic-items ul').append(picitemsstr);
                $('#zoom-jpg').append(jqZoomLensstr);
                $('.zoomdiv').append(zoomdivstr);

                function Viewpic(){
                    this.picitemsdiv=$('.pic-items'); //小图列表div
                    this.picitemsul=$('.pic-items ul'); //小图列表ul
                    this.picitemsimg=$('.pic-items ul li img'); //小图列表图片
                    this.picitemsli=$('.pic-items ul li'); //小图列表li
                    this.szoompicdiv=$('#zoom-jpg'); //小放图片div
                    this.szoompic=$('#zoom-jpg img'); //小放图片
                    this.szoomdiv=$('.jqZoomLens') //小放div
                    this.bzoomdiv=$('.zoomdiv') //大放div
                    this.bzoomdivimg=$('.bigimg') //大放图片
                    this.forward=$('#btn-forward b') //上箭头
                    this.bacward=$('#btn-bacward b') //下箭头
                }
                Viewpic.prototype.init=function(){
                    this.smallpic(); //显示小放图片的效果
                    this.arrowdisable(); //箭头显示
                    this.arrow(); //上下箭头点击事件
                    this.zoom(); //鼠标移入放大镜效果
                };
                Viewpic.prototype.smallpic=function(){
                    let _this=this;
                    this.picitemsli.on('mouseenter',function(){
                        $(this).children('img').addClass('img-hover').parent().siblings('li').children('img').removeClass('img-hover');
                        let src = $(this).children('img').attr('src');
                        _this.szoompic.attr('src',src);
                    });
                };
                Viewpic.prototype.arrowdisable=function(){
                    if(this.picitemsli.size()<=5){
                        this.bacward.addClass('disabled');
                    }else{
                        this.bacward.removeClass('disabled');
                    }
                };
                Viewpic.prototype.arrow=function(){
                    let _this=this;
                    let $num=5;
                    this.bacward.on('click',function(){ //下箭头点击事件
                        let picitemsliheight=_this.picitemsli.height(); //存储一个li的高度
                        if($num<_this.picitemsli.length){
                            _this.forward.removeClass('disabled');
                            $num++;
                            if($num===_this.picitemsli.length){
                                _this.bacward.addClass('disabled');
                            }
                            _this.picitemsul.animate({
                                top:-($num-5)*picitemsliheight
                            });
                        }
                    });
                    this.forward.on('click',function(){ //上箭头点击事件
                        let picitemsliheight=_this.picitemsli.height(); //存储一个li的高度
                        if($num>5){
                            _this.bacward.removeClass('disabled');
                            $num--;
                            console.log($num);
                            if($num===5){
                                _this.forward.addClass('disabled');
                            }
                            _this.picitemsul.animate({
                                top:-($num-5)*picitemsliheight
                            });
                        }
                    });
                };
                Viewpic.prototype.zoom=function(){
                    let _this=this;
                    let szoompicdivW= _this.szoompicdiv.width();
                    let szoompicdivH= _this.szoompicdiv.height();
                    let bzoomdivW= _this.bzoomdiv.width();
                    let bzoomdivH= _this.bzoomdiv.height();
                    let bzoomdivimgW=_this.bzoomdivimg.width();
                    let bzoomdivimgH=_this.bzoomdivimg.height();
                    this.szoompicdiv.on('mouseenter',function(){
                        _this.szoomdiv.css({visibility:"visible"});
                        _this.bzoomdiv.css({display:"block"});
                        // ↓计算小放的尺寸
                        _this.szoomdiv.css('width',szoompicdivW*bzoomdivW/bzoomdivimgW);
                        _this.szoomdiv.css('height',szoompicdivH*bzoomdivH/bzoomdivimgH);
                        // 求比例
                        let bili=bzoomdivimgW/szoompicdivW;
                        $(this).on('mouseenter',function(ev){
                            //
                        })
                    });
                }

                new Viewpic().init();
            },'json')
        })()
    }
});