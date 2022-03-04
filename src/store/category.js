import api from '@/services/api'

const handleError = ({commit, dispatch}, e) => {
    if (e.response.status === 403) dispatch('logout')
    commit('SET_ERRORS', e)
}

export default {
    actions: {
        async fetchCategories({commit, dispatch}) {
            try {
                const res = await api.get('/categories')
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        }
    }
}