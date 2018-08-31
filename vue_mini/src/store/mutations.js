import getters from './getters'
const state = {
  head_title : "热门活动",
  return_btu:false,
  user_id:0,
  position:0
}

const mutations = {
  activity(state){
    state.head_title = "热门活动";
    state.return_btu = false;
  },
  discovery(state){
    state.head_title = "精选地点";
    state.return_btu = true;
  },
  myinfo(state){
    state.head_title = "我的信息";
    state.return_btu = true;
  },
  act_detail(state){
    state.head_title = "活动详情";
    state.return_btu = true;

  },
  loc_detail(state){
    state.head_title = "地点详情";
    state.return_btu = true;
  },
  update_id(state,id){
    state.user_id = id;
  },
  position(state,pos){
    state.position = pos;
  }
}

export default{
  state,
  mutations,
  getters
}
