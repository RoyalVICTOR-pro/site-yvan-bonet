<template>
  <div class="confirmation_container">
    <h2>Votre message a bien été envoyé !</h2><br/>
    Yvan Bonet reviendra vers vous dans les meilleurs délais. <br/><br/>
    <router-link :to="{name: 'contactForm'}">Revenir au formulaire</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>