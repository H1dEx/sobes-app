<template>
    <div>
        <v-app-bar
            dense
            dark
        >
            <v-app-bar-nav-icon @click="myToggleDrawer" class="hidden-md-and-up"/>
            <v-toolbar-title>Page title</v-toolbar-title>
            <v-spacer/>
            <v-toolbar-items>
                <v-btn class="hidden-sm-and-down" text v-for="link of links" :key="link.title" :to="link.url">
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-btn>
            </v-toolbar-items>

        </v-app-bar>
    </div>
</template>

<script>
export default {
    props: ['toggleDrawer', 'links'],
    data() {
        return {
        }
    },
    methods: {
        myToggleDrawer() {
            this.toggleDrawer();
        }
    }
}
</script>