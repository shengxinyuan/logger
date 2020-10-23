<template>
  <div class="testList">
    <PageHeader title="测试用例列表"/>
    <div class="list-header">
      <el-button type="primary" size="small" class="log-btn" @click="handelModal">创建计划</el-button>
    </div>
      <div
        class="table-con"
      >
        <el-table :data="testList" class="table" stripe border>
          <el-table-column prop="name" label="计划名称" width="130"></el-table-column>
          <el-table-column prop="version" label="版本"  width="80"></el-table-column>
          <el-table-column prop="platform" label="平台" width="80"></el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.status == '0' ? '已开始' : '未开始'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
          <el-table-column prop="time" label="创建时间" width="120"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="text"
                @click="goLoglist(scope.$index, scope.row)">开始测试</el-button>
            </template>
        </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="创建计划"
        :visible.sync="modifyFormVisible"
        :modal-append-to-body="false"
        width="400px"
        center
        class="dialog-con"
      >
        <el-form :model="testModel" ref="modifyForm" style="padding-right: 26px;">
          <el-form-item label="名称：" label-width="100px" prop="categoryName">
            <el-input v-model="testModel.planName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="版本：" label-width="100px" prop="categoryLevel">
            <el-select v-model="testModel.versionId" placeholder="请选择版本" auto-complete="off" style="width: 224px">
              <el-option
                v-for="d in versionList"
                :key="d.versionId"
                :label="d.version"
                :value="d.versionId"
              >
                {{d.version}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平台：" label-width="100px" >
            <el-select v-model="testModel.platform" placeholder="请选择平台" auto-complete="off" style="width: 224px">
              <el-option
                v-for="d in platformList"
                :key="d.id"
                :label="d.name"
                :value="d.id"
              >{{d.name}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: center">
              <el-button type="primary" @click="save">确定</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
      </el-dialog>
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
        platformList: [
          {
            id: 1,
            name: 'IOS',
          },
          {
            id: 2,
            name: 'Android',
          },
          {
            id: 3,
            name: 'Flutter',
          }
        ],
        modifyFormVisible: false,
        testList: [], // 测试计划列表
        testModel: {
          planName: '',
          versionId: '',
          platform: '',
          pointList: []
        }, // 测试计划单元
        groupId: '',
        versionList: [],
      }
    },

    mounted () {
      this.groupId = this.$store.state.common.groupId

      this.loadData()
    },
    methods: {
      loadData() {
        var p1 = new Promise((resolve, reject) => {
          this.$fetch({
            url: '/eventTracking/api/testPlan/list',
            data: {
              groupId: this.groupId,
            }
          }).then((res) => {
            if (res.code === 0) {
              this.testList = res.data.list
            }
          })
        });

        var p2 = new Promise((resolve,reject)=>{
          this.$fetch({
            url: '/eventTracking/api/version/list',
            data: {
              groupId: this.groupId,
            }
          }).then((res) => {
            if (res.code == '0') {
              this.versionList = Object.assign(this.versionList, res.data.versionList);
            }
          })
        })

        Promise.all([p1,p2]).then(res=>{
            console.log(res);
        })
      },
      handelModal() {
        this.modifyFormVisible = this.modifyFormVisible ? false : true
      },

      /*
      * 编辑用例
      */
      handleEdit() {
        this.handelModal()
      },

      /*
      * 删除用例
      */
      handleDelete() {

      },

      goLoglist(index, testPlan) {
        var testPlanId = testPlan.testPlanId
        this.$router.push(`/logger?testPlanId=${testPlanId}`)
      },

      /*
      * 保存创建
      */
      save() {
        this.testModel.groupId = this.groupId;
        this.$fetch({
          url: '/eventTracking/api/testPlan/create',
          type: 'POST',
          data: this.testModel
        }).then((res) => {
          if (res.code == '0') {
            console.log('哇哦，保存成功了');
            this.handelModal()
            this.$router.push('/logList')
          }
        })
      },

      /*
      * 取消创建
      */
      cancel() {
        this.testModel = {}
        this.modifyFormVisible = this.modifyFormVisible ? false : true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .testList {
    background: #f8f8f9
  }
  .list-header {
    height: 54px;
    margin-left: 16px;
    margin-right: 16px;
    border-bottom: 1px solid rgba(153, 153, 153, 0.28);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .table-con {
    margin: 16px;
  }
  .table {
    width: 100%;
  }
  .item {}
  .dialog-con {
    padding-right: 26px;
  }
</style>
