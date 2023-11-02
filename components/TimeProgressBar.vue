<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-05 15:02:39
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-03-16 10:23:23
 * @FilePath: \pkmer-docs\src\components\Widget\TimeProgressBar\TimeProgressBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue';
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
	widgetConfig: {
		[index: string]: any;
	};
}
// 从父组件读取配置
const props = defineProps<Props>();

const _now = ref(new Date());
const themeColor_B = ref(''); //basic
const themeColor_L = ref(''); //light
const themeColor_G = ref(''); //gray
const themeColor_D = ref(''); //dark
const days = ref(0);
const weeks = ref(0);
const month = ref(0);
const layout = ref(''); //

watchEffect(() => {
	themeColor_B.value = props.widgetConfig['theme-color'];
	themeColor_G.value = tinycolor(themeColor_B.value).desaturate(40).toString();
	themeColor_L.value = tinycolor(themeColor_B.value).lighten(20).toString();
	themeColor_D.value = tinycolor(themeColor_B.value).darken(15).toString();
	layout.value = props.widgetConfig['layout-style'];
});

let Days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let now_date = _now.value;
let _time = now_date.getTime();
// 周
weeks.value = now_date.getDay();
weeks.value = weeks.value ? weeks.value : 7;
//月
let now_year = now_date.getFullYear();
if (now_year % 4 === 0 && now_year % 100 != 0) {
	// 闰年
	Days[2] = 29;
}
month.value = now_date.getMonth() + 1;
let month_day = now_date.getDate();
// 年

let year_start = new Date(`${now_year}/1/1`).getTime();
let _du = _time - year_start;
days.value = Math.ceil(_du / (24 * 60 * 60 * 1000));
let total = now_year % 4 === 0 && now_year % 100 !== 0 ? 366 : 365;

let year_rate = (days.value * 100) / total;
let year_text =
	year_rate <= 15
		? days.value
		: year_rate <= 30
		? `${days.value} / ${total}`
		: `${days.value} / ${total} (${year_rate.toFixed(0)}%)`;
</script>
<template>
	<div class="sub-container" :class="layout === 'Default' ? '' : 'vertical-layout'">
		<ul class="progress-group" v-if="layout === 'Default'">
			<div id="right">
				<div class="progress-item" id="year-bar">
					<span
						:style="{
							color: themeColor_D,
						}"
						>今年</span
					>
					<li
						id="year"
						:style="{
							backgroundColor: tinycolor(themeColor_D).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								width: ((days * 100) / total).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_D} 0%, ${themeColor_B} 100%)`,
							}"
						></div>
					</li>
					<em>{{ year_text }}</em>
				</div>
				<div class="progress-item" id="month-bar">
					<span
						:style="{
							color: themeColor_G,
						}"
						>本月</span
					>
					<li
						id="month"
						:style="{
							backgroundColor: tinycolor(themeColor_G).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								width: ((month_day * 100) / Days[month]).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_G} 0%, ${themeColor_G} 100%)`,
							}"
						></div>
					</li>
					<em>{{ `${month_day}/${Days[month]}` }}</em>
				</div>
				<div class="progress-item" id="week-bar">
					<span
						:style="{
							color: themeColor_L,
						}"
						>本周</span
					>
					<li
						id="week"
						:style="{
							backgroundColor: tinycolor(themeColor_L).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								width: ((weeks * 100) / 7).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_B} 0%, ${themeColor_L} 100%)`,
							}"
						></div>
					</li>
					<em>{{ `${weeks} / 7` }}</em>
				</div>
			</div>
		</ul>
		<ul class="progress-group" v-else>
			<div id="right">
				<div class="progress-item" id="year-bar">
					<li
						id="year"
						:style="{
							backgroundColor: tinycolor(themeColor_D).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								height: ((days * 100) / total).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_D} 0%, ${themeColor_B} 100%)`,
							}"
						></div>
					</li>
					<span
						:style="{
							color: themeColor_D,
						}"
						>今年</span
					>
					<em>{{ year_text }}</em>
				</div>
				<div class="progress-item" id="month-bar">
					<li
						id="month"
						:style="{
							backgroundColor: tinycolor(themeColor_G).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								height: ((month_day * 100) / Days[month]).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to top, ${themeColor_G} 0%, ${themeColor_G} 100%)`,
							}"
						></div>
					</li>
					<span
						:style="{
							color: themeColor_G,
						}"
						>本月</span
					>
					<em>{{ `${month_day}/${Days[month]}` }}</em>
				</div>
				<div class="progress-item" id="week-bar">
					<li
						id="week"
						:style="{
							backgroundColor: tinycolor(themeColor_L).setAlpha(0.2).toString(),
						}"
					>
						<div
							:style="{
								height: ((weeks * 100) / 7).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to top, ${themeColor_B} 0%, ${themeColor_L} 100%)`,
							}"
						></div>
					</li>
					<span
						:style="{
							color: themeColor_L,
						}"
						>本周</span
					>
					<em>{{ `${weeks} / 7` }}</em>
				</div>
			</div>
		</ul>
	</div>
</template>
<style scoped>
#container .mobile-view .progress-group {
	width: 100%;
}

@media only screen and (max-width: 767px) {
	/* 这里是您为移动设备编写的 CSS 样式 */
	.progress-group {
		width: 100%;
	}
}
.vertical-layout .progress-group {
	width: 260px;
	margin: 0 auto;
	font-family: Verdana;
	height: 100vh;
	padding: 0;
}

.vertical-layout #right {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.vertical-layout li {
	list-style: none;
	height: 60vh;
	width: 26px;

	background: #f3f3f3;
	color: #ffffff;
	overflow: hidden;
	display: flex;
	align-items: flex-end;
	margin-bottom: 21.6px;
}

.vertical-layout li div {
	background: #333333;
	height: 0;
	width: 100%;
	border-radius: 71.68px;
	font-size: 12px;
	text-align: right;
}

.vertical-layout h2 {
	margin: 0;
	line-height: 28px;
}

.vertical-layout .countdown {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 1080px;
}

.vertical-layout .countdown span {
	width: 108px;
	border-radius: 20px;
	border: 8px solid #333333;
	text-align: center;
	height: 108px;
	line-height: 108px;
	display: inline-block;
	margin: 0 108px;
	font-size: 48px;
}

.vertical-layout .top {
	display: flex;
}

.vertical-layout .progress-item {
	display: flex;
	align-items: center;
	margin-bottom: 360px;
	flex-direction: column;
	width: 86.4px;
}

/*********** */
.progress-group {
	width: 60vw; /* 10rem * 54 = 540px */
	margin: 0 auto;
	font-family: Verdana;
	/* height: 100vh; */
	padding: 14.4px; /* 0.266667rem * 54 = 14.4px */
	box-sizing: border-box;
	font-size: 14.4px; /* 0.266667rem * 54 = 14.4px */
}

li {
	list-style: none;
	width: 60%; /* 7rem * 54 = 378px */
	height: 14.4px; /* 0.266667rem * 54 = 14.4px */
	border-radius: 14.4px; /* 0.266667rem * 54 = 14.4px */
	background: #f3f3f3;
	color: #ffffff;
	overflow: hidden;
	margin: 0 10.8px; /* 0.2rem * 54 = 10.8px */
}

li div {
	background: #333333;
	height: 100%;
	width: 0;
	border-radius: 14.4px; /* 0.266667rem * 54 = 14.4px */
	font-size: 12px;
	text-align: right;
	line-height: 20px;
}

/* li div span {display: inline-block; box-sizing: border-box; text-align: right; font-size: 23.04px;} */

h2 {
	margin: 0;
	line-height: 28px;
}

.countdown {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
}

.countdown span {
	width: 50px;
	border-radius: 10px;
	border: 2px solid #333333;
	text-align: center;
	height: 50px;
	line-height: 50px;
	display: inline-block;
	margin: 0 10.8px; /* 20px * 54 = 10.8px */
	font-size: 24px;
}

.top {
	display: flex;
}

.progress-item {
	display: flex;
	align-items: center;
	margin-bottom: 10.8px; /* 10px * 54 = 10.8px */
}

.progress-item > span {
	font-size: 20.16px; /* 0.373333rem * 54 = 20.16px */
}
</style>
