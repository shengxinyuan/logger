<template>
  <div id="app">
    <div class="log-header">
      <span class="title">Logger</span>
      状态： {{ intStatus }}
      (如何连接<i class="el-icon-question"></i>)
    </div>
    <el-tabs v-model="activeName" class="tab">
      <el-tab-pane label="logger记录" name="record">
        <div class="table">
          <el-row class="lists-cont">
            <el-col class="list1">
              <h5 class="list-title">待测埋点列表</h5>
              <el-collapse accordion @change="selectTester">
                <el-collapse-item v-for="(v, i) in rawList" :key="i" :name="i">
                  <template slot="title">
                    <div class="title-box">
                      <span class="name">{{i + 1}}. {{v.name}}</span>
                      <StatusSelector v-model="v.status" @click.stop.native />
                    </div>
                  </template>
                  <div class="detail-cont">
                    <div class="detail-info" v-for="(val, index) in v.infoList.filter((val) => val.value)" :key="index">
                      <span class="detail-info-key">{{val.key}}:</span>
                      <span class="detail-info-value">{{val.value}}</span>
                    </div>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-col>

            <el-col class="list2" v-if="selectedItem">
              <h5 class="list-title">
                功能测试点详情
                <el-button class="marginH20" size="mini" icon="el-icon-delete" type="info" @click="clearSelectedLoggerList"></el-button>
              </h5>
              <el-collapse   class="list2-item-box">
                <el-collapse-item 
                  v-for="(selectedLogger, i) in selectedLoggerList"
                  :key="i"
                  :name="i"
                  class="list2-item" 
                  :class="selectedLogger.eventId !== selectedItem.raw['event_id'] ? 'empty' : ''"
                >
                  <template slot="title">
                    <div v-if="selectedLogger.eventId !== selectedItem.raw['event_id']" class="list2-item-title-box empty" @click.stop>
                      <p class="flex1">{{selectedLogger.eventId}}</p>
                      <p>次数：{{selectedLogger.counter}}</p>
                    </div>
                    <div v-else class="list2-item-title-box">
                      <p class="flex1">{{selectedLogger.eventId}}</p>
                      <p>次数：{{selectedLogger.counter}}</p>
                    </div>
                  </template>
                  <el-collapse class="list2-item-box" v-if="selectedLogger.children">
                    <el-collapse-item v-for="(item, index) in selectedLogger.children" :key="index" :name="index" class="list2-item">
                      <template slot="title">
                        <div class="list2-item-title-box">
                          <p class="flex1 pd-left20">第{{item.num}}次 详细数据</p>
                        </div>
                      </template>
                      <div class="detail-cont">
                        <div class="detail-info" v-for="(val, index1) in item.infoList" :key="index1">
                          <span class="detail-info-key" v-if="val.status != 0">{{val.key}}<statusIcon v-if="val.status != 0" :status="val.status" />:</span>
                          <span class="detail-info-value" v-if="val.status != 0">{{val.value}}</span>
                        </div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-collapse-item>
              </el-collapse>
            </el-col>

            <el-col class="list3">
              <div class="list-title">
                <span class="label">埋点记录</span>
                <el-button size="mini" v-if="!status" @click="status = !status" icon="el-icon-video-play" type="primary"></el-button>
                <el-button size="mini" v-else @click="status = !status" icon="el-icon-video-pause" type="danger"></el-button>
                <el-button size="mini" @click="clearList" icon="el-icon-delete" type="info"></el-button>
                <el-button size="mini" @click="testAdd1">+</el-button>
                <el-button size="mini" @click="testAdd2">+</el-button>
              </div>
              <div class="list3-item-box" ref="list3">
                <div class="list3-item" v-for="(v, i) in list" :key="i">
                  {{v}}
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="上传埋点文件" name="json">
        <HandleExcel @excelJsonChange="excelJsonChange"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import HandleExcel from './components/handleExcel'
  import StatusSelector from './components/statusSelector'
  import StatusIcon from './components/statusIcon'

  export default {
    components: {
      HandleExcel,
      StatusSelector,
      StatusIcon
    },
    data() {
      return {
        intStatus: '未连接',
        status: true,
        activeName: 'record',
        rawList: [
          {
            name: '默认埋点Test',
            status: '',
            raw: {
              '页面':'Test页面',
              '事件':'Test事件',
              '事件中文名':'默认埋点Test',
              'event_id':'hx_P_test',
              'event_type':'P',
              'pagename':'testpagename',
              'pdt':'Y(0|1 是否当日看到test页面)',
            },
            infoList: [
              {
                key: '页面',
                value: 'Test页面'
              },
              {
                key: '事件',
                value: 'Test事件'
              },
              {
                key: '事件中文名',
                value: '默认埋点Test'
              },
              {
                key: 'event_id',
                value: 'hx_P_test'
              },
              {
                key: 'event_type',
                value: 'P'
              },
              {
                key: 'pagename',
                value: 'testpagename'
              },
              {
                key: 'pdt',
                value: 'Y(0|1 是否当日看到test页面)'
              },
            ]
          },
        ],
        selectedItem: '',
        selectedLoggerList: [],
        list: [],
      }
    },
    mounted () {
      this.webSocket()
    },
    methods: {
      selectTester(index) {
        this.selectedItem = this.rawList[index]
        if (this.selectedItem) {
          this.selectedLoggerList = []
        }
      },
      excelJsonChange (list) {
        this.rawList = [...this.rawList, ...list]
      },
      
      addLogger (event) {
        if (this.status) {
          const raw = event.data
          this.list.push(raw)
          if (this.selectedItem) {
            const reg = /^[Y]\(/;
            let hasEventId = false
            let eventId = raw['event_id']
            let isSelect = this.selectedItem.raw['event_id'] === eventId
            let infoList = []
            
            Object.entries(raw).forEach(([k, v]) => {
              const value = this.selectedItem.raw[k]
              if (!value) {
                status = 0
              } else if (value === v) {
                status = 1
              } else if (value !== v && !reg.test(value)) {
                status = 2
              } else if (value !== v && reg.test(value)) {
                status = 3
              } else {
                status = 4
              }
              
              infoList.push({
                key: k,
                value: v,
                status
              })
            })
            
            this.selectedLoggerList.forEach((val, index) => {
              if (val.eventId === eventId) {
                if (isSelect) {
                  val.children.push({
                    eventId: eventId,
                    infoList: infoList,
                    raw: raw,
                    num: val.children.length + 1 || 0
                  })
                }
                val.counter++
                hasEventId = true
              }
            }) 
            if (!hasEventId) {
              this.selectedLoggerList.push({
                eventId: eventId,
                counter: 1,
                children: isSelect ? [{
                  eventId: eventId,
                  infoList: infoList,
                  raw: raw,
                  num: 1
                }] : []
              })
            }
          }

          this.$nextTick(() => {
            this.$refs.list3.scrollTop = 10000000
          })
        }
      },
      clearList () {
        this.list = []
      },
      clearSelectedLoggerList () {
        this.selectedLoggerList = []
      },
      webSocket () {
        this.socket = new WebSocket('ws://localhost:3002/logger')
        this.socket.addEventListener('open', (event) => {
          this.intStatus = '已连接'
        })
        this.socket.addEventListener('error', (event) => {
          console.log(event)
        })
        this.socket.addEventListener('message', this.addLogger)
      },
      testAdd1 () {
        this.addLogger({data: {
          "logtime":"2020-08-14 20:29:49",
          "platform":"android",
          "version":"8.7.1",
          "uid":"0",
          "imei":"bca61f1752f59fa3",
          "qimei":"15a4a93065de726a",
          "os_version":"10",
          "network_type":"wifi",
          "shw":"1440*2792",
          "event_id":"hx_P_test",
          "event_type":"P",
          "load_source":"1000014",
          "guid":"461415703",
          "pagename":"settestpagenameting",
          "pdt":"1",
        }})
      },
      testAdd2 () {
        this.addLogger({data: {
          "logtime":"2020-08-14 20:29:49",
          "platform":"android",
          "version":"8.7.1",
          "uid":"0",
          "imei":"bca61f1752f59fa3",
          "qimei":"15a4a93065de726a",
          "os_version":"10",
          "network_type":"wifi",
          "shw":"1440*2792",
          "event_id":"hx_P_openapp",
          "event_type":"P",
          "load_source":"1000014",
          "guid":"461415703",
          "pagename":"openapp",
          "pdt":"1",
        }})
      },
    },
  }
</script>

<style lang="scss" scoped>

.app {
  height: 100vh;
  .title {
    font-size: 36px;
    margin-right: 50px;
    font-weight: 900;
  }
}
.log-header {
  background: rgba(48, 100, 239, 1);
  color: #fff;
  font-size: 24px;
  padding: 6px 24px;
}
.tab {
  margin: 10px;
}
.lists-cont {
  display: flex;
}
.el-submenu-title {
  height: 36px;
  line-height: 36px;
}
.detail-cont {
  display: block;
  background: #fafafa;
}
.detail-info {
  padding: 0 0 0 10px;
  line-height: 20px;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  .detail-info-key {
    display: block;
    color: rgba(48, 100, 239, 1);
    margin-right: 6px;
    width: 90px;
    text-align: right;
  }
  .detail-info-value {
    flex: 1;
  }
}

.list-title {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  margin: 0;
  font-size: 16px;
}
.list1 {
  height: calc(100vh - 130px);
  width: 300px;
  overflow: scroll;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  .list-title {
    background: #fafafa;
  }
  .title-box {
    font-family: Arial, Helvetica, sans-serif;  
    position: relative;
    display: flex;
    height: 48px;
    width: 100%;
    .name {
      margin-left: 40px;
      flex: 1;
      overflow: hidden;
    }
  }
}
.list2 {
  display: flex;
  flex-direction: column;
  margin-left: 6px;
  height: calc(100vh - 130px);
  width: 300px;
  overflow: scroll;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  background-color: rgb(84, 92, 100);
  .list-title {
    background: rgb(30, 32, 34);
  }
  .list2-item-box {
    flex: 1;
    overflow: scroll;
    color: rgb(255, 255, 255);
    font-family: Arial, Helvetica, sans-serif;
  }
  .list2-item {
    width: 100%;
    word-break:break-all;
    word-wrap:break-word;
    overflow: hidden;
    border-bottom: 1px solid rgb(241, 241, 241);
    font-size: 12px;
  }
  .list2-item-title-box {
    width: 100%;
    display: flex;
    margin-left: 20px;
  }
  .detail-info-key {
    width: 120px;
  }
}
.list3 {
  flex: 1;
  margin-left: 6px;
  height: calc(100vh - 130px);
  overflow-y: scroll;
  border: 1px solid #E4E7ED;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  .list-title {
    border-bottom: 1px solid #E4E7ED;
    background: #fafafa;
    .label {
      margin-right: 20px;
    }
  }
  .list3-item-box {
    flex: 1;
    overflow: scroll;
  }
  .list3-item {
    box-sizing: border-box;
    width: 100%;
    word-break:break-all;
    word-wrap:break-word;
    overflow: hidden;
    color: #000;
    border-bottom: 1px solid #E4E7ED;
    font-size: 12px;
    line-height: 1.2;
    padding: 4px 16px;
    font-family: Arial, Helvetica, sans-serif;
  }
}
.flex {
  display: flex;
}
.flex1 {
  flex: 1;
}
.marginH20 {
  margin: 0 20px;
}
.pd-left20 {
  padding-left: 20px;
}
</style>