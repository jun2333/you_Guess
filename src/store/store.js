import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const fetchBar = function () {
    return new Promise((resolve, reject) => {
        fetch('/data.json',{
            method:'POST'
        }).then(res=>{
            resolve(res.json())
        }).catch(e=>{
            reject(e)
        })
    })
}

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
            fetchBar({ commit }) {
                return fetchBar().then(data => {
                    commit('SET_BAR', data);
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    });

    if (typeof window !== 'undefined' && window.__INITIAL_STATE__) {
        console.log(window.__INITIAL_STATE__);
        store.replaceState(window.__INITIAL_STATE__)
    } else {
        console.log('no browser')
    }

    return store;
}

export default createStore