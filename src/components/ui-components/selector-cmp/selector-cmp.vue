<template>
    <div class="oilcase-selector">
        <!-- <span class="oilcase-selector__active" :class="{_placeholder: select_value.value === ''}">{{ select_value.value === '' ? selector_placeholder : select_value.value }}</span> -->
        <input 
            :class="{
                '_fill-input': select_value.value.length, 
            }"
            class="oilcase-selector__active"
            @click="openList(true)"
            v-model="select_value.value"
        />
        <label 
            class="oilcase-selector__label" 
        >{{ selector_placeholder }}</label>
        <transition name="fade">
            <div class="oilcase-selector__list" v-if="open_list.value" v-click-outside="() => openList(false)">
                <template v-if="checkbox">
                    <checkbox-cmp 
                        v-for="selector in selector_list" 
                        :key="selector.id"
                        :text="selector.name"
                        @setParams="multiCheckbox"
                    />
                </template>
                <template v-else>
                    <span 
                        v-for="selector in selector_list" 
                        @click="selectValue(selector.name)"
                        :key="selector.id"
                    >{{ selector.name }}</span>
                </template>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import checkboxCmp from '../checkbox-cmp/checkbox-cmp.vue'

export default defineComponent({
    props: {
        selector_list: {
            type: Array as () => Array<{ name: string; id: number }>,
            default: () => [
                {
                    name: 'selector',
                    id: 0
                }
            ]
        },
        selector_active: {
            type: String,
            default: 'selector'
        },
        checkbox: {
            type: Boolean,
            default: false
        },
        selector_placeholder: {
            type: String,
            default: 'placeholder'
        },
        selector_type: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const open_list = reactive({
            value: false
        })
        

        const select_value = reactive({
            value: '' as string
        })

        const selectValue = (name: string) => {
            select_value.value = name
            emit('setSelectorValue', {type: props.selector_type, value: select_value.value})  
        }

        const openList = (value: boolean) => {
            open_list.value = value
        }

        const selected_checkbox = reactive([] as Array<{selected_checkbox: string}>)

        const multiCheckbox = (params: string) => {
            if(!selected_checkbox.find(checkbox => checkbox.selected_checkbox === params)) {
                selected_checkbox.push({selected_checkbox: params})

                select_value.value = `(${selected_checkbox.length})`
            } else if(selected_checkbox.length !== 1) {
                selected_checkbox.splice(selected_checkbox.findIndex(checkbox => checkbox.selected_checkbox === params), 1)
                select_value.value = `(${selected_checkbox.length})`
            } else {
                select_value.value = ''
            }

            emit('setSelectorValue', {direction: selected_checkbox, type: 'direction'})            
        }

        // watchEffect(() => {
        //     console.log(props.checkbox);
            
        //     if(props.checkbox) {                
        //         console.log('qwerty', selected_checkbox);
                
        //         emit('setSelectorValue', selected_checkbox)
        //     } else {
        //         emit('setSelectorValue', select_value.value)
        //     }
        // })

        return {
            open_list,
            openList,
            select_value,
            selectValue,
            multiCheckbox,
            selected_checkbox
        }
    },
    components: {
        'checkbox-cmp': checkboxCmp
    }
})

</script>