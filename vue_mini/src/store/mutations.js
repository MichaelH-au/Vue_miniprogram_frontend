import getters from './getters'
const state = {
  head_title : "热门活动",
  return_btu:false
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
  }
}

export default{
  state,
  mutations,
  getters
}
