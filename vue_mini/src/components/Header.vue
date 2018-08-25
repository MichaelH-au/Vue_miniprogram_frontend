<template>
  <div>
    <header class="header">
      {{head_title}}
    </header>
    <a href="javascript:history.go(-1)">
    <img src="../assets/images/down_arrow.png" class="return_btn" v-show="return_btu">
    </a>
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  export default{
    computed:mapGetters(["head_title","return_btu"]),
    watch:{
      $route(to){
        console.log("222233332");
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
    width: 100vw;
    background-color: #77D9C7;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: white;
}
  .return_btn{
    position: fixed;
    width: 40px;
    height: 40px;
    top:5px;
    left:10px;
  }
</style>

