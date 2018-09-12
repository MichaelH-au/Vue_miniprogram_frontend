
<template>
  <div style="overflow: auto;height: 87vh;border: 0px solid red;-webkit-overflow-scrolling: touch;">
    <!--This is activity-->



    <div id="nav_bar">
      <router-link to="/map">
      <div class="nav_img">
        <img src="../assets/images/map.png" alt="">
      </div>
      </router-link>
      <ul>
      <li v-for="(item,index) in category" v-bind:class="index==0?'items active':'items'" @click="tclick">
        {{item}}
      </li>
      </ul>
      <!--<div style="clear: both"></div>-->
    </div>
    <div v-for="(item) in all_locations">
      <div class="loc_box" v-if="all_cate">
        <router-link :to="{path:'/activity_detail',query:{Id:item.locationId,type:'loc'}}">
          <!--<img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">-->
          <!--<div class="back_color"></div>-->
          <!--<img src="../assets/images/CB.png" class="back_text"></img>-->
          <!--<h3 class="item_title">{{item.locationName}}</h3>-->
          <!--<span class="item_infos">{{item.locationIntro}}</span>-->
          <!--<div class="item_love">-->
            <!--<img src="../assets/images/favored.png" alt="">-->
            <!--<span v-if="item.fav_number != null">{{item.fav_number}}</span>-->
            <!--<span v-else>0</span>-->
          <!--</div>-->



          <div class="img_box">
            <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          </div>
          <div class="item_bottom">
            <div class="item_bot_left">
              <h3 class="item_title">{{item.locationName}}</h3>
              <span class="item_info">{{item.locationIntro}}</span>
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
                <li class="item_li">
                  <!--{{rate_images[item.locationRating]}}-->
                  <img class="act_item_start" v-bind:src="rate_images[item.locationRating]" alt="">
                </li>
              </ul>
            </div>
          </div>
        </router-link>
      </div>
      <div class="loc_box" v-else-if="item.locationType == curr_type">
        <router-link :to="{path:'/activity_detail',query:{Id:item.locationId,type:'loc'}}">
          <div class="img_box">
            <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          </div>
          <div class="item_bottom">
            <div class="item_bot_left">
              <h3 class="item_title">{{item.locationName}}</h3>
              <span class="item_info">{{item.locationIntro}}</span>
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
                <li class="item_li">
                  <!--{{rate_images[item.locationRating]}}-->
                  <img class="act_item_start" v-bind:src="rate_images[item.locationRating]" alt="">
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
      $(".items").eq(0).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
    },
    beforeMount(){
      //console.log("555");
      var that = this;
      $.ajax({
        url: "https://www.sharegotech.com/locations/getLocations",
        type: "get",
        dataType: "json",
        async: false,

        success: function (result) {
          // this.all_locations = result.body;
          //console.log(result);
          that.all_locations=result;
          that.banner = result.banner;
          for (let i in that.all_locations){
            console.log(that.all_locations[i]);
            let newRating = 3 + (that.all_locations[i].locationRating - 5) / 5 + (that.all_locations[i].fav_number - 5) / 5;
            newRating = Math.round(newRating);
            newRating = (newRating > 5)?5:newRating;
            newRating = (newRating < 1)?1:newRating;
            console.log(newRating);

            that.all_locations[i].locationRating = newRating - 1;
            let fav_num = that.all_locations[i].fav_number;
            if (fav_num <= 10){
              that.all_locations[i].fav_number = parseInt(15 * Math.sqrt(fav_num + 1) + parseInt(that.all_locations[i].locationId) % 5);
            }else if(fav_num <= 100){
              that.all_locations[i].fav_number = parseInt(25 * Math.sqrt(fav_num + 1) + parseInt(that.all_locations[i].locationId) % 5);
            }else {
              that.all_locations[i].fav_number = parseInt(30 * Math.sqrt(fav_num + 1) + parseInt(that.all_locations[i].locationId) % 5);
            }


          }

          // //console.log(this.all_locations[0]);
        }

      });
    },
    data:function () {
      return {
        category : ["所有地点","市区速览","郊区体验"],
        server_url:"http://www.sharegotech.com/shareGo/",
        up_load:false,
        all_cate: true,
        curr_type:"",
        rate_images:[require('../assets/images/6.png'),
          require('../assets/images/7.png'),
          require('../assets/images/8.png'),
          require('../assets/images/9.png'),
          require('../assets/images/10.png')]
      }
    },

    methods: {

      tclick(e) {

        // //console.log(e.target.innerText);
        // this.all = "bbb";
        // //console.log(this.all_locations[0].urlPath);
        // //console.log(this.server_url);
        if (e.target.innerText == this.category[0]){
          $(".items").eq(0).css({"color":"#77D9C7","border-bottom":"2px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = true;
        }else if(e.target.innerText == this.category[1]) {
          $(".items").eq(1).css({"color":"#77D9C7","border-bottom":"5px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "urban location";
        }else if(e.target.innerText == this.category[2]) {
          $(".items").eq(2).css({"color":"#77D9C7","border-bottom":"5px solid #77D9C7"}).siblings().css({"color":"black","border-bottom":"0px"});
          this.all_cate = false;
          this.curr_type = "nature location";
        }
        //console.log(this.curr_type);
      },
    }
  }
</script>
<style scoped>


  /*@font-face {*/
    /*font-family: 'yuanjian';*/
    /*src: url('../assets/fonts/yuanjian.ttf');*/
  /*}*/


  #nav_bar{
    /*border: 1px solid red;*/
    width: 400px;
    height: 50px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
  .nav_img{
    height: 100%;
    width:60px;
    /*margin-left: 20px;*/
    /*display: inline-block;*/
    float: left;
    /*border: 1px solid red;*/
  }
  .nav_img img{
    height: 50px;
    width:100%;
    margin-left: 12px;
  }

  .items{
    width: 100px;
    height: 100%;
    text-align: center;
    margin-left: 12px;
    /*border: 1px solid red;*/
    /*display: inline-block;*/
    float: left;
    line-height: 46px;
    list-style: none;
  }

  .event_box{
    max-width: 400px;
    width:90vw;
    margin-left: 20px;
    height: 40vh;
    /*border: 0.1px solid red;*/
    /*background: blue;*/
    position: relative;
    margin-top: 18px;
  }

  .loc_box{
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
  .back_color{
    width: 96%;
    margin-left: 10px;
    margin-top: 10px;
    position: absolute;
    height: 80%;
    background-color: #77d9c7;
    opacity: 0.3;
    box-shadow: 4px 4px 1px 0.1px #aaa;
    z-index: 1;
    border-radius: 10px;
  }
  .act_item_img{
    position: absolute;
    width: 96%;
    height: 80%;
    z-index: 5;
    border-radius: 10px;
  }
  .act_item_img{
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }


  .item_title{
    width: 80%;
    text-align: left;
    color:black;
    margin-left: 10px;
    margin-top: 2px;
  }

  .item_info{
    width: 80%;
    text-align: left;
    display: block;
    color:black;
    margin-left: 10px;
    font-size: 13px;
    margin-top: 2px;
    line-height: 3vh;
    /*border: 1px solid white;*/

  }
  .item_love{
    width: auto;
    height: 100%;
    /*border: 1px solid red;*/
    border-radius: 5px;
    text-align: center;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .item_love img{
    width: 17px;
    height: 17px;
    /*float: left;*/
    /*display: inline-block;*/
    /*display: inline-block;*/
  }
  .item_love span {
    /*display: inline-block;*/
    width: auto;
    font-size: 20px;

    margin-left: 3px;
    /*left:50%;*/
    /*line-height: 28px;*/

    /*border: 1px solid red;*/
  }

  .img_box{
    width: 100%;
    height: 75%;
    /*border:1px solid red;*/
  }

  .item_bottom{
    width: 100%;
    height: 25%;
    /*background-color: lavender;*/
  }

  .item_bot_left{
    height: 100%;
    width: 66%;
    /*background-color: red;*/
    font-family: yuanjian;
    line-height: 26px;
    float: left;
  }
  .item_middle{
    width: 1px;
    height: 80%;
    border-left: 1px solid gainsboro;
    margin-top: 2%;
    float: left;
  }
  .item_bot_right{
    height: 100%;
    width: 33.3%;
    /*background-color: blue;*/
    float: left;
    text-align: center;
  }

  .item_ul{
    margin-top: 12.5%;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .item_li{
    width: 70%;
    height: 31%;
    border: 1px solid white;
    list-style: none;
    margin-left: 15%;
    font-size: 18px;
    display:flex;
    align-items: center;
    justify-content: center;
    font-family: yuanjian;
    color: black;

    border-bottom: 1px solid gainsboro;
  }

  .item_li:last-child{
    border-bottom: 0px solid gainsboro;
  }

  .act_item_start {
    width: 80%;
    height: 60%;
  }
</style>

