<template>
  <div class="setting">
    
  </div>
</template>

<script>
  export default {
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>>
