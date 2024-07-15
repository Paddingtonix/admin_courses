import { defineStore } from 'pinia'

export const useStoreEditCourseSetting = defineStore('editCourse', {
    state: () => ({
		isEdit: false
	}),
    actions: {
		edit() {
			this.isEdit = true
			console.log('edit')
		},
		saveSetting() {
			this.isEdit = false
			console.log('saveSetting')
		}
	},
})
