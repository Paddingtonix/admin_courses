<template>
    <section class="oilcase-page"></section>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore();             

        console.log(store.state);
        

        store.commit('modalModule/openModal', {
            newState: 'authModal',
            props: {
                title: 'Вход в Admin Course'
            }
        })
    },
    components: {

    },
})
    
</script>