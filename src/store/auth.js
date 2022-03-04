import api from '@/services/api'
import router from '@/router'
import tokenService from '../services/token.service'

const initializeState = () => {
    const user = tokenService.getUser()
    return user ? {isLoggedIn: true, user} : {isLoggedIn: false, user: null}
}

export default {
    state: initializeState(),
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        user(state) {
            return state.user
        },
        isAdmin(state) {
            return state.user ? state.user.roles.includes('admin') : false
        }
    },
    mutations: {
        LOGIN(state, user) {
            state.isLoggedIn = true
            state.user = user
        },
        LOGOUT(state) {
            state.isLoggedIn = false
            state.user = null
        },
        REFRESH_TOKEN(state, accessToken) {
            state.isLoggedIn = true
            state.user.accessToken = accessToken
        }
    },
    actions: {
        login({commit}, user) {
            api.post('/auth/signin', {
                username: user.username,
                password: user.password
            })
            .then(response => {
                const user = response.data
                tokenService.setUser(user)
                commit('LOGIN', user)
                router.push({name: 'Articles'})
            })
            .catch(error => {
                commit('SET_ERRORS', error)
            })
        },
        logout({commit}) {
            tokenService.removeUser()
            commit('LOGOUT')
            router.push({name: 'Login'})
        },
        register({commit}, user) {
            api.post('/auth/signup', {
                username: user.username,
                email: user.email,
                password: user.password
            })
            .then(response => {
                commit('SET_MSG', response)
                router.push({name: 'Login'})
            })
            .catch(error => {
                commit('SET_ERRORS', error)
            })
        },
        refreshToken({commit}, accessToken) {
            commit('REFRESH_TOKEN', accessToken)
        }
    }
}