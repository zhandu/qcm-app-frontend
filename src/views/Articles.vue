<template>
  <h1 class="text-center mt-3 mb-5">Articles</h1>
  <Loader v-if="loadingArticles" class="mb-5" />
  <div v-else class="mb-5">
    <div class="container" v-if="articles.length">
      <div class="row g-3">
        <div
          class="col-12 col-md-6 col-lg-4"
          v-for="article in articles"
          :key="article._id"
        >
          <div class="card h-100">
            <div class="card-header">
              <h5 class="card-title">{{ article.title }} <router-link :to="`/articles/${article._id}`"><i class="bi bi-link"></i></router-link></h5>
            </div>
            <div class="card-body d-flex flex-column justify-content-between">
              <p class="card-text">
                {{
                  article.description.substring(0, 100) +
                  (article.description.length > 100 ? '...' : '')
                }}
              </p>
              <p class="d-flex flex-column mb-0">
                <small class="text-secondary"
                  >Date de révision :
                  <strong>{{ article.revisionDate }}</strong></small
                >
                <small
                  :class="
                    article.publicationDate ? 'text-success' : 'text-danger'
                  "
                >
                  <template v-if="article.publicationDate"
                    >Date de publication :
                    <strong>{{ article.publicationDate }}</strong></template
                  >
                  <template v-else
                    ><strong>Article non publié</strong></template
                  >
                </small>
              </p>
            </div>
            <div class="card-footer">
              <div class="mb-3">
                Tags :
                <span
                  class="badge rounded-pill bg-secondary me-1"
                  v-for="(tag, i) in article.tags"
                  :key="i"
                  style="cursor: pointer"
                  >{{ tag }}</span
                >
              </div>
              <div>
                <button
                  class="btn btn-outline-success"
                  @click="handlePublishArticle(article._id)"
                  v-if="!article.publicationDate"
                >
                  Publier
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="text-center" v-else>Aucun article trouvé</p>
  </div>
  <CreateArticle v-if="isAdmin" @added="addNewArticle" />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import CreateArticle from '@/components/CreateArticle'
import Loader from '@/components/app/Loader'

export default {
  name: 'Articles',
  components: {
    CreateArticle,
    Loader,
  },
  data: () => ({
    articles: [],
    loadingArticles: true,
  }),
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {
    ...mapActions([
      'fetchPublishedArticles',
      'fetchAllArticles',
      'publishArticle',
    ]),
    addNewArticle(article) {
      this.articles.push(article)
    },
    handlePublishArticle(id) {
      this.publishArticle(id).then((article) => {
        const idx = this.articles.findIndex((a) => a._id === article._id)
        this.articles[idx] = article
      })
    },
  },
  async mounted() {
    if (this.isAdmin) {
      this.fetchAllArticles().then((articles) => {
        console.log(articles);
        this.articles = articles
        this.loadingArticles = false
      })
    } else {
      this.fetchPublishedArticles().then((articles) => {
        this.articles = articles
        this.loadingArticles = false
      })
    }
  },
}
</script>