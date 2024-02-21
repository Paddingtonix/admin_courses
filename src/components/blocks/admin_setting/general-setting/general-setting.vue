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
                    <input-cmp 
                        v-for="email in params.authors"
                        :key="email"
                        :input_label="'email'"
                        :input_value="email"
                        :disabled="edit_mod.state"
                        :input_type="'author_emails'"
                        @update="setValue"
                    />
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Стоимость курса</span>
                <div class="admin-course-general__params__field__container _medium">
                    <input-cmp 
                        :input_label="'Цена'"
                        :input_type="'price'"
                        :input_value="changed_params.price_in_rubles"
                        :input_size="'m'"
                        :disabled="edit_mod.state"
                        @update="setValue"
                    />
                    <span class="admin-course-general__params__field__explanation">руб.</span>
                </div>
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Дата снятия курса с витрины</span>
                <span class="admin-course-general__params__field__explanation">(курс будет снят с витрины при наступлении указанной даты в 00:00 по времени МСК)</span>
                <input-cmp 
                    :input_label="'Дата снятия курса с витрины'"
                    :input_value="date.date_visible"
                    :input_type="'sales_term_date'"
                    :disabled="edit_mod.state"
                    @click="openCalendar(true)"
                    @update="setValue"
                    v-click-outside="() => openCalendar(false)"
                />
                <date-picker 
                    v-if="calendar.active" 
                    class="admin-course-general__params__field__calendar"
                    v-model="date.value"
                ></date-picker>
            </div>
            <div class="admin-course-general__params__field">
                <span class="admin-course-general__params__field__title">Длительность курса</span>
                <div class="admin-course-general__params__field__container _small">
                    <input-cmp 
                        :input_size="'s'"
                        :input_label="'N'"
                        :input_type="'duration_academic_hours'"
                        :input_value="changed_params.sales_termination_date"
                        @update="setValue"
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
                        v-if="!edit_mod.state"
                        :selector_placeholder="'Не выбрано'"
                        :selector_list="directions"
                        :edit_mod="edit_mod.state"
                        :disabled="edit_mod.state"
                        :checkbox="true"
                        @setSelectorValue="saveStateSelector"
                    />
                    <div class="admin-course-general__params__field__selected" v-else>
                        <div
                            class="admin-course-general__params__field__selected__direction"
                            v-for="(direction, idx) in select_directions.value"
                            :key="idx"
                        >
                            <span>{{ direction.selected_checkbox }}</span>
                        </div>
                    </div>
                    
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
                @click="saveGeneralSettings()"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { DatePicker } from 'v-calendar';
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
        },
        directions: {
            type: Array,
            default: () => []
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

        const directions_list = reactive({
            values: props.params.directions
        })

        const edit_mod = reactive({
            state: true
        })

        const changed_params = reactive(props.params)       
        
        const editMod = (state: boolean) => {
            edit_mod.state = state
        }

        const select_directions = reactive({
            value: [] as Array<{}>
        })

        const calendar = reactive({
            active: false
        })

        const openCalendar = (state: boolean) => {
            calendar.active = state
        }

        const saveStateSelector = (params: { [key: string]: string } | any) => {            
            if(params.type === 'direction') {
                select_directions.value = params.direction
            }
        }

        const date = reactive({
            value: '' as any,
            date_server: '' as any,
            date_visible: '' as any
        })

        

        const saveGeneralSettings = () => {
            axios
                .patch('http://192.168.19.204:8080/admin/v1/course/1/settings', {
                    duration_academic_hours: changed_params.duration_academic_hours,
                    sales_termination_date: changed_params.sales_termination_date,
                    price_in_rubles: changed_params.price_in_rubles,
                    direction_ids: select_directions.value.map((direction_id: any) => direction_id.selected_checkbox.id)
                })
                .finally(() => {
                    console.log('final');
                    editMod(false)
                })
        }

        const setValue = (val: any) => {
            switch (val.type) {
                case 'price':
                    changed_params.price_in_rubles = val.value
                    break;
                case 'sales_term_date': 
                    console.log('qwerty');
                
                    changed_params.sales_termination_date = val.value
                    break;
                case 'author_emails':
                    changed_params.authors.push(val.value)
                    break;
                case 'duration_academic_hours': 
                    changed_params.duration_academic_hours = val.value
                    break;
                case 'directions': 
                    console.log(val);
                    
                    break;    
  
                default:
                    break;
            }
            console.log(val);
        }

        // watch(() => props.directions, () => {
        //     directions_list.values = changed_params.directions.length ? changed_params.directions : props.directions
        // })

        watch(() => date.value, () => {
            let date_format = date.value

            let date_format_day = date_format.getDate();
            let date_format_mounth = date_format.getMonth() + 1;
            let date_format_year = date_format.getFullYear();
            


            date.date_visible = (date_format_day < 10 ? '0' : '') + date_format_day + '.' + (date_format_mounth < 10 ? '0' : '') + date_format_mounth + '.' + date_format_year;

            // console.log(date.value);

            // date.value = new Date(date.value).toISOString().substring(0, 10) + "T00:00:00Z";
        })

        axios
            .get('/api/course_setting.json')
            .then(response => {
                chips_list.list = response.data
            })

        return {
            chips_list,
            changed_params,
            editMod,
            edit_mod,
            directions_list,
            saveStateSelector,
            select_directions,
            saveGeneralSettings,
            calendar,
            openCalendar,
            date,
            setValue
        }
    },
    components: {
        'chips-cmp': chipsCmp,
        'input-cmp': inputCmp,
        'selector-cmp': selectorCmp,
        'btn-cmp': btnCmp,
        DatePicker
    }
})
</script>