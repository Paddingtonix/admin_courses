<template>
    <div class="oil-radio" @click="setValue(id)" :class="{ _disable: disabled === true}">
        <div class="oil-radio__button">
            <svg :class="{ _active: active === id && disabled === false }" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="5" fill="#176DC1" />
            </svg>
        </div>
        <template v-if="text">
            <span class="oil-radio__text" v-html="text"></span>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        text: {
            type: String,
            default: '',
        },
        active: {
            type: String,
            default: '',
        },
        id: {
            type: Number,
            default: 'null',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const setValue = (id) => {
            emit('set_radio', id)
        }

        return {
            setValue
        }
    },
}
</script>
<style scoped lang="sass">
.oil-radio
    display: flex
    align-items: center
    cursor: pointer
    margin-right: 10px
    &._disable
        opacity: .2
        pointer-events: none

    &__button
        position: relative
        width: 20px
        height: 20px
        border-radius: 50%
        border: 1px solid $basic_primary
        svg
            position: absolute
            top: 50%
            left: 50%
            transform: translate(-50%, -50%)
            opacity: 0

            &._active
                opacity: 1

    &__text
        display: block
        margin-left: 8px
</style>
