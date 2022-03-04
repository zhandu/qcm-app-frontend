<template>
  <h1 class="text-center mt-3 mb-5">Article</h1>
  <Loader v-if="loadingArticle" class="mb-5" />
  <div v-else class="mb-5"></div>
</template>

<script>
import Loader from '@/components/app/Loader'

export default {
    name: 'Article',
    components: {
        Loader
    },
    data: () => ({
        loadingArticle: true
    })
}
</script>