import {addTask} from "@/axios";

export default {
    state: {},
    mutations: {},
    actions:{
        async createTask({commit}, payload) {
            commit('clearError');
            commit('setFetching', true);
            try {
                const result = await addTask(payload);
                console.log(result);
                commit('setFetching', false);

            } catch (e) {
                commit('setError', e.message);
                commit('setFetching', false);
                throw(e)
            }
        }
    }
}