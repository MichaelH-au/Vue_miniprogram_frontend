<template>
  <div id='active_container'style="overflow: auto;height: 87vh;border: 0px solid red;-webkit-overflow-scrolling: touch;">
    <!--This is activity-->

    <ul id="nav_bar">
      <li v-for="(item,index) in category" v-bind:class="index==0?'items active':'items'" @click="tclick">
        {{item}}
      </li>
      <!--<div style="clear: both"></div>-->
    </ul>
    <div class="banner_box">
      <div class="banner_block">
        <ul id="banner_imgs">
          <li v-for="(item) in banner">
            <div class="banner_content"></div>
            <p class="banner_title">{{item.eventName}}</p>
            <p class="banner_time">{{item.eventTime}}</p>
            <p class="banner_loc">{{item.eventLocation}}</p>
            <img v-bind:src="item.eventImageUrl" class="banner_img">
          </li>
        </ul>
      </div>
    </div>
    <div v-for="(item) in all_events">
      <div class="event_box" v-if="all_cate">
        <router-link :to="{path:'/activity_detail',query:{Id:item.eventId}}">
          <div class="img_box">
            <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          </div>
          <div class="item_bottom">
            <div class="item_bot_left">
              <h3 class="item_title">{{item.eventName}}</h3>
              <span class="item_info">{{item.eventIntro}}</span>
            </div>
            <div class="item_middle"></div>
            <div class="item_bot_right">
              <ul class="item_ul">
                <li class="item_li">
                  <div class="item_love">
                    <img src="../assets/images/like-3.svg.png" alt="">
                    <span v-if="item.fav_number != null">{{item.fav_number}}</span>
                    <span v-else>0</span>
                  </div>
                </li>
                <li class="item_li">{{item.eventPrice}}</li>
                <li class="item_li">
                  <!--{{rate_images[item.eventRating]}}-->
                  <img class="act_item_start" v-bind:src="rate_images[item.eventRating]" alt="">
                </li>
              </ul>
            </div>
          </div>
        <!--<div class="back_color"></div>-->
        <!--<img src="../assets/images/CB.png" class="back_text"></img>-->
          <!--<div class="item_love">-->
            <!--<img src="../assets/images/favored.png" alt="">-->
            <!--<span v-if="item.fav_number != null">{{item.fav_number}}</span>-->
            <!--<span v-else>0</span>-->
          <!--</div>-->
        </router-link>
      </div>
      <div class="event_box" v-else-if="item.eventType == curr_type">
        <router-link :to="{path:'/activity_detail',query:{Id:item.eventId}}">
          <div class="img_box">
            <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          </div>
          <div class="item_bottom">
            <div class="item_bot_left">
              <h3 class="item_title">{{item.eventName}}</h3>
              <span class="item_info">{{item.eventIntro}}</span>
            </div>
            <div class="item_middle"></div>
            <div class="item_bot_right">
              <ul class="item_ul">
                <li class="item_li">
                  <div class="item_love">
                    <img src="../assets/images/like-3.svg.png" alt="">
                    <span v-if="item.fav_number != null">{{item.fav_number}}</span>
                    <span v-else>0</span>
                  </div>
                </li>
                <li class="item_li">{{item.eventPrice}}</li>
                <li class="item_li">
                  <!--{{rate_images[item.eventRating]}}-->
                  <img class="act_item_start" v-bind:src="rate_images[item.eventRating]" alt="">
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    mounted(){
      console.log('start');
      window.addEventListener('scroll', this.handleScroll);
      $(".items").eq(0).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"})
      let new_wid = $(".banner_img").eq(0).width();
      //console.log(new_wid);
      let silder = function () {
        $("#banner_imgs").animate({marginLeft: -new_wid}, 800, function () {
          $("#banner_imgs li").first().appendTo($("#banner_imgs"));
          $("#banner_imgs").css("marginLeft", 0);
        });
      };
      // silder();
      this.timer = setInterval(silder,3500);
      this.timer;

    },
    beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        //console.log('clear timer')
        clearInterval(this.timer); //关闭
      }
    },
    beforeMount(){

      //console.log("555");
      if (this.all_events){
        //console.log("have");
      }else {
        //console.log("no have");
      }
      let that = this;
      $.ajax({
        url: "https://www.sharegotech.com/events/getUpcommingEvents_H5",
        type: "get",
        dataType: "json",
        async: false,

        success: function (result) {
          // this.all_events = result.body;
          // //console.log(result);
          //console.log(result);
          that.all_events=result.events;
          // console.log(that.all_events);
          // //console.log(this.all_events[0]);

          that.banner = result.banner;
          for (let i in that.all_events){
            let newRating = 3 + (that.all_events[i].eventRating - 5) / 5 + (that.all_events[i].fav_number - 5) / 5;
            newRating = Math.round(newRating);
            newRating = (newRating > 5)?5:newRating;
            newRating = (newRating < 1)?1:newRating;
            // console.log(newRating);
            that.all_events[i].eventRating = newRating - 1;
            let fav_num = that.all_events[i].fav_number;
            if (fav_num <= 10){
              that.all_events[i].fav_number = parseInt(15 * Math.sqrt(fav_num + 1) + parseInt(that.all_events[i].eventId) % 5);
            }else if(fav_num <= 100){
              that.all_events[i].fav_number = parseInt(25 * Math.sqrt(fav_num + 1) + parseInt(that.all_events[i].eventId) % 5);
            }else {
              that.all_events[i].fav_number = parseInt(30 * Math.sqrt(fav_num + 1) + parseInt(that.all_events[i].eventId) % 5);
            }


          }

        }

      });
      console.log(this.banner);
    },
    data:function () {
      return {
        category : ["所有活动","文艺生活","美食集市","户外活动","职业发展"],
        server_url:"http://www.sharegotech.com/shareGo/",
        up_load:false,
        all_cate: true,
        curr_type:"",
        banner:"",
        current_position:0,
        rate_images:[require('../assets/images/6.png'),
                     require('../assets/images/7.png'),
                     require('../assets/images/8.png'),
                     require('../assets/images/9.png'),
                     require('../assets/images/10.png')]

      }
    },

    methods: {
      handleScroll () {
        this.current_position = $(document).scrollTop();
      },
      tclick(e) {

        if (e.target.innerText == this.category[0]){
          $(".items").eq(0).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = true;
        }else if(e.target.innerText == this.category[1]) {
          $(".items").eq(1).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "art entertainment";
        }else if(e.target.innerText == this.category[2]) {
          $(".items").eq(2).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "hard skill development";
        }else if(e.target.innerText == this.category[3]) {
          $(".items").eq(3).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "physical entertainment";
        }else if(e.target.innerText == this.category[4]) {
          $(".items").eq(4).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "soft skill development";
        }
        //console.log(this.curr_type);
      },
      slicer(){
        $(".items").eq(0).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"})
        let new_wid = $(".banner_img").eq(0).width();
        //console.log(new_wid);
        let silder = function () {
          $("#banner_imgs").animate({marginLeft: -new_wid}, 800, function () {
            $("#banner_imgs li").first().appendTo($("#banner_imgs"));
            $("#banner_imgs").css("marginLeft", 0);
          });
        };

      }
    }
  }
</script>
<style scped>

  @import '../assets/css/list.css';

  /*@font-face {*/
  /*font-family: 'yuanjian';*/
  /*src: url('../assets/fonts/yuanjian.ttf');*/
  /*}*/

  .header{
    width: 100vw;
    background-color: #77D9C7;
    position:fixed;
    height: 70px;
    text-align: center;
    line-height: 70px;
    color: white;
    z-index: 10;
  }
  #nav_bar{
    /*border: 1px solid red;*/
    width: 400px;
    height: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }



  .event_box{
    max-width: 400px;
    width:90vw;

    margin-left: 20px;
    height: 45vh;
    border: 2px solid gainsboro;
    border-radius: 10px;
    box-shadow: 1 1 0 1;
    /*background: blue;*/
    position: relative;
    margin-top: 18px;
  }

  .act_item_img{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }


  .banner_box{
    max-width: 450px;
    width: 100hv;
    height: 250px;
    /*border: 1px solid red;*/
    position: relative;
    overflow: hidden;
    /*border: 1px solid red;*/
    margin-top: 10px;
  }
  .banner_block{
    /*clear: both;*/
    height: 100%;
    width:100%;

    position: relative;
    overflow: hidden;
    display: inline;

  }
  #banner_imgs{
    height: 100%;
    width: auto;
    display: inline-block;
    white-space:nowrap;
  }
  /*#imgs li img{*/
    /*height:230px;*/
    /*max-width: 450;*/
    /*width:92vw!important;*/
    /*!*border-radius: 20px;*!*/
  /*}*/
  #banner_imgs li{
    display: inline-block;
    max-width: 450px;
    height: 100%;
    width:100vw!important;
    position:relative;
    /*margin-left: 10px;*/
  }
  .banner_img{
    height:250px;
    max-width: 450px;
    width:100vw  !important;
    /*display: none;*/
    /*margin-left: -10px;*/
    /*margin-left: 10px;*/
    /*border-radius: 20px;*/
    /*/*margin-top: 10px;*/
  }
  .banner_title{
    position: absolute;
    top:110px;
    left:20px;
    max-width: 450px;
    white-space: normal;
    width: 90vw;
    /*border: 1px solid red;*/
    color:white;
    font-size: 22px;
    font-weight: 300;
    z-index: 2;
  }
  .banner_time{
    position: absolute;
    top:190px;
    left:20px;
    max-width: 450px;
    white-space: normal;
    width: 90vw;
    /*border: 1px solid red;*/
    color:white;
    font-size: 14px;
    font-weight: 300;
    z-index: 2;
  }
  .banner_loc {
    position: absolute;
    top: 215px;
    left: 20px;
    max-width: 450px;
    white-space: normal;
    width: 90vw;
    /*border: 1px solid red;*/
    color: white;
    font-size: 14px;
    font-weight: 300;
    z-index: 2;
  }

  .banner_content{
    height:250px;
    max-width: 450px;
    width:100vw  !important;
    position: absolute;
    background: linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 1));
    z-index: 1;
  }

</style>
