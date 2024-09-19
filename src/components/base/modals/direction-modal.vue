<template>
    <div class="oil-direction">
        <span class="oil-direction__desc">Направление должно быть переведено на обязательные языки (помечены звёздочкой)</span>
        <LangSwitcherCmp 
            class="oil-direction__tabs"
            :active="lang"
            @change-lang="setLang"
        />
        <InputCmp 
            class="oil-direction__input"
           :label="`Название направления (${lang.toLocaleUpperCase()})*`" 
           @set_value="setDirectionName"
        />
        <CheckboxCmp 
            class="oil-direction__checkbox"
            :text="'Отображать на сайте'"
            :active="visible_direction"
            @set_value="setCheckbox"
        />
        <div class="oil-direction__btns">
            <BtnCmp 
                :text="'Отмена'"
                :background_type="'_secondary'"
                @click="closeModal"
            />
            <BtnCmp 
                :text="'Добавить'"
                @click="setDirectionServer(input_value)"
            />
        </div>
    </div>
</template>
<script type="ts">
import { defineComponent } from 'vue'
import { useDirectionStore } from "~/src/stores/storeDirection";

export default defineComponent({
    setup() {
        const lang = ref('ru')

        const visible_direction = ref(false)

        const input_value = ref('')

        const store_modal = useStoreModal();

        const closeModal = () => {
            store_modal.closeModal();
        };

        const setLang = (active_lang) => {            
            lang.value = active_lang
        }

        const setCheckbox = (val) => {
            visible_direction.value = val.active
        }

        const setDirectionName = (val) => {
            input_value.value = val.value
        }

        const setDirectionServer = () => {
            useDirectionStore().createDirection({
                isVisible: visible_direction.value,
                localizations: {
                    en: '',
                    ru: input_value.value,
                }
            })
        }


        return {
            lang,
            visible_direction,
            setLang,
            setCheckbox,
            setDirectionName,
            setDirectionServer,
            closeModal
        }
    }
})
</script>
<style lang="sass">
.oil-direction 
    &__desc 
        display: inline-flex
        margin-bottom: rem(24)

    &__tabs 
        margin-bottom: rem(16)

    &__input 
        margin-bottom: rem(24)

    &__checkbox
        margin-bottom: rem(32)
    
    &__btns 
        @include flex_start()
        gap: rem(16)

</style>