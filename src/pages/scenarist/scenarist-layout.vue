<template>
  <div>
    <mt-popup v-model="show" position="right">
      <div class="layout">
        <vx-header :showcancel="1" :showsave="1" @save="save" @cancel="cancel" :title="$t('common.windowLayout')"></vx-header>
        <div class="layout-content">
          <div class="masks" v-for="(o,i) in layout">
            <div class="masks-title">{{o.title}}</div>
            <div class="masks-contents">
              <vx-progress v-for="(k,i) in Object.values(o.opts)" :title="k.title" :num="k.value" @update="val=>k.value=val" :range="k.range" :step="k.step"></vx-progress>
              <mt-button class="reset">{{$t('common.default')}}</mt-button>
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
        layout: []
      };
    },
    props: ['show', 'options'],
    created() {
      this.layout = serialize(this.options);
      console.log(this.options);
    },
    methods: {
      save() {
        this.$emit('save-layout', this.layout);
      },
      cancel() {
        this.layout = this.options;
        this.$parent.showLayout = false;
        this.$emit('save-layout', this.layout);
      }
    }
  };
</script>

<style lang="less" scoped>

</style>