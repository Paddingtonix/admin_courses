export default {
    namespaced: true,
    state: {
        modalProps: null,
        modalComponent: null,
    },
    getters: {
        modalComponent(state: { modalComponent: any; }) {
            return state.modalComponent;
        },
        modalProps(state: { modalProps: any; }) {
            return state.modalProps;
        },
    },
    mutations: {
        openModal(state: { modalComponent: any; modalProps: any }, data: { newState: any; props: any }) {            
            state.modalComponent = data.newState
            state.modalProps = data.props             
        },
        closeModal(state: { modalComponent: any; modalProps: any }) {
            state.modalComponent = null
            state.modalProps = null
        }
    }
}