
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
      <div class="event_box" v-if="all_cate">
        <router-link :to="{path:'/activity_detail',query:{Id:item.locationId,type:'loc'}}">
          <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          <div class="back_color"></div>
          <img src="../assets/images/CB.png" class="back_text"></img>
          <h3 class="item_title">{{item.locationName}}</h3>
          <span class="item_infos">{{item.locationIntro}}</span>
          <div class="item_love">
            <img src="../assets/images/favored.png" alt="">
            <span v-if="item.fav_number != null">{{item.fav_number}}</span>
            <span v-else>0</span>
          </div>
        </router-link>
      </div>
      <div class="event_box" v-else-if="item.locationType == curr_type">
        <router-link :to="{path:'/activity_detail',query:{Id:item.locationId,type:'loc'}}">
          <img  v-bind:src="server_url + item.urlPath"  alt="" class="act_item_img">
          <div class="back_color"></div>
          <img src="../assets/images/CB.png" class="back_text"></img>
          <h3 class="item_title">{{item.locationName}}</h3>
          <span class="item_infos">{{item.locationIntro}}</span>
          <div class="item_love">
            <img src="../assets/images/favored.png" alt="">
            <span v-if="item.fav_number != null">{{item.fav_number}}</span>
            <span v-else>0</span>
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
          // this.all_events = result.body;
          //console.log(result);
          that.all_locations=result;

          // //console.log(this.all_events[0]);
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
      }
    },

    methods: {

      tclick(e) {

        // //console.log(e.target.innerText);
        // this.all = "bbb";
        // //console.log(this.all_events[0].urlPath);
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
  .active{
    color:#77D9C7;
    border-bottom:2px solid #77D9C7;
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
  .back_text{
    position: absolute;
    width: 80%;
    height: 60%;
    left:10%;
    top:10%;
    z-index: 6;
  }

  .item_title{
    width: 65%;
    left:17%;
    top:30%;
    text-align: center;
    position: absolute;
    z-index: 7;
    color:black;
  }

  .item_infos{
    width: 100%;
    text-align: center;
    display: block;
    position: absolute;
    top:87%;
    border-bottom: 1px solid gainsboro;
    color:black;
  }
  .item_love{
    position: absolute;
    width: 60px;
    height: 20px;
    /*border: 1px solid red;*/
    left:75%;
    top:65%;
    z-index: 9;
    border-radius: 5px;
    background-color: rgba(255,255,255,.7);;
  }
  .item_love img{
    margin-top: 2px;
    margin-left: 5px;
    width: 17px;
    height: 17px;
    float: left;
    /*display: inline-block;*/
  }
  .item_love span{
    float: left;
    /*display: inline-block;*/
    margin-top: 2px;
    margin-left: 10px;
    font-size: 14px;
    /*border: 1px solid red;*/
  }
</style>

