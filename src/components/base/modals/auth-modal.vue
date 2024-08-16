<template>
    <div :class="`${main_class}__authorization`">
        <span :class="`${main_class}__authorization__title`">Вход в Admin Course</span>
        <div :class="`${main_class}__authorization__form`" v-for="form_item in form_authorization" :key="form_item.id">
            <InputCmp
                :type="form_item.type"
                :value="form_item.value"
                :label="form_item.label"
                :error="form_item.error"
                @set="setUserData"
                @blur="validCheck(form_item)"
                @keyup.enter="loginSite"
            />
            <svg :class="`${main_class}__authorization__icon`" v-if="form_item.type === 'password'" @click="visiblePassword(form_item.type)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path :class="{ 'error': form_item.error.length }" d="M2.01677 10.5937C1.90328 10.414 1.84654 10.3241 1.81477 10.1855C1.79091 10.0814 1.79091 9.91727 1.81477 9.81317C1.84654 9.67458 1.90328 9.58473 2.01677 9.40503C2.95461 7.92005 5.74617 4.16602 10.0003 4.16602C14.2545 4.16602 17.0461 7.92005 17.9839 9.40503C18.0974 9.58473 18.1541 9.67458 18.1859 9.81317C18.2098 9.91727 18.2098 10.0814 18.1859 10.1855C18.1541 10.3241 18.0974 10.414 17.9839 10.5937C17.0461 12.0786 14.2545 15.8327 10.0003 15.8327C5.74617 15.8327 2.95461 12.0786 2.01677 10.5937Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path :class="{ 'error': form_item.error.length }" d="M10.0003 12.4993C11.381 12.4993 12.5003 11.3801 12.5003 9.99935C12.5003 8.61864 11.381 7.49935 10.0003 7.49935C8.61962 7.49935 7.50034 8.61864 7.50034 9.99935C7.50034 11.3801 8.61962 12.4993 10.0003 12.4993Z" stroke="#B6C2D0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg :class="`${main_class}__authorization__icon`" v-if="form_item.type === 'text'" @click="visiblePassword(form_item.type)" xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path :class="{ 'error': form_item.error.length }" d="M8.95245 3.2436C9.29113 3.19353 9.64051 3.16667 10.0003 3.16667C14.2545 3.16667 17.0461 6.9207 17.9839 8.40569C18.0974 8.58542 18.1542 8.67528 18.1859 8.81389C18.2098 8.91799 18.2098 9.08222 18.1859 9.18631C18.1541 9.32492 18.097 9.41538 17.9827 9.59631C17.7328 9.99179 17.3518 10.5476 16.8471 11.1504M5.6036 4.59586C3.80187 5.81808 2.57871 7.51615 2.01759 8.4044C1.90357 8.58489 1.84656 8.67514 1.81478 8.81373C1.79091 8.91783 1.7909 9.08203 1.81476 9.18613C1.84652 9.32473 1.90328 9.41459 2.01678 9.59432C2.95462 11.0793 5.74618 14.8333 10.0003 14.8333C11.7157 14.8333 13.1932 14.223 14.4073 13.3972M2.50035 1.5L17.5003 16.5M8.23258 7.23223C7.78017 7.68464 7.50035 8.30964 7.50035 9C7.50035 10.3807 8.61963 11.5 10.0003 11.5C10.6907 11.5 11.3157 11.2202 11.7681 10.7678" stroke="#808E9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <CheckboxCmp
            :class="`${main_class}__authorization__checkbox`"
            :text="'Запомнить меня'"
            :active="remember_me"
            @set_value="taskCheckbox"
        />
        <BtnCmp 
            :text="'Войти'"
            @click="loginSite"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { useStoreAuth } from '~/src/stores/storeAuth'
import type { Form } from '~/src/ts-interface/inputs'
import { useStoreModal } from '~/src/stores/storeModal'
import { useCookies } from "vue3-cookies"

export default defineComponent({
    props: {
        main_class: {
            type: String,
        }
    },
    setup() {
        const storeAuth = useStoreAuth()
        const storeModal = useStoreModal()
        const { cookies } = useCookies()

        const remember_me = ref<boolean>(false)
        
        const user_valid = ref<boolean>(true)

        const form_authorization = reactive([
            {
                id: 'userName',
                type: 'email',
                value: '',
                required: true,
                valid: false,
                pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                label: 'Email',
                error: ''
            },
            {
                id: 'password',
                type: 'password',
                value: '',
                required: true,
                valid: false,
                pattern: '',
                label: 'Пароль',
                error: ''
            },
        ] as Array<Form>)

        const emit = (eventName: string, eventData: any) => {
            console.log(`emit событие '${eventName}' с data:`, eventData)
        }

        const visiblePassword = (type: string) => {
            if (type === 'password') {
                form_authorization[1].type = 'text'
            } else {
                form_authorization[1].type = 'password'
            }
        }
        
        const taskCheckbox = (obj: { id: number, active: boolean }) => {
            remember_me.value = obj.active
        }

        const setUserData = (user_data: { type: string, value: string }) => {
            for (let i = 0; i < form_authorization.length; i++) {
                if (form_authorization[i].type === user_data.type) {
                    form_authorization[i].value = user_data.value
                }
            }
        }

        const validCheck = (form_item: Form) => {
            const regExp = new RegExp(form_item.pattern, 'i')

            if(form_item.value) {
                if(form_item.id === 'username' && !form_item.value.match(/@/gi)) {
                    form_item.error = 'Неверный формат данных. Введите корректный email'
                } else if(!regExp.test(form_item.value)){
                    form_item.error = 'Неверный формат данных. Введите корректный email'
                } else if(form_authorization.every(value => value.value.length)) {
                    form_item.error = ""
                } else {
                    form_item.error = ""
                }
            } else if(!form_item.value.length && form_item.required) {
                form_item.error = 'Это поле обязательно к заполнению для авторизации'
            } 
        }

        const loginSite = () => {
            let user_data: Record<string, any> = {}
            user_valid.value = true

            for (let form_item of form_authorization) {
                validCheck(form_item)
                if (form_item.error) {
                    user_valid.value = false as boolean
                }
                user_data[form_item.id] = form_item.value
            }

                if (user_valid.value) {
                    axios
                        .post('admin/v1/login', user_data)
                        .then((token) => {
                            emit('set_token', token.data)
                            axios.defaults.headers.common['Authorization'] = `Bearer ${token.data}`
                            if (user_valid.value && remember_me.value) {
                                cookies.set('course_auth', 'true')
                                cookies.set('course_auth_token', token.data)
                            } else {
                                cookies.remove('course_auth')
                                cookies.remove('course_auth_token')
                            }
                            storeAuth.logIn()
                            storeModal.closeModal()
                        })
                        .catch((error) => {
                            console.log('Ошибка при выполнении запроса:', error.response)
                            if(user_valid.value) {
                                form_authorization[1].error = error.response.data
                            }
                        })
                }
            }

        return {
            remember_me,
            form_authorization,
            storeAuth,
            user_valid,
            visiblePassword,
            taskCheckbox,
            setUserData,
            validCheck,
            loginSite,
            emit,
            storeModal
        }
    },
})
</script>
<style scoped lang="sass">
.oil-modal
    &__authorization
        width: rem(468)
        @include flex_column
        &__title
            font-size: rem(32)
            font-weight: 600
            line-height: rem(40)
            margin-bottom: rem(48)
            @include flex_center

        &__form
            position: relative
            margin-bottom: rem(16)

        &__icon
            position: absolute
            top: 50%
            right: rem(16)
            transform: translateY(-50%)
            cursor: pointer

        &__checkbox
            margin-bottom: rem(40)

.error
    stroke: $basic_error
</style>