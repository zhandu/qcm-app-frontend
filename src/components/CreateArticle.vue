<template>
  <h4 class="text-center my-3">Créer un nouvel article</h4>
  <form class="w-75 mx-auto" @submit.prevent="handleCreateArticle">
    <div class="form-group mb-3">
      <label for="title" class="mb-1">Titre</label>
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Titre"
        v-model="title"
      />
    </div>
    <div class="form-group mb-3">
      <label for="category" class="mb-1">Catégorie</label>
      <select class="form-control" id="category" v-model="category">
        <option value="">Choisissez une catégorie</option>
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="form-group mb-3">
      <label for="article" class="mb-1">Article</label>
      <textarea
        class="form-control"
        id="article"
        rows="5"
        placeholder="Contenu"
        v-model="article"
      ></textarea>
    </div>
    <div class="form-group mb-3">
      <label for="tags" class="mb-1">Tags</label>
      <input
        type="text"
        class="form-control"
        id="tags"
        placeholder="tag1, tag2..."
        v-model="tags"
      />
    </div>
    <div class="form-check mb-3">
      <label class="form-check-label" for="publish"> Publier </label>
      <input class="form-check-input" type="checkbox" id="publish" v-model="publish" />
    </div>
    <div class="mb-5">
        <input type="submit" class="btn btn-outline-success me-2" value="Créer" />
        <input class="btn btn-outline-warning" type="reset" value="Effacer le formulaire" @click="resetCreateArticleForm">
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateArticle',
  emits: ["added"],
  data: () => ({
    title: '',
    category: '',
    article: '',
    tags: '',
    publish: false,
    categories: [],
  }),
  computed: {
    formattedTags() {
        const tags = this.tags.split(',')
        return tags.filter(t => t !== '').map(t => t.trim().replace(/\s+/g, ' '))
    }
  },
  methods: {
    ...mapActions(['fetchCategories', 'createArticle']),
    resetCreateArticleForm() {
        this.title = ''
        this.category = ''
        this.article = ''
        this.tags = ''
        this.publish = false
    },
    handleCreateArticle() {
        this.createArticle({
            title: this.title,
            category: this.category,
            description: this.article,
            tags: this.formattedTags,
            publish: this.publish
        }).then(article => {
            this.$emit('added', article)
            this.resetCreateArticleForm()
        })
    }
  },
  async mounted() {
    this.fetchCategories().then((categories) => {
      this.categories = categories
    })
  },
}
</script>