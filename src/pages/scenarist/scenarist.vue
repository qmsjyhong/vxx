<template>
  <div class="scenarist" id="scenarist">
    <vx-header :showback="1" :showrefresh="1" :showsubmit="1" :title="$t('common1.scenarist')" @submit="submit"></vx-header>
    <div class="scenarist-detail">
      <detail></detail>
    </div>
    <div class="scenarist-view">
      <div class="scenarist-view_cont">
        <scenbtns @cut-source="cutSource" @set-layout="setLayout" @set-definition="setDefinition" @set-border="setBorder"></scenbtns>
      </div>
      <div class="scenarist-view_icons">
        <div class="scenarist-view_iconsbox">
          <mt-button>
            <img src="../../assets/common/pre.png" slot="icon">
          </mt-button>
          <mt-button>
            <img src="../../assets/common/next.png" slot="icon">
          </mt-button>
          <mt-button>
            <img src="../../assets/common/first.png" slot="icon">
          </mt-button>
          <mt-button>
            <img src="../../assets/common/last.png" slot="icon">
          </mt-button>
          <mt-button>
            <img src="../../assets/common/lock.png" slot="icon">
          </mt-button>
        </div>
      </div>
    </div>
    <view-list></view-list>
    <!-- 源截取 -->
    <interception v-if="showInterception" :show="showInterception" @save-cut="saveCut" :options="sourceCut"></interception>
    <!-- 布局 -->
    <scenarist-layout v-if="showLayout" :show="showLayout" @save-layout="saveLayout" :options="layouts"></scenarist-layout>
    <window-border :show="showWinBorder" @save-border="saveBorder"></window-border>
    <quality :show="showQuality" @save-quality="saveQuality"></quality>
  </div>
</template>

<script>
  import viewList from './viewlist';
  import detail from './detail';
  import viewSourec from './view';
  import scenbtns from './scenbtns';
  import windowBorder from './window-border';
  import interception from './interception';
  import scenaristLayout from './scenarist-layout';
  import quality from './quality';
  export default {
    components: {
      viewList,
      detail,
      viewSourec,
      scenbtns,
      interception,
      scenaristLayout,
      windowBorder,
      quality
    },
    data() {
      return {
        showInterception: false,
        showLayout: false,
        showWinBorder: false,
        showQuality: false,
        //初始化源截取模态框数据
        sourceCut: {
          width: {
            title: this.$t('common.width'),
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            }
          },
          height: {
            title: this.$t('common.height'),
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            }
          },
          x: {
            title: this.$t('common.X'),
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            }
          },
          y: {
            title: this.$t('common.Y'),
            value: 0,
            step: 10,
            range: {
              start: 0,
              end: 60
            }
          }
        },

        //初始化窗口模态框数据
        layouts: [
          {
            title: this.$t('common.mask'),
            opts: {
              width: {
                title: this.$t('common.up'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              height: {
                title: this.$t('common.down'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              x: {
                title: this.$t('common.left'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              y: {
                title: this.$t('common.right'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              }
            }
          },
          {
            title: this.$t('common.window'),
            opts: {
              width: {
                title: this.$t('common.width'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              height: {
                title: this.$t('common.height'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              x: {
                title: this.$t('common.left'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              },
              y: {
                title: this.$t('common.right'),
                value: 0,
                step: 10,
                range: {
                  start: 0,
                  end: 60
                }
              }
            }
          }
        ]
      };
    },
    methods: {
      submit() {
        console.log('submit');
      },
      //源截取
      cutSource() {
        this.showInterception = true;
      },
      saveCut(options) {
        this.showInterception = false;
        this.sourceCut = options;
      },
      //窗口
      setLayout() {
        this.showLayout = true;
      },
      saveLayout(options) {
        this.showLayout = false;
        this.layouts = options;
      },

      setDefinition() {
        this.showQuality = true;
      },
      saveQuality(options) {
        this.showQuality = false;
        console.log(options);
      },
      setBorder() {
        this.showWinBorder = true;
      },
      saveBorder(options) {
        this.showWinBorder = false;
        console.log(options);
      }
    }
  };
</script>

<style lang="less" scoped>

</style>

