<template>
   <section class="oil-container">
        <div class="oil-page tags-page">
            <h4 class="tags-page__header">Метки</h4>
            <TabSwitcherCmp :switcherArray="switcherArray"/>
            <hr class="tags-page__divider">
            <div class="tags-page__content">
                <slot/>
            </div>
        </div> 
    </section>
</template>

<script lang="ts" setup>
import type ISwitcher from '~/src/ts-interface/switcher.type';

const switcherArray: ISwitcher[] = [
    {text: 'Метки', id: 1, isActive: true, link:'tags-page'}, 
    {text: 'Разделы', id: 2, isActive: false, link: 'section-page'}
]

</script>

<style lang="sass">

.tags-page
    &__header
        margin-bottom: rem(32)

    &__divider
        margin-bottom: rem(32)

    &__content
        max-width: rem(1140)


</style>