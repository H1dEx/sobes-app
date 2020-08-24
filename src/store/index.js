import Vue from 'vue'
import Vuex from 'vuex'
import list from "@/store/list";
import create from "@/store/create";
import shared from "@/store/shared";
import login from "@/store/login";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {list, create, login, shared},
})
