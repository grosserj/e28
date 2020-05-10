import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import * as app from '@/common/app.js';

export default new Vuex.Store({
    state: {
        categories: [],
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload;
        }
    },
    actions: {
        setCategories(context) {
            app.api.all('categories').then(response => {
                context.commit('setCategories', response);
            });
        }
    },
    getters: {
        getCategoryBySlug(state) {
            return function (slug) {
                for (let key of Object.keys(state.categories)) {
                    console.log(slug);
                    if (state.categories[key].slug == slug) {
                        return state.categories[key];
                    }
                }
            }
        }
    }
})