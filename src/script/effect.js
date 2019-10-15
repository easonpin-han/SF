// define([],function(){
//     return{
//         effect:(function(){
//             function Lunbo(){
//                 this.banner=$('#index_slide');
//                 this.lunbonum=$('#lunboNum');
//                 this.imgs=$('.fore_pic img');
//             }
//             Lunbo.prototype.init=function(){
//                 // console.log(this);
//                 // console.log(this.lunbonum);
//                 this.slide();
//             };
//             Lunbo.prototype.slide=function(){
//                 // console.log(this.lunbonum);
//                 this.lunbonum.on('mouseenter','li',function(){
//                     $(this).addClass('cur').siblings('li').removeClass('cur'); //小圆点加类名
//                 });
//             };

//             new Lunbo().init();
//         })()
//     }
// });

















// !function(){
//     function Lunbo(){
//         this.banner=$('#index_slide');
//         this.btns=$('#lunboNum');
//         this.imgs=$('.fore_pic img');

//         this.preindex=0;
//         this.curindex=0;
//     }
//     Lunbo.prototype.init=function(){
//         let _this=this;
//         this.btns.on('mouseenter',function(ev){
//             _this.curindex=$(this).index();

//         });
//     };

//     Lunbo.prototype.tabswitch=function(ev){
//         this.btns.eq(this.curindex).addClass('cur').siblings('li').remove('cur');
//         if(this.curindex)
//     }
// }