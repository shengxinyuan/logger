<template>
  <div class="logList">
    <div class="header">
      <span>测试计划列表</span>
      <el-button type="primary" size="small" class="log-btn" @click="onCreate">创建计划</el-button>
    </div>
      <div
        class="table-con"
        border
        stripe
      >
        <el-table :data="testList" class="table">
          <el-table-column prop="name" label="计划名称" width="100"></el-table-column>
          <el-table-column prop="version" label="版本"  width="80"></el-table-column>
          <el-table-column prop="platform" label="平台" width="80"></el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope">
              <span>{{scope.row.status == '0' ? '开启' : '未开启'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="创建人" width="120"></el-table-column>
          <el-table-column prop="time" label="创建时间" width="120"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-form :model="modifyData" ref="modifyForm" style="padding-right: 26px;">
          <el-form-item label="名称：" label-width="100px" prop="categoryName">
            <el-input v-model="modifyData.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="版本：" label-width="100px" prop="categoryLevel">
            <el-input v-model="modifyData.version" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="平台：" label-width="100px" >
            <el-select v-model="modifyData.version" placeholder="请选择平台" auto-complete="off">
              <el-option label="红袖" value="honhxiu"></el-option>
              <el-option label="海外" value="haiwai"></el-option>
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
  export default {
    components: {

    },
    data() {
      return {
        colConfigs: [
          { prop: 'date', label: '日期' },
          { prop: 'name', label: '姓名' },
          { prop: 'address', label: '地址' }
        ],
        items: [{
            name: '会员卡',
            version: '1.1.0',
            platform: 'ios',
            status: '开启',
            creator: '王涵',
            time: '2020-10-20'
          }, {
            name: '会员卡',
            version: '1.1.0',
            platform: 'ios',
            status: '开启',
            creator: '王涵',
            time: '2020-10-20'
          }, {
            name: '会员卡',
            version: '1.1.0',
            platform: 'ios',
            status: '开启',
            creator: '王涵',
            time: '2020-10-20'
          }, {
            name: '会员卡',
            version: '1.1.0',
            platform: 'ios',
            status: '开启',
            creator: '王涵',
            time: '2020-10-20'
        }],
        modifyData: {
          name: '',
          version: '',
          platform: ''
        },
        modifyFormVisible: false,
        testList: [], // 测试计划列表
        testModel: {
          planName: '',
          versionId: '',
          platform: '',
        }, // 测试计划单元
      }
    },
    mounted () {
      this.$fetch({
        url: '/eventTracking/api/testPlan/list'
      }).then((res) => {
        if (res.code === 0) {
          this.testList = res.data.list
          console.log(this.testList)
        }
      })
    },
    methods: {
      onCreate() {
        this.modifyFormVisible = this.modifyFormVisible ? false : true
      },
      /*
      * 保存创建
      */
      save() {
        console.log('哇哦，保存成功了');
      },

      /*
      * 取消创建
      */
      cancel() {
        this.testPlan = {}
        this.modifyFormVisible = this.modifyFormVisible ? false : true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logList {
    background: #f8f8f9
  }
  .header {
    height: 44px;
    background-color: #fff;
    padding-horizontal: 16px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 5px -1px #f8f8f9;
    border-bottom:1px solid #eeeef2;
  }
  .table-con {
    margin: 16px;
    border:1px solid #eeeef2;
    // border-radius: 8px;
  }
  .table {
    width: 100%;
  }
  .item {}
  .dialog-con {
    padding-right: 26px;
  }
</style>
