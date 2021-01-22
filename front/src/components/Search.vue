<template>
    <section id="search">
        <input type="text" :class="showField" id="search" :placeholder="placeholder">
        <div class="rearch__result" id="result"></div>
    </section>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue'

export default {
    name: 'Search',
    setup() {
        const store = useStore();
        const placeholder = computed(() => `Enter a ${store.state.placeholder.text} nickname...`);
        const showField = computed(() => store.state.placeholder.default ? 'search__input-close' : 'search__input-open'); 

        return {
            placeholder,
            showField
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    display: block;
    margin-top: 70px;

    #search {
        width: 500px;

        .search__input-open {
            display: block;
            height: 20px;
            padding: 5px 20px;
            border: none;
            border-bottom: 1px solid #ccc;
            outline: none;
            font-size: 15px;
        }
        .search__input-close{
            display: none;
        }
    }
}
</style>