<template>
    <div class="admin-course-general__info oilcase__setting-container">
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Название</h3>
            <input-cmp 
                :input_label="'Название'"
                :input_value="params.name"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Авторы</h3>
            <input-cmp 
                :input_label="'Если авторов больше одного, перечислите ФИО через запятую'"
                :input_value="params.teachers"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Описание</h3>
            <textarea-cmp
                :textarea_label="'Краткое описание курса'"
                :textarea_value="params.teachers"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Целевая аудитория</h3>
            <textarea-cmp 
                :textarea_label="'На кого рассчитан курс'"
                :textarea_value="params.teachers"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Методика обучения</h3>
            <textarea-cmp 
                :textarea_label="'Описание инструментов обучения'"
                :textarea_value="params.teachers"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Результаты обучения</h3>
            <textarea-cmp 
                :textarea_label="'Описание результатов обучения'"
                :textarea_value="params.teachers"
            />
        </div>
        <btn-cmp 
            v-if="edit_mod.state"
            class="admin-course-general__params__btn"
            :btn_text="'Редактировать'"
            @click="editMod(false)"
        />
        <div 
            v-else
            class="admin-course-general__params__btns"
        >
            <btn-cmp 
                class="admin-course-general__params__btn"
                :btn_text="'Отмена'"
                :btn_type="'secondary'"
                @click="editMod(true)"
            />
            <btn-cmp 
                class="admin-course-general__params__btn"
                :btn_text="'Сохранить'"
                @click="saveGeneralSettings()"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue';
import textareaCmp from '@/components/ui-components/textarea-cmp/textarea-cmp.vue';
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue';
// import axios from 'axios';

export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },
    setup() {
        const edit_mod = reactive({
            state: true
        })

        const editMod = (state: boolean) => {
            edit_mod.state = state
        }

        const saveGeneralSettings = () => {
        }

        return {
            edit_mod,
            editMod,
            saveGeneralSettings
        }
    },
    components: {
        'input-cmp': inputCmp,
        'textarea-cmp': textareaCmp,
        'btn-cmp': btnCmp   
    }
})
</script>
