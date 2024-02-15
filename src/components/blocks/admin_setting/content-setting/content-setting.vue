<template>
    <div class="admin-course-content oilcase__setting-container">
        <div class="admin-course-content__attention">
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
        <div class="admin-course-content__content">
            <div class="admin-course-content__content__field">
                <edit-input-cmp 
                    v-if="params.initial_page !== null"
                    :label="'Вводная страница'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                    :not_editable="true"
                    :type="'init_page'"
                    :id="params.initial_page.id"
                    @reload-content="reloadContentParent"
                />
                <add-btn-cmp 
                    v-else
                    :text="'Вводную страницу'"
                    @click="addBlockOnContent('Intrance', params.id)"
                />
            </div>
            <div class="admin-course-content__content__field">
                <edit-input-cmp 
                    v-if="params.initial_testing !== null"
                    :label="'Входной тест'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                    :not_editable="true"
                    :type="'testing'"
                    :id="params.initial_testing.id"
                    @reload-content="reloadContentParent"
                />
                <add-btn-cmp 
                    v-else
                    :text="'Вводный тест'"
                    @click="addBlockOnContent('Entrance', params.id)"
                />
            </div>
            <div class="admin-course-content__content__container" v-for="(part, idx_part) in structure_content.parts" :key="part.id">
                <div class="admin-course-content__content__field">
                    <edit-input-cmp 
                        :label="`Часть ${idx_part + 1}`"
                        :edit_mod="edit_mod.state"
                        :disabled="edit_mod.state"
                        :type="'parts'"
                        :id="part.id"
                        :input_init_value="part.title"
                    />
                </div>
                <template v-for="(chapter, chapter_idx) in part.chapters" :key="chapter.id">
                    <div class="admin-course-content__content__field _chapter">
                        <edit-input-cmp
                            :label="`Глава ${chapter_idx + 1}`"
                            :edit_mod="edit_mod.state"
                            :disabled="edit_mod.state"
                            :not_delete="part.chapters.length > 1 ? false : true"
                            :type="'chapters'"
                            :id="chapter.id"
                            :input_init_value="chapter.title"
                            @reload-content="reloadContentParent"
                        />
                        <add-btn-cmp 
                            v-if="chapter_idx === part.chapters.length - 1"
                            :text="'Главу'"
                            :block="chapter"
                            :type_block="'chapters'"
                            :idx_block="[idx_part]"
                            @click="addBlockOnContent('chapter', part.id)"
                        />
                    </div>
                    <div class="admin-course-content__content__field _section" 
                        v-for="(section, section_idx) in chapter.sections" 
                        :key="section.id"
                    >
                        <edit-input-cmp 
                            :label="`Раздел ${section_idx + 1}`"
                            :edit_mod="edit_mod.state"
                            :disabled="edit_mod.state"
                            :not_delete="chapter.sections.length > 1 ? false : true"
                            :type="'sections'"
                            :id="section.id"
                            :input_init_value="section.title"
                            @reload-content="reloadContentParent"
                        />
                        <add-btn-cmp 
                            v-if="section_idx === chapter.sections.length - 1"
                            :text="'Раздел'"
                            :block="section"
                            :type_block="'sections'"
                            :idx_block="[idx_part, chapter_idx]"
                            @click="addBlockOnContent('section', chapter.id)"
                        />
                    </div>
                    <div class="admin-course-content__content__field _section">
                        <edit-input-cmp 
                            :edit_mod="edit_mod.state"
                            :label="'Тест11'"
                            :disabled="edit_mod.state"
                            :not_delete="true"
                        />
                    </div>
                </template>
                <add-btn-cmp 
                    v-if="idx_part === structure_content.parts.length - 1"
                    :text="'Часть'"
                    :block="part"
                    :type_block="'parts'"
                    @click="addBlockOnContent('part', params.id)"
                />
            </div>
            <div class="admin-course-content__content__field">
                <edit-input-cmp
                    v-if="params.final_testing !== null"
                    :edit_mod="edit_mod.state"
                    :label="'Итоговый тест'"
                    :input_init_value="params.final_testing.title"
                    :disabled="edit_mod.state"
                    :not_editable="true"
                    :type="'final_testing'"
                    :id="params.final_testing.id"
                    @reload-content="reloadContentParent"
                />
                <add-btn-cmp 
                    v-else
                    :text="'Итоговый тест'"
                    @click="addBlockOnContent('Final', params.id)"
                />
            </div>
            <div class="admin-course-content__content__field">
                <input-cmp
                    :input_label="'Итоги'"
                    :edit_mod="edit_mod.state"
                />
            </div>
            <btn-cmp 
                v-if="edit_mod.state"
                class="admin-course-content__params__btn"
                :btn_text="'Редактировать'"
                @click="editMod(false)"
            />
            <div 
                v-else
                class="admin-course-content__params__btns"
            >
                <btn-cmp 
                    class="admin-course-content__params__btn"
                    :btn_text="'Отмена'"
                    :btn_type="'secondary'"
                    @click="editMod(true)"
                />
                <btn-cmp 
                    class="admin-course-content__params__btn"
                    :btn_text="'Сохранить'"
                    @click="saveGeneralSettings()"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import editInputCmp from '@/components/ui-components/edit-input-cmp/edit-input-cmp.vue';
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue';
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue';
import btnAddCmp from '@/components/ui-components/btn-add-cmp/btn-add-cmp.vue';
import axios from 'axios';


export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        },
    },
    setup(props, { emit }) {
        const edit_mod = reactive({
            state: true
        })

        const editMod = (state: boolean) => {
            edit_mod.state = state
        }

        const structure_content = reactive({
            parts: props.params.parts
        })

        watch(() => props.params.parts, () => {
            structure_content.parts = props.params.parts
        })

        const addBlockOnContent = (type: string, id: number | null) => {   
            
            switch (type) {
                case 'part':
                    axios
                        .post(`http://192.168.19.204:8080/admin/v1/part?courseId=${id}`)
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;
            
                case 'chapter': 
                    axios
                        .post(`http://192.168.19.204:8080/admin/v1/chapter?partId=${id}`)
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;

                case 'section': 
                    axios
                        .post(`http://192.168.19.204:8080/admin/v1/section?chapterId=${id}`)
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;
                case 'Initial': 
                    axios
                        .post('http://192.168.19.204:8080/admin/v1/page', {
                            course_id: id,
                            category: type
                        })
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;

                case 'Entrance': 
                    axios
                        .post('http://192.168.19.204:8080/admin/v1/testing', {
                            course_id: id,
                            category: type
                        })
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;

                case 'Final':                         
                    axios
                        .post('http://192.168.19.204:8080/admin/v1/testing', {
                            course_id: id,
                            category: type
                        })
                        .then(() => {
                            emit('reload-content', true)
                        })
                        .finally(() => {
                            emit('reload-content', false)
                        })

                    break;

                default:
                    break;
            }
        }

        const reloadContentParent = (val: boolean) => {
            emit('reload-content', val)
        }

        const saveGeneralSettings = () => {
        }

        return {
            edit_mod,
            editMod,
            saveGeneralSettings,
            structure_content,
            addBlockOnContent,
            reloadContentParent
        }
    },
    components: {
        'edit-input-cmp': editInputCmp,
        'btn-cmp': btnCmp,
        'add-btn-cmp': btnAddCmp,
        'input-cmp': inputCmp,
    }
})
</script>