<template>
  <div class="logList">
    <PageHeader title="待测埋点列表" :tip="!mode ? '（请选择埋点开始测试）' : ''"/>
    <div class="table-con">
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table
        ref="logListTable"
        :data="pointList"
        class="logList-table"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          label="版本"
          prop="versionName"
          width="100"
          :filters="filtersVersionList"
          :filter-method="filterVersionHander"
        >
        </el-table-column>
        <el-table-column
          prop="pointId"
          label="埋点序号"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="eventId"
          label="eventId">
        </el-table-column>
        <el-table-column
          prop="tester"
          label="测试人员"
          :filters="filtersTestList"
          :filter-method="filterVersionHander">
        </el-table-column>
        <el-table-column
          prop="developerIos"
          label="开发人员(iOS)"
          :filters="filtersIOSList"
          :filter-method="filterVersionHander"
          width="160">
        </el-table-column>
        <el-table-column
          prop="developerAndroid"
          label="开发人员(Android)"
          :filters="filtersAndroidList"
          :filter-method="filterVersionHander"
          width="160">
        </el-table-column>
      </el-table>
    </div>
    
    <div>
      <el-button type="primary" class="conform-btn" @click="btnClick">{{ mode === 'test' ? '修改用例' : '开始测试'}}</el-button>
    </div>
  </div>
</template>

<script>
  import PageHeader from '../components/pageHeader'
  export default {
    components: {
      PageHeader
    },
    data() {
      return {
        mode: '', //如有testPlanId，就是测试用例的选择 test
        pointList: [],
        multipleSelection: [],
        testPlanId: '',
        filtersVersion: [],
        filtersTest: [],
        filtersIOS: [],
        filtersAndroid: [],
      }
    },
    activated() {
      this.getEventPoint()
    },
    computed: {
      filtersVersionList() {
        let list = []
        this.filtersVersion.forEach((val) => {
          list.push({
            value: val,
            text: val
          })
        })
        return list
      },
      filtersIOSList() {
        let list = []
        this.filtersIOS.forEach((val) => {
          list.push({
            value: val,
            text: val
          })
        })
        return list
      },
      filtersAndroidList() {
        let list = []
        this.filtersAndroid.forEach((val) => {
          list.push({
            value: val,
            text: val
          })
        })
        return list
      },
      filtersTestList() {
        let list = []
        this.filtersTest.forEach((val) => {
          list.push({
            value: val,
            text: val
          })
        })
        return list
      },
    },
    methods: {
      getTestPlanId() {
        if (this.$route.query.testPlanId) {
          this.mode = 'test'
          this.testPlanId = this.$route.query.testPlanId
        } else {
          this.mode = ''
          this.testPlanId = ''
        }
      },
      getEventPoint() {
        this.getTestPlanId()
        this.$fetch({
          url: '/eventTracking/api/eventPoint/list',
          data: {
            groupId: this.$store.state.common.groupId,
            testplanId: this.testPlanId
          }
        }).then((res) => {
          if (res.code === 0) {
            this.pointList = res.data.pointList
            if (this.pointList && this.pointList.length) {
              let selectList = [] 
              this.pointList.forEach((val) => {
                if (val.isInTestplan === 1) {
                  selectList.push(val)
                }
                const eventPoint = JSON.parse(val.eventPoint)
                val.versionName = eventPoint.raw['任务版本']
                val.developerIos = eventPoint.raw['iOS']
                val.developerAndroid = eventPoint.raw['Android']
                val.tester = eventPoint.raw['验证']
                if (eventPoint.raw['任务版本'] && !this.filtersVersion.includes(eventPoint.raw['任务版本'])) {
                  this.filtersVersion.push(eventPoint.raw['任务版本'])
                }
                if (eventPoint.raw['iOS'] && !this.filtersIOS.includes(eventPoint.raw['iOS'])) {
                  this.filtersIOS.push(eventPoint.raw['iOS'])
                }
                if (eventPoint.raw['Android'] && !this.filtersAndroid.includes(eventPoint.raw['Android'])) {
                  this.filtersAndroid.push(eventPoint.raw['Android'])
                }
                if (eventPoint.raw['验证'] && !this.filtersTest.includes(eventPoint.raw['验证'])) {
                  this.filtersTest.push(eventPoint.raw['验证'])
                }
                
              })

              this.$nextTick(() => {
                selectList.forEach(row => {
                  this.$refs.logListTable.toggleRowSelection(row);
                });
              })
            }
          }
        })
      },
      btnClick() {
        if (this.mode === 'test') {
          let pointList = []
          this.multipleSelection.forEach((val) => {
            pointList.push({
              status: 0,
              owner: '',
              pointId: val.pointId,
              tpPointId: val.tpPointId
            })
          })
          this.$fetch({
            url: '/eventTracking/api/testPlan/update',
            type: 'post',
            data: {
              testPlanId: this.testPlanId,
              status: 0,
              pointList,
            }
          }).then((res) => {
            if (res.code === 0) {
              this.$router.push('/testList')
              this.$message({
                message: '成功',
                type: 'success'
              })
            }
          })
        } else {
          this.$store.commit('logger_setOwnLoggerList', [...this.multipleSelection])
          this.$router.push('/logger')
        }
      },
      clearFilter() {
        this.$refs.logListTable.clearFilter();
      },
      filterVersionHander(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../styles/var.scss';
.logList {
  height: 100vh;
  background: #f8f8f9
}
.table-con {
  margin: 16px;
  .logList-table {
    margin-top: 16px;
    height: 80vh;
    overflow: scroll;
    width: 100%;
  }
}
.conform-btn {
  margin: 0 16px;
}
</style>