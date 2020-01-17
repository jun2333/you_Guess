import { login, getUserInfo } from "@/api/user";
import { setToken, getToken } from "@/libs/util";
import Cookies from 'js-cookie';

export default {
    state: {
        userName: "",
        userId: "",
        avatorImgPath: "",
        token: getToken(),
        access: ""
    },
    mutations: {
        setAvator(state, avatorPath) {
            state.avatorImgPath = avatorPath;
        },
        setUserId(state, id) {
            state.userId = id;
        },
        setUserName(state, name) {
            state.userName = name;
        },
        setAccess(state, access) {
            state.access = access;
        },
        setToken(state, token) {
            state.token = token;
            setToken(token);
        }
    },
    getters: {
        messageUnreadCount: state => state.messageUnreadList.length,
        messageReadedCount: state => state.messageReadedList.length,
        messageTrashCount: state => state.messageTrashList.length
    },
    actions: {
        // 登录
        handleLogin({ commit }, { userName, password }) {
            userName = userName.trim();
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    if (res) {
                        // console.log(res)
                        // const data = res.data;
                        commit("setToken", userName);
                        resolve();
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        },
        // 退出登录
        handleLogOut({ state, commit }) {
            return new Promise((resolve, reject) => {
                // commit("setToken", "");
                // commit("setAccess", []);
                Cookies.remove("token");
                resolve();
            });
        },
        // 获取用户相关信息
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                try {
                    getUserInfo(state.token).then(res => {
                        const data = res.data;
                        debugger
                        commit("setAvator", data.avator);
                        commit("setUserName", data.name);
                        commit("setUserId", data.user_id);
                        commit("setAccess", data.access);
                        commit("setHasGetInfo", true);
                        resolve(data);
                    }).catch(err => {
                        reject(err);
                    });
                } catch (error) {
                    reject(error);
                }
            });
        }
    }
};
