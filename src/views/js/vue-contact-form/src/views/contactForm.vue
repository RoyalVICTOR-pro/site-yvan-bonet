<template>
  <form @submit.prevent="sendForm" class="form">
    <div class="form__group">
      <input v-model="contact.prenom" type="text" placeholder="Prénom" class="field form__input"/>
      <label class="form__label">Prénom</label>
    </div>
    <div class="form__group">
      <input v-model="contact.nom" type="text" placeholder="Nom *" class="field form__input"/>
      <label class="form__label">Nom *</label> 
    </div>
    <div class="form__group">
      <input v-model="contact.email" type="email" placeholder="Email *" class="field form__input"/>
      <label class="form__label">Email *</label>
    </div>
    <div class="form__group">
      <input v-model="contact.telephone" type="text" placeholder="Téléphone" class="field form__input"/>
      <label class="form__label">Téléphone</label>
    </div>
    <div class="form__group">
      <textarea v-model="contact.message" placeholder="Message *" class="field form__textarea"></textarea>
      <label class="form__label">Message *</label>
    </div>
    <button class="btn btn--primary btn--send" type="submit">Send</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
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
  methods: {
    async sendForm () {
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