<template>
  <section id="main" @click="closeSelector">
    <section class="start-logo">
      <img src="./assets/logo.png" alt="logo">
    </section>
    <section class="title-wrapper">
      <h1 class="title">{{ title }}</h1>
    </section>
    <section class="wrap-select">
      <Selector />
    </section>
    <section class="search">
      <Search />
    </section>
  </section> 
</template>

<script>
import Selector from './components/Selector.vue';
import Search from './components/Search.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const store = useStore();
    const title = ref('FindFast');

    function closeSelector(e) {
      if (!e.target.closest('#selector')) store.commit('closeSelectorGlobal');
    }
    return {
      title,
      closeSelector
    }
  },
  components: {
    Selector,
    Search
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap');
* {
  font-family: Roboto, Arial, Helvetica, sans-serif;
}
#main {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 3rem;
  }
}
</style>
