<template>
  <div class="logList">
    <PageHeader title="待测埋点列表" :tip="!mode ? '（请选择埋点开始测试）' : ''"/>
    <div class="table-con">
      <el-button @click="clearFilter">清除所有过滤器</el-button>
      <el-table
        ref="logListTable"
        :data="list"
        class="logList-table"
        border
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="date"
          label="版本"
          width="100"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler1"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="页面"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="测试人员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="address"
          label="开发人员">
        </el-table-column>
        <el-table-column
          prop="event_id"
          label="开发人员"
          width="100">
        </el-table-column>
        <el-table-column
          prop="plantfrom"
          label="平台"
          width="100">
        </el-table-column>
      </el-table>
    </div>
    
    <div>
      <el-button type="primary" class="conform-btn" @click="btnClick">{{ mode === 'test' ? '确定' : '开始测试'}}</el-button>
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
        mode: '', //如有testId，就是测试用例的选择 test
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
          }],
          multipleSelection: []
      }
    },
    created() {
      if (this.$route.query.testId) {
        this.mode = 'test'
      }
    },
    mounted() {
      console.log(this.$route.query.testId);
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
      btnClick() {
        if (this.mode === 'test') {
          this.goTesterPage()
        } else {
          this.goLoggerPage()
        }
      },
      goLoggerPage() {
        this.$router.push('/logger')
      },
      goTesterPage() {
        this.$router.push('/testList')
      },
      clearFilter() {
        this.$refs.logListTable.clearFilter();
      },
      filterHandler1() {
        
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
        console.log(val);
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
    height: 80vh;
    width: 100%;
  }
}
.conform-btn {
  margin: 0 16px;
}
</style>