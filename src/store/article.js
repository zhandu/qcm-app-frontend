import api from '@/services/api'

const handleError = ({commit, dispatch}, e) => {
    if (e.response.status === 403) dispatch('logout')
    commit('SET_ERRORS', e)
    throw e
}

export default {
    actions: {
        async createArticle({commit, dispatch}, article) {
            try {
                const res = await api.post('/articles', article)
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        },
        async fetchPublishedArticles({commit, dispatch}) {
            try {
                const res = await api.get('/articles/published')
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        },
        async fetchAllArticles({commit, dispatch}) {
            try {
                const res = await api.get('/articles/all')
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        },
        async publishArticle({commit, dispatch}, id) {
            try {
                const res = await api.post(`/articles/${id}/publish`)
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        },
        async fetchArticle({commit, dispatch}, id) {
            try {
                const res = await api.post(`/articles/${id}`)
                return res.data
            } catch (e) {
                handleError({commit, dispatch}, e)
            }
        }
    }
}