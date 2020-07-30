<template>
  <div id="app">
    <div class="log-header">
      <span class="title">Logger</span>
      状态： {{ intStatus }}
      (如何连接<i class="el-icon-question"></i>)
    </div>
    <el-tabs v-model="activeName" class="tab">
      <el-tab-pane label="记录" name="record">
        <div class="table">
          <el-button v-if="!status" @click="status = !status" icon="el-icon-video-play">开始监听数据</el-button>
          <el-button v-else @click="status = !status" icon="el-icon-video-pause">停止监听数据</el-button>
          <el-button @click="clearList" icon="el-icon-delete">清除数据</el-button>
          <el-button @click="add">新增数据</el-button>

          <el-row class="lists-cont">
            <el-col class="list1">
              <h5 class="list-title">待测埋点列表</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-menu-item v-for="(v, i) in rawList" :key="i" :index="'' + i">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{v.eventCname}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col class="list2">
              <h5 class="list-title">埋点详情</h5>
            </el-col>
            <el-col class="list3">
              <h5 class="list-title">埋点记录</h5>
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo">
                <el-menu-item v-for="(v, i) in rawList" :key="i" :index="'' + i">
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{v.eventCname}}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="json配置" name="json">
        <HandleExcel @excelJsonChange="excelJsonChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import HandleExcel from './components/handleExcel'
  export default {
    components: {
      HandleExcel
    },
    data() {
      return {
        intStatus: '未连接',
        status: true,
        activeName: 'record',
        rawList: [],
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
      excelJsonChange (list) {
        this.rawList = list
      },
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
  // margin: 24px;
}
.header-tab {
  
}
.tab {
  margin: 10px;
}
.lists-cont {
  display: flex;
}
.list1 {
  height: 560px;
  width: 300px;
  overflow: scroll;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  .list-title {
    background: #fafafa;
  }
}
.list-title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin: 0;
}
.list2 {
  margin-left: 6px;
  height: 560px;
  width: 300px;
  overflow: scroll;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgb(84, 92, 100);
  .list-title {
    background: rgb(30, 32, 34);
  }
}
.list3 {
  flex: 1;
  margin-left: 6px;
  height: 560px;
  overflow: scroll;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgb(84, 92, 100);
  .list-title {
    background: rgb(30, 32, 34);
  }
}
</style>