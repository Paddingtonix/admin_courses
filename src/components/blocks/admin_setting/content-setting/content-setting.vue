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
                    :label="'Вводная страница'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                />
            </div>
            <div class="admin-course-content__content__field">
                <edit-input-cmp 
                    :label="'Входной тест'"
                    :edit_mod="edit_mod.state"
                    :disabled="edit_mod.state"
                />
            </div>
            <div class="admin-course-content__content__container">
                <div class="admin-course-content__content__field">
                    <edit-input-cmp 
                        :label="'Часть 1'"
                        :edit_mod="edit_mod.state"
                        :disabled="edit_mod.state"
                    />
                </div>
                <template v-for="(part, idx_part) in structure_content.parts" :key="part.id">
                    <div class="admin-course-content__content__field _chapter">
                        <edit-input-cmp
                            :label="'Глава 11'"
                            :edit_mod="edit_mod.state"
                            :disabled="edit_mod.state"
                        />
                        <add-btn-cmp 
                            :text="'Главу'"
                            :block="params.parts[0].chapters[0]"
                            :type_block="'chapters'"
                            :idx_block="[idx_part]"
                            @add-block="addBlockOnContent"
                        />
                    </div>
                    <template v-for="(chapter, chapter_idx) in part.chapters" :key="chapter.id">
                        <div class="admin-course-content__content__field _section">
                            <edit-input-cmp 
                                :label="'Раздел 111'"
                                :edit_mod="edit_mod.state"
                                :disabled="edit_mod.state"
                            />
                            <add-btn-cmp 
                                :text="'Раздел'"
                                :block="params.parts[0].chapters[0].sections[0]"
                                :type_block="'sections'"
                                :idx_block="[idx_part, chapter_idx]"
                                @add-block="addBlockOnContent"
                            />
                        </div>
                        <div class="admin-course-content__content__field _section">
                            <edit-input-cmp 
                                v-for="chapter in part.chapters"
                                :key="chapter.id"
                                :edit_mod="edit_mod.state"
                                :label="'Тест11'"
                                :disabled="edit_mod.state"
                            />
                        </div>
                    </template>
                </template>
                <add-btn-cmp 
                    :text="'Часть'"
                    :block="params.parts[0]"
                    :type_block="'parts'"
                    @add-block="addBlockOnContent"
                />
            </div>
            <div class="admin-course-content__content__field">
                <edit-input-cmp 
                    :label="'Итоговый тест'"
                    :edit_mod="edit_mod.state"
                />
            </div>
            <div class="admin-course-content__content__field">
                <edit-input-cmp 
                    :label="'Итоги'"
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
import btnAddCmp from '@/components/ui-components/btn-add-cmp/btn-add-cmp.vue';


export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        },
    },
    setup(props) {
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

        const addBlockOnContent = (block: any) => {
            switch (block.type) {
                case 'parts':
                    console.log('qwerty');
                    
                    structure_content.parts.push(block.block)
                    break;
                
                case 'chapters': 
                    console.log('chapters');
                    
                    structure_content.parts[block.idx_block[0]].chapters.push(block.block)
                    break;

                case 'sections': 
                    console.log('sectionss')
                    structure_content.parts[block.idx_block[0]].chapters[block.idx_block[1]].sections.push(block.block) 
                    break;

                default:
                    break;
            }
            

            console.log(block);
            
        }

        const saveGeneralSettings = () => {
        }

        return {
            edit_mod,
            editMod,
            saveGeneralSettings,
            structure_content,
            addBlockOnContent
        }
    },
    components: {
        'edit-input-cmp': editInputCmp,
        'btn-cmp': btnCmp,
        'add-btn-cmp': btnAddCmp
    }
})
</script>