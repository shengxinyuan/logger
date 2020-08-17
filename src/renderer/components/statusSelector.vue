<template>
  <div class="cont">
    <div v-if="show">
      <el-button size="mini" type="success" icon="el-icon-check" circle @click="change('success')"></el-button>
      <el-button size="mini" type="primary" icon="el-icon-edit" @click="change('')" circle></el-button>
      <el-button size="mini" type="danger" icon="el-icon-close" circle @click="change('danger')"></el-button>
    </div>
    <el-button 
      v-else 
      size="mini"
      :type="type"
      :icon="icon" 
      circle @click="toast"
    />
  </div>
</template>

<script>
  export default {
    name: 'status-selector',
    model: {
      prop: 'modelVal',
      event: 'change'
    },
    props: ['modelVal'],
    data () {
      return {
        show: false
      }
    },
    computed: {
      type() {
        return this.modelVal === 'success' ? 'success' : this.modelVal=== 'danger' ? 'danger' : 'primary'
      },
      icon() {
        return this.modelVal === 'success' ? 'el-icon-check' : this.modelVal=== 'danger' ? 'el-icon-close' : 'el-icon-edit'
      }
    },
    methods: {
      toast () {
        this.show = !this.show
      },
      change (status) {

        this.$emit('change', status)
        this.toast()
      },
    }
  }
</script>

<style scoped>
  .cont {
    position: absolute;
    left: 0;
    display: block;
    margin: 0 6px;
    z-index: 2;
  }
  
</style>
