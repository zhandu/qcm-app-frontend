<template>
  <div>
    <h1 class="text-center mt-3 mb-5">Se connecter</h1>
    <Form @submit="handleLogin" :validation-schema="validationSchema" v-slot="{errors}" class="w-75 mx-auto d-flex flex-column">
      <div class="form-floating mb-3">
        <Field type="text" name="username" id="username" class="form-control" :class="{'is-invalid': errors.username}" v-model.trim="username" />
        <label for="username">Nom (pseudo)</label>
        <ErrorMessage name="username" as="div" />
      </div>
      <div class="form-floating mb-3">
        <Field type="password" name="password" id="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="password" />
        <label for="password">Mot de passe</label>
        <ErrorMessage name="password" as="div" />
      </div>
      <input type="submit" value="Se connecter" class="btn btn-lg btn-outline-primary my-3">
    </Form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Form, Field, ErrorMessage} from 'vee-validate'
import validation from '@/utils/validation'

export default {
    name: 'Login',
    components: {
      Form,
      Field,
      ErrorMessage
    },
    data: () => ({
        username: '',
        password: '',
        validationSchema: validation.loginSchema
    }),
    methods: {
        ...mapActions(['login']),
        handleLogin() {
          this.login({
              username: this.username,
              password: this.password
          })
        }
    }
}
</script>