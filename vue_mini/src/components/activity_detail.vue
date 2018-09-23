<template>
  <div style="max-width: 350px;">

  <div id="container">
    <!--<div id="loading">-->
      <!--<img src="../assets/images/loading.jpg" alt="">-->
    <!--</div>-->
    <div class="tap_btu " @click="add_fav">
      <img src="../assets/images/collection.png" alt="">
    </div>
    <div id="img_win">
      <div id="imgs_block">
        <ul id="imgs">
        </ul>
      </div>
    </div>
    <div id="img_dot_box">
      <ul id="image_dot">
        <li><div id = "img_dot_1"></div></li>
        <li><div id = "img_dot_2"></div></li>
        <li><div id = "img_dot_3"></div></li>
      </ul>
    </div>
    <div id="header_box">

      <div id="header_con">
<!---->
        <div id="event_name">
          <span ></span>
        </div>
        <div id="event_time">
          <span ></span>
<!---->
        </div>
      </div>
      <div style="clear: both"></div>
      <div id="button_part">
        <div id="content_guide">
          <div id="show_info">INFO</div>
          <div id="show_code">扫一扫</div>
        </div>
        <div style="clear: both"></div>
        <div id="content_guide_1">
          <p>扫一扫发现更多惊喜哦</p>
        </div>
      </div>
      <div style="clear: both"></div>
<!---->
    </div>


    <div id="content">
      <div id="content_body">
        <div id="content_text">
          <p id="content_text_p">
          </p>
          <div id="content_img">
            <img src="../assets/images/Wcode.jpeg" style="width:100%;height:100%">
          </div>
          <h4 style="text-align: center">长按识别二维码，发现更多精彩</h4>

        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>

  import {mapGetters,mapActions} from 'vuex'
  export default{
    data:function () {
      return {
        is_loved:false,
        event_id:"",
        type:""
      }
    },
    beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        //console.log('clear timer')
        clearInterval(this.timer); //关闭
      }
    },
    computed:mapGetters(["head_title","return_btu","user_id"]),
    methods:{
      add_fav:function () {
        //console.log('click');
        //console.log(this.user_id);
        let url_path = "";
        let req_data = {};
        if (this.user_id == 0){
          alert('Please login');
        }else if(this.is_loved){
          this.is_loved = false;
          $(".tap_btu img").attr('src',require('../assets/images/collection.png'));
          alert('You have deleted it');
          if (this.type == 'loc'){
            url_path = "https://www.sharegotech.com/locations/delete_love_locations_H5?userId=" + this.user_id + "&locationId=" + this.event_id;
          }else {
            url_path = "https://www.sharegotech.com/events/delete_love_events_H5?userId=" + this.user_id + "&eventId=" + this.event_id;
          }
          $.ajax({
            type:'delete',
            url:url_path,
            success:function (res) {
              //console.log(res);
              //console.log('has been deleted');
            }
          });
        }else{
          this.is_loved = true;
          $(".tap_btu img").attr('src',require('../assets/images/iscollected.png'));
          alert('Insert successfully');
          //console.log(this.type);
          if (this.type == 'loc'){
            url_path = "https://www.sharegotech.com/locations/add_love_locations_H5";
            req_data = {'userId':this.user_id, 'locationId':this.event_id}
          }else {
            url_path = "https://www.sharegotech.com/events/add_love_events_H5";
            req_data = {'userId':this.user_id, 'eventId':this.event_id}
          }
          //console.log(url_path);
          //console.log(req_data);
          $.ajax({
            type:'post',
            data:req_data,
            url:url_path,
            success:function (res) {
              //console.log(res);
              //console.log('has been deleted');
            }
          });
        }
      }
    },
    mounted(){
      var startX = null;
      var deltaX = null;
      var width = document.body.clientWidth;
      var height = document.documentElement.clientHeight;
      var page_height = document.body.clientHeight;
      var page_width = document.documentElement.clientWidth;
      //console.log(page_height,height);
      //console.log(height,width);
      //console.log('23')
      var slider_enable = false;
      $("body").css("width",width);
      //
      //share variables
      var share_link = "";
      var share_title = "";
      var share_img_url = ""

      $("#loading").css({"width":page_width,"height":height});
      //
      //
      //
      $("#container").show();
      window.num_imgs;
      // //console.log(location.href);
      //Identify the information of url
      function ParseURLParameter(Parameter) {
        var FullURL = location.href.split("?");
        // //console.log("----");
        //console.log(FullURL);
        var ParametersArray = [];
        for (let i = 1; i < FullURL.length;i++){
          //console.log(typeof(FullURL[i]));
          let tmp = FullURL[i].split('&');
          //console.log(tmp);
          for(let i = 0;i < tmp.length;i++){
            // let peer = tmp[i].split('&');
            ParametersArray.push(tmp[i]);

          }
        }
        //console.log(ParametersArray);
        // var ParametersArray = FullURL.split('&');
        // //console.log(ParametersArray);
        for (var i=0; i < ParametersArray.length;i++){
          var CurrentParameter = ParametersArray[i].split('=');
          //console.log(CurrentParameter);
          if(CurrentParameter[0] == Parameter){
            return CurrentParameter[1];
          }
        }
      }
      //
      //Change the background color
      var event_id = ParseURLParameter("Id");
      this.event_id = event_id;
      //console.log(event_id);
      var type = ParseURLParameter("type");
      this.type = type;
      if (type == "loc"){
        $("#container").css("background-color", "#C4F5ED");
        $("#header").css("background-color", "#C4F5ED");
        $("#content_guide").css("border", "1.5px solid #C4F5ED");
        $("#show_info").css("background-color", "#C4F5ED");
      }
      //
      //Request for data from server
      var url = "";
      if (type == "loc"){
        url = "https://www.sharegotech.com/locations/getLocation?locationId=" + event_id;
        share_link = "http://www.sharegotech.com/shareGo/collection/collection.html?Id=" + event_id + "&type=loc"

      }else {
        url = "https://www.sharegotech.com/events/getevent_h5?eventId=" + event_id;
        share_link = "http://www.sharegotech.com/shareGo/collection/collection.html?Id=" + event_id
      }
      // share_link = url;
      //console.log(url);
      $.ajax({
        url:url,
        type:"get",
        async:false,
        dataType:"json",

        success:function (result) {

          //Load images
          console.log(result);
          let images;
          let urlPath;
          if (type == "loc"){
            images = result.locations[0].image;
            urlPath = "";
          }else {
            images = result.events.image;
            //console.log(result.events.image);
            urlPath = "https://www.sharegotech.com/shareGo/";
          }
          //console.log(images.length);
          //console.log(images);
          window.num_imgs = images.length;
          let image_content = "";
          for (let i = 0; i < images.length;i++){
            //console.log(urlPath + images[i].urlPath);
            if (i == 0) {
              image_content += `<li><img id="first_img" src = "${urlPath + images[i].urlPath}"></li>`;
            }else {
              image_content += `<li><img src = "${urlPath + images[i].urlPath}"></li>`;
            }
          }
          //console.log(image_content);
          $("#imgs").html(image_content);
          $("#loading img").attr("src",url + images[0].urlPath);
          //generate dot for the slider
          let dot_content = "";
          if (images.length > 1){
            slider_enable = true;
          }
          for (let i = 0; i < images.length; i++){
            dot_content += `<li><div id = "img_dot_${i+1}"></div></li>`
          }
          //console.log(dot_content);
          $("#image_dot").html(dot_content);
          $("#image_dot li").eq(0).find('div').css({"background-color":"white",'width':'12px','height':'12px'}).siblings().css("background-color","white");
          if (width > 450){
            let curr_width = width;
            width = 450;
            let tab_width = curr_width / 2 + width / 2;
            $(".tap_btu").css("left",tab_width);
          }
          $("#img_dot_box").css("left",width * 0.5 - images.length * 15 / 2);
          $("head").append(`<link rel="icon" href="${images[0].urlPath}" type="image/x-icon" />`)
          share_img_url = images[0].urlPath;



          //Dynamically load information to web
          if (type == "loc"){
            $("#event_name span").text(result.locations[0].locationName);
            // $("event_time span").text()
            share_title = result.locations[0].locationName;
            //console.log("------");
            // //console.log(result.locations[0].locationOpeningHour);
            // $("#event_time span").text(result.locations[0].locationOpeningHour.split("\n")[0]);
            // cosole.log(result.locations[0].locationTime);
            $("#event_time").remove();
            $("Title").html(result.locations[0].locationName);
            let response = result.locations[0];
            // //console.log(response.locationVicinity);
            let text = response.locationVicinity.replace(/\n/g,"<br>");
            // //console.log(text);
            let loc_content = `
                    <h4>地点位置</h4>
                    <p>${response.locationAddress}</p>
                    <br>
                    <h4>开放时间</h4>
                    <p>${response.locationOpeningHour.replace(/\n/g,"<br>")}</p>
                    <br>
                    <h4>联系方式</h4>
                    <p>${response.locationContactNumber}</p>
                    <br>
                    <h4>地点详情</h4>
                    <p style="word-wrap: break-word;">${text}</div>
                    <br>
                    <br>
                    <h4>地点链接</h4>
                    <a href="${response.locationLink}">Register Link</a>


                 `;
            $("#content_text_p").html(loc_content);

          }else{
            //console.log('----------------');
            //console.log(result.events);

            //console.log('----------------');
            $("#event_name span").text(result.events.eventName);
            share_title = result.events.eventName;
            //console.log("----");
            $("#event_time span").text(result.events.eventIntro);
            $("Title").html(result.events.eventName);
            let response = result.events;
            // //console.log(response.locationVicinity);
            let text = response.eventVicinity.replace(/\n/g, "<br>");
            let time = response.eventTime.replace(/\n/g, "<br>");
            text = text.replace(/<</g, "<img class=\"content_img\" src=\"");
            text = text.replace(/>>/g, "\"/>");
            //console.log(text);
            // //console.log(text);
            let loc_content = `
                    <h4>活动详情</h4>
                    <p>${text}</p>
                    <br>
                    <h4>活动须知</h4>
                    <p style="width: 350px;">${response.eventRequirement.replace(/\n/g,"<br>")}</p>
                    <br>
                    <h4>活动时间</h4>
                    <p>${time}</p>
                    <br>
                    <h4>活动地点</h4>
                    <p>${response.eventAddress}</div>
                    <br>
                    <br>
                    <h4>活动票价</h4>
                    <p>${response.eventTicketInfo.replace(/\n/g,"<br>")}</p>
                    <br>
                    <h4>活动着装</h4>
                    <p>${response.eventDressCode.replace(/\n/g,"<br>")}</p>
                    <br>
                    <h4>活动链接</h4>
                    <a href="${response.eventRegisterLink}">Register Link</a>
                    <br>
                    <br>
                    <h4>其他信息</h4>
                    <p>${response.eventOtherInfo.replace(/\n/g,"<br>")}</p>
                 `;
            $("#content_text_p").html(loc_content);
          }

          //Signal for loading complete
          document.getElementById('first_img').onload=function(){
            $("#content_img").css("margin-left",width * 0.97 * 0.94 / 2 - 100);
            $("#loading").hide();
          };

        },
        error:function (result) {
          //console.log(result);
        }
      });
      //console.log('-------------333---------------');
      // this.$store.commit('update_id','ov2NG4-dCiMRP2T5YgxBsZrxGQk8');
      //console.log(this.user_id);
      var that =this;
      let url_path = "";
      if (type == 'loc'){
        url_path = "https://www.sharegotech.com/events/check_love_locations_H5?userId=" + that.user_id + "&locationId=" + event_id;
      }else {
        url_path = "https://www.sharegotech.com/events/check_love_events_H5?userId=" + that.user_id + "&eventId=" + event_id;
      }
      //console.log(url_path);
      if (this.user_id != 0){
        //console.log("!!!");
        $.ajax({
          type:'get',
          url:url_path,
          dataType:"json",
          success:function (res) {
            if (res.love){
              //console.log("333");
              $(".tap_btu img").attr('src',require('../assets/images/iscollected.png'));
              that.is_loved = true;
            }else{
              //console.log("444");
              that.is_loved = false;
            }

          },
          error:function (res) {
            //console.log(res);
          }
        });
      }
      // $.ajax({
      //   type:'get',
      //   url:
      // });

      //
      // //Silder
      // $('#nav').click(function () {
      //   $(this).css("display","none");
        //console.log('22');

      //console.log(width);
      //console.log(height);
      var img_index = 300;
      $("#imgs img").css("width",width - 20);
      // $("body").css("height",height);
      document.querySelector('#img_win').addEventListener('touchstart', function (e) {
        e.preventDefault();
        startX = e.targetTouches[0].pageX;
        this.addEventListener('touchmove', function (e) {
          e.preventDefault();
          deltaX = e.targetTouches[0].pageX - startX;
        }, false)
        e.preventDefault();
        e.stopPropagation();
      }, false);
      //console.log('###############');
      //console.log(width);
      let new_wid = $("#first_img").eq(0).width();
      let slider_fun = function () {
        if(Math.abs(deltaX) >= 40 && slider_enable) {
          if (deltaX > 0) {
            //console.log('you swiped right');
            $("#imgs li").last().prependTo($("#imgs"));
            //console.log("#######");
            $("#imgs").css("marginLeft", -new_wid);
            $("#imgs").animate({marginLeft: 0}, 500, function () {
            });
            img_index -= 1;
          }
          else {
            //console.log('you swiped left');
            $("#imgs").animate({marginLeft: -new_wid}, 500, function () {
              $("#imgs li").first().appendTo($("#imgs"));
              $("#imgs").css("marginLeft", 0);
            });
            img_index += 1;
          }
          //console.log(img_index);
          for (let i = 0; i < window.num_imgs; i++) {
            if (img_index % window.num_imgs == i) {
              $("#image_dot li").eq(i).find('div').css({
                "background-color": "white",
                'width': '12px',
                'height': '12px'
              }).siblings().css({"background-color": "white", 'width': '8px', 'height': '8px'});
              $("#image_dot li").eq(i).siblings().find('div').css({
                "background-color": "white",
                'width': '8px',
                'height': '8px'
              });

            }

          }
        }
      }
      document.querySelector('#img_win').addEventListener('touchend',slider_fun,false);

      let slider_change = function () {
        $("#imgs").animate({marginLeft: -new_wid}, 500, function () {
          $("#imgs li").first().appendTo($("#imgs"));
          $("#imgs").css("marginLeft", 0);
        });
        img_index += 1;
        for (let i = 0; i < window.num_imgs; i++) {
          if (img_index % window.num_imgs == i) {
            $("#image_dot li").eq(i).find('div').css({
              "background-color": "white",
              'width': '12px',
              'height': '12px'
            }).siblings().css({"background-color": "white", 'width': '8px', 'height': '8px'});
            $("#image_dot li").eq(i).siblings().find('div').css({
              "background-color": "white",
              'width': '8px',
              'height': '8px'
            });

          }

        }
      }
      if (window.num_imgs >1) {
        this.timer = setInterval(slider_change, 2500);
        this.timer;

      }

      // show code function
      document.getElementById('show_code').addEventListener('click', show_code_fun);
      function show_code_fun(e) {
        e.preventDefault();
        //console.log('22');
        window.location.href='#content_img';
        if(type == "loc"){
          $('#show_code').css({"color":"white","background-color":"#C4F5ED"});
        }else {
          $('#show_code').css({"color": "white", "background-color": "#FFCCA4"});
        }
        $('#show_info').css({"color":"black","background-color":"white"});
      }

      document.getElementById('show_info').addEventListener('click', show_info_fun);
      function show_info_fun(e) {
        e.preventDefault();
        //console.log('33');
        window.parent.scrollTo(0,240);
        $('#show_code').css({"color":"black","background-color":"white"});
        if(type == "loc"){
          $('#show_info').css({"color":"white","background-color":"#C4F5ED"});
        }else {
          $('#show_info').css({"color": "white", "background-color": "#FFCCA4"});
        }
      };

    }
  }
</script>

<style scoped>
  @import '../assets/css/collection.css';

  /*@font-face {*/
    /*font-family: 'yuanjian';*/
    /*src: url('../assets/fonts/yuanjian.ttf');*/
  /*}*/
</style>
