<template>
  <div>
    <footer id="footer">
      <router-link to="/activity">

      <div class="foot_box">
        <img v-bind:src="act_img" class="foot_bar_imgs">
        <br>
        <span class="foot_text foot_act">热门活动</span>
      </div>
      </router-link>

      <router-link to="/discovery">
      <div class="foot_box">
        <img :src="dis_img" class="foot_bar_imgs">
        <br>
        <span class="foot_text">精选地点</span>
      </div>
      </router-link>

      <router-link to="/myinfo">
      <div class="foot_box">
        <img :src="my_img" class="foot_bar_imgs">
        <br>
        <span class="foot_text">我的信息</span>
      </div>
      </router-link>
    </footer>
  </div>
</template>

<script>
  export default {

    data:function () {
      return {
        act_img:require('../assets/images/event_b.png'),
        dis_img:require('../assets/images/discovery_w.png'),
        my_img:require('../assets/images/me_w.png'),

      }
    },
    mounted:function () {
      $('.foot_text:eq(0)').css("color","black");
      // var height = $(window).height();
      // var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
      // console.log(userAgent);
      // if (userAgent.indexOf("Chrome") > -1) {
        //console.log()
      // }else if(userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
      //   window.addEventListener('scroll', this.handleScroll);
      // }

      // $('#footer').css('top',height);
    },
    // methods:{
    //
    //   handleScroll () {
    //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    //     var height = $(window).height() + 'px';
    //     let test2 = window.innerHeight + 'px';
    //
    //     if ($('#footer').css('top') != test2){
    //       // alert(1);
    //       $('#footer').css('top',test2);
    //     }
    //   },
    // },
    watch: {
      $route(to) {
        //console.log(to.query.type);
        if (to.path == "/activity") {
          this.act_img = require("../assets/images/event_b.png");
          this.dis_img=require('../assets/images/discovery_w.png');
          this.my_img=require('../assets/images/me_w.png');
          $('.foot_text:eq(0)').css("color","black");
          $('.foot_text:not(:eq(0))').css("color","white");
        } else if (to.path == "/discovery") {
          this.act_img = require("../assets/images/event_w.png");
          this.dis_img=require('../assets/images/discovery_icon.png');
          this.my_img=require('../assets/images/me_w.png');
          $('.foot_text:eq(1)').css("color","black");
          $('.foot_text:not(:eq(1))').css("color","white");
        } else if (to.path == "/myinfo") {
          this.act_img = require("../assets/images/event_w.png");
          this.dis_img=require('../assets/images/discovery_w.png');
          this.my_img=require('../assets/images/me_b.png');
          $('.foot_text:eq(2)').css("color","black");
          $('.foot_text:not(:eq(2))').css("color","white");
        } else if (to.path == "/activity_detail" && typeof(to.query.type) == "undefined") {
          this.act_img = require("../assets/images/event_b.png");
          this.dis_img=require('../assets/images/discovery_w.png');
          this.my_img=require('../assets/images/me_w.png');
          $('.foot_text:eq(0)').css("color","black");
          $('.foot_text:not(:eq(0))').css("color","white");
        } else if (to.path == "/activity_detail" && to.query.type == "loc") {
          this.act_img = require("../assets/images/event_w.png");
          this.dis_img=require('../assets/images/discovery_icon.png');
          this.my_img=require('../assets/images/me_w.png');
          $('.foot_text:eq(1)').css("color","black");
          $('.foot_text:not(:eq(1))').css("color","white");
        }
        // else if (to.path == "/activity_detail" and to.query())

      }

    }
  }
</script>

<style scoped>
  #footer{
    position: fixed;
    width: 100vw;
    max-width: 450px;
    background-color: #77D9C7;
    height: 50px;
    top:100%;
    margin-top: -50px;
    z-index: 10;
  }

  .foot_box{
    float: left;
    height: 100%;
    width: 33%;
    text-align: center;
    /*margin-top: 10px;*/
    /*border: 1px solid red;*/
  }

  .foot_bar_imgs{
    margin-top: 5px;
    height: 28px;
    width: 28px;
    margin-left: 5px;
    /*border: 1px solid red;*/
  }

  .foot_text{
    color: white;
    font-size: 12px;
    /*border: 1px solid red;*/
    line-height: 5px;
    display: block;
    margin-top: 0px;
  }
  .foot_text_tap{
    color: black;
    font-size: 12px;
    /*border: 1px solid red;*/
    line-height: 5px;
    display: block;
    margin-top: 0px;
  }
  .foot_act{
    /*color: aqua;*/
  }
</style>
