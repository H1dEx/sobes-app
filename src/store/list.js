import {listAPI} from "@/axios";

export default {
    state: {
        tasks: [],
        tasksCount: 0,
        currentPage: 1,
        pageSize: 5
    },

    mutations: {
        setTasks(state, data) {
            state.tasks = data.tasks;
            state.tasksCount = data.amount
        },
        setCurrentPage(state, number) {
            state.currentPage = number
        },
        deleteTask(state, task) {
            state.tasks = state.tasks.filter(el => el.id !== task.id)
        },
        toggleImportant(state, task) {
            state.tasks = state.tasks.map(el => {
                if (el.title !== task.title || el.text !== task.text)
                    return el;
                return {...el, is_important: !el.is_important}
            })
        },
        toggleFinished(state, task) {
            state.tasks = state.tasks.map(el => {
                if (el.title !== task.title || el.text !== task.text)
                    return el;
                return {...el, is_finished: !el.is_finished}
            })
        }
    },

    actions: {
        async deleteTask({commit}, id) {
            // const response = await listAPI.deleteTask(id);
            // console.log(response)
            commit('deleteTask', id)
        },
        toggleImportant({commit}, task) {
            commit('toggleImportant', task)
        },
        toggleFinished({commit}, task) {
            commit('toggleFinished', task)
        },
        async fetchTasks({state, commit}, currentPage = 1) {
            commit('clearError');
            commit('setFetching', true);
            commit("setCurrentPage", currentPage);
            try {
                const response = await listAPI.loadTasks(currentPage, state.pageSize);
                commit("setTasks", response)
                commit('setFetching', false);
            } catch (e) {
                commit('setFetching', false);
                commit('setError', e)
                throw(e);
            }
        }
    },

    getters: {
        tasks(state) {
            return state.tasks
        },
        pageCount(state) {
            return Math.ceil(state.tasksCount / state.pageSize)
        },
        currentPage(state) {
            return state.currentPage
        }
    }
}