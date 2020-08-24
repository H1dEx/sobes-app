<template>
    <v-app>
        <v-navigation-drawer
            absolute
            dark
            app
            temporary
            v-model="isShowedDrawer"
        >
            <Drawer :links="links"/>
        </v-navigation-drawer>

        <AppBar :toggleDrawer="toggleDrawer" :links="links"/>

        <SnackBar v-if="error" :closeError="closeError" :error="error"/>

        <v-main>
            <router-view></router-view>
            <button @click="Myf">tipo test button</button>
        </v-main>

    </v-app>
</template>

<script>
import Drawer from "@/components/Drawer";
import AppBar from "@/components/AppBar";
import axios from "axios";
import SnackBar from "@/components/SnackBar";

export default {
    components: {Drawer, AppBar, SnackBar},

    data: () => ({
        isShowedDrawer: false
    }),

    computed: {
        error() {
            return this.$store.getters.error
        },
        isLogged() {
            return this.$store.getters.isLogged
        },
        links() {
            if (!this.isLogged)
                return [
                    {
                        title: 'Authorize',
                        icon: 'mdi-login',
                        url: '/login'
                    }
                ]
        return [
            {
                title: 'List',
                icon: 'mdi-view-list',
                url: '/'
            },
            {
                title: 'Create',
                icon: 'mdi-plus',
                url: '/add'
            },
            {
                title: 'Logout',
                icon: 'mdi-login',
                url: '/logout'
            }
        ]
        }
    },

    methods: {
        closeError() {
            this.$store.dispatch('clearError')
        },

        toggleDrawer() {
            this.isShowedDrawer = !this.isShowedDrawer
        },

        async Myf() {
            const instance = axios.create({
                baseURL: 'http://junback.local/api',
                withCredentials: true
            });

            // await instance.get('/tasks').then(response => response.data).then(console.log)
            // await instance.get('/users').then(response => response.data).then(console.log)

            // await instance.post('/login', {login: "Oleg", password: "qwerty"}).then(console.log)

            await instance.get('/logout').then(response => response.data).then(console.log)


        }
    },

    created() {
        if(!this.isLogged)
            this.$router.push('/login')
    }
};
</script>
