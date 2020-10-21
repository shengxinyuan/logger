<template>
  <div class="user">
    <PageHeader title="个人中心"/>
    <div style="margin-left: 16px">
      <div class="aside">
        <div class="aside-con">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <span style="display: block">{{userInfo.name}}</span>
        </div>
      </div>
      <div class="form">
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="用户邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="平台">
            <el-select v-model="userInfo.region" placeholder="请选择平台">
              <el-option label="红袖" value="honhxiu"></el-option>
              <el-option label="海外" value="haiwai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="描述">
            <el-input type="textarea" v-model="userInfo.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="save">保存设置</el-button>
            <el-button @click="cancel">取消</el-button>
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
          name: '王涵',
          email: 'wanghan.c@yuewen.com',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        }
      }
    },
    mounted () {

    },
    methods: {
      save() {

      },
      cancel() {
        this.userInfo = {}
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
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
