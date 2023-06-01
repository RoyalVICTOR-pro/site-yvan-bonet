<template>
  <div class="error-message-box" v-show="errorMessage">{{ errorMessage }}</div>
  <Form @submit="sendForm" class="form">
    <div class="form__group">
      <Field name="prenom" v-model="contact.prenom" type="text" placeholder="Prénom" class="field form__input"/>
      <label class="form__label">Prénom</label>
    </div>
    <div class="form__group">
      <ErrorMessage name="nom" class="error-message"/>
      <Field name="nom" v-model="contact.nom" type="text" placeholder="Nom *" class="field form__input" :rules="isRequired"/>
      <label class="form__label">Nom *</label> 
    </div>
    <div class="form__group">
      <ErrorMessage name="email" class="error-message"/>
      <Field name="email" v-model="contact.email" type="email" placeholder="Email *" class="field form__input" :rules="validateEmail"/>
      <label class="form__label">Email *</label>
    </div>
    <div class="form__group">
      <Field name="telephone" v-model="contact.telephone" type="text" placeholder="Téléphone" class="field form__input"/>
      <label class="form__label">Téléphone</label>
    </div>
    <div class="form__group">
      <ErrorMessage name="message" class="error-message"/>
      <Field as="textarea" name="message" v-model="contact.message" placeholder="Message *" class="field form__textarea" :rules="isRequired" />
      <label class="form__label">Message *</label>
    </div>
    <button class="btn btn--primary btn--send" type="submit">Send</button>
  </Form>
</template>

<script>
import axios from 'axios';
import { Form, Field, ErrorMessage } from 'vee-validate';

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
      errorMessage: ''
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  methods: {
    async sendForm (values) {
      axios
        .post(
          '/contact',
          this.contact
        )
        .then((response) => {
          console.log('Response', response);
          if (response.status === 201) {
            this.$router.push({ name: 'contactConfirm' }); 
          } else {
            this.errorMessage = response.message;
          }
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
        })
    },
    validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'Merci de remplir le champ Email.';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'Merci de fournir un email valide.';
      }
      // All is good
      return true;
    },
    isRequired (value) {
      if (!value) {
        return 'Merci de remplir ce champ.';
      }
      return true;
    }
  }
};
</script>