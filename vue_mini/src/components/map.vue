<template>
  <div>
    <!--<GmapMap v-bind:center="{lat:10, lng:10}"-->
    <GmapMap v-bind:center="center" v-bind:zoom="13" map-type-id="terrain" v-bind:options="mapStyle"
      style="max-width:450px;width: 100vw; height: 87vh">
      <GmapMarker v-bind:key="index" v-for="(m, index) in markers"
        v-bind:position="m.position"
        v-bind:clickable="true"
        v-bind:icon="icon"
        :draggable="false"
        @click="map_tap(m)"
      />
      <!--<GmapMarker v-bind:key="100"-->
                  <!--v-bind:position="my_position"-->
                  <!--v-bind:clickable="true"-->
                  <!--v-bind:icon="my_loc"-->

                  <!--:draggable="true"-->
                  <!--@click="map_tap(m)"-->
      <!--/>-->
    </GmapMap>
    <img src="../assets/images/ispintap.png" class="my_loc" @click="get_my_loc">
    <router-link to="/discovery">
    <img class="change_to_loc_list" src="../assets/images/list.png">
    </router-link>
    <router-link :to="{path:'/activity_detail',query:{Id:curr_loc.loc_id,type:'loc'}}">
    <div class="map_box" v-show="show_box">
      <img v-bind:src="server_url + curr_loc.urlPath" class="map_item_image">
      <div class="map_box_info">
        <div class="map_box_info_cat">
          <img src="../assets/images/urban.png" class="map_title_img">
        </div>
        <div class="map_item_name">
          <span>{{curr_loc.loc_name}}</span>
        </div>
      </div>
    </div>
    </router-link>
  </div>
</template>

<script>
  export default{
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
          // //console.log(result);
          that.markers=result;
          // //console.log(this.markers);
          that.center = {"lat": -33.91781, "lng": 151.2325};
          that.markers = [];
          for(var i in result){
            // //console.log(result[i]);
            that.markers.push({"position":{"lat":result[i].locationLatitude
              , "lng":result[i].locationLongitude,
                "loc_name":result[i].locationName,
                "urlPath":result[i].urlPath,"loc_id":result[i].locationId}
            });

          }
        }

      });
      // $.ajax({
      //   url: "https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyD78ti68KfHeGEOosHrp_m8vzPHmP2n9Ec",
      //   type: "get",
      //   dataType: "json",
      //   async: false,
      //
      //   success: function (result) {
      //     that.my_position = result.results[0].geometry.location;
      //     //console.log(that.my_position);
      //   }
      // });
      navigator.geolocation.getCurrentPosition(function(location) {
        // //console.log(location.coords.latitude);
        // //console.log(location.coords.longitude);
        // //console.log(location.coords.accuracy);
        //console.log(location);
        that.my_position = {"lat":location.coords.latitude,"lng":location.coords.longitude};
      });
    },
    data () {
      return {
        curr_loc:"",
        show_box:false,
        server_url:"http://www.sharegotech.com/shareGo/",
        mapStyle: {
          // disableDefaultUI: true,
          // zoomControl: true,
          mapTypeControl: false,
        },
        icon: {
          url: require('../assets/images/discovery_b.png'),
          size: {width: 46, height: 46, f: 'px', b: 'px'},
          scaledSize: {width: 23, height: 23, f: 'px', b: 'px'}
        },
        my_loc: {
          url: require('../assets/images/my_loc.png'),
          size: {width: 46, height: 46, f: 'px', b: 'px'},
          scaledSize: {width: 40, height: 40, f: 'px', b: 'px'}
        },
        my_position:{lat: 37.421701600, lng: -122.0826832}
        // center: {lat: -33.91781, lng: 151.2325},
        // markers: [{
        //   position: {lat: 10.0, lng: 10.0}
        // }, {
        //   position: {lat: 11.0, lng: 11.0}
        // }]
      }
    },
    methods:{
      map_tap:function (m) {
        //console.log(m.position);
        this.curr_loc = m.position;
        this.show_box = true;
      },
      get_my_loc:function () {
        //console.log('get my');
        var that = this
        navigator.geolocation.getCurrentPosition(function(location) {
          // //console.log(location.coords.latitude);
          // //console.log(location.coords.longitude);
          // //console.log(location.coords.accuracy);
          //console.log(location);
          that.my_position = {"lat":location.coords.latitude,"lng":location.coords.longitude};
        });
      }
    }
  }
</script>
<style scoped>
  .map_box{
    height: 150px;
    width: 330px;
    /*border: 1px solid red;*/
    z-index: 5;
    position: fixed;
    top:68vh;
    left:20px;
    background-color: rgba(0,230,230,.7);
    /*opacity: 0.5;*/
  }
  .map_item_image{
    width: 150px;
    height: 120px;
    margin-left: 15px;
    margin-top: 15px;
    float: left;
  }
  .map_box_info{
    width: 160px;
    height: 120px;
    /*border: 1px solid red;*/
    float: left;
    margin-top: 15px;
  }
  .map_box_info_cat{
    width: 100%;
    height: 30px;
    /*border: 1px solid red;*/
  }
  .map_title_img{
    width:90px;
    height: 25px;
    margin-top: 2.5px;
  }
  .map_item_name{
    width: 100%;
    height: 80px;
    /*border: 1px solid red;*/
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    color: black;
  }
  .change_to_loc_list{
    position: fixed;
    width: 60px;
    height: 60px;
    left: 30px;
    top:80px;
  }
  .gm-style-mtc {
    display: none;
  }
  .my_loc{
    position: fixed;
    width: 50px;
    height: 50px;
    z-index: 11;
    top:55vh;
    left:100vw;
    margin-left: -55px;

  }
</style>
