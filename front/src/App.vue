<template>
  <section id="main">
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

export default {
  name: 'App',
  data: () => ({
    title: 'FindFast'
  }),
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
