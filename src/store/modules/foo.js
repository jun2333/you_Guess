import {
    getFoo
} from '../../api/foo'
export default {
    namespaced: true,
    // 重要信息：state 必须是一个函数，
    // 因此可以创建多个实例化该模块
    state: () => ({
        data: ''
    }),
    actions: {
        async getFoo({commit}){
            let res = await getFoo();
            commit('setData',res)
        }
    },
    mutations: {
        setData(state,data){
            state.data = data
        }
    }
}