<template>
    <div ref="lottieContainer" class="lottie-animation"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import lottie, { AnimationItem } from 'lottie-web';

export default defineComponent({
    name: 'LottieAnimation',
    props: {
        loop: {
            type: Boolean,
            default: true,
        },
        autoplay: {
            type: Boolean,
            default: true,
        },
    },
    setup(props) {
        const lottieContainer = ref<HTMLDivElement | null>(null);
        let animationInstance: AnimationItem | null = null;

        onMounted(() => {
            if (lottieContainer.value) {
                animationInstance = lottie.loadAnimation({
                    container: lottieContainer.value,
                    renderer: 'svg',
                    loop: props.loop,
                    autoplay: props.autoplay,
                    path: "../../assets/loader/loader.json",
                });
            }
        });

        onBeforeUnmount(() => {
            if (animationInstance) {
                animationInstance.destroy();
            }
        });

        return {
            lottieContainer,
        };
    },
});
</script>

<style lang="sass">
.lottie-animation 
    width: 100%
    height: 100vh

</style>
