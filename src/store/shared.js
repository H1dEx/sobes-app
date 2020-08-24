export default {
    state: {
        isFetching: false,
        error: null
    },
    mutations: {
        setFetching(state, payload) {
            state.isFetching = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },

    },
    actions: {
        setFetching({commit}, payload) {
            commit('setFetching', payload)
        },
        setError({commit}, payload) {
            commit('setError', payload)
        },
        clearError({commit}) {
            commit('clearError')
        }
    },
    getters: {
        isFetching(state) {
            return state.isFetching
        },
        error(state) {
            return state.error
        },

    }
}