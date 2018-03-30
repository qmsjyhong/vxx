<template>
  <div>
    <mt-popup v-model="show" position="right">
      <div class="layout">
        <vx-header :showsave="1" :showcancel="1" @save="save" @cancel="cancel" :title="$t('common.cut')"></vx-header>
        <div class="layout-content">
          <div class="masks">
            <div class="interception-title">
              <div></div>
            </div>
            <div class="masks-contents">
              <vx-progress v-for="(o,i) in Object.values(interception)" :title="o.title" :num="o.value" @update="val=>o.value=val" :range="o.range" :step="o.step"></vx-progress>
            </div>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { serialize } from 'src/utils';
  export default {
    data() {
      return {
        interception: {}
      };
    },
    props: ['show', 'options'],
    created() {
      this.interception = serialize(this.options);
    },
    methods: {
      save() {
        this.$emit('save-cut', this.interception);
      },
      cancel() {
        this.interception = this.options;
        this.$parent.showInterception = false;
        this.$emit('save-layout', this.interception);
      }
    }
  };
</script>
<style scoped lang="less">

</style>