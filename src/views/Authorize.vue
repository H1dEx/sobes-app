<template>
    <v-container
        fluid
    >
        <v-row
            class="pt-16"
            justify="center"
        >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                        dark
                        flat
                    >
                        <v-toolbar-title>Login form</v-toolbar-title>
                        <v-spacer/>

                    </v-toolbar>
                    <v-card-text>
                        <v-form lazy-validation>
                            <v-text-field
                                label="Login"
                                v-model="login"
                                :error-messages="loginErrors"
                                name="login"
                                prepend-icon="mdi-account"
                                type="text"
                                @blur="$v.login.$touch()"
                                autocomplete
                            ></v-text-field>

                            <v-text-field
                                :error-messages="passwordErrors"
                                v-model="password"
                                label="Password"
                                name="password"
                                prepend-icon="mdi-lock"
                                type="password"
                                @blur="$v.password.$touch()"
                                autocomplete
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="ma-2"
                               @click="onSubmit"
                               tile
                               :loading="isFetching"
                               dark>Submit
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {required, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },

    validations: {
        login: {
            required
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(18)
        }
    },

    methods: {
        onSubmit() {
            this.$v.$touch()
            if (this.$v.$invalid) return;
            const obj = {login: this.login, password: this.password}
            this.$store.dispatch("login", obj)
                .then(() => this.$router.push('/'))
                .catch(() => {
                })
        },
    },

    computed: {
        loginErrors() {
            const message = [];
            if (!this.$v.login.$dirty) return message
            !this.$v.login.required && message.push('Login is required')
            return message
        },
        passwordErrors() {
            const message = [];
            if (!this.$v.password.$dirty) return message
            !this.$v.password.required && message.push('Password is required')
            !this.$v.password.minLength && message.push('password must be at least 6 characters')
            !this.$v.password.maxLength && message.push('Name must be at most 18 characters long')
            return message
        },
        isFetching() {
            return this.$store.getters.isFetching
        }
    }
}
</script>