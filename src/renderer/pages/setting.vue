<template>
  <div class="setting">
    

    <body>
      <div class="bg-red">red</div>
      <div class="bg-green">green</div>
    </body>
    


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
