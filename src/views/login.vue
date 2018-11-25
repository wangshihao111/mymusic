<template>
  <div class="login">
    <back class="back" @close="$router.back()"></back>
    <el-card class="card">
      <div slot="header">
        <span>登录</span>
      </div>
      <div class="content">
        <el-form :model="form" status-icon :rules="rules" ref="form" @validate="validateForm">
          <el-form-item label="账号" prop="user">
            <el-input type="text" v-model="form.user" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitForm()" :disabled="!validUser && validPass">登录</el-button>
            <el-button size="small" @click="$router.back()">取消</el-button>
          </el-form-item>
          <el-form-item v-show="loginFalse">
            <p class="msg">{{msg}}</p>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import Back from 'components/back/back';
import _login from 'assets/js/login'
import { mapMutations, mapGetters } from 'vuex'
import { setUserInfo, store } from 'assets/js/storage'

export default {
  components: {
    Back
  },
  data() {
    return {
      form: {
        user: '',
        pass: ''
      },
      rules: {
        user: [
          { min: 8, message: '请输入正确的账号', trigger: 'blur' },
          { required: true, message: '登录名不能为空', trigger: 'blur' },
        ],
        pass: [
          { min: 8, message: '请输入正确的密码', trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'blur' },
        ]
      },
      validUser: false,
      validPass: false,
      loginFalse: false,
      msg: ''
    };
  },
  computed: {
    ...mapGetters(['loginState'])
  },
  methods: {
    ...mapMutations(['setLoginState', 'setUserInfo']),
    validateForm(name, valid) {
      name === 'user' ? this.validUser = valid : this.validPass = valid
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.valid = true;
          setUserInfo({
            user: this.form.user,
            pass: this.form.pass
          })
          _login.login({
            user: this.form.user,
            pass: this.form.pass
          }).then(res => {
            if (res.code === 502) {
              this.loginFalse = true;
              this.msg = res.msg;
            } else if (res.code === 200) {
              this.setLoginState(true);
              this.setUserInfo(res);
              store.set('loginState', true);
              store.set('userData', res);
              this.$router.back();
            }
          })
        }
      })
    }
  },
  created() {
    if (this.loginState) {
      this.$router.back();
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
  .card {
    width: 100%;
  }
  .msg {
    font-size: 14px;
    color: red;
  }
}
</style>
