import {authAPI} from '@/axios'

export default {
    state: {
        user: null,
        isFetching: false
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload
        },
        logout(state) {
            state.user = null
        }
    },

    actions: {
        async login({commit}, data) {
            commit("clearError");
            commit("setFetching", true);
            try {
                const user = await authAPI.login(data)
                console.log(user)
                commit('setFetching', false);
                commit('setUser', {login:user.login, id:user.id})
            } catch (err) {
                commit('setFetching', false);
                commit('setError', err.message)
                throw (err)
            }
        },

        logout({commit}) {
            authAPI.logout();
            commit("logout");

        }
    },

    getters: {
        isLogged(state) {
            return state.user !== null
        }
    }
}