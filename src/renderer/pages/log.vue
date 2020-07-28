<template>
  <div class="log">

    <div class="log-header">
      <span class="title">Logger</span>
      状态： {{ intStatus }}
      (如何连接<i class="el-icon-question"></i>)
    </div>

    <div class="table">
      <el-button v-if="!status" @click="status = !status" icon="el-icon-video-play">开始监听数据</el-button>
      <el-button v-else @click="status = !status" icon="el-icon-video-pause">停止监听数据</el-button>
      <el-button @click="clearList" icon="el-icon-delete">清除数据</el-button>
      <el-button @click="add">新增数据</el-button>

      <!-- <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table> -->

      <div v-for="(v, i) in list" :key="i">{{v.txt}}</div>
    </div>
    
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
</style>>
