<template>
	<div>
		<mt-popup v-model="show" position="right">
		<div class="layout">
		<vx-header :showcancel="1" :showsave="1" @save="save" :title="$t(`边框`)"></vx-header>
		<div class="layout-content">
			<div class="masks">
				<div class="masks-border-title">
					<div>边框</div>
					<div>
						<mt-switch v-model="switchValue" @change="text"></mt-switch>
					</div>
				</div>
				<div class="masks-contents">
					<vx-progress v-for="progress in windowBorder" :title="progress.title" :range="progress.range" :step="5" :num="progress.all"></vx-progress>
					<div class="borderColor">
						<div class="borderColor-title">
							<div>颜色</div>
							<div :style="{ background: color }">Color</div>
						</div>
						<ul class="colorList">
							<li v-for="(item, index) in bgColors" :style="{background:item.color, border: item.border}" :key="index" @click='changeColor(item.color)'>{{item.text}}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		</div>
		</mt-popup>
	
	
	</div>
</template>
<script>
	export default {
		data() {
			return {
				selectBgColor: null,
				bgColors: [
					{
						color:'#ff6700',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ff6aaa',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ff2700',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ff9700',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ff9987',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ff6744',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ffabca',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ffff43',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'#ffffff',
						text: null,
						border:'.01rem solid #ffffff'
					},
					{
						color:'',
						text: "无填充",
						border:'.01rem solid #ffffff'
					}
				],
				switchValue: false,
				windowBorder: [
				{
					title: '宽度',
					range: {
						start: 0,
						end: 60
					},
					all: 5
				},
				{
					title: '高度',
					range: {
						start: 0,
						end: 60
					},
					all: 5
				}
				]
			};
		},
		props: ['show'],
		methods: {
			save() {
				this.$emit('save-border', {mag: '保存的信息'});
			},
			text() {
				console.log(this.switchValue);
			},
			changeColor(val) {
				this.selectBgColor = val;
			}
		},
		computed: {
			color() {
				return this.selectBgColor == null ? '#ff6700':this.selectBgColor;
			}
		}
	};
</script>
<style scoped lang="less"></style>