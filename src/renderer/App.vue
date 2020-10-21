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

      <router-link :to="v.path" v-for="(v) in list" :key="v.path" class="route-list-item">
        <div class="icon-box" :class="path == v.path ? 'active':''">
          <img class="icon-item"  :src="v.icon">
          <div class="icon-label">{{v.txt}}</div>
        </div>
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
        path: '',
        list: [
          {
            path: '/user',
            txt: '个人',
            icon: require('./assets/user.png')
          },
          {
            path: '/testList',
            txt: '用例',
            icon: require('./assets/testList.png')
          },
          {
            path: '/logList',
            txt: '埋点',
            icon: require('./assets/logList.png')
          },
          {
            path: '/logger',
            txt: '测试',
            icon: require('./assets/logger.png')
          }
        ]
      }
    },
    mounted() {
      this.$fetch({
        url: '/eventTracking/api/user/list'
      }).then((res) => {
        console.log(12312,res);
      })
      try {
        this.$router.push('/logger')
      } catch (error) {
        this.path = '/logger'
      }
      
    },
    methods: {
      
    },
    watch: {
      '$route.path' (newVal, oldVal) {
        this.path = newVal
        console.log(newVal);
      }
    }
  }
</script>

<style lang="scss">
@import './styles/var.scss';
.app {
  height: 100vh;
  display: flex;
  .route-list-item {
    text-decoration: none !important;
  }
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
      margin: 20px auto 30px auto;
    }
    .active {
      background: $color2;
    }
    .icon-box {
      padding: 8px 0;
      margin: 12px 0;
    }
    .icon-item {
      margin: 0 auto;
      display: block;
      width: 24px;
    }
    .icon-label {
      margin-top: 6px;
      width: 100%;
      color: #fff;
      text-align: center;
      font-size: 12px;
      text-decoration: none !important;
    }
  }
  .main-cont {
    margin-left: 60px;
    width: 100%;
  }
}
</style>