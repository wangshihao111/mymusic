<template>
  <div class="side-bar">
    <div class="main-wrapper">
      <div class="header" :style="backCls">
        <div class="avatar">
          <img :src="avatarPic">
        </div>
        <div class="info" @click="onAvatarClick">
          <p class="name">{{userInfo.account ? userInfo.account.userName : '请登录'}}</p>
          <p class="right">签到</p>
        </div>
      </div>
      <div class="split"></div>
      <div class="menu-list">
        <ul class="list-wrapper">
          <li class="menu-item">
            <i class="fa fa-envelope-o"></i><span>我的消息</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-shopping-cart"></i><span>商城</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-shopping-bag"></i><span>在线听歌免流量</span>
          </li>
        </ul>
        <div class="split"></div>
        <ul class="list-wrapper">
          <li class="menu-item">
            <i class="fa fa-user-o"></i><span>我的好友</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-map-marker"></i><span>附近的人</span>
          </li>
        </ul>
        <div class="split"></div>
        <ul class="list-wrapper">
          <li class="menu-item">
            <i class="fa fa-envelope-o"></i><span>个性换肤</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-microphone"></i><span>听歌识曲</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-clock-o"></i><span>定时播放</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-shopping-cart"></i><span>扫一扫</span>
          </li>
          <li class="menu-item">
            <i class="fa fa-clock-o"></i><span>音乐闹钟</span>
          </li>
        </ul>
        <div class="split"></div>
      </div>
    </div>
    <footer class="footer">
      <div class="item">
        <i class="fa fa-moon-o"></i>
        <span>夜间模式</span>
      </div>
      <div class="item">
        <i class="fa fa-cog"></i>
        <span>设置</span>
      </div>
      <div class="item" @click="onLogoutClick">
        <i class="fa fa-sign-out"></i>
        <span>{{loginState ? '退出' : '未登陆'}}</span>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import _login from 'assets/js/login'
import {setUserInfo, store} from 'assets/js/storage'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'loginState']),
    avatarPic() {
      if (this.loginState) {
        return this.userInfo.profile.avatarUrl;
      } else {
        return require('assets/img/default.jpg');
      }
    },
    backCls() {
      if (this.loginState) {
        return {
          background: `url(${this.userInfo.profile.backgroundUrl})`
        }
      }
      return '';
    }
  },
  methods: {
    ...mapMutations(['setLoginState', 'setUserInfo']),
    onAvatarClick() {
      this.loginState ? null : this.$router.push('/login')
    },
    onLogoutClick() {
      _login.logout().then(res => {
        if (res.code === 200) {
          this.setLoginState(false);
          this.setUserInfo({});
          setUserInfo({});
          store.set('loginState', false);
          store.set('userData', {});
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 8000;
}
.main-wrapper {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .header {
    position: relative;
    padding-top: 20px;
    width: 100%;
    .avatar {
      width: 50px;
      height: 50px;
      margin-left: 20px;
      border-radius: 50%;
      background: #666;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 30px;
      padding: 5px 20px;
      .name {
        position: absolute;
        left: 20;
        width: 50px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
      }
      .right {
        position: absolute;
        width: 50px;
        right: 20px;
        text-align: center;
      }
    }
  }
  .menu-list {
    width: 100%;
    .list-wrapper {
      box-sizing: border-box;
      width: 100%;
      padding: 10px;
      .menu-item {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        span {
          padding-left: 10px;
        }
        .fa {
          color: rgba(255,0,0,.5)
        }
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 35px;
  .item {
    flex: 0 0 33.3%;
    font-size: 14px;
    text-align: center;
    line-height: 35px;
    span {
      padding-left: 5px;
    }
  }
}
.split {
  width: 100%;
  height: 4px;
  background-color: #eee;
}
</style>

