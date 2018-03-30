<template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
    <!-- <vx-takebtn></vx-takebtn> -->
  </div>
</template>

<script>
  var isChild = function(str) {
    return (/\/.+/).test(str);
  };
  export default {
    name: 'vx-view',
    data() {
      return {
        transitionName: 'slide-left',
        title: ''
      };
    },
    watch: {
      '$route'(to, from) {
        console.log(isChild(from.path));
        if(isChild(to.path)) {
          this.transitionName = isChild(from.path) ? 'slide-right' : 'slide-left';
        } else {
          this.transitionName = isChild(from.path) ? 'slide-right' : '';
        }
        console.log(this.transitionName);
      }
    }
  };
</script>

<style lang="less">
  @import '~mint-ui/lib/style.css';
  .slide-left-enter,
  .slide-right-leave-active {
      -webkit-transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
      -webkit-transform: translate(-100%, 0);
  }
</style>

<style lang="less">
  @import '~mint-ui/lib/style.css';
</style>