import { createStore } from "vuex";
import auth from './auth'
import category from './category'
import article from './article'

export default createStore({
  state: {
    msg: '',
    errors: {}
  },
  getters: {
    msg(state) {
      return state.msg
    },
    errors(state) {
      return state.errors
    },
  },
  mutations: {
    SET_MSG(state, response) {
      if (response.data) {
        if (response.data.message) {
          if (typeof response.data.message === 'object') {
            state.msg = response.data.message
          } else if (typeof response.data.message === 'string') {
            state.msg = { notification: response.data.message }
          }
        }
      } else {
        state.msg = { notification: 'Succès' }
      }
    },
    SET_ERRORS(state, error) {
      if (error.response.data) {
        if (error.response.data.message) {
          if (typeof error.response.data.message === 'object') {
            state.errors = error.response.data.message
          } else if (typeof error.response.data.message === 'string') {
            state.errors = { erreur: error.response.data.message }
          }
        }
      } else {
        state.errors = { erreur: 'Une erreur est survenue' }
      }
    }
  },
  actions: {},
  modules: {
    auth,
    category,
    article
  },
});
