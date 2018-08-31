<template>
  <!--<div>-->
  <div style="text-align: center;overflow: auto;max-width: 450px;height: 80vh;border: 0px solid red;-webkit-overflow-scrolling: touch">

    <div id="user_img">
      <img v-bind:src="user_url" alt="">
    </div>
    <span id="nav_texts">{{user_name}}</span>
    <fb:login-button
      scope="public_profile,email"
      @onlogin="checkLoginState">
    </fb:login-button>

    <router-link to="/my_fav_locations" v-if="this.user_id != 0">
    <div class="box">
      <img class="imgs" src="../assets/images/myplace.png">
      <span class="texts">收藏地点</span>
    </div>
    </router-link>
    <div class="box" v-else>
      <img class="imgs" src="../assets/images/myplace.png">
      <span class="texts">收藏地点</span>
    </div>


    <router-link to="/my_fav_events" v-if="this.user_id != 0">
    <div class="box">
      <img class="imgs" src="../assets/images/myevent.png">
      <span class="texts">收藏活动</span>
    </div>
    </router-link>
    <div class="box" v-else>
      <img class="imgs" src="../assets/images/myevent.png">
      <span class="texts">收藏活动</span>
    </div>

    <div class="box">
      <img class="imgs" src="../assets/images/myfeedback.png">
      <span class="texts">建议与反馈</span>
    </div>
    {{head_title}}
  </div>
    <!--</div>-->
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    computed:mapGetters(["head_title","return_btu","user_id"]),
    data:function () {
      return {
        user_name:"",
        user_url:require('../assets/images/user.png'),
        status:false,
        router_link:"/myinfo"
      }
    },
    beforeMount() {
      name:"Myinfo",
      //console.log(this.user_id);
      this.$store.state.user_id = 100;
      //console.log("@#@#");
      //console.log(this.user_url);
      //console.log("###");
      //console.log(this.status);
        window.fbAsyncInit = function () {
          //console.log("router change");
          FB.init({
            appId: '323685144842971',
            cookie: true,
            xfbml: true,
            version: 'v3.1'
          });

          FB.AppEvents.logPageView();
          FB.getLoginStatus(function (response) {
            //console.log(response);
            statusChangeCallback(response);
          });

        };

        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        var that = this;

        // //console.log(that);
        function statusChangeCallback(response) {
          if (response.status == 'connected') {
            //console.log('Logged in ');
            FB.api('/me?fields=name,email,picture', function (response) {
              if (response && !response.error) {
                //console.log(response);
                //console.log(that);
                that.user_name = response.name;
                that.user_url = "https://graph.facebook.com/" + response.id + "/picture?width=300&height=300";
                that.status = true;
                // that.user_id = response.id;
                // //console.log(response.picture.data.url);
                // that.user_url = response.picture.data.url;
                // that.$store.state.user_id = response.id;
                that.$store.commit('update_id',response.id);
                //console.log(response.id);
                $('.fb_iframe_widget_fluid').css('display', 'none');
                $.ajax({
                  type:'post',
                  data:{'userId':response.id},
                  url:'https://www.sharegotech.com/events/add_user_H5',
                  success:function () {
                    //console.log('success');
                  }
                });
              } else {
                //console.log('error res');
              }
            });
          }
        }

        function checkLoginState() {
          console.group("cilck login");
          FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
          });
        }

    },
    mounted(){
      window.checkLoginState=this.checkLoginState
    },
    methods:{
      checkLoginState(){
        console.group("cilck login####");
        FB.getLoginStatus(function(response) {
          //console.log(response);
          statusChangeCallback(response);
        });
      },

    }
  }
</script>

<style scoped>
  #user_img{
    max-width: 450px;
    width: 100vw;
    height: 200px;
    /*border: 1px solid red;*/
    text-align: center;

  }

  #user_img img{
    width: 130px;
    height: 130px;
    margin-top: 40px;
    border: 2px solid #77D9C7;
    border-radius: 50%;
  }

  #nav_texts{
    font-size: 24px;
    font-weight: bold;
    line-height: 30px;
  }

  .box{
    max-width: 330px;
    width: 80vw;
    height: 70px;
    border: 2px solid #77D9C7;
    margin: 0 auto;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
    box-shadow: 4px 4px 3px #aaa;
    border-radius: 20px;
  }

  .imgs{
    width:40px;
    height: 40px;
    float: left;
    margin-left: 10px;
    margin-top: 13px;
  }

  .texts{
    width: 100%;
    float: left;
    line-height: 70px;
    font-size: 22px;
    /*display: block;*/
    text-align: center;
    margin-left: -50px;

  }

  #fb-btn{
    width: 150px;
  }
</style>
