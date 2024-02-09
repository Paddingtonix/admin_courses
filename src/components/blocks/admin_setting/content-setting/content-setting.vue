<template>
    <div>
        <div class="admin-course-id__main-settings__attention">
            <span>Структура курса станет доступным для редактирования после нажатия на кнопку <span :style="{'font-weight': bold}">“Редактировать структуру”</span>.</span>
            <span>Для перехода к наполнению разделов, тестов и дополнительных модулей <span :style="{'font-weight': bold}">нажмите на название модуля</span> и перейдите к редактированию страницы</span>
            <span>Основные модули</span>
            <span>Можно изменить названия модулей (Часть, Глава, Раздел и Тест), а также удалить или добавить их. При добавлении Части автоматически создаётся одна Глава, один Раздел и один Тест в этой Части.</span>
            <span>Дополнительные модули</span>
            <span>Примечание: редактирование названий дополнительных модулей недоступно.</span>
            <ul>
                <li>Вводная страница - страница, на которой можно разместить общую и/или дополнительную информацию о курсе</li>
                <li>Входной тест - тест для оценки знаний учеников в начале прохождения курса</li>
                <li>Итоговый тест - тест для оценки знаний учеников в конце прохождения курса</li>
                <li>Итоги (страница недоступна для удаления) - страница с дополнительной информацией для учеников, прошедших курс (также на этой странице будет доступна опция скачивания сертификата)</li>
            </ul>
        </div>
        <div class="admin-course-id__main-settings__content">
            <div class="_field">
                <edit-input-cmp 
                    :label="'Вводная страница'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                />
            </div>
            <div class="admin-course-id__main-settings__info__field">
                <edit-input-cmp 
                    :label="'Входной тест'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                />
            </div>
            <div class="admin-course-id__main-settings__info__field">
                <edit-input-cmp 
                    :label="'Часть 1'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                />
                <div v-for="part in params.parts" :key="part.id">
                    <edit-input-cmp
                        :label="'Глава 11'"
                        :edit_mod="edit_mod.state"
                        :disabled="edit_mod.state"
                    />
                    <div v-for="chapter in part.chapters" :key="chapter.id">
                        <edit-input-cmp 
                            :label="'Раздел 111'"
                            :edit_mod="edit_mod.state"
                            :disabled="edit_mod.state"
                        />
                        <edit-input-cmp 
                            v-for="chapter in part.chapters"
                            :key="chapter.id"
                            :edit_mod="edit_mod.state"
                            :label="'Тест11'"
                            :disabled="edit_mod.state"
                        />
                    </div>
                </div>
            </div>
            <div class="admin-course-id__main-settings__info__field">
                <edit-input-cmp 
                    :label="'Итоговый тест'"
                    :edit_mod="edit_mod.state"
                />
            </div>
            <div class="admin-course-id__main-settings__info__field">
                <edit-input-cmp 
                    :label="'Итоги'"
                    :edit_mod="edit_mod.state"
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
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import editInputCmp from '@/components/ui-components/edit-input-cmp/edit-input-cmp.vue';
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue';


export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        },
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
        'edit-input-cmp': editInputCmp,
        'btn-cmp': btnCmp
    }
})
</script>