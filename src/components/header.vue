<template>
  <div class="vx-header">
    <mt-header :title="title">
      <router-link to="/" slot="left" v-if="showback">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="left" v-if="showrefresh" @click="refresh">
        <img src="../assets/common/refresh.png" slot="icon">
      </mt-button>
      <mt-button slot="left" v-if="showcancel" @click="cancel">取消</mt-button>
      <mt-button slot="left" v-if="showprev" @click="prev">上一页</mt-button>
      <mt-button class="save" slot="right" v-if="showsave" @click="save">确定</mt-button>
      <mt-button slot="right" v-if="showsubmit" @click="submit">
        <img src="../assets/common/save.png" slot="icon">
      </mt-button>
      <mt-button slot="right" v-if="shownext" @click="next">上一页</mt-button>
    </mt-header>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props: ['showback', 'showrefresh', 'showcancel', 'showsave', 'showsubmit', 'shownext', 'showprev', 'title'],
    created() {
    },
    methods: {
      submit() {
        this.$emit('submit');
      },
      refresh() {
        window.location.reload();
        console.log(1);
      },
      cancel() {
        this.$emit('cancel');
      },
      prev() {
        this.$emit('prev');
      },
      save() {
        this.$emit('save');
      },
      next() {
        this.$emit('next');
      }
    }
  };
</script>

<style scoped lang="less">

</style>