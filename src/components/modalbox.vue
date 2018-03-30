<template>
  <div>
    <div class="dialog-modal">
      <!-- 根元素，z-index 需要高于父容器其他元素 -->
      <div class="dialog-wrapper" @click="onClose" v-show="visible"></div>
      <!-- 加载一个具有透明度的背景，使根元素透明，子元素会继承该透明度 -->
      <div class="dialog-container" v-show="isShow">
        <!-- 模态框容器，z-index 需要高于背景 -->
        <div class="dialog-container-header">
          <div class="dialog-container-title" v-text="title"></div>
        </div>
        <div class="dialog-container-content">
          <div class="dialog-container-content-input">
            <input :placeholder="placeholder" type="text" maxlength="20" onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" v-model.trim="name">
          </div>
        </div>
        <div class="dialog-container-btns">
          <button class="dialog-container-btn dialog-container-cancel" @click="onClose" v-text="cancelButtonText"></button>
          <button class="dialog-container-btn dialog-container-confirm" @click="ensure" v-text="confirmButtonText"></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Object,
        default() {
          return {};
        }
      },
      isShow: Boolean,
      placeholder: String
    },
    data() {
      return {
        visible: this.isShow,
        data: Object.assign({}, this.value),
        name: this.value.name,
        title: this.$t('common.__remarkModification'),
        confirmButtonText: this.$t('common.__affirm'),
        cancelButtonText: this.$t('common.__cancel')
      };
    },
    methods: {
      onClose() {
        this.$emit('on-close');
      },
      ensure() {
        if(!/^[\u4e00-\u9fa5a-zA-Z0-9-_]{1,20}$/.test(this.name)) {
          this.name = this.value.name;
        }
        this.data.name = this.name;
        this.$emit('onEnsure', this.data);
      }
    },
    watch: {
      value: {
        handler() {
          this.data = Object.assign({}, this.value);
          this.name = this.value.name;
        },
        deep: true
      },
      isShow() {
        this.visible = this.isShow;
        this.name = this.value.name;
      }
    }
  };
</script>
