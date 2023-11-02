<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-03-16 09:48:42
 * @Description: 
-->
<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-05 15:02:39
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-03-15 21:37:32
 * @FilePath: \pkmer-docs\src\components\Widget\ProgressClock\ProgressClock.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue';
import tinycolor from 'tinycolor2';
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
const minute = ref(0);
const hour = ref(0);
const second = ref(0);
watchEffect(() => {
	themeColor_B.value = props.widgetConfig['theme-color'];
	themeColor_G.value = tinycolor(themeColor_B.value).desaturate(40).toString();
	themeColor_L.value = tinycolor(themeColor_B.value).lighten(20).toString();
	themeColor_D.value = tinycolor(themeColor_B.value).darken(15).toString();
});
let Days = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let now_date = _now.value;

let _time = now_date.getTime();

//月
let now_year = now_date.getFullYear();
if (now_year % 4 === 0 && now_year % 100 != 0) {
	// 闰年
	Days[2] = 29;
}
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
let timerId = null;
onMounted(() => {
	timerId = setInterval(() => {
		_now.value = new Date();

		hour.value = _now.value.getHours();
		minute.value = _now.value.getMinutes();
		second.value = _now.value.getSeconds();
		// 周
		weeks.value = now_date.getDay();
		weeks.value = weeks.value ? weeks.value : 7;
	}, 1000);
});

onBeforeUnmount(() => {
	clearInterval(timerId);
});
</script>
<template>
	<div class="sub-container">
		<ul class="progress-group">
			<div id="right">
				<div class="top">
					<div id="left">
						<h2>{{ now_year }}</h2>
						<h2>{{ `${_now.getMonth() + 1}/${_now.getDate()}` }}</h2>
					</div>
					<div class="countdown">
						<span id="hour">{{ hour < 10 ? `0${hour}` : hour }}</span
						>:<span id="minute">{{ minute < 10 ? `0${minute}` : minute }}</span
						>:<span id="second">{{ second < 10 ? `0${second}` : second }}</span>
					</div>
				</div>
				<div class="progress-item">
					<span>今年：</span>
					<li
						id="year"
						:style="{
							backgroundColor: tinycolor(themeColor_B).setAlpha(0.2).toString(),
							color: tinycolor(themeColor_B).isLight() ? '#333' : '#fff',
						}"
					>
						<div
							:style="{
								width: ((days * 100) / total).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_D} 0%, ${themeColor_B} 100%)`,
							}"
						>
							<span>{{ year_text }}</span>
						</div>
					</li>
				</div>
				<div class="progress-item">
					<span>本周：</span>
					<li
						id="week"
						:style="{
							backgroundColor: tinycolor(themeColor_B).setAlpha(0.2).toString(),
							color: tinycolor(themeColor_B).isLight() ? '#333' : '#fff',
						}"
					>
						<div
							:style="{
								width: ((weeks * 100) / 7).toFixed(1) + '%',
								backgroundImage: `linear-gradient(to right, ${themeColor_D} 0%, ${themeColor_B} 100%)`,
							}"
						>
							<span>{{ `${weeks} / 7` }}</span>
						</div>
					</li>
				</div>
			</div>
		</ul>
	</div>
</template>
<style scoped>
.progress-group {
	margin: 0 auto;
	font-family: Verdana;
	height: 100vh;
	padding: 0;
}
#left {
}
#right {
	width: 100%;
}
li {
	list-style: none;
	width: 80vw;
	height: 20px;
	border-radius: 20px;
	line-height: 20px;
	overflow: hidden;
}
li div {
	background: #333333;
	height: 100%;
	width: 0;
	border-radius: 20px;
	font-size: 12px;
	text-align: right;
	line-height: 20px;
}
li div span {
	padding-right: 10px;
	line-height: 20px;
	width: 100%;
	display: inline-block;
	box-sizing: border-box;
	text-align: right;
}
h2 {
	margin: 0;
	line-height: 28px;
	display: block;
	font-size: 1.5em;
	margin-inline-start: 0px;
	margin-inline-end: 0px;
	font-weight: bold;
}
.countdown {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 1.6vw;
}
.countdown span {
	width: 36px;
	border-radius: 10px;
	border: 2px solid #3333338c;
	text-align: center;
	height: 36px;
	line-height: 36px;
	display: inline-block;
	margin: 0 2.5vw;
	font-size: 24px;
}
.top {
	display: flex;
	margin-bottom: 12px;
}
.progress-item {
	display: flex;
	align-items: center;
	margin-bottom: 1.333vw;
	white-space: nowrap;
}
.progress-item > span {
	font-size: 14px;
}
</style>
