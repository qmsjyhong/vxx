<template>
  <div class="info" id="info">
    <div class="my-header">
      <mt-header class="header">
      </mt-header>
      <div class="my-header_title" @click="returnDevice">
        <h1 class="mint-header-title">{{title}}<span class="arrow"></span></h1>
      </div>
    </div>

    <div class="info-content">
      <div class="vx6-info_content_top">
        <img class="vx6-info_content_top_img" :src="imageMap['logo'].src" />
        <span class="vx6-info_content_top_lable">V-Can 1.0</span>
      </div>
      <div class="vx6-info-content-bottom">
        <div class="vx6-info-content-bottom-info">
          <span v-html="website"></span>
          <img class="vx6-info_content_top_img" :src="imageMap['phoneIcon'].src" />
          <span v-html="telephone"></span>
        </div>
        <div class="vx6-info-content-bottom-copyRight" style="margin-top: 10px;">
          <span v-html="copyRight"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ImageMap from 'src/config/imageMap';
  import Store from 'src/utils/store';
  export default {
    name: 'info',
    data() {
      return {
        backText: '返回',
        website: 'http://www.novastar-led.cn\&nbsp',
        telephone: '400-696-0755',
        copyRight: 'Xi\'an NovaStar Tech Co.,Ltd. All rights reserved',
        imageMap: ImageMap,
        title: ""
      };
    },
    methods: {

      getUrl() {
        console.log(window.location.hash == '#/info');
      },
      refresh() {
        this.getUrl();
      },
      returnDevice() {
        window.Android.returnDeviceList();
      }

    },
    mounted() {
      this.title = Store(TITLE);
      this.refresh();

    }
  };
</script>

