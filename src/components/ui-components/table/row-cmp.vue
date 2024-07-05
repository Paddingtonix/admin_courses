<template>
    <div class="oil-row">
        <div class="oil-row__cell">
            <a>{{ name }}</a>
        </div>
        <div class="oil-row__cell">
            <span>{{ status }}</span>
        </div>
        <div class="oil-row__cell">
            <span>{{ authors }}</span>
        </div>
        <div class="oil-row__cell">
            <span>{{ direction }}</span>
        </div>
        <div class="oil-row__cell">
            <span>{{ lang }}</span>
        </div>
        <div class="oil-row__cell">
            <span>{{ date_edit }}</span>
        </div>
        <div class="oil-row__cell">
            <span>{{ end_date }}</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            default: 'name'
        },
        status: {
            type: String,
            default: 'status'
        },
        authors: {
            type: String,
            default: 'authors'
        },
        direction: {
            type: String,
            default: 'direction'
        },
        lang: {
            type: String,
            default: 'lang'
        },
        date_edit: {
            type: String,
            default: 'date_edit'
        },
        end_date: {
            type: String,
            default: 'end_date'
        },
    },
    setup() {

    }
})
</script>
<style lang="sass">
.oil-row 
    @include flex_center_spacing()
    border-bottom: rem(1) solid #5B6C7B
    &__cell 
        padding: rem(8)

        &:nth-child(1)
            flex: 4
            color: $basic_primary
            
        &:nth-child(2)
            flex: 2
            color: $basic_primary

        &:nth-child(3)
            flex: 3

        &:nth-child(4)
            flex: 3

        &:nth-child(5)
            flex: 1

        &:nth-child(6)
            flex: 2

        &:nth-child(7)
            flex: 2

</style>