<template>
    <div class="admin-status-modal">
        <span class="admin-status-modal__desc">Если вы закончили проверку курса и курс не нуждается в изменениях от автора, измените статус на “Опубликован” и курс станет доступен к покупке.</span>
        <span class="admin-status-modal__desc">Если курс нуждается в доработке, измените статус на “В разработке”.</span>
        <div class="admin-status-modal__radios">
            <radio-cmp 
                class="admin-status-modal__radios__radio"
                v-for="radio in status"
                :key="radio.id"
                :radio_text="radio.text"
                :active_field="selected_status.value"
                :radio_id="radio.id"
                @select-radio="selectRadio"
            />
        </div>
        <div class="admin-status-modal__btns">
            <btn-cmp 
                class="admin-status-modal__btns__btn" 
                :btn_text="'Отмена'"
                :btn_type="'secondary'"
                @click="closeModal"
            />
            <btn-cmp 
                class="admin-status-modal__btns__btn" 
                :btn_text="'Изменить'"
                @click="changeStatus"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import radioCmp from '../../../../ui-components/radio-cmp/radio-cmp.vue'
import btnCmp from '../../../../ui-components/btn-cmp/btn-cmp.vue'
import { useStore } from 'vuex';

export default defineComponent({
    setup() {
        const store = useStore()

        const status = [
            {
                id: 1,
                text: 'На модерации → В разработке',
            },
            {
                id: 2,
                text: 'На модерации → Опубликован'
            }
        ]
        

        const selected_status = reactive({
            value: 1
        })

        const selectRadio = (id: number) => {
            selected_status.value = id
        }

        const closeModal = () => {
            store.commit('modalModule/closeModal')
        }

        const changeStatus = () => {
            store.commit('modalModule/openModal', {
                newState: 'adminErrorModal',
                props: {
                    title: 'Внимание',
                    errors: [
                        {
                            text: 'Дата снятия курса с витрины меньше текущей даты'
                        },
                        {
                            text: 'Дата Дата'
                        }
                    ]
                }
            })
        }

        return {
            status,
            selected_status,
            selectRadio,
            closeModal,
            changeStatus
        }
    },
    components: {
        'radio-cmp': radioCmp,
        'btn-cmp': btnCmp
    }
})
</script>