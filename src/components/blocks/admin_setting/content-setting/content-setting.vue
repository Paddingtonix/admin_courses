<template>
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
            <!-- <edit-input-cmp 
                :label="content.intro"
                :edit_mod="edit_mod.value"
            /> -->
        </div>
        <div class="_field">
            <!-- <edit-input-cmp
                :label="content.intro_test"
                :input_value="''"
                :edit_mod="edit_mod.value"
            />  -->
        </div>
        <!-- <div class="admin-course-id__main-settings__content__part _field" v-for="(part, idx) in content.part" :key="idx">
            <div class="_field">
                <edit-input-cmp
                    :label="part.title"
                    :edit_mod="edit_mod.value"
                />
            </div>
            <div class="admin-course-id__main-settings__content__add" @click="addBlock('part', idx, 0, 0)" v-if="edit_mod.value && content.part.length > 0 ">
                <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Добавить часть</span>
            </div>
            <div class="admin-course-id__main-settings__content__part__chapter" v-for="(chapter, chapter_idx) in part.chapter" :key="chapter_idx">
                <div class="_field">
                    <edit-input-cmp
                        :label="chapter.title"
                        :edit_mod="edit_mod.value"
                    />
                </div>
                <div class="admin-course-id__main-settings__content__add" @click="addBlock('chapter', idx, chapter_idx, 0)" v-if="edit_mod.value">
                    <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Добавить главу</span>
                </div>
                <div class="admin-course-id__main-settings__content__part__chapter" v-for="(section, section_idx) in chapter.section" :key="section_idx">
                    <div class="_field">
                        <edit-input-cmp
                            :label="section.title"
                            :edit_mod="edit_mod.value"
                        />
                    </div>
                    <div class="admin-course-id__main-settings__content__add" @click="addBlock('section', idx, chapter_idx, section_idx)" v-if="edit_mod.value">
                        <svg v-if="edit_mod.value" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B1B3B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Добавить раздел</span>
                    </div>
                    <div class="_field">
                        <edit-input-cmp
                            :label="chapter.test"
                            :edit_mod="edit_mod.value"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="_field">
            <edit-input-cmp 
                :label="content.final_test"
                :edit_mod="edit_mod.value"
                :input_value="''"
            />
        </div>
        <div class="_field">
            <edit-input-cmp
                :label="content.final"
                :edit_mod="edit_mod.value"
                :input_value="''"
            />
        </div> -->
        <!-- <btn-cmp 
            v-if="!edit_mod.value"
            :btn_text="'Редактировать структуру'"
            class="admin-course-id__main-settings__edit"
            @click="openEditBlock(true)"
        /> -->
        <!-- <div v-else class="admin-course-id__main-settings__btns">
            <btn-cmp 
                v-if="edit_mod.value"
                class="admin-course-id__main-settings__edit"
                :btn_text="'Отмена'"
                :btn_type="'secondary'"
                @click="openEditBlock(false)"
            />
            <btn-cmp 
                v-if="edit_mod.value"
                class="admin-course-id__main-settings__edit"
                :btn_text="'Сохранить'"
            />
        </div> -->
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
// import editInputCmp from '../../../components/ui-components/edit-input-cmp/edit-input-cmp.vue'


export default defineComponent({
    setup() {
        
    },
    components: {
        // 'ed'
    }
})
</script>