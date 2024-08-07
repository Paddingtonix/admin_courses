import axios from 'axios'
import { defineStore } from 'pinia'

export const useStoreParametersCourse = defineStore('parametersCourse', {
    state: () => ({
        type: '', // sync, async
        format: '', // online, offline
        purchase: '', // paid, free
        access: '' // full, partial
	}),
    actions: {
        // async setParametersCourse() {
        //     try {
        //         const response = await axios.get()
        //         const data = response.data

        //         this.type = data.type,
        //         this.format = data.format,
        //         this.purchase = data.purchase,
        //         this.access = data.access,
        //     } catch (error) {
        //         console.error('Ошибка при получении данных с сервера:', error)
        //     }
        // }
	}
})
