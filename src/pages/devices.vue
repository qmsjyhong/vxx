<template>
  <div class="devices">
    <vx-header :title="$t('common.devices')"></vx-header>
    <div class="devices_cont">
      <div class="tabs">
        <div class="tab" :class="{active: active == 1}" @click="active = 1">在线</div>
        <div class="tab" :class="{active: active == 2}" @click="active = 2">离线</div>
      </div>
      <div class="devices_list" v-if="active == 1">
        <div class="device_info" v-for="(device,i) in onlineDevices" @click="selectedDev = i">
          <div class="device_icon">
            <img src="../assets/common/device_icon.png" alt="">
          </div>

          <div class="device_detail">
            <div class="title">{{device.title}}</div>
            <div class="ip">{{device.ip}}</div>
          </div>

          <div class="sel" v-show="selectedDev === i">
            <img src="../assets/common/checked.png" alt="">
          </div>
        </div>
      </div>
      <div class="devices_list" v-if="active == 2">
        <div class="device_info" v-for="(device,i) in outlineDevices">
          <div class="device_icon">
            <img src="../assets/common/outline_deveice.png" alt="">
          </div>

          <div class="device_detail">
            <div class="out_title">{{device.title}}</div>
          </div>

          <!-- <div class="sel">
            <img src="../assets/common/checked.png" alt="">
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import htp from "../api/http";
  export default {
    data() {
      return {
        selected: 'tab1',
        active: 1,
        selectedDev: '',
        onlineDevices: [],
        outlineDevices: []
      };
    },
    created() {
      this.getOnlineDevices();
      this.getOutlineDevices();
    },
    methods: {
      getOnlineDevices: async function() {
        let params = {
        };
        const res = await htp.get('url', params);
        console.log(res);
        this.onlineDevices = [{
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }];
      },
      getOutlineDevices: async function() {
        let params = {
        };
        const res = await htp.get('url', params);
        console.log(res);
        this.outlineDevices = [{
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }, {
          title: 'J6-1',
          ip: '192.168.10.16'
        }];
      }
    }

  };
</script>
