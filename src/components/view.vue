<!-- <template>
  <div class="container-wrapper">
    <transition :name="transitionName">
      <router-view class="container"></router-view>
    </transition>
    <vx-takebtn></vx-takebtn>
  </div>
</template>

<script>
  export default {
    name: 'vx-view',
    data() {
      return {
        transitionName: 'slide-left',
        title: ""
      };
    },
    watch: {
      '$route'(to, from) {
        const toDepth = to.matched[1].path.split('/').length;

        const fromDepth = from.matched.length && from.matched[1].path.split('/').length || 0;

        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
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
 -->