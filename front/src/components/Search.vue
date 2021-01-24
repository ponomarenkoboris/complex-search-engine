<template>
    <section class="search-wrapper">
        <section id="search">
            <input type="text" :class="showField" id="search" :placeholder="placeholder" @keyup="sendReq">
            <div class="rearch__result" id="result"></div>
        </section>
        <section v-if="cards.length == 1" class="cards-wrapper">
            <div class="card-icon">
                <img :src="cards.avatar_url" alt="user_avatar" class="card-img">
            </div>
            <div class="card-action">
                <hr>
                <span class="card-action__title">{{ cards.login }}</span>
                <a :href="cards.html_url" class="card-action__link"><span class="card-action__link__site-name">{{ cards.login }}</span></a>
            </div>
        </section>
        <section v-if="cards.length > 1" class="cards-wrapper">
            <section v-for="card in cards" :key="card.login" class="card">
                <div class="card-icon">
                    <img class="card-img" :src="card.avatar_url" alt="user_avatar">
                </div>
                <div class="card-action">
                    <hr>
                    <span class="card-action__title">{{ card.login }}</span>
                    <a :href="card.html_url" class="card-action__link">Open: <span class="card-action__link__site-name">{{ card.login }}</span></a>
                </div>
            </section>
        </section>
        
    </section>
</template>
<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
// import _ from 'lodash';

// TODO add debounce on request function, also rewrite cards render  

export default {
    name: 'Search',
    setup() {
        const store = useStore();
        const placeholder = computed(() => store.state.placeholder.default ? '' : `Enter a ${store.state.placeholder.text} nickname...`);
        const showField = computed(() => store.state.placeholder.default ? 'search__input-close' : 'search__input-open'); 
        const selectedSocial = computed(() => store.state.search.value); 
        const cards = reactive({});  

        async function sendReq(event) {
            if (event.target.value === '' || event.target.value === ' '){
                return 
            }
            try {
                const response = await fetch(`http://localhost:3000/user/${selectedSocial.value}/${event.target.value}`);
                const data = await response.json();
                if (selectedSocial.value === 'GitHub') {
                    for (let i = 0; i < data.items.length; i++) {
                        cards[i] = data.items[i];
                        cards[i].login = data.items[i].login;
                        cards[i].html_url = data.items[i].html_url;
                        cards[i].avatar_url = data.items[i].avatar_url;
                    }
                }
                if (selectedSocial.value === 'VK'){
                    console.log(data);
                    cards.login = data.login;
                    cards.html_url = data.html_url;
                    cards.avatar_url = data.avatar_url;
                }
                
            } catch (error) {
                console.error('ERROR!!!: ', error.message);
            }
        }

        return {
            placeholder,
            showField,
            selectedSocial,
            sendReq,
            cards,
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