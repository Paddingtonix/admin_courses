import axios from 'axios'
import { defineStore } from 'pinia'
import type { IHeading, IStoreTags } from '../ts-interface/storeTags.type'

export const useTagsStore = defineStore({
  id: 'tagsStore',
  state: (): IHeading[] => ([]),
  actions: {
    async getTags(){
     return axios.get('/admin/v1/label')
        .then((response) => {
          const tags = response.data as IStoreTags;
          this.$state = tags.headings;
        })
        .catch( error => {
          console.warn(error);
        })
        .finally(
          // TODO: ADD_LOADER
        )
    }
  },
  getters: {
    getState: (state) => state,
  }
})
