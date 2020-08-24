<template>
    <v-container>
        <div class="row justify-center">
            <div v-if="!isFetching" class="col col-md-10 offset-1">
                <v-list two-line>
                    <template v-for="(task, index) in tasks">
                        <v-list-item :key="task.title" :class="{'active':task.is_important}">
                            <v-list-item-action>
                                <v-btn @click="onImportant(task)" text>
                                    <v-icon v-if="!task.is_important" color="grey lighten-1">
                                        mdi-star
                                    </v-icon>

                                    <v-icon v-else color="yellow">
                                        mdi-star
                                    </v-icon>
                                </v-btn>

                            </v-list-item-action>

                            <v-list-item-content>
                                <v-list-item-title v-text="task.title"
                                                   :class="{'text-decoration-line-through':task.is_finished}"/>
                                <v-list-item-subtitle v-text="task.text"
                                                      :class="{'text-decoration-line-through':task.is_finished}"/>
                            </v-list-item-content>

                            <v-list-item-action>
                                <v-checkbox
                                    class="mt-0"
                                    :input-value="task.is_finished"
                                    label="Done"
                                    @click="onCheck(task)"
                                />
                            </v-list-item-action>

                            <v-list-item-action>
                                <v-btn @click="onDelete(task.id)" text>
                                    <v-icon color="grey lighten-1">
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-list-item-action>

                        </v-list-item>

                        <v-divider
                            v-if="index + 1 < tasks.length"
                            :key="index"
                        />
                    </template>
                </v-list>

            </div>
            <div v-else class="col col-md-1 pt-15">
                <v-progress-circular
                    :size="150"
                    :width="12"
                    indeterminate
                ></v-progress-circular>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="text-center">
                    <v-pagination
                        dark
                        circle
                        :value="currentPage"
                        :length="pageCount"
                        prev-icon="mdi-menu-left"
                        next-icon="mdi-menu-right"
                        @input="togglePage"
                        totalVisible="5"
                    ></v-pagination>
                </div>
            </div>
        </div>

    </v-container>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        onDelete(id) {
            this.$store.dispatch('deleteTask', id)
        },
        onImportant(task) {
            this.$store.dispatch('toggleImportant', task)
        },
        onCheck(task) {
            this.$store.dispatch('toggleFinished', task)
        },
        togglePage(newPage) {
            this.$store.dispatch('fetchTasks', newPage)
        }
    },

    computed: {
        tasks() {
            return this.$store.getters.tasks
        },
        isFetching() {
            return this.$store.getters.isFetching
        },
        currentPage() {
            return this.$store.getters.currentPage
        },
        pageCount() {
            return this.$store.getters.pageCount
        }
    },

    created(pageNum = 1) {
        this.$store.dispatch("fetchTasks", pageNum)
    }
}
</script>

<style scoped>
.active {
    background-color: lightyellow;
}
</style>