<template>
    <div class="oil-head">
        <div class="oil-head__cell">
            <a>{{ name }}</a>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ status }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ authors }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ direction }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ lang }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ date_edit }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
        </div>
        <div class="oil-head__cell">
            <span>{{ end_date }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5.77885 0.838651C5.89763 0.710071 6.10081 0.710071 6.21958 0.838651L9.69097 4.59653C9.86846 4.78868 9.73218 5.1001 9.4706 5.1001H2.52784C2.26626 5.1001 2.12998 4.78868 2.30747 4.59653L5.77885 0.838651Z" fill="#B6C2D0"/>
                <path d="M6.22115 11.1613C6.10237 11.2899 5.89919 11.2899 5.78042 11.1613L2.30903 7.40347C2.13154 7.21132 2.26782 6.8999 2.5294 6.8999L9.47216 6.8999C9.73374 6.8999 9.87002 7.21132 9.69253 7.40347L6.22115 11.1613Z" fill="#B6C2D0"/>
            </svg>
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
.oil-head 
    @include flex_center_spacing()
    border-bottom: rem(1) solid #5B6C7B
    &__cell 
        padding: rem(8)
        @include flex_start()
        gap: rem(4)
        cursor: pointer
        & > *
            font-size: rem(12)

        &:nth-child(1)
            flex: 4
            
        &:nth-child(2)
            flex: 2

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