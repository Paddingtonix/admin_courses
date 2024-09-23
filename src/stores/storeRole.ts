import {defineStore} from 'pinia';
import axios from 'axios';

export const useUserRoleStore = defineStore('useRole', {
    state: () => ({
        role: '',
    }),

    actions: {
        setRole(newRole: string) {
            this.role = newRole;
        },

        clearRole() {
            this.role ='';
        },

        getUserRole() {
            axios.get('admin/v1/Login/Role')
                .then(response => {
                    this.role = response.data;
                })
                .catch(error => {
                    console.log('Ууупс, не получил роль... кто я? :(', error)
                })
        },
    },
    getters: {
        isAdmin: (state) => state.role === 'admin',
        isAuthor: (state) => state.role === 'author',
    },
})