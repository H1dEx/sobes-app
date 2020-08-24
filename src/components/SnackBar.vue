<template>
    <v-snackbar
        :color="color"
        :multi-line="true"
        :timeout="timeout"
        :top="true"
        @input="closeError"
        :value="true"
    >
        {{error}}

        <template v-slot:action="{ attrs }">
            <v-btn
                dark
                text
                v-bind="attrs"
                @click="closeError"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            color: "error",
            timeout: 3000
        }
    },
    props: ['closeError', 'error']
}
</script>