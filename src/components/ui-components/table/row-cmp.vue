<template>
    <div class="oil-row">
        <template v-for="field in fields">
            <div class="oil-row__cell" v-if="field.length" :key="field">
                <a>{{ field }}</a>
            </div>
        </template>
        <slot name="svg"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: ''
        },
        authors: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: ''
        },
        lang: {
            type: String,
            default: ''
        },
        date_edit: {
            type: String,
            default: ''
        },
        end_date: {
            type: String,
            default: ''
        },
        display_page: {
            type: String,
            default: ''
        },
        courses_number: {
            type: String,
            default: ''
        },
    },
    setup(props) {
        const fields = props;

        return {
            fields
        }
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