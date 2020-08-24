<template>
    <v-list
        dense
        nav
        class="py-0"
    >
        <v-list-item two-line>

            <v-list-item-content>
                <v-list-item-title>Application</v-list-item-title>
                <v-list-item-subtitle>Subtext</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
            v-for="link in links"
            :key="link.title"
            :to="link.url"
            link
        >
            <v-list-item-content>
                <v-list-item-title>
                    <v-icon left>{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    props: ['links'],
    data() {
        return {}
    }
}
</script>