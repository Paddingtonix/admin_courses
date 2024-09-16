import { defineStore } from 'pinia'

export const useStoreEditCourseSetting = defineStore('editCourse', {
    state: () => ({
		isEdit: false
	}),
    actions: {
		edit() {
			this.isEdit = true
		},
		canselEdit() {
			this.isEdit = false
		}
	},
})
