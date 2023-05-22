<template>
  <form @submit.prevent="sendForm" class="form">
    <BaseInput v-model="contact.prenom" label="Prénom" type="text"/>
    <div class="input-errors" v-for="(error, index) of v$.nom.$errors" :key="index">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <BaseInput v-model="contact.nom" label="Nom *" type="text" isError="{{v$.nom.$errors.length}}"/>
    <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
    <BaseInput v-model="contact.email" label="Email *" type="email" isError="{{v$.email.$errors.length}}"/>
    <BaseInput v-model="contact.telephone" label="Téléphone" type="text" />
    <BaseTextarea v-model="contact.message" label="Message *"/>

    <button class="btn btn--primary btn--send" type="submit">Send</button>
  </form>
</template>

<script>
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      contact: {
        prenom:'',
        nom:'',
        email:'',
        telephone:'',
        message:'',
      },
    };
  },
  validations() {
    return {
      nom: {
        required: helpers.withMessage('Merci de renseigner votre nom.', required)
      },
      email: {
        required: helpers.withMessage('Merci de renseigner votre email.', required), 
        email:  helpers.withMessage('Votre email n\'est pas valide', email),
      },
    }
  },
  components: { BaseInput, BaseTextarea },
  methods: {
    async sendForm () {
      const result = await this.v$.$validate();
      console.log('result :>> ', result);
      if (!result) {
        console.debug(this.$v);
        // notify user form is invalid
        return
      }
      axios
        .post(
          '/contact',
          this.contact
        )
        .then((response) => {
          console.log('Response', response);
          this.$router.push({ name: 'contactConfirm' }); 
        })
        .catch((error) => {
          console.log('Error', error)
        })
    }
  }
};
</script>