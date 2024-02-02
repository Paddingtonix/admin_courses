<template>
    <div class="admin-course-general oilcase__setting-container">
        <h3 class="admin-course-general__settings__category">Параметры курса</h3>
        <div class="admin-course-general__settings__chips">
            <chips-cmp 
                v-for="chips in params.settings"
                :key="chips.count"
                :title="chips.title"
                :counter="chips.count"
            />
        </div>
        <div class="admin-course-general__params">
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Авторы</span>
                <span class="admin-course-general__params__field__explanation">(у курса долженг быть хотя бы один автор)</span>
                <template v-if="params.authors.length">
                    <input-cmp 
                        v-for="email in params.authors"
                        :key="email"
                        :input_label="'email'"
                        :input_value="email"
                        :disabled="edit_mod.state"
                    />
                </template>
                <template v-else>
                    <input-cmp 
                        :input_label="'Email'"
                        :input_value="changed_params.authors[0]"
                        :disabled="edit_mod.state"
                    />
                </template>
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Стоимость курса</span>
                <div class="admin-course-general__params__field__container _medium">
                    <input-cmp 
                        :input_label="'Цена'"
                        :input_value="changed_params.price_in_rubles"
                        :input_size="'m'"
                        :disabled="edit_mod.state"
                    />
                    <span class="admin-course-general__params__field__explanation">руб.</span>
                </div>
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Дата снятия курса с витрины</span>
                <span class="admin-course-general__params__field__explanation">(курс будет снят с витрины при наступлении указанной даты в 00:00 по времени МСК)</span>
                <input-cmp 
                    :input_label="'Дата снятия курса с витрины'"
                    :input_value="changed_params.sales_termination_date"
                    :disabled="edit_mod.state"
                />
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Длительность курса</span>
                <div class="admin-course-general__params__field__container _small">
                    <input-cmp 
                        :input_size="'s'"
                        :input_label="'N'"
                        :input_value="changed_params.sales_termination_date"
                        :disabled="edit_mod.state"
                    />
                    <span class="admin-course-general__params__field__explanation">академических часов</span>
                </div>
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Направления курса</span>
                <span class="admin-course-general__params__field__explanation">(выберите минимум одно направление)</span>
                <div class="admin-course-general__params__field__small-container">
                    <selector-cmp 
                        :selector_placeholder="'Не выбрано'"
                        :disabled="edit_mod.state"
                    />
                </div>
            </div>
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
                @click="editMod(false)"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import axios from 'axios'

import chipsCmp from '../../../ui-components/chips-cmp/chips-cmp.vue'
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue'
import selectorCmp from '@/components/ui-components/selector-cmp/selector-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue';

export default defineComponent({
    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },
    setup(props) {
        const chips_list = reactive({
            list: [] as Array<[
                {
                    name: string,
                    count: string,
                }
            ]>
        })

        const edit_mod = reactive({
            state: true
        })

        const changed_params = reactive(props.params)       
        
        const editMod = (state: boolean) => {
            edit_mod.state = state
        }

        axios
            .get('/api/course_setting.json')
            .then(response => {
                chips_list.list = response.data
            })

        return {
            chips_list,
            changed_params,
            editMod,
            edit_mod
        }
    },
    components: {
        'chips-cmp': chipsCmp,
        'input-cmp': inputCmp,
        'selector-cmp': selectorCmp,
        'btn-cmp': btnCmp,
    }
})
</script>