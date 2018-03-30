<template>
  <div class="scene" id="scene" name="scene">
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
    <main class="">

      <div class="vx6-scene-row">
        <div class="vx6-scene-content" v-for="scene in sceneList">
          <div :class="{'vx6-scene-content__body_active':scene==sceneSelect,'vx6-scene-content__body':scene!=sceneSelect}" @click="selectScene(scene)">
            <div :class="{'vx6-scene-content__top':scene.sceneStatus!=1,'vx6-scene-content__top_active':scene.sceneStatus==1}">
              <span v-text="scene.index"></span>
              <img v-if="scene==sceneCur" class="vx6-scene-content__top_check" :src="imageMap['checkCircle'].src" />
            </div>
            <div :class="{'vx6-scene-content__bottom':scene!=sceneSelect,'vx6-scene-content__bottom_active':scene==sceneSelect}">
              <span class="vx6-scene-content__bottom_right " @click="alterSceneName(scene)">
                                <img  :src="imageMap['edit'].src" style="width:18px;"/>
                            </span>
              <span class="vx6-scene-content__bottom_span" v-text="scene.name"></span>

            </div>
          </div>

        </div>
      </div>
    </main>
    <div class="page-button-group__placeholder"></div>
    <div class="page-button-group-fixed">
      <div class="page-button-group" v-if="sceneList.length!=0">
        <mt-button type="primary" v-if="sceneSelect.sceneStatus==0">
          <img :src="imageMap['load'].src" height="20" width="20" slot="icon" /> {{$t('scene.__loadScene')}}
        </mt-button>
        <mt-button class="mint-button--active" v-else @click.native="setLoadScene">
          <img :src="imageMap['load'].active" height="20" width="20" slot="icon" /> {{$t('scene.__loadScene')}}
        </mt-button>
        <!--<mt-button disabled type="primary" v-if="sceneSelect==-1"  @click.native="saveScene">{{$t('scene.__saveScene')}}</mt-button>-->
        <mt-button class="mint-button--active" @click.native="saveScene">
          <img :src="imageMap['save'].active" height="20" width="20" slot="icon" /> {{$t('scene.__saveScene')}}
        </mt-button>
      </div>
    </div>
    <vx-modalbox @on-close="closeModal" v-model="sceneSelect" @onEnsure="modalEnsure" :isShow="isShowLog" v-if="sceneSelect != -1"></vx-modalbox>
  </div>
</template>

<script>
  import SceneModel from 'src/model/scene';
  import Store from 'src/utils/store';
  import ImageMap from 'src/config/imageMap';
  export default {
    name: 'scene',
    data() {
      return {
        backText: '返回',
        sceneList: [],
        sceneCur: -1,
        imageMap: ImageMap,
        isShowLog: false,
        title: "",
        sceneSelect: -1
      };
    },
    methods: {
      msgBoxError(methods) {
        var self = this;
        self.$msgClose();
        self.$msgbox({
          title: self.$t('common.__notice'),
          message: self.$t('common.__noticeMsg'),
          //message: this.$t('common.__noticeMsg') + '<div style="height: 5px"></div>',
          confirmButtonText: self.$t('common.__confirmText'),
          showConfirmButton: true,
          cancelButtonText: self.$t('common.__cancelText'),
          showCancelButton: true
        }).then(action => {
          if(action == 'confirm') {
            switch(methods) {
              case 'getSceneList': self.getSceneList(); break;
              case 'setLoadScene': self.setLoadScene(); break;
              case 'saveScene': self.saveScene(); break;
              case 'alterSceneName': self.alterSceneName(); break;
              case 'getCurScene': self.getCurScene(); break;
              default: break;
            }
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
      closeModal() {
        this.isShowLog = !this.isShowLog;
      },
      getCurScene() {
        var sceneItem = -1;
        var sceneFirst = -1;
        //演示

        var tmp = { "status": 1000000, "data": { "sceneCur": 4 } };
        this.sceneList.forEach(function(item) {
          if(item.id == tmp.data.sceneCur) {
            sceneItem = item;
          }
          if(item.id == 1) {
            sceneFirst = item;
          }
        });

        this.sceneCur = sceneItem;
        this.sceneSelect = sceneFirst;
        //                Store(SCENE_SELECT,this.sceneSelect);
        //                Store(SCENE_CUR,this.sceneCur);

        //正式
        //                var self=this;
        //                self.IndicatorOpen();
        //                SceneModel.getCurScene()
        //                    .then(data=>{
        //                        self.IndicatorClose();
        //                        var res=data.body;
        //                        if(res.status==10000000){
        //                            self.sceneList.forEach(function (item) {
        //                                if(item.id==res.data.sceneCur){
        //                                    sceneItem=item;
        //                                }
        //                                if(item.id==1){
        //                                    sceneFirst=item;
        //                                }
        //                            });
        //                            self.sceneCur=sceneItem;
        //                            self.sceneSelect=sceneFirst;
        //                            Store(SCENE_SELECT,self.sceneSelect);
        //                            Store(SCENE_CUR,self.sceneCur);
        //
        //                        }
        //                        else{
        //                            this.msgBoxError('getCurScene');
        //                        }
        //                    })
        //                    .catch(e=>{
        //                        console.log(e);
        //                        this.IndicatorClose();
        //                        this.msgBoxError('getCurScene');
        //                    });

      },
      /**
       * 获取场景列表
       */
      getSceneList() {
        //演示
        var tmp = { "status": 1000000, "data": { "sceneList": [{ "id": 1, "name": "Preset 1", "sceneStatus": true }, { "id": 2, "name": "Preset 2", "sceneStatus": true }, { "id": 3, "name": "Preset 3", "sceneStatus": false }, { "id": 4, "name": "Preset 4", "sceneStatus": false }, { "id": 5, "name": "Preset 5", "sceneStatus": false }, { "id": 6, "name": "Preset 6", "sceneStatus": false }, { "id": 11, "name": "Preset 7", "sceneStatus": false }, { "id": 16, "name": "Preset 8", "sceneStatus": false }, { "id": 7, "name": "Preset 9", "sceneStatus": false }, { "id": 12, "name": "Preset 10", "sceneStatus": false }, { "id": 17, "name": "Preset 11", "sceneStatus": false }, { "id": 8, "name": "Preset 12", "sceneStatus": false }, { "id": 13, "name": "Preset 13", "sceneStatus": false }, { "id": 18, "name": "Preset 14", "sceneStatus": false }, { "id": 9, "name": "Preset 15", "sceneStatus": false }, { "id": 14, "name": "Preset 16", "sceneStatus": false }, { "id": 19, "name": "Preset 17", "sceneStatus": false }, { "id": 10, "name": "Preset 18", "sceneStatus": false }, { "id": 15, "name": "Preset 19", "sceneStatus": false }, { "id": 20, "name": "Preset 20", "sceneStatus": false }] } };
        var i = 1;
        tmp.data.sceneList.forEach(function(item) {
          item.index = i >= 10 ? i : '0' + i;
          i++;
        });
        this.sceneList = tmp.data.sceneList;
        this.getCurScene();

        //正式
        //                this.IndicatorOpen();
        //                SceneModel.getSceneList()
        //                    .then(data=>{
        //                        this.IndicatorClose();
        //                        var res=data.body;
        //                        if(res.status==10000000){
        //                            var i=1;
        //                            res.data.sceneList.forEach(function (item) {
        //                                item.index=i>=10?i:'0'+i;
        //                                i++;
        //                            });
        //                            this.sceneList=res.data.sceneList;
        //                            this.getCurScene();
        //                            Store(SCENE_LIST,this.sceneList);
        //
        //                        }
        //                        else{
        //                            this.msgBoxError('getSceneList');
        //                        }
        //                    })
        //                    .catch(e=>{
        //                        this.IndicatorClose();
        //                        this.msgBoxError('getSceneList');
        //                    })
      },
      selectScene(scene) {
        this.sceneSelect = scene;
        Store(SCENE_SELECT, this.sceneSelect);
      },
      test() {
        SceneModel.testComm({ "lang": "en", "debug": 0 })
          .then(data => { //response.data
            console.log(data);
          });
      },
      /**
       * 载入场景
       */
      setLoadScene() {

        var sceneInfo = -1;
        var self = this;
        self.$msgClose();
        var reqMsg = { "sceneId": this.sceneSelect.id };
        //演示
        this.sceneList.forEach(function(item) {
          if(item.id == reqMsg.sceneId) {
            sceneInfo = item;
          }
        });
        this.sceneCur = sceneInfo;
        //正式
        //                self.IndicatorOpen();
        //                SceneModel.setLoadScene(reqMsg)
        //                    .then(data=>{
        //                        this.IndicatorClose();
        //                        var res=data.body;
        //                        if(res.status==10000000){
        //                            self.sceneList.forEach(function (item) {
        //                               if(item.id==reqMsg.sceneId){
        //                                 sceneInfo=item;
        //                               }
        //                            });
        //                            if(sceneInfo!=-1){
        //                                this.sceneCur=sceneInfo;
        //                                Store(SCENE_CUR,this.sceneCur);
        //                            }
        //                        }
        //                    else{
        //                        self.msgBoxError('setLoadScene');
        //                    }
        //                })
        //                    .catch(e=>{
        //                        self.IndicatorClose();
        //                        self.msgBoxError('setLoadScene');
        //                });


      },
      /**
       * 保存场景
       */
      saveScene() {
        var reqMsg = { "sceneId": this.sceneSelect.id };
        //演示
        this.sceneSelect.sceneStatus = true;
        this.sceneList.forEach(function(item) {
          if(item.id == reqMsg.sceneId) {
            item.sceneStatus = true;
          }
        });

        //正式
        //                var self=this;
        //                self.$msgClose();
        //                if(this.sceneSelect.sceneStatus==false){
        //                   console.log(reqMsg);
        //                    self.IndicatorOpen();
        //                   SceneModel.saveScene(reqMsg)
        //                       .then(data=>{
        //                           self.IndicatorClose();
        //                           var res=data.body;
        //                           if(res.status==10000000){
        //                               self.sceneSelect.sceneStatus=true;
        //                               self.sceneList.forEach(function (item) {
        //                                   if(item.id==reqMsg.sceneId){
        //                                       item.sceneStatus=true;
        //                                   }
        //                               });
        //                               Store(SCENE_LIST,this.sceneList);
        //                           }
        //                           else {
        //                               self.msgBoxError('saveScene');
        //                           }
        //                       })
        //                       .catch(e=>{
        //                           self.IndicatorClose();
        //                           self.msgBoxError('saveScene');
        //                       });
        //                } else {
        //                    self.$msgbox({
        //                        title: self.$t('common.__notice'),
        //                        message: self.$t('scene.__saveFullScene'),
        //                        confirmButtonText:self.$t('common.__affirm'),
        //                        showConfirmButton: true,
        //                        cancelButtonText:self.$t('common.__cancel'),
        //                        showCancelButton:true,
        //                    }).then(action=>{
        //                        if(action =='confirm'){
        //                            self.IndicatorOpen();
        //                            SceneModel.saveScene(reqMsg)
        //                                .then(data=>{
        //                                    self.IndicatorClose();
        //                                    var res=data.body;
        //                                    if(res.status==10000000){
        //                                        self.sceneSelect.sceneStatus=true;
        //                                        self.sceneList.forEach(function (item) {
        //                                            if(item.id==reqMsg.sceneId){
        //                                                item.sceneStatus=true;
        //                                            }
        //                                        });
        //                                        Store(SCENE_LIST,this.sceneList);
        //                                    }
        //                                    else {
        //                                        self.msgBoxError('saveScene');
        //                                    }
        //                                })
        //                                .catch(e=>{
        //                                    self.IndicatorClose();
        //                                    self.msgBoxError('saveScene');
        //                                })
        //                        }
        //                    });
        //                }

      },
      modalEnsure(data) {
        var reqMsg = { "sceneId": data.id, "sceneName": data.name };
        //演示
        this.isShowLog = false;
        this.sceneList.forEach(function(item) {
          if(item.id == reqMsg.sceneId) {
            item.name = reqMsg.sceneName;
          }
        });

        //                this.IndicatorOpen();
        //                SceneModel.alterSceneName(reqMsg)
        //                    .then(data=>{
        //                        this.IndicatorClose();
        //                        var res=data.body;
        //                        console.log(res);
        //                        if(res.status==10000000){
        //                            this.sceneList.forEach(function (item) {
        //                                if(item.id==reqMsg.sceneId){
        //                                    item.name=reqMsg.sceneName;
        //                                }
        //                            });
        //                            Store(SCENE_LIST,this.sceneList);
        //                        }
        //                        else {
        //                            this.msgBoxError('alterSceneName');
        //                        }
        //                    }).catch(e=>{
        //                        this.IndicatorClose();
        //                        this.msgBoxError('alterSceneName');
        //                    });
        //                this.isShowLog=false;

      },

      /**
       * 修改场景名称
       */
      alterSceneName(scene) {
        //
        if(scene) {
          this.selectScene(scene);
        }
        this.isShowLog = true;
        //                this.$msgClose();
        //                var self=this;
        //                self.$msgbox({
        //                    title: self.$t('common.__remarkModification'),
        //                    message: null,
        //                    confirmButtonText:self.$t('common.__affirm'),
        //                    showConfirmButton: true,
        //                    cancelButtonText:self.$t('common.__cancel'),
        //                    showCancelButton:true,
        //                    showInput:true,
        //                    inputValue:self.sceneCur.name,
        //                }).then(action => {
        //
        //                    var value=document.querySelector('.mint-msgbox-input input').value;
        //                    if(value!=null && action == 'confirm'){
        //                        this.sceneCur.name=value;
        //                        console.log(value);
        //                        var reqMsg={"sceneId":this.sceneCur.id,"sceneName":value};
        //                        this.IndicatorOpen();
        //                        SceneModel.alterSceneName(reqMsg).then(data=>{
        //                            this.IndicatorClose();
        //                            console.log('alterSceneName',data);
        //                            var res=data.body;
        //                            if(res.status==10000000){
        //                            }  else {
        //                                self.msgBoxError('alterSceneName');
        //                            }
        //                        }).catch(e=>{
        //                            this.IndicatorClose();
        //                            self.msgBoxError('alterSceneName');
        //                        })
        //                    }
        //                }).catch(err => {
        //                   console.log(err);
        //                });
      },
      refresh() {
        Store(SCENE_LIST, null);
        Store(SCENE_SELECT, null);
        Store(SCENE_CUR, null);
        this.getSceneList();
      }
    },
    mounted() {
      this.title = Store(TITLE);
      if(!Store(true, SCENE_LIST)) {
        this.getSceneList();
      } else {
        this.sceneList = Store(SCENE_LIST);
        this.sceneCur = Store(SCENE_CUR);
        this.sceneSelect = Store(SCENE_SELECT);

      }

    }
  };
</script>

