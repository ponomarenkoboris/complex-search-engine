<template>
    <section class="search-wrapper" @click="logCards">
        <section id="search">
            <input type="text" :class="showField" id="search" :placeholder="placeholder" @keyup="debouncedSendReq">
            <div class="rearch__result" id="result"></div>
        </section>

         <section v-if="selectedSocial === 'VK' && getCards" class="cards-wrapper">
            <section class="card">
                <div class="card-icon">
                    <img class="card-img" :src="cards.avatar_url" alt="user_avatar">
                </div>
                <div class="card-action">
                    <span class="card-action__title">{{ cards.login }}</span>
                    <hr>
                    <a :href="cards.html_url" class="card-action__link">Open in {{ selectedSocial }}</a>
                </div>
            </section>
        </section>

        <section v-if="selectedSocial === 'GitHub' && getCards" class="cards-wrapper">
            <section v-for="card in cards" :key="card.login" class="card">
                <div class="card-icon">
                    <img class="card-img" :src="card.avatar_url" alt="user_avatar">
                </div>
                <div class="card-action">
                    <span class="card-action__title">{{ card.login }}</span>
                    <hr>
                    <a :href="card.html_url" class="card-action__link">Open in {{ selectedSocial }}</a>
                </div>
            </section>
        </section>
        
    </section>
</template>
<script>
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';
import _ from 'lodash';

export default {
    name: 'Search',
    setup() {
        const store = useStore();
        const placeholder = computed(() => store.state.placeholder.default ? '' : `Enter a ${store.state.placeholder.text} nickname...`);
        const showField = computed(() => store.state.placeholder.default ? 'search__input-close' : 'search__input-open'); 
        const selectedSocial = computed(() => store.state.search.value); 
        const cards = reactive({});  
        let getCards = ref(false);

        const debouncedSendReq = _.debounce(async (event) => {
            if (event.target.value === '' && event.target.value === ' ') return;
            try {
                const response = await fetch(`http://localhost:3000/api.user/${selectedSocial.value}/${event.target.value}`);
                const data = await response.json();
                if (selectedSocial.value === 'GitHub') {
                    for (let i = 0; i < data.items.length; i++) {
                        cards[i] = data.items[i];
                        cards[i].login = data.items[i].login;
                        cards[i].html_url = data.items[i].html_url;
                        cards[i].avatar_url = data.items[i].avatar_url;
                    }
                    getCards.value = true;
                }
                if (selectedSocial.value === 'VK') {
                    cards.login = data.login;
                    cards.html_url = data.html_url;
                    cards.avatar_url = data.avatar_url;
                    getCards.value = true;
                }
            } catch (error) {
                console.error('!!ERROR!! : ', error.message);
            }
        }, 500);

        return {
            placeholder,
            showField,
            selectedSocial,
            debouncedSendReq,
            getCards,
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
    
    &-icon {
        display: flex;
        justify-content: center;

        .card-img {
            // @if selectedSocial == 'VK' {
            //     width: 100px;
            //     height: 100px;
            // }
        }
    }

    &-action {
        margin-top: 10px;

        &__link {
            color: inherit;
            text-decoration: none;

            &:hover {
                color: #ff000f;
            }
        }
    }
}
</style>