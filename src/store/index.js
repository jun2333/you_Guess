import Vue from 'vue';
import Vuex from 'vuex';
import {
    getData
} from '../api/bar'

Vue.use(Vuex);

function createStore() {
    const store = new Vuex.Store({
        state: {
            bar: ''
        },

        mutations: {
            'SET_BAR'(state, data) {
                state.bar = data
            }
        },

        actions: {
            fetchBar({
                commit
            }) {
                getData().then(res => {
                    commit('SET_BAR', res.data);
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    });

    /* if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        console.log(window.__INITIAL_STATE__);
        store.replaceState(window.__INITIAL_STATE__)
    } else {
        console.log('no browser')
    } */

    return store;
}

export default createStore