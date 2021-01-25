import { createStore } from "vuex";

export default createStore({
  state:() => ({
    placeholder: {
      text: 'Choose network!',
      default: true
    },
    search: {
      value: ' '
    },
    socials: [
      {id: '1', value: 'GitHub', icon: require('../assets/images/github.svg')},
      {id: '3', value: 'VK', icon: require('../assets/images/vk.svg')},
      {id: '3', value: 'Twitter', icon: require('../assets/images/twitter.svg')},
      {id: '4', value: 'Instagram', icon: require('../assets/images/instagram.svg')},
      {id: '5', value: 'Facebook', icon: require('../assets/images/facebook.svg')},
      {id: '6', value: 'LinkedIN', icon: require('../assets/images/linkedin.svg')},
    ],
  }),
  mutations: {
    setNewPlaceholder(state, payload){
      state.placeholder.default = false;
      state.placeholder.text = payload;
    }, 
    setSearchValue(state, payload) {
      state.search.value = payload;
    }
  }

});
