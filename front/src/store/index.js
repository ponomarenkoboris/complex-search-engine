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
      {id: '1', value: 'GitHub', icon: require('../../public/images/github.svg')},
      {id: '2', value: 'Instagram', icon: require('../../public/images/instagram.svg')},
      {id: '3', value: 'VK', icon: require('../../public/images/vk.svg')},
      {id: '4', value: 'Facebook', icon: require('../../public/images/facebook.svg')},
      {id: '5', value: 'LinkedIN', icon: require('../../public/images/linkedin.svg')},
      {id: '6', value: 'Telegram', icon: require('../../public/images/telegram.svg')}
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
