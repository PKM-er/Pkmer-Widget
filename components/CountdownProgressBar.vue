<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-05 15:02:39
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-03 15:10:10
 * @FilePath: \pkmer-docs\src\components\Widget\CountdownProgressBar\CountdownProgressBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue';
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
	widgetConfig?: {
		[index: string]: any;
	};
}

// 从父组件读取配置
const props = defineProps<Props>();

const start_p = ref(0);
const end_p = ref(0);
const themeColor_B = ref(''); //basic
const themeColor_L = ref(''); //light
const themeColor_D = ref(''); //dark
const percent = ref(0);
const days = ref(0);
const hours = ref(0);
const before_or_after_class = ref('');
const _now = ref(new Date());
watchEffect(() => {
	if (!props.widgetConfig?.['date-range-picker']) {
		return;
	}

	const dateRange = props.widgetConfig?.['date-range-picker'];

	let result;
	if (Array.isArray(dateRange)) {
		result = dateRange;
	} else if (typeof dateRange === 'string') {
		result = dateRange.split(',');
	} else {
		result = null; // 或者其他处理方式
	}
	const start = result[0];
	const end = result[1];

	const themeColor = props.widgetConfig['theme-color'];
	themeColor_B.value = themeColor;

	themeColor_L.value = tinycolor(themeColor_B.value).lighten(20).toString();
	themeColor_D.value = tinycolor(themeColor_B.value).darken(15).toString();
	start_p.value = Number(start);
	end_p.value = Number(end);

	const now_year = new Date().getFullYear();

	function startTime(time: number) {
		const nowTimeDate = new Date(time);
		return nowTimeDate.setHours(0, 0, 0, 0);
	}
	function endTime(time: number) {
		const nowTimeDate = new Date(time);

		return nowTimeDate.setHours(23, 59, 59, 999);
	}
	let _start = startTime(start_p.value);
	let startyear = new Date(`${now_year}/1/1 00: 00`).getTime();

	if (_now.value.getTime() - _start < 86400000) {
		if (_now.value.getTime() - _start > 0) _start = startyear;
	}
	let _end = endTime(end_p.value);
	let endyear = new Date(`${now_year}/12/31 23: 59`).getTime();
	if (endyear - _end < 86400000) {
		if (endyear - _end > 0) _end = endyear;
	}

	if (_now.value.getTime() < _start) {
		percent.value = 0;
	} else if (_now.value.getTime() >= _end) {
		percent.value = 1;
	} else {
		let passed = _now.value.getTime() - _start;
		let total = _end - _start;
		percent.value = Number(((passed / total) * 100).toFixed(3)) * 0.01;

		let remain = total - passed;

		hours.value = Number(((remain / (60 * 60 * 1000)) % 24).toFixed(0));
		days.value = Number((remain / (24 * 60 * 60 * 1000)).toFixed(0));
	}
	before_or_after_class.value = percent.value > 0.9 ? 'inner before' : 'inner after';
});
let timerId = null;
onMounted(() => {
	timerId = setInterval(() => {
		_now.value = new Date();
	}, 3600000);
});

onBeforeUnmount(() => {
	clearInterval(timerId);
});
</script>
<template>
	<div class="sub-container">
		<div class="label" v-if="percent === 1">{{ props.widgetConfig['input-text'] }}结束啦～</div>
		<div class="label" v-else-if="percent === 0">
			{{ props.widgetConfig['input-text'] }}还没开始～
		</div>
		<div class="label" v-else>
			距离{{ props.widgetConfig['input-text'] }}结束还有
			<span
				:style="{
					color: themeColor_L,
				}"
				>{{ days }}</span
			>天
			<span
				:style="{
					color: themeColor_L,
				}"
				>{{ hours }}</span
			>小时
		</div>
		<div
			class="bar"
			:style="{
				borderColor: props.widgetConfig['theme-color'],
			}"
		>
			<div
				:class="before_or_after_class"
				:data-percent="(percent * 100).toFixed(1) + '%'"
				:style="{
					width: (percent * 100).toFixed(1) + '%',
					backgroundImage: `linear-gradient(to right, ${themeColor_D} 0%, ${themeColor_B} 100%)`,
				}"
			></div>
		</div>
	</div>
</template>
<style scoped>
.sub-container {
	padding: 15px;
	margin: 0 auto;
}
.bar {
	width: 100%;
	height: 3vw;
	min-height: 14px;
	background-color: transparent;
	border: 2px solid #333;
	border-radius: 100px;
	padding: 0.4vw;
}
.inner {
	width: 0;
	height: 100%;
	background-color: #333;
	border-radius: 3vw;
	/* border: 2px solid #333; */
	position: relative;
	color: #747474;
}
.inner::after,
.inner::before {
	content: attr(data-percent);
	font-size: 12px;
	/* line-height: 100%; */
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
}
.inner.after::before,
.inner.before::after {
	display: none;
}
.inner.after::after {
	right: -40px;
}
.inner.before::before {
	right: 40px;
	color: #fff;
}
.label {
	font-size: 18px;
	margin-bottom: 2.667vw;
	color: #747474;
}
.label span {
	font-size: 30px;
	color: #999;
	display: inline-block;
	padding: 0 10px;
}
</style>
