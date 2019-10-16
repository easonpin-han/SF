define([],function(){
    return{
        render:(function(){
            $.ajax({
                url:'http://10.31.155.53/SF/php/data.php',
                dataType:'json'
            }).done(function(data){
                // 渲染轮播图
                let lunbostr='';
                let btnstr='';
                let diannum=0; //渲染小圆点
                for(var value of data.lunbo){
                    diannum++;
                    lunbostr +=`
                        <li>
                            <a class="fore_pic trackref" href="javascript:;" target="_blank" title="${value.title}">
                                <img id="lunbo_1" alt="${value.title}" src="${value.url}">
                            </a>
                        </li>
                        `
                    if(diannum===1){
                        btnstr +=`<li class="cur">${diannum}</li>`
                    }else{
                        btnstr +=`<li>${diannum}</li>`
                    }
                }
                $('.slide_wrap ol').append(lunbostr);
                $('#lunboNum').append(btnstr);
                // 渲染优选必买图片
                let indexpicstr1='';
                // 渲染水果蔬菜图片
                let indexpicstr2='';
                // let n=0;
                for(var value of data.indexpic){
                    indexpicstr1 +=`
                    <li class="price_list0">
                        <a class="a_buy" href="detail.html?sid=${value.sid}" target="_blank" title="${value.title}">
                            ${value.title}
                        </a>
                        <div class="a_price">
                            <span><i>￥</i>${value.price}</span>
                        </div>
                        <a class="trackref" href="detail.html?sid=${value.sid}" target="_blank" title="${value.title}">
                            <img src="${value.url}" class="lazy" data="${value.url}" alt="${value.title}">
                        </a>
                        <div class="bbtn">
                            <a href="javascript:;">加入购物车</a>
                        </div>
                    </li>
                    `
                    indexpicstr2 +=`
                    <li class="price_list1">
                        <div class="pImg pImg_vip">
                            <a href="detail.html?sid=${value.sid}" title="${value.title}" target="_blank">
                                <img class="lazy" data="${value.url}" alt="${value.title}" src="${value.url}" style="display: block;">
                            </a>
                            <div class="gBtn">
                                <a href="javascript:;">加入购物车</a>
                            </div>
                        </div>
                        <div class="title-a">
                            <a href="detail.html?sid=${value.sid}" title="${value.title}" target="_blank">${value.title}</a>
                        </div>
                        <div class="a_price f_price">
                            <span><i>￥</i>${value.price}</span>
                        </div>
                    </li>
                    `
                }
                $('.bbig').append(indexpicstr1);
                $('.pList').append(indexpicstr2);
                // 渲染为你推荐图片
                let tuijianstr='';
                for(var value of data.tuijian){
                    tuijianstr +=`
                    <li class="price_list2">
                        <div class="pImg pImg_vip">
                            <a href="detail.html?sid=${value.sid}" title="${value.title}" target="_blank" >
                                <img class="lazy" data="${value.url}" src="${value.url}" alt="${value.title}" style="display: block;">
                            </a>
                            <div class="p-btn">
                                <a href="javascript:;">加入购物车</a>
                            </div>
                        </div>
                        <div class="title-a">
                            <a href="detail.html?sid=${value.sid}" title="${value.title}" target="_blank" >${value.title}</a>
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
                // console.log(data.share.url);
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

                function Lunbo(){
                    this.bannerol=$('#index_slide ol');
                    this.lunbonumli=$('#lunboNum li');
                    this.imgs=$('.fore_pic img');
                    this.imgli=$('.slide_wrap ol li');
                }
                Lunbo.prototype.init=function(){
                    this.slidelunbo();
                };
                Lunbo.prototype.slidelunbo=function(){
                    let _this=this;
                    let $num=0;
                    let timer=null;
                    this.imgli.eq(0).clone(true).appendTo(this.bannerol);
                    this.lunbonumli.on('mouseenter',function(){
                        $(this).addClass('cur').siblings('li').removeClass('cur'); //小圆点加类名
                        _this.bannerol.stop(true).animate({
                            left:-1000*($(this).index())
                        })
                    });
                    timer=setInterval(()=>{
                        $num++;
                        if($num<=8){
                            if($num===8){
                                _this.lunbonumli.eq(0).addClass('cur').siblings('li').removeClass('cur');
                            }
                            _this.lunbonumli.eq($num).addClass('cur').siblings('li').removeClass('cur'); //小圆点加类名
                            _this.bannerol.stop(true).animate({
                                left:-1000*($num)
                            });
                        }else{
                            $num=0;
                            _this.bannerol.css('left','0');
                        }
                    },2000);
                };

                function Tab(){
                    this.tabul=$('.slide ul');
                    this.tabli=$('.slide ul li');
                    this.right=$('.btn_next');
                    this.left=$('.btn_prev');
                    this.tabbtn=$('.slideControls span');
                }
                Tab.prototype.init=function(){
                    this.tabswitch();
                };
                Tab.prototype.tabswitch=function(){
                    let _this=this;
                    let $num=0;
                    this.tabbtn.on('mouseenter',function(){
                        $(this).addClass('cur').siblings('span').removeClass('cur');
                        _this.tabul.animate({
                            left:-170*($(this).index())
                        });
                    });
                    this.right.on('click',function(){
                        $num++;
                        $('.clli').remove();
                        let cloneli= _this.tabli.eq(0).clone(true);
                        cloneli.addClass('clli');
                        if($num<=1){
                            _this.tabbtn.eq($num).addClass('cur').siblings('span').removeClass('cur');
                            _this.tabul.animate({
                                left:-170*($num)
                            });
                            cloneli.appendTo(_this.tabul);
                        }else if($num>1){
                            $num=0;
                            _this.tabbtn.eq(0).addClass('cur').siblings('span').removeClass('cur');
                            _this.tabul.animate({
                                left:-340
                            });
                            _this.tabul.css('left','0');
                        }
                    });
                }

                new Lunbo().init();
                new Tab().init();
            });
        })()
    }
});