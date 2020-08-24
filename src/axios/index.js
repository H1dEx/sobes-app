import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://junback.local/api',
    withCredentials: true
})

export const authAPI = {
    login({login, password}) {
        return instance.post('/login', {login, password})
            .then(response => response.data)
    },
    logout() {
        return instance.get('/logout').then(response => response.data)
    }
}

export const addTask = payload => instance.post('/tasks', payload)

export const listAPI = {
    loadTasks(currentPage = 1, pageSize = 10) {
        return instance.get(`/tasks?page=${currentPage}&count=${pageSize}`).then(response => response.data)
    },
    deleteTask(id) {
        return instance.get(`/tasks/id:${id}`)
    }
}