<template>
    <div class="auth-modal">
        <div class="auth-modal__form">
            <input-cmp 
                v-for="input in form_auth"
                :key="input.id"
                :input_label="input.label"
                :input_value="input.value"
                :input_error="input.error"
                :input_type="input.type"
            />
        </div>
        <checkbox-cmp 
            :text="'Запомнить меня'"
        />
        <btn-cmp 
            :btn_text="'Войти'"
            @click="siteLogIn"
        />
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { auth } from '../../types/form'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// components
import inputCmp from '@/components/ui-components/input-cmp/input-cmp.vue'
import checkboxCmp from '@/components/ui-components/checkbox-cmp/checkbox-cmp.vue'
import btnCmp from '@/components/ui-components/btn-cmp/btn-cmp.vue'


export default defineComponent({
    setup() {
        const form_auth = [
            {
                id: "user_name",
                value: "",
                type: "email",
                pattern: '^([a-z0-9]+(?:[._-][a-z0-9]{1,50})*)@([a-z0-9]{4,31}(?:[.-][a-z0-9]{4,31})*.[a-z]{2,4})$',
                label: "Email",
                error: ""
            },
            {
                id: "password",
                value: "",
                type: "password",
                pattern: "^[-. ()а-яА-ЯёЁa-zA-Z]+$",
                label: "Пароль",
                error: ""
            }
        ] as Array<auth>

        const router = useRouter()
        const store = useStore()

        const siteLogIn = () => {

            router.push({
                name: 'course'
            })   

            store.commit('modalModule/closeModal')
        }

        return {
            form_auth,
            siteLogIn
        }
    },
    components: {
        'input-cmp': inputCmp,
        'checkbox-cmp': checkboxCmp,
        'btn-cmp': btnCmp,
    }
})

</script>