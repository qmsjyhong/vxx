<template>
  <div>
    <mt-popup v-model="show" position="right">
      <div class="layout">
    <vx-header :showcancel="1" :showsave="1" :title="$t('高级设置')" @save="save"></vx-header>
    <div class="layout-content">
      <div class="masks">
        <div class="masks-title">亮度调节</div>
        <div class="masks-contents">
          <vx-progress v-for="item in color" :title="item.title" :range="item.range" :step="5" :num="item.all"></vx-progress>
        </div>
      </div>
      <div class="masks">
        <div class="masks-title">亮度调节</div>
        <div class="masks-contents">
          <vx-progress v-for="item in color" :title="item.title" :range="item.range" :step="5" :num="item.all"></vx-progress>
        </div>
      </div>
      <div class="masks" style="margin-top:.30rem">
        <div class="masks-contents">
          <vx-progress v-for="item in colorheight" :title="item.title" :range="item.range" :step="5" :num="item.all"></vx-progress>
        </div>
      </div>
    </div>
  </div>
    </mt-popup>
</div>
	
</template>
<script>
	export default {
    methods: {
      save() {
        this.$emit('save-quality', {msg: "保存的信息"});
      }
    },
    props: ['show'],
		data() {
			return {
				titles: {
					lightChange: "亮度调节"
				},
				color: [
        {
          title: "全部",
          range: {
            start: 0,
            end: 60
        },
        all: 5
      },
      {
        title: "R",
        range: {
            start: 0,
            end: 60
          },
        all: 5
      },
      {
        title: "G",
        range: {
          start: 0,
          end: 60
        },
        all: 5
      },
      {
        title: "B",
        range: {
          start: 0,
          end: 60
        },
        all: 5
      }
    ],
    colorheight: [
    {
          title: "色调",
          range: {
            start: 0,
            end: 60
        },
        all: 5
      },
      {
        title: "锐度",
        range: {
            start: 0,
            end: 60
          },
          all: 5
      },
      {
        title: "Gamma",
        range: {
          start: 0,
          end: 60
        },
        all: 5
      }
    ]
			};
		}
	};
</script>
<style scoped lang="less"></style>