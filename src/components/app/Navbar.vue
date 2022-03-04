<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/"><i class="bi bi-patch-question"></i> QCM App</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" exact-active-class="active"><i class="bi bi-house"></i> Accueil</router-link>
          </li>
          <li class="nav-item" v-if="user">
            <router-link to="/articles" class="nav-link" active-class="active" exact-active-class="active"><i class="bi bi-files"></i> Articles</router-link>
          </li>
          <li class="nav-item ms-lg-auto" v-if="!user">
            <router-link to="/register" class="nav-link" active-class="active" exact-active-class="active"><i class="bi bi-person-plus"></i> S'inscrire</router-link>
          </li>
          <li class="nav-item" v-if="!user">
            <router-link to="/login" class="nav-link" active-class="active" exact-active-class="active"><i class="bi bi-box-arrow-in-right"></i> Se connecter</router-link>
          </li>
          <li class="nav-item ms-lg-auto" v-if="user">
            <a href="#" class="nav-link" @click.prevent="logout"><i class="bi bi-box-arrow-in-left"></i> Se déconnecter</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Navbar',
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['logout'])
    }
}
</script>