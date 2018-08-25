<template>
  <!--<div>-->
  <div style="text-align: center;overflow: auto;height: 80vh;border: 0px solid red;-webkit-overflow-scrolling: touch">

    <div id="user_img">
      <img src="../assets/images/user.png" alt="">
    </div>
    <span id="nav_texts">点击头像，即可登陆</span>
    <div class="box">
      <img class="imgs" src="../assets/images/myplace.png">
      <span class="texts">收藏地点</span>
    </div>
    <div class="box">
      <img class="imgs" src="../assets/images/myevent.png">
      <span class="texts">收藏活动</span>
    </div>
    <div class="box">
      <img class="imgs" src="../assets/images/myfeedback.png">
      <span class="texts">建议与反馈</span>
    </div>

  </div>
    <!--</div>-->
</template>

<style scoped>
  #user_img{
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
</style>
