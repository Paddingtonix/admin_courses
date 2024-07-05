<template>
    <div class="oil-filter">
        <svg class="oil-filter__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2.5 6.6665L12.5 6.6665M12.5 6.6665C12.5 8.04722 13.6193 9.1665 15 9.1665C16.3807 9.1665 17.5 8.04722 17.5 6.6665C17.5 5.28579 16.3807 4.1665 15 4.1665C13.6193 4.1665 12.5 5.28579 12.5 6.6665ZM7.5 13.3332L17.5 13.3332M7.5 13.3332C7.5 14.7139 6.38071 15.8332 5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332C2.5 11.9525 3.61929 10.8332 5 10.8332C6.38071 10.8332 7.5 11.9525 7.5 13.3332Z" stroke="#176DC1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="oil-filter__text">
            <span>Фильтры</span>
        </div>
    </div>
</template>
<script lang="ts">
</script>
<style lang="sass">
.oil-filter 
    padding: rem(8) rem(16)

    border: rem(1) solid $basic_primary
    border-radius: rem(8)
    @include flex_center_spacing()
    gap: rem(8)
    cursor: pointer
    &__text
        color: $basic_primary
        font-weight: bold
</style>