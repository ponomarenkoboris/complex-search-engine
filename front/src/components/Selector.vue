<template>
    <section id="selector">
        <div class="select__social" @click="showHideDropdown">
            <span class="placeholder">{{ placeholder }}</span>
            <i :class="arrow" data-type="arrow"></i>
        </div>
        <div class="socials__wrap">
            <ul v-if="isOpen" class="socials__list">
                <li v-for="item in socials" :key="item.value" :data-index="item.index" class="social__network" @click="updatePlaceholder(item.value), setValue(item.value), showHideDropdown()">
                    <p class="network__name">{{ item.value }}</p>
                    <img class="network__img" :src="item.icon" :alt="item.value">
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'Selector',
    setup() {
        const store = useStore();
        const socials = computed(() => store.state.socials);
        const isOpen = computed(() => store.state.isOpen);
        const arrow = computed(() => isOpen.value ? 'fa fa-chevron-down' : ' fa fa-chevron-up');
        const placeholder = computed(() => store.state.placeholder.text);

        function updatePlaceholder(item) {
            store.commit('setNewPlaceholder', item);
        }

        function setValue(item) {
            store.commit('setSearchValue', item)
        }

        function showHideDropdown() {
            setTimeout(() => store.commit('selectorStatus'), 0);
        }

        return {
            socials,
            placeholder,
            updatePlaceholder,
            showHideDropdown,
            setValue,  
            isOpen,
            arrow
        }
    },
}
</script>
<style lang="scss" scoped>
$border: 1px solid #ccc;
#selector {
    width: 100%;
    position: relative;
    z-index: 100;
    height: 250px;

    .select__social {
        width: 500px;
        height: 30px;
        border: $border;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        cursor: pointer;
    }
    .socials__list {
        padding: 0;
        margin: 0;
        list-style: none;
        border: $border;
        border-radius: 5px;
        max-height: 250px;
        overflow-y: auto;
        box-shadow: 2px 3px 5px rgba($color: #000000, $alpha: .5);

        .social__network {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            border-bottom: $border;
            background-color: #ffffff;

            .network__img{
                width: 46px;
                height: 46px;
            }

            &:hover {
                background-color: #eee;
                cursor: pointer;
                transition: .150 background-color ease-in; 
            }
        }
    }
}
@media(max-width: 683px) {
    .select__social {
        max-width: 200px;
    }
}
</style>