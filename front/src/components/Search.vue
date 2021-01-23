<template>
    <section class="search-wrapper">
        <section id="search">
            <input type="text" :class="showField" id="search" :placeholder="placeholder" @keyup="deboucedRequest">
            <div class="rearch__result" id="result"></div>
        </section>
        <section class="cards-wrapper">
            <section v-for="card in cards" :key="card.id" class="card">
                <div class="card-img">
                    <img :src="card.avatar_url" alt="user_avatar">
                </div>
                <div class="card-action">
                    <hr>
                    <span class="card-action__title">{{ card.login }}</span>
                    <a :href="card.html_url" class="card-action__link">Open: <span class="card-action__link__site-name"></span></a>
                </div>
            </section>
        </section>
    </section>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import debounce from '../helpers/debounce';

export default {
    name: 'Search',
    setup() {
        const store = useStore();
        const placeholder = computed(() => store.state.placeholder.default ? '' : `Enter a ${store.state.placeholder.text} nickname...`);
        const showField = computed(() => store.state.placeholder.default ? 'search__input-close' : 'search__input-open'); 
        const searchValue = computed(() => store.state.search.value);

        return {
            placeholder,
            showField,
            searchValue
        }
    },
    methods: {
        fetchedReq(event) {
            try {
                if (event.target.value === '') {
                    return;
                }
                console.log(`http://localhost:3000/user/${this.searchValue}/${event.target.value}`);
                // const answer = await fetch(`http://localhost:3000/user/${this.searchValue}/${event.target.value}`);
                // const data = await answer.json(); 
                // console.log('data: ', data);
                
            } catch (error) {
                console.log('ERROR: ', error.message);
            }
        },
        deboucedRequest(e){
            const delay = 3000;
            return debounce(this.fetchedReq(e), delay);
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    display: block;
}   
.search-wrapper{
    width: 494px;
}
.search__input-open {
    visibility: visible;
    width: 100%;
    display: block;
    height: 20px;
    padding: 5px 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 15px;
    transition: .2s ease-in-out;
}
.search__input-close{
    width: 0;
    visibility: none;
    display: none;
    height: 20px;
    padding: 5px 1rem;
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 15px;
}


.card {

    margin-top: 70px;
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, .5);
    margin-bottom: 0;
}
</style>