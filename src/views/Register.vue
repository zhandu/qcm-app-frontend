<template>
  <div>
    <h1 class="text-center mt-3 mb-5">S'inscrire</h1>
    <Form @submit="handleRegister" :validation-schema="validationSchema" v-slot="{errors}" class="w-75 mx-auto d-flex flex-column">
      <div class="form-floating mb-3">
        <Field type="text" class="form-control" :class="{'is-invalid': errors.username}" id="username" name="username" v-model.trim="username" />
        <label for="username">Nom (pseudo)</label>
        <ErrorMessage name="username" as="div" />
      </div>
      <div class="form-floating mb-3">
        <Field type="email" class="form-control" :class="{'is-invalid': errors.email}" id="email" name="email" v-model.trim="email" />
        <label for="email">Email</label>
        <ErrorMessage name="email" as="div" />
      </div>
      <div class="form-floating mb-3">
        <Field type="password" class="form-control" :class="{'is-invalid': errors.password}" id="password" name="password" v-model="password" />
        <label for="password">Mot de passe</label>
        <ErrorMessage name="password" as="div" />
      </div>
      <input type="submit" value="S'inscrire" class="btn btn-lg btn-outline-primary my-3">
    </Form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Form, Field, ErrorMessage} from 'vee-validate'
import validation from '@/utils/validation'

export default {
  name: 'Register',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data: () => ({
      username: '',
      email: '',
      password: '',
      validationSchema: validation.registerSchema
  }),
  methods: {
    ...mapActions(['register']),
    handleRegister() {
      this.register({
        username: this.username,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>