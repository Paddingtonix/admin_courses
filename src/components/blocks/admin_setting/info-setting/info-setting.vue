<template>
    <div class="admin-course-general__info oilcase__setting-container">
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Название</h3>
            <input-cmp 
                :input_label="'Название'"
                :input_value="params.name"
                :input_type="'name'"
                :disabled="edit_mod.state"
                @update="setValue"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Авторы</h3>
            <input-cmp 
                :input_label="'Если авторов больше одного, перечислите ФИО через запятую'"
                :input_value="params.teachers"
                :input_type="'teachers'"
                :disabled="edit_mod.state"
                @update="setValue"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Описание</h3>
            <textarea-cmp
                :textarea_label="'Краткое описание курса'"
                :textarea_value="params.teachers"
                :textarea_type="'description_course'"
                :disabled="edit_mod.state"
                @update="setValue"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Целевая аудитория</h3>
            <textarea-cmp 
                :textarea_label="'На кого рассчитан курс'"
                :textarea_value="params.teachers"
                :disabled="edit_mod.state"
                :textarea_type="'target_audience'"
                @update="setValue"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Методика обучения</h3>
            <textarea-cmp 
                :textarea_label="'Описание инструментов обучения'"
                :textarea_value="params.teachers"
                :disabled="edit_mod.state"
                :textarea_type="'education_methods'"
                @update="setValue"
            />
        </div>
        <div class="admin-course-id__main-settings__info__field">
            <h3 class="admin-course-id__main-settings__info__field__title">Результаты обучения</h3>
            <textarea-cmp 
                :textarea_label="'Описание результатов обучения'"
                :textarea_type="'education_results'"
                :textarea_value="params.teachers"
                :disabled="edit_mod.state"
                @update="setValue"
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
                @click="saveInfo()"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue';
import textareaCmp from '@/components/ui-components/textarea-cmp/textarea-cmp.vue';
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue';
import axios from 'axios';

export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { emit }) {
        const edit_mod = reactive({
            state: true
        })

        const editMod = (state: boolean) => {
            edit_mod.state = state
        }

        const changed_info = reactive({
            params: props.params
        })

        watch(() => props.params, () => {
            changed_info.params = props.params
        })

        const setValue = (val: {type: string, value: string}) => {            
            switch (val.type) {
                case 'name':
                    changed_info.params.name = val.value
                    break;
                
                case 'teachers':
                    changed_info.params.teachers = val.value
                    break;

                case 'description_course':
                    changed_info.params.description_course = val.value
                    break;

                case 'target_audience':
                    changed_info.params.target_audience = val.value
                    break;

                case 'education_methods':
                    changed_info.params.education_methods = val.value
                    break;

                case 'education_results':
                    changed_info.params.education_results = val.value
                    break;

                default:
                    break;
            } 
        }

        const saveInfo = () => {
            axios
                .patch(`http://192.168.19.204:8080/admin/v1/course/${props.params.id}/info`, {
                    title: changed_info.params.name,
                    description: changed_info.params.description_course,
                    target_audience: changed_info.params.target_audience,
                    education_methods: changed_info.params.education_methods,
                    education_results: changed_info.params.education_results,
                    authors: changed_info.params.teachers
                })
                .then(() => {
                    emit('reload-content', true)
                })
                .finally(() => {
                    emit('reload-content', false)
                    editMod(true)
                })
        }

        return {
            edit_mod,
            editMod,
            saveInfo,
            setValue,
            changed_info
        }
    },
    components: {
        'input-cmp': inputCmp,
        'textarea-cmp': textareaCmp,
        'btn-cmp': btnCmp   
    }
})
</script>
