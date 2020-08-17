<template>
  <div class="log">
    <div v-for="(v, i) in list" :key="i">{{v.txt}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        intStatus: '未连接',
        status: true,
        list: [{
          date: '2016-05-02',
          txt: '王小虎0',
        }, {
          date: '2016-05-04',
          txt: '王小虎1',
        }, {
          date: '2016-05-01',
          txt: '王小虎123',
        }, {
          date: '2016-05-03',
          txt: '王小虎4324',
        }]
      }
    },
    mounted () {
      this.webSocket()
    },
    methods: {
      add () {
        this.list.push({
          date: '123',
          txt: '143132'
        })
        console.log(123, this.list.length);
      },
      clearList () {
        this.list = []
      },
      webSocket () {
        this.socket = new WebSocket('ws://localhost:3002/logger')
        this.socket.addEventListener('open', (event) => {
          this.intStatus = '已连接'
          console.log('event', event);
        })
        this.socket.addEventListener('error', (event) => {
          console.log(event)
        })
        this.socket.addEventListener('message', (event) => {
          if (!status) return 
          this.list.push({
            date: new Date(),
            txt: event.data
          })
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
.title {
  font-size: 36px;
  margin-right: 50px;
  font-weight: 900;
}
.log-header {
  background: rgba(48, 100, 239, 1);
  color: #fff;
  font-size: 24px;
  padding: 24px;
}
.table {
  margin: 24px;
}
</style>
