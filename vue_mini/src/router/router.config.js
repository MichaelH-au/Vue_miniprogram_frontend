import Activity from '../components/activity.vue'
import Discovery from '../components/discovery.vue'
import Myinfo from '../components/myinfo.vue'
import Activity_detail from '../components/activity_detail'
import Map from '../components/map'
import My_fav_events from '../components/my_fav_events'
import My_fav_locations from '../components/my_fav_locations'

export default [
  {
    path:"/activity",
    component:Activity,
    meta:{
      title:"热门活动",
      keepAlive:true,
    }
  },
  {
    path:"/activity_detail",
    component:Activity_detail,
    meta:{
      title:"活动详情"
    }
  },
  {
    path:"/discovery",
    component:Discovery,
    meta:{
      title:"精选地点",
      keepAlive:true,
    }
  },
  {
    name:'Myinfo',
    path:"/myinfo",
    component:Myinfo,
    meta:{
      title:"我的信息",
      keepAlive:true,
    }
  },
  {
    path:"/map",
    component:Map,
    meta:{
      title:"我的信息"
    }
  },
  {
    path:"/my_fav_events",
    component:My_fav_events,
    meta:{
      title:"我的活动"
    }
  },
  {
    path:"/my_fav_locations",
    component:My_fav_locations,
    meta:{
      title:"我的地点"
    }
  },
  {
    path:"*",
    redirect:"/activity"
  },
]
