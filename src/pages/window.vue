<template>
  <div class="device" id="device">
    <div class="my-header">
      <mt-header class="header">
        <mt-button slot="right" @click="refresh">
          <img :src="imageMap['refreshIcon'].src" />
        </mt-button>
      </mt-header>
      <div class="my-header_title" @click="returnDevice">
        <h1 class="mint-header-title">{{title}}<span class="arrow"></span></h1>
      </div>
    </div>

    <div class="vx6-cell-row__fixed">
      <div class="vx6-cell-row" v-if="winList.length!=0">
        <div class="vx6-cell-title">
          <span v-text="$t('coverage.__quickSel')"></span>
          <!---->
        </div>
        <div class="vx6-cell-value">
          <select v-model="winSelected" @change="getInputInfo" class="select">
            <option v-for="win in winList" :value="win.id">
              {{win.name}}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="vx6-cell-row"></div>
    <main class="">

      <div class="vx6-coverage-row" v-if="winList.length!=0">
        <div class="vx6-coverage-cell" v-for="input in inputSourceList" @click="setWinInput(input.id)" v-if="input.status ==1 || input.status == 0">
          <div :class="{'vx6-coverage-cell__body': curInputSource != input.id,'vx6-coverage-cell__body_active': curInputSource == input.id}">
            <div :class="{'vx6-coverage-content_top':curInputSource != input.id,'vx6-coverage-content_top_active': curInputSource == input.id}">
              <div class="vx6-coverage-thumb">
                <img v-if="input.status==1" :src="inputSourceMap[input.type].active" />
                <img v-if="input.status==0" :src="inputSourceMap[input.type].normal" />
              </div>
              <span class="vx6-coverage-content-top-name" v-if="input.width != 0" v-text="input.width+'*'+input.height+'@'+input.refresh+'Hz'"></span>
              <span class="vx6-coverage-content-top-name" v-else="input.width == 0" v-text="$t('coverage.__noSignal')"></span>

            </div>
            <div :class="{'vx6-coverage-content_bootom':curInputSource != input.id,'vx6-coverage-content_bootom_active': curInputSource == input.id}">
              <span v-text="input.name"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import CoverageModel from 'src/model/coverage';
  import inputSourceMap from 'src/config/inputSourceMap';
  import Store from 'src/utils/store';
  import ImageMap from 'src/config/imageMap';
  const INPUT_SOURCE_LIST = 'InputSourceList';
  const WIN_LIST = 'WinList';
  const CUR_INPUT_SOURCE = 'curInputSource';
  const WIN_SELECTED = 'winSelected';


  export default {
    name: 'index',
    data() {
      return {
        winList: [],
        winSelected: -1,
        inputSourceList: [],
        inputSourceMap: inputSourceMap,
        curInputSource: 1,
        activeId: null,
        imageMap: ImageMap,
        title: '',
        deviceName: ''
      };
    },
    computed: {

    },
    methods: {
      msgBoxError(methods) {
        var self = this;
        this.$msgClose();
        self.$msgbox({
          title: self.$t('common.__notice'),
          message: self.$t('common.__noticeMsg') + '<div style="height: 5px"></div>',
          confirmButtonText: self.$t('common.__confirmText'),
          showConfirmButton: true,
          cancelButtonText: self.$t('common.__cancelText'),
          showCancelButton: true
        }).then(action => {
          if(action == 'confirm') {
            switch(methods) {
              case 'getInputInfo': self.getInputInfo(); break;
              case 'getList': self.getList(); break;
              case 'getInputSourceList': self.getInputSourceList(); break;
              case 'setWinInput': self.setWinInput(); break;
              case 'getDeviceInfo': self.getDeviceInfo(); break;
              default: break;
            }
          } else {
            self.returnDevice();
          }
        }).catch(err => {
          console.log(err);
        });
      },
      msgBoxWinListNull() {
        var self = this;
        this.$msgClose();
        self.$msgbox({
          title: self.$t('common.__notice'),
          message: self.$t('coverage.__winNull') + '<div style="height: 5px"></div>',
          confirmButtonText: self.$t('common.__confirmText'),
          showConfirmButton: true,
          cancelButtonText: self.$t('common.__cancelText'),
          showCancelButton: true
        }).then(action => {
          if(action == 'confirm') {
            this.refresh();
          } else {
            self.returnDevice();
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
      returnDevice() {
        window.Android && window.Android.returnDeviceList();
      },
      /**
       * 获取窗口信息
       */
      getInputInfo() {
        var tmp = { "status": 1000000, "data": { "curInputSource": this.winSelected } };
        this.curInputSource = tmp.data.curInputSource;
        //正式
        //            var reqMsg={'selectWindow':this.winSelected};
        //            Store(WIN_SELECTED,this.winSelected);
        //            this.IndicatorOpen();
        //            CoverageModel.getInputInfo(reqMsg)
        //                .then(data=>{
        //                    this.IndicatorClose();
        //                    var res=data.body;
        //                    console.log('getInputInfo',data);
        //                    if(res.status==10000000){
        //                        this.curInputSource=res.data.curInputSource;
        //                        Store(CUR_INPUT_SOURCE,this.curInputSource);
        //                    }
        //                    else
        //                    {
        //                        console.log("getInputInfo--------statusError");
        //                        this.msgBoxError('getInputInfo');
        //                    }
        //                })
        //                .catch(e=>{
        //                    this.IndicatorClose();
        //                    this.msgBoxError('getInputInfo');
        //                })
      },

      test() {
        CoverageModel.testComm({ "lang": "en", "debug": 0 })
          .then(data => { //response.data
            console.log(data);
          });

      },
      /**
       * 获取窗口列表
       */
      getList() {

        var tmp = { "status": 1000000, "data": { "winList": [{ "id": 1, "name": "Window 1" }, { "id": 2, "name": "Window 2" }, { "id": 3, "name": "Window 3" }, { "id": 4, "name": "Window 4" }] } };
        this.winList = tmp.data.winList;
        if(this.winList.length == 0) {
          this.msgBoxWinListNull();
          return;
        }
        this.winSelected = tmp.data.winList[0].id;
        this.getInputInfo();

        //正式
        //            this.IndicatorOpen();
        //            CoverageModel.getWinList()
        //                .then(data=>{
        //                      this.IndicatorClose();
        //                      var res=data.body;
        //                      console.log('getList',data);
        //                      if(res.status==10000000){
        //                          console.log(res.data.winList);
        //                          this.winList=res.data.winList;
        //                          if(this.winList.length==0){
        //                              this.msgBoxWinListNull();
        //                              return ;
        //                          }
        //                          this.winSelected=res.data.winList[0].id;
        //                          Store(WIN_LIST,this.winList);
        //                          this.getInputInfo();
        //                      }
        //                      else{
        //                          console.log("getList--------statusError");
        //                          this.msgBoxError('getList');
        //                      }
        //                  })
        //                  .catch(e=>{
        //                      this.IndicatorClose();
        //                      this.msgBoxError('getList');
        //                });

      },
      /**
       * 获取设备输入源
       */
      getInputSourceList() {
        var tmp = { "status": 10000000, "data": { "inputSourceList": [{ id: 1, name: "DVI-1", type: 1, width: "1920", height: "1080i", refresh: 50, status: 0 }, { id: 2, name: "DVI", type: 3, width: 1920, height: 1080, refresh: 50, status: 0 }, { id: 3, name: "CVBS1", type: 4, width: 1920, height: 1080, refresh: 50, status: 1 }, { id: 4, name: "DP", type: 6, width: 0, height: 0, refresh: 0, status: 0 }, { id: 5, name: "SDI", type: 1, width: 0, height: 0, refresh: 0, status: 0 }] } };
        this.inputSourceList = tmp.data.inputSourceList;
        //正式
        //            this.IndicatorOpen();
        //            CoverageModel.getInputSourceList()
        //                .then(data=>{
        //                    this.IndicatorClose();
        //                    var res=data.body;
        //                    if(res.status==10000000){
        //                        this.inputSourceList=res.data.inputSourceList;
        //                        Store(INPUT_SOURCE_LIST,this.inputSourceList);
        //                    }
        //                    else {
        //                        console.log("getInputSourceList--------statusError");
        //                        this.msgBoxError('getInputSourceList');
        //                    }
        //                })
        //                .catch(e=>{
        //                    this.IndicatorClose();
        //                    this.msgBoxError('getInputSourceList');
        //                });
      },
      setWinInput(inputSelected) {
        var reqMsg = { "selectWindow": this.winSelected, "selectInput": inputSelected };
        this.curInputSource = inputSelected;
        console.log(reqMsg);
        //            if(this.deviceName=="vx6"){
        //                var inputInfo={};
        //                console.log(this.inputSourceList);
        //                this.inputSourceList.forEach(function (item)  {
        //                    if(item.id==reqMsg.selectInput){
        //                        inputInfo=item;
        //                    }
        //                });
        //                if(inputInfo.name=="CVBS1"|| inputInfo.name=="CVBS2"||inputInfo.name=="VGA1"||inputInfo.name=="VGA2"){
        //                    CoverageModel.getInputSourceList()
        //                        .then(data=>{
        //                            var res=data.body;
        //                            if(res.status==10000000){
        //                                this.inputSourceList=res.data.inputSourceList;
        //                                Store(INPUT_SOURCE_LIST,this.inputSourceList);
        //                            }
        //                            else {
        //                                console.log("getInputSourceList--------statusError");
        //                            }
        //                        })
        //                        .catch(e=>{
        //                            console.log(e);
        //                        });
        //                }
        //            }


        //            this.IndicatorOpen();
        //            CoverageModel.setWinInput(reqMsg)
        //                .then(data=>{
        //                    this.IndicatorClose();
        //                    var res=data.body;
        //                    console.log('setWinInput',data);
        //                    if(res.status==10000000){
        //                        //针对VX6设备CVBS1与VGA1 CVBS2与VGA2 修改后重新请求输入源列表
        //                        if(this.deviceName.toUpperCase()=="VX6"){
        //                            var inputInfo={};
        //                            this.inputSourceList.forEach(function (item)  {
        //                                if(item.id==reqMsg.selectInput){
        //                                    inputInfo=item;
        //                                }
        //                            });
        //                            var inputName=inputInfo.name.toUpperCase();
        //                            if(inputName=="CVBS1"|| inputName=="CVBS2"||inputName=="VGA1"||inputName=="VGA2"){
        //                                setTimeout(()=>this.getInputSourceList2(),3000);
        //                            }
        //                        }
        //                        this.curInputSource=inputSelected;
        //                        Store(CUR_INPUT_SOURCE,this.curInputSource);
        //                    }
        //                    else {
        //                        this.msgBoxError('setWinInput');
        //                    }
        //                })
        //                .catch(e=>{
        //                    this.IndicatorClose();
        //                    this.msgBoxError('setWinInput');
        //                })
      },
      getInputSourceList2() {
        CoverageModel.getInputSourceList()
          .then(data => {
            var res = data.body;
            console.log(res.status);
            if (res.status == 10000000) {
              this.inputSourceList = res.data.inputSourceList;
              Store(INPUT_SOURCE_LIST, this.inputSourceList);
            } else {
              console.log("getInputSourceList---statusError");
            }
          })
          .catch(e => {
            console.log(e);
          });
      },

      getDeviceInfo() {
        var tmp = { "status": 10000000, "data": { "deviceName": "VX6", "deviceIp": "192.168.0.101" } };
        this.title = tmp.data.deviceName + " -- " + tmp.data.deviceIp;
        this.deviceName = tmp.data.deviceName;
        Store(TITLE, this.title);
        //正式
        //            this.IndicatorOpen();
        //            CommonModel.getDeviceInfo()
        //              .then(data=>{
        //                  this.IndicatorClose();
        //                  var res=data.body;
        //                  if(res.status==10000000){
        //                      this.title=res.data.deviceName+" -- "+res.data.deviceIp;
        //                      this.deviceName=res.data.deviceName;
        //                      Store(TITLE,this.title);
        //                  }
        //                 else{
        //                      this.msgBoxError('getDeviceInfo');
        //                  }
        //              })
        //              .catch(e=>{
        //                  this.IndicatorClose();
        //                  this.msgBoxError('getDeviceInfo');
        //              })
      },
      refresh() {
        Store(INPUT_SOURCE_LIST, null);
        Store(WIN_LIST, null);
        Store(CUR_INPUT_SOURCE, null);
        Store(WIN_SELECTED, null);
        Store(TITLE, null);
        this.getInputSourceList();
        this.getList();
        this.getDeviceInfo();
      }
    },
    mounted() {
      if(!Store(TITLE)) {
        this.getDeviceInfo();
      } else {
        this.title = Store(TITLE);
      }

      if(!Store(INPUT_SOURCE_LIST)) {
        this.getInputSourceList();
      } else {
        this.inputSourceList = Store(INPUT_SOURCE_LIST);
      }
      if(!Store(WIN_LIST)) {
        this.getList();
      } else {
        this.winList = Store(WIN_LIST);
        this.curInputSource = Store(CUR_INPUT_SOURCE);
        this.winSelected = Store(WIN_SELECTED);
      }
    }
  };

</script>



