<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapGetters(['errors', 'msg']),
  },
  watch: {
    errors(errors) {
      this.$toast.clear()
      for (const error in errors) {
        this.$toast.open({
          message: `<p class="mb-0">${error.toUpperCase()}</p><p class="mb-0">${errors[error]}</p>`,
          type: 'error',
          duration: 10000,
          position: 'top-right'
        })
      }
    },
    msg(messages) {
      this.$toast.clear()
      for (const message in messages) {
        this.$toast.open({
          message: `<p class="mb-0">${message.toUpperCase()}</p><p class="mb-0">${messages[message]}</p>`,
          type: 'success',
          duration: 10000,
          position: 'top-right'
        })
      }
    }
  },
}
</script>
