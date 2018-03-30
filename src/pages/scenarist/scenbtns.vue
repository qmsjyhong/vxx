<template>
  <div class="scenarist-btns">
    <span class="scenarist-btns_cont">
      <span @click="cutSource">{{$t('common.cut')}}</span><span @click="setLayout">{{$t('common.layout')}}</span><span @click="setDefinition">{{$t('common.definition')}}</span><span @click="setBorder">{{$t('common.border')}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    methods: {
      cutSource() {
        this.$emit('cut-source');
      },
      setLayout() {
        this.$emit('set-layout');
      },
      setDefinition() {
        this.$emit('set-definition');
      },
      setBorder() {
        this.$emit('set-border');
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
