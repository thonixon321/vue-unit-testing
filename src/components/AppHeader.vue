<template>
  <div>
    <button v-show="loggedIn">Log out</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false
    }
  }
}
</script>

<style>

</style>