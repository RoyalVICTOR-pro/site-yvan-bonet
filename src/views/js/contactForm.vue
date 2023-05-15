<template>
  <form @submit.prevent="sendForm" class="form">
    <BaseInput v-model="contact.prenom" label="Prénom" type="text" />
    <BaseInput v-model="contact.nom" label="Nom" type="text" />
    <BaseInput v-model="contact.email" label="Email" type="text" />
    <BaseInput v-model="contact.telephone" label="Téléphone" type="text" />
    <BaseTextarea v-model="contact.message" label="Message" />

    <button class="btn btn--primary btn--send" type="submit">Envoyer</button>
  </form>
</template>

<script>
import BaseInput from './components/BaseInput.vue';
import BaseTextarea from './components/BaseTextarea.vue';
import contactConfirm from './contactConfirm.vue';
import axios from 'axios';


export default {
  data() {
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
  components: { BaseInput, BaseTextarea },
  methods: {
    sendForm () {
      console.log('this.$router :>> ', this.$router);
      this.$router.push({ name: 'contactConfirm' });
      // axios
      //   .post(
      //     '/contact',
      //     this.contact
      //   )
      //   .then(function (response) {
      //     console.log('Response', response);
      //     this.$router.push({ name: 'contactConfirm' });
      //   })
      //   .catch(function (error) {
      //     console.log('Error', error)
      //   })
    }
  }
};
</script>