<template>
  <div class="takebtn">
    <div v-finger:press-move="pressMove" class="takebtn_toggle" v-if="curUrl != '/info'" ref="btn">
      <span>TAKE</span>
      <svg width="60" height="60" class="takebtn_toggle__svg">
        <circle cx="30" cy="30" r="26" fill="none" stroke="none" stroke-width="2" stroke-linecap="round" />
        <circle class="demo2" id="J_demo2" cx="30" cy="30" r="26" fill="none" stroke="#e28829" stroke-width="2" stroke-dasharray="0,10000" ref="svg" />
      </svg>
    </div>
  </div>
</template>

<script >
  import CommandModel from 'src/model/command';
  export default {
    data() {
      return {
        curUrl: (window.location.hash).slice(1),
        val: '123',
        scrollHeight: 0,
        circleLength: -1,
        timeOutEvent: 0,
        next: 0,
        startTime: 0,
        isLock: false
      };
    },

    methods: {
      getStyle(element) {
        return window.getComputedStyle(element, null);
      },

      msgBoxError(methods) {
        this.$msgClose();
        var self = this;
        self.$msgbox({
          title: self.$t('common.__notice'),
          message: self.$t('common.__noticeMsg'),
          confirmButtonText: self.$t('common.__confirmText'),
          showConfirmButton: true,
          cancelButtonText: self.$t('common.__cancelText'),
          showCancelButton: true
        }).then(action => {
          if(action === 'confirm') {
            switch(methods) {
              case 'commandMessage': self.commandMessage(); break;
              default: break;
            }
          } else {
            window.Android.returnDeviceList();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      IndicatorOpen() {
        this.$indicator.open({
          spinnerType: 'fading-circle'
        });
      },
      IndicatorClose() {
        this.$indicator.close();
      },
      commandMessage() {
        let self = this;
        self.$msgClose();
        self.$msgbox({
          title: self.$t('common.__notice'),
          message: self.$t('take.__takeMsg'),
          confirmButtonText: self.$t('common.__affirm'),
          showConfirmButton: true,
          cancelButtonText: self.$t('common.__cancel'),
          showCancelButton: true
        }).then(action => {
          if (action == 'confirm') {
            var reqMsg = { 'takeCommand': 1 };
            console.log(reqMsg);
            this.IndicatorOpen();
            CommandModel.commandMessage(reqMsg)
              .then(data => {
                this.IndicatorClose();
                console.log('commandMessage', data);
                var res = data.body;
                if (res.status == 10000000) {
                } else {
                  self.msgBoxError('commandMessage');
                }
              }).catch(() => {
                this.IndicatorClose();
                self.msgBoxError('commandMessage');
              });
          }
        });
      },
      accomplish: function() {
        const $btn = this.$refs['btn'];
        $btn.style.cssText += 'transform:scale(1)';
        clearInterval(this.timeOutEvent);
        this.next = 0;
        this.rotateCircle(this.next);
      },
      clickEvent: function() {
        if(this.isLock) {
          this.next = 0;
          clearInterval(this.timeOutEvent);
          this.isLock = false;
          return;
        }
        this.next = this.next + 1;
        this.rotateCircle(this.next);
        if(this.next == 5) {
          setTimeout(this.accomplish, 120);
        }
      },
      rotateCircle: function(req) {
        const $svg = this.$refs['svg'];
        let val = req * 150;
        val = Math.max(0, val);
        val = Math.min(500, val);
        $svg.setAttribute("stroke-dasharray", "" + this.circleLength * val / 100 + ",10000");
      },
      touchStart: function() {
        const $btn = this.$refs['btn'];
        $btn.style.cssText += 'transform:scale(1.7)';
        this.startTime = new Date() * 1;
        this.timeOutEvent = setInterval(this.clickEvent, 100);
      },
      touchEnd: function() {
        const $btn = this.$refs['btn'];
        $btn.style.cssText += 'transform:scale(1)';
        let _time = new Date() * 1;
        if((_time - this.startTime) < 100) {
          this.isLock = true;
        }
        if(this.next > 0 && this.next != 15) {
          clearInterval(this.timeOutEvent);
          this.next = 0;
          this.rotateCircle(this.next);
        }
      },
      pressMove: function(evt) {
        const $btn = this.$refs['btn'];
        const styles = this.getStyle($btn);
        $btn.style.cssText += 'transform:scale(1)';
        this.isLock = false;
        clearInterval(this.timeOutEvent);
        this.next = 0;
        this.rotateCircle(this.next);
        let winHeight = window.innerHeight - 130;
        let winWidth = window.innerWidth - 75;
        let { top, left } = styles;
        top = parseFloat(top) + evt.deltaY;
        left = parseFloat(left) + evt.deltaX;
        if(left < 15) {
          left = 15;
        }
        if(left > winWidth) {
          left = winWidth;
        }
        if(top < 55) {
          top = 55;
        }
        if(top > winHeight) {
          top = winHeight;
        }
        $btn.style.top = top + 'px';
        $btn.style.left = left + 'px';
        evt.preventDefault();
      }
    },
    mounted() {
      if(this.curUrl != '/info') {
        const $svg = this.$refs['svg'];
        this.circleLength = Math.floor(2 * Math.PI * $svg.getAttribute("r"));
        this.$nextTick(() => {
          // this.scrollHeight = window.innerHeight - document.getElementById("vcan-navbar").offsetHeight;
          this.scrollHeight = window.innerHeight;
        });
      }
    },
    watch: {
      '$route'(to) {
        this.curUrl = to.path;
      }
    }
  };
</script>
