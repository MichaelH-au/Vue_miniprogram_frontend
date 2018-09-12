<template>
  <div style="position: relative;overflow: hidden">
    <header class="header">
      {{head_title}}
    </header>
    <a href="javascript:history.go(-1)" class="return_link">
    <img src="../assets/images/down_arrow.png" class="return_btn" v-show="return_btu">
    </a>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default{
    computed:mapGetters(["head_title","return_btu","user_id"]),
    watch:{
      $route(to){
        console.log("222233332");
        console.log(this.user_id);
        console.log(to.query.type);
        if(to.path == "/activity"){
          this.$store.dispatch("activity");
        }else if (to.path == "/discovery"){
          this.$store.dispatch("discovery")
        }else if (to.path == "/myinfo"){
          this.$store.dispatch("myinfo")
        }else if (to.path == "/activity_detail" && typeof(to.query.type) == "undefined"){
          this.$store.dispatch(("act_detail"));
        }else if (to.path == "/activity_detail" && to.query.type == "loc"){
          this.$store.dispatch(("loc_detail"));
        }
        // else if (to.path == "/activity_detail" and to.query())

      }
    }
  }
</script>

<style>
.header{
    /*position:fixed;*/
    /*position: relative;*/
  /*display: none;*/
    width: 100vw;
    max-width: 450px;
    background-color: #77D9C7;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: white;
}
  .return_link{
    width: 40px;
    height: 40px;
    position: absolute;
    top:5px;
    left:10px;
    z-index: 10;
  }
  .return_btn{
    position: absolute;
    width: 40px;
    height: 40px;
    top:0px;
    left:0px;
    z-index: 10;
  }
</style>

