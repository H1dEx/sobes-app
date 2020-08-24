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
        </v-main>

    </v-app>
</template>

<script>
import Drawer from "@/components/Drawer";
import AppBar from "@/components/AppBar";
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

    },

    created() {
        if (!this.isLogged)
            this.$router.push('/login')
    }
};
</script>
