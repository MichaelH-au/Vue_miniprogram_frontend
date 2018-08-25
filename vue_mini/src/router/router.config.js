import Activity from '../components/activity.vue'
import Discovery from '../components/discovery.vue'
import Myinfo from '../components/myinfo.vue'
import Activity_detail from '../components/activity_detail'
import Map from '../components/map'

export default [
  {
    path:"/activity",
    component:Activity,
    meta:{
      title:"热门活动"
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
      title:"精选地点"
    }
  },
  {
    path:"/myinfo",
    component:Myinfo,
    meta:{
      title:"我的信息"
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
    path:"*",
    redirect:"/activity"
  },
]
