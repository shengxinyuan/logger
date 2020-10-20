<template>
  <div class="logList">
    <el-header class="header">待测埋点列表</el-header>
    <el-table
      :data="list"
      class="logList-table"
      border
      stripe
    >
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        prop="date"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="name"
        label="页面">
      </el-table-column>
      <el-table-column
        prop="name"
        label="测试人员">
      </el-table-column>
      <el-table-column
        prop="address"
        label="开发人员">
      </el-table-column>
      <el-table-column
        prop="event_id"
        label="开发人员">
      </el-table-column>
      <el-table-column
        prop="plantfrom"
        label="平台">
      </el-table-column>
    </el-table>
    <div class="bottom-box">
      <el-button type="primary">开始测试</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        pointList: [],
        list: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    mounted () {
      this.$fetch({
        url: '/eventTracking/api/eventPoint/list'
      }).then((res) => {
        if (res.code === 0) {
          this.pointList = res.data.pointList
        }
      })
      // 获取store数据
      console.log(this.$store.state.logList.loggerAllList);
    },
    methods: {
      goLoggerPage() {

      },
      goTesterPage() {

      }
    }
  }
</script>

<style lang="scss" scoped>
.logList {
  height: 100vh;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;;
}
.header {
  display: flex;
  align-items: center;
}
.logList-table {
  height: 80vh;
  margin: 20px;
}
.bottom-box {
  height: 10vh;
  float: right;
}
</style>