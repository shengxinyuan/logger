<template>
  <div class="app">
    <div class="side-bar">
      <el-popover
        placement="top-start"
        title="logger"
        trigger="hover"
      >
        <div slot="reference" >
          <img class="logo" src="./assets/logger-logo.png" alt="">
        </div>
      </el-popover>

      <router-link to="/user">
        <img class="icon-item" src="./assets/user.png" alt="">
      </router-link>
      <router-link to="/document">
        <img class="icon-item" src="./assets/order.png" alt="">
      </router-link>
      <router-link to="/excel">
        <img class="icon-item" src="./assets/order.png" alt="">
      </router-link>
      <router-link to="/testList">
        <img class="icon-item" src="./assets/list.png" alt="">
      </router-link>
      <router-link to="/logList">
        <img class="icon-item" src="./assets/list.png" alt="">
      </router-link>
      <router-link to="/logger">
        <img class="icon-item" src="./assets/list.png" alt="">
      </router-link>
      
    </div>
    <router-view class="main-cont"/>
  </div>
</template>

<script>
  import HandleExcel from './components/handleExcel'

  export default {
    components: {
      HandleExcel,
    },
    data() {
      return {
        
      }
    },
    mounted () {
      
    },
    methods: {
      
    },
  }
</script>

<style lang="scss">
@import './styles/var.scss';
.app {
  height: 100vh;
  display: flex;
  .side-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 60px;
    height: 100vh;
    z-index: 1000;
    color: #fff;
    background: $color1;
    .logo {
      display: block;
      width: 40px;
      margin: 20px auto 40px auto;
    }
    .icon-item {
      display: block;
      width: 32px;
      margin: 20px auto;
    }
  }
  .main-cont {
    margin-left: 60px;
    width: 100%;
  }
}
</style>