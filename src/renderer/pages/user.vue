<template>
  <div class="user">
    <PageHeader title="个人中心">
      <div class="el-dropdown-link dropdown-title">
        <i class="el-icon-setting user-icon"></i>
        <el-dropdown @command="handleCommand">
          <span style="margin-left: 4px">
            {{userInfo.userName}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </PageHeader>
    <div style="margin-left: 16px">
      <div class="aside">
        <div class="aside-con">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <span style="display: block">{{userInfo.userName}}</span>
        </div>
      </div>
      <div class="form">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="用户邮箱:">
            <el-input v-model="userInfo.ywaccount" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:">
            <el-input v-model="userInfo.userName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-input v-model="userInfo.roleName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="项目组:">
            <el-select v-model="userInfo.groupName" placeholder="请选择平台" @change="save" style="width: 220px">
              <el-option
                v-for="(item, key) in groupList"
                :key="key"
                :value="item.groupName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
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
        imageUrl: 'https://readx-her-1252317822.picsh.myqcloud.com/boss/test/background/123/user_1602904082_7030.png',
        userInfo: {
          userName: '',
          ywaccount: '',
          p_account: '',
          roleId: '',
          roleName: '',
        },
        groupList: []
      }
    },

    mounted () {
      this.getInfo()
    },

    methods: {
      getInfo() {
        var p1 = new Promise((resolve, reject) => {
          this.$fetch({
            url: '/eventTracking/api/user/info'
          }).then((res) => {
            if (res.code == '0') {
              this.userInfo = Object.assign(this.userInfo, res.data);
            }
          })
        });

        var p2 = new Promise((resolve,reject)=>{
          this.$fetch({
            url: '/eventTracking/api/group/list'
          }).then((res) => {
            if (res.code == '0') {
              this.groupList = Object.assign(this.groupList, res.data.list);
            }
          })
        })

        Promise.all([p1,p2]).then(res=>{
            console.log(res);
        })
      },

      save() {
        var index = this.groupList.findIndex((item) => {
          if (item.groupName == this.userInfo.groupName) {
            return true
          }
        })

        if (index !== -1) {
          var groupId = this.groupList[index].groupId
          this.$store.commit('common_setGroupId', groupId)
          localStorage.setItem('groupId', groupId);
        }

        this.$message({
          showClose: true,
          message:  `已更新到${this.userInfo.groupName}组`,
          type: 'success',
          center: true
        });
      },

      handleCommand(command) {
        console.log('退出登录了宁～～～～')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    height: 525px;
    background-color: rgba(242, 245, 248, 0.46);
    border-radius: 8px;
    box-shadow: 0px 0px 5px -1px #f8f8f9;
    position: relative;
  }
  .dropdown-title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .log-btn {
    height: 30px;
  }
  .aside {
    width: 150px;
    height: 460px;
    background-color: rgba(215, 234, 249, 0.6);
    display: inline-block;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .avatar {
    height: 100px;
    width: 100px;
    margin-top: 20px;
    padding-bottom: 6px;
  }
  .aside-con {
    text-align: center;
  }
  .form {
    display: inline-block;
    margin: 16px;
    width: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
