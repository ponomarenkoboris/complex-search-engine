import { createStore } from "vuex";

export default createStore({
  state:() => ({
    placeholder: {
      text: 'Choose network!',
      default: true
    },
    search: {
      value: ''
    },
    socials: [
      {id: '1', value: 'GitHub', icon: '../../public/images/github.svg'},
      {id: '2', value: 'Instagram', icon: '../../public/images/instagram.svg'},
      {id: '3', value: 'VK', icon: '../../public/images/vk.svg'},
      {id: '4', value: 'Facebook', icon: '../../public/images/facebook.svg'},
      {id: '5', value: 'LinkedIN', icon: '../../public/images/linkedin.svg'},
      {id: '6', value: 'Telegram', icon: '../../public/images/telegram.svg'}
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
