<template>
  <div class="user">
    <PageHeader title="个人中心">
      <div class="el-dropdown-link dropdown-title">
        <i class="el-icon-setting user-icon"></i>
        <el-dropdown @command="handleCommand">
          <span>
            {{userInfo.userName}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </PageHeader>
    <div class="user-cont">
      <div class="aside">
        <div class="aside-con">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <span style="display: block">{{userInfo.userName}}</span>
        </div>
      </div>
      <div class="cont-box">
        <el-form class="form" ref="form" :model="userInfo" label-width="80px">
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
            <el-select v-model="groupId" placeholder="请选择平台" @change="save" style="width: 220px">
              <el-option
                v-for="(item, key) in userInfo.groupInfo"
                :key="key"
                :label="item.groupName"
                :value="+item.groupId">
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
          groupInfo: []
        },
        groupId: null,
      }
    },

    activated () {
      this.loadData()
    },

    methods: {
      loadData() {
        this.$fetch({
          url: '/eventTracking/api/user/info'
        }).then((res) => {
          if (+res.code === 0) {
            this.groupId = +this.$store.state.common.groupId
            res.data.ywaccount = res.data.ywaccount + '@yuewen.com'
            this.userInfo = Object.assign(this.userInfo, res.data);
          }
        })
      },

      save() {
        console.log(this.groupId);
        this.$store.commit('common_setGroupId', this.groupId)
        localStorage.setItem('groupId', this.groupId);

        this.$message({
          message: '切换成功',
          type: 'success',
        });
      },

      handleCommand(command) {
        localStorage.removeItem('ywaccount')
        localStorage.removeItem('groupId')
        this.$emit('getLoginStatus')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    height: 100vh;
    background-color: rgba(242, 245, 248, 0.46);
    border-radius: 8px;
    box-shadow: 0px 0px 5px -1px #f8f8f9;
    position: relative;
    display: flex;
    flex-direction: column;
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
  .user-cont {
    display: flex;
    flex: 1;
  }
  .aside {
    width: 200px;
    background-color: rgba(215, 234, 249, 0.6);
    display: flex;
    justify-content: center;
  }
  .avatar {
    height: 100px;
    width: 100px;
    padding-bottom: 16px;
  }
  .aside-con {
    margin-top: 140px;
    text-align: center;
  }
  .cont-box {
    margin-left: 140px;
    padding-top: 140px;
    display: flex;
    justify-content: center;
  }
  .form {
    display: block;
    margin: 16px;
    width: 300px;
  }
</style>
