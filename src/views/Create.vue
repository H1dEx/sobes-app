<template>
    <v-container>
        <v-row>
            <v-col sm="6" offset-sm="3" md="4" offset-md="4">
                <h1>Add task</h1>
                <v-form>
                    <v-text-field
                        class="mb-4"
                        v-model="title"
                        label="Title"
                        :error-messages="titleErrors"
                        @blur="$v.title.$touch()"
                        counter
                    ></v-text-field>

                    <v-textarea
                        name="input-7-1"
                        outlined
                        :error-messages="textErrors"
                        v-model="text"
                        label="Description"
                        auto-grow
                        @blur="$v.text.$touch()"
                    ></v-textarea>

                    <v-checkbox
                        class="mt-0"
                        v-model="is_important"
                        label="Important"
                    ></v-checkbox>
                    <v-btn class="ma-1"
                           @click="onSubmit"
                           tile
                           :loading="isFetching"
                           dark>Submit
                    </v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            title: '',
            text: '',
            is_important: false
        }
    },
    methods: {
        onSubmit() {
            this.$v.$touch()
            if (this.$v.$invalid) return;
            const obj = {title: this.title, text: this.text, is_important: this.is_important}
            this.$store.dispatch('createTask', obj)
                .then(() => this.$router.push('/'))
                .catch(() => {
                })
        }
    },
    validations: {
        title: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(100)
        },
        text: {
            required
        }
    },
    computed: {
        titleErrors() {
            const message = [];
            if (!this.$v.title.$dirty) return message
            !this.$v.title.required && message.push('Title is required')
            !this.$v.title.minLength && message.push('Title must be at least 4 characters')
            !this.$v.title.maxLength && message.push('Title must be at most 100 characters long')
            return message
        },
        textErrors() {
            const message = [];
            if (!this.$v.text.$dirty) return message
            !this.$v.text.required && message.push('Text is required')
            return message
        },
        isFetching() {
            return this.$store.getters.isFetching
        }
    },
}
</script>