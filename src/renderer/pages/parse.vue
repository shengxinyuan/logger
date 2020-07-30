<template>
  <div class="parse">
    
  </div>
</template>

<script>
import { readFile } from 'xlsx'
console.log(readFile);
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
