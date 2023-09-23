<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-03-16 11:36:09
 * @Description: 
-->
<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-03-16 10:04:47
 * @Description: 
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
const flip = ref(false);
const hour = ref(0);
const minute = ref(0);
const second = ref(0);
const themeColor_C = ref(''); //basic
const themeColor_BG = ref(''); //light
const themeColor_B_C = ref(''); //gray
const themeColor_B_BG = ref(''); //dark
const themeColor_Border = ref(''); //dark
const layout = ref('Light'); //
watchEffect(() => {
	layout.value = props.widgetConfig['layout-style'];
	if (layout.value == 'Light') {
		//亮色模式
		themeColor_C.value = tinycolor(themeColor_C.value).darken(72).toString();
		themeColor_BG.value = props.widgetConfig['theme-color'];
		themeColor_B_C.value = tinycolor(themeColor_C.value).darken(69).brighten(6).toHexString();
		themeColor_B_BG.value = tinycolor(themeColor_BG.value).brighten(3).toString();
		themeColor_Border.value = 'none';
	} else {
		//暗色模式
		themeColor_C.value = props.widgetConfig['theme-color'];
		themeColor_BG.value = tinycolor(themeColor_C.value).darken(72).toString();
		themeColor_B_C.value = tinycolor(themeColor_C.value).brighten(3).toString();
		themeColor_B_BG.value = tinycolor(themeColor_C.value).darken(69).brighten(6).toHexString();
		themeColor_Border.value = 'solid 1px ' + themeColor_B_BG.value;
	}
});
// 前置补零函数
function padTime(val: { toString: () => string }) {
	return val.toString().padStart(2, '0');
}
// 更新时间函数
function updateTime() {
	const now = new Date();
	hour.value = now.getHours() % 12 || 12;
	minute.value = now.getMinutes();
	second.value = now.getSeconds();
	flip.value = true; // 每秒切换 flip 类
	setTimeout(() => {
		flip.value = false;
	}, 500);
}
// 在组件挂载时启动计时器
onMounted(() => {
	updateTime(); // 先手动更新一次
	setInterval(updateTime, 1000);
});
</script>
<template>
	<div class="sub-container">
		<div id="header">
			<div id="app" class="water-mark">
				<div class="flip-clock" :class="layout === 'Default' ? '' : 'light'">
					<span class="flip-clock__piece flip"
						><b class="flip-clock__card card"
							><b class="card__top">{{ padTime(hour) }}</b
							><b class="card__bottom"></b
							><b class="card__back"><b class="card__bottom" :data-value="padTime(hour)"></b></b></b
						><span class="flip-clock__slot">Hours</span></span
					><span class="flip-clock__piece flip"
						><b class="flip-clock__card card"
							><b class="card__top">{{ padTime(minute) }}</b
							><b class="card__bottom" :data-value="minute > 1 ? padTime(minute - 1) : '00'"></b
							><b class="card__back" :data-value="minute > 1 ? padTime(minute - 1) : '00'"
								><b class="card__bottom" :data-value="padTime(minute)"></b></b></b
						><span class="flip-clock__slot">Minutes</span></span
					>

					<span :class="{ 'flip-clock__piece': true, flip: flip }">
						<b class="flip-clock__card card"
							><b class="card__top">{{ padTime(second) }}</b>
							<b class="card__bottom" :data-value="second > 1 ? padTime(second - 1) : '00'"></b
							><b class="card__back" :data-value="second > 1 ? padTime(second - 1) : '00'"
								><b class="card__bottom" :data-value="padTime(second)"></b></b></b
						><span class="flip-clock__slot">Seconds</span></span
					>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.sub-container {
	min-height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.flip-clock {
	text-align: center;
	perspective: 400px;
	margin: 20px auto;
}
.flip-clock *,
.flip-clock *:before,
.flip-clock *:after {
	box-sizing: border-box;
}
.flip-clock__piece {
	display: inline-block;
	margin: 0 5px;
}
.flip-clock__slot {
	font-size: 16px;
	display: none;
}
.card {
	display: block;
	position: relative;
	padding-bottom: 0.72em;
	font-size: 5vw;
	line-height: 0.95;
}
@media (max-width: 768px) {
	b.card {
		font-size: 12vw;
	}
}
.card__top,
.card__bottom,
.card__back::before,
.card__back::after {
	display: block;
	height: 0.72em;
	color: v-bind(themeColor_C);
	background: v-bind(themeColor_BG);
	padding: 0.25em 0em;
	border-radius: 0.15em 0.15em 0 0;
	backface-visibility: hidden;
	transform-style: preserve-3d;
	min-width: 2em;
	transform: translateZ(0);
}
.card__bottom {
	color: v-bind(themeColor_B_C);
	position: absolute;
	top: 50%;
	left: 0;
	border-top: v-bind(themeColor_Border);
	background: v-bind(themeColor_B_BG);
	border-radius: 0 0 0.15em 0.15em;
	pointer-events: none;
	overflow: hidden;
}
.card__bottom::after {
	display: block;
	margin-top: -0.72em;
}
.card__back::before,
.card__bottom::after {
	content: attr(data-value);
}
.card__back {
	position: absolute;
	top: 0;
	height: 100%;
	left: 0%;
	pointer-events: none;
}
.card__back::before {
	position: relative;
	z-index: -1;
	overflow: hidden;
}
.flip .card__back::before {
	-webkit-animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
	animation: flipTop 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	transform-origin: center bottom;
}
.flip .card__back .card__bottom {
	transform-origin: center top;
	-webkit-animation-fill-mode: both;
	animation-fill-mode: both;
	-webkit-animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
	animation: flipBottom 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);
}
@-webkit-keyframes flipTop {
	0% {
		transform: rotateX(0deg);
		z-index: 2;
	}
	0%,
	99% {
		opacity: 0.99;
	}
	100% {
		transform: rotateX(-90deg);
		opacity: 0;
	}
}
@keyframes flipTop {
	0% {
		transform: rotateX(0deg);
		z-index: 2;
	}
	0%,
	99% {
		opacity: 0.99;
	}
	100% {
		transform: rotateX(-90deg);
		opacity: 0;
	}
}
@-webkit-keyframes flipBottom {
	0%,
	50% {
		z-index: -1;
		transform: rotateX(90deg);
		opacity: 0;
	}
	51% {
		opacity: 0.99;
	}
	100% {
		opacity: 0.99;
		transform: rotateX(0deg);
		z-index: 5;
	}
}
@keyframes flipBottom {
	0%,
	50% {
		z-index: -1;
		transform: rotateX(90deg);
		opacity: 0;
	}
	51% {
		opacity: 0.99;
	}
	100% {
		opacity: 0.99;
		transform: rotateX(0deg);
		z-index: 5;
	}
}
</style>
