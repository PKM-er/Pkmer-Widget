<script setup lang="ts">
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
import { onBeforeUnmount, onMounted, ref, nextTick, watchEffect } from 'vue';

//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能

// 设置的类型定义
interface Props {
	widgetConfig: {
		[index: string]: any;
	};
}

// 从父组件读取配置
const props = defineProps<Props>();
const isEditing = ref(false);
const inputRef = ref<HTMLElement | null>(null);
const fontColor = ref('');
const displayValue = ref('');
let timerId: any = null;
moment.locale(props.widgetConfig.lang);
const formatDate = ref(moment().format('dddd-MMMM-D-H-mm-ss-a').split('-'));
let secProgress = parseInt(formatDate.value[5]) / 60;
let minProgress = parseInt(formatDate.value[4]) / 60;
let hourProgress = parseInt(formatDate.value[3]) / 24;
let dayProgress = parseInt(formatDate.value[2]) / 31;
watchEffect(() => {
	displayValue.value = props.widgetConfig['font-color'];

	if (fontColor.value) {
		displayValue.value = fontColor.value;
	}
});
onMounted(() => {
	const storedValue = localStorage.getItem('ColorfulClock-fontColor');
	if (storedValue) {
		displayValue.value = storedValue;
	}
	timerId = setInterval(() => {
		formatDate.value = moment().format('dddd-MMMM-D-H-mm-ss-a').split('-');
		secProgress = parseInt(formatDate.value[5]) / 60;
		minProgress = parseInt(formatDate.value[4]) / 60;
		hourProgress = parseInt(formatDate.value[3]) / 24;
		dayProgress = parseInt(formatDate.value[2]) / 31;
	}, 1000);
});

onBeforeUnmount(() => {
	clearInterval(timerId);
});

const handleClick = () => {
	isEditing.value = true;
	nextTick(function () {
		inputRef.value?.focus();
	});
};

const handleBlur = () => {
	localStorage.setItem('ColorfulClock-fontColor', fontColor.value);
	isEditing.value = false;
};
</script>

<template>
	<div
		id="clock"
		class="progress-clock"
		:style="{
			color: displayValue,
		}"
		@click="handleClick"
	>
		<div class="style-bar" v-if="isEditing">
			<h3>样式调整</h3>
			<div class="form-group">
				<label>颜色：</label>
				<div
					class="color-picker"
					:style="{
						backgroundColor: fontColor,
					}"
				>
					<input ref="inputRef" type="color" v-model="fontColor" @blur="handleBlur" />
				</div>
			</div>
		</div>
		<button
			class="progress-clock__time-date"
			data-group="d"
			type="button"
			:style="{
				color: displayValue,
			}"
		>
			<small
				data-unit="w"
				:style="{
					color: displayValue,
				}"
				>{{ formatDate[0] }}</small
			><br />
			<span
				data-unit="mo"
				:style="{
					color: displayValue,
				}"
				>{{ formatDate[1] }}</span
			>
			<span
				data-unit="d"
				:style="{
					color: displayValue,
				}"
				>{{ formatDate[2] }}</span
			>
		</button>
		<button
			class="progress-clock__time-digit"
			data-unit="h"
			data-group="h"
			type="button"
			:style="{
				color: displayValue,
			}"
		>
			{{ formatDate[3] }}</button
		><span
			class="progress-clock__time-colon"
			:style="{
				color: displayValue,
			}"
			>:</span
		><button
			class="progress-clock__time-digit"
			data-unit="m"
			data-group="m"
			type="button"
			:style="{
				color: displayValue,
			}"
		>
			{{ formatDate[4] }}</button
		><span
			class="progress-clock__time-colon"
			:style="{
				color: displayValue,
			}"
			>:</span
		><button
			class="progress-clock__time-digit"
			data-unit="s"
			data-group="s"
			type="button"
			:style="{
				color: displayValue,
			}"
		>
			{{ formatDate[5] }}
		</button>
		<span
			class="progress-clock__time-ampm"
			data-unit="ap"
			:style="{
				color: displayValue,
			}"
			>{{ formatDate[6] }}</span
		>
		<svg class="progress-clock__rings" width="256" height="256" viewBox="0 0 256 256">
			<defs>
				<linearGradient id="pc-red" x1="1" y1="0.5" x2="0" y2="0.5">
					<stop offset="0%" stopColor="hsl(343,90%,55%)" />
					<stop offset="100%" stopColor="hsl(323,90%,55%)" />
				</linearGradient>
				<linearGradient id="pc-yellow" x1="1" y1="0.5" x2="0" y2="0.5">
					<stop offset="0%" stopColor="hsl(43,90%,55%)" />
					<stop offset="100%" stopColor="hsl(23,90%,55%)" />
				</linearGradient>
				<linearGradient id="pc-blue" x1="1" y1="0.5" x2="0" y2="0.5">
					<stop offset="0%" stopColor="hsl(223,90%,55%)" />
					<stop offset="100%" stopColor="hsl(203,90%,55%)" />
				</linearGradient>
				<linearGradient id="pc-purple" x1="1" y1="0.5" x2="0" y2="0.5">
					<stop offset="0%" stopColor="hsl(283,90%,55%)" />
					<stop offset="100%" stopColor="hsl(263,90%,55%)" />
				</linearGradient>
			</defs>
			<g data-units="d">
				<circle
					class="progress-clock__ring"
					cx="128"
					cy="128"
					r="74"
					fill="none"
					opacity="0.1"
					:stroke="props.widgetConfig['ring-color-1']"
					stroke-width="12"
				/>
				<circle
					class="progress-clock__ring-fill"
					data-ring="mo"
					cx="128"
					cy="128"
					r="74"
					fill="none"
					:stroke="props.widgetConfig['ring-color-1']"
					stroke-width="12"
					stroke-dasharray="465 465"
					:stroke-dashoffset="(1 - dayProgress) * 465"
					strokeLinecap="round"
					transform="rotate(-90,128,128)"
				/>
			</g>
			<g data-units="h">
				<circle
					class="progress-clock__ring"
					cx="128"
					cy="128"
					r="90"
					fill="none"
					opacity="0.1"
					:stroke="props.widgetConfig['ring-color-2']"
					stroke-width="12"
				/>
				<circle
					class="progress-clock__ring-fill"
					data-ring="d"
					cx="128"
					cy="128"
					r="90"
					fill="none"
					:stroke="props.widgetConfig['ring-color-2']"
					stroke-width="12"
					stroke-dasharray="565.5 565.5"
					:stroke-dashoffset="(1 - hourProgress) * 565.5"
					strokeLinecap="round"
					transform="rotate(-90,128,128)"
				/>
			</g>
			<g data-units="m">
				<circle
					class="progress-clock__ring"
					cx="128"
					cy="128"
					r="106"
					fill="none"
					opacity="0.1"
					:stroke="props.widgetConfig['ring-color-3']"
					stroke-width="12"
				/>
				<circle
					class="progress-clock__ring-fill"
					data-ring="h"
					cx="128"
					cy="128"
					r="106"
					fill="none"
					:stroke="props.widgetConfig['ring-color-3']"
					stroke-width="12"
					stroke-dasharray="666 666"
					:stroke-dashoffset="(1 - minProgress) * 666"
					strokeLinecap="round"
					transform="rotate(-90,128,128)"
				/>
			</g>
			<g data-units="s">
				<circle
					class="progress-clock__ring"
					cx="128"
					cy="128"
					r="122"
					fill="none"
					opacity="0.1"
					:stroke="props.widgetConfig['ring-color-4']"
					stroke-width="12"
				/>
				<circle
					class="progress-clock__ring-fill"
					data-ring="m"
					cx="128"
					cy="128"
					r="122"
					fill="none"
					:stroke="props.widgetConfig['ring-color-4']"
					stroke-width="12"
					stroke-dasharray="766.5 766.5"
					:stroke-dashoffset="(1 - secProgress) * 766.5"
					strokeLinecap="round"
					transform="rotate(-90,128,128)"
				/>
			</g>
		</svg>
	</div>
</template>
<style scoped>
.style-bar {
	position: absolute;
	top: 0;
	left: 1.333vw;
	background-color: #c8c8c800;
	backdrop-filter: blur(10px);
	padding: 2.667vw;
	border-radius: 0.667vw;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.style-bar h3 {
	margin-bottom: 1.333vw;
}
.style-bar button {
	padding: 1.6vw;
	font-size: 16px;
}
.form-group {
	display: flex;
	align-items: center;
	margin-bottom: 1.333vw;
}
label {
	margin-right: 1.333vw;
	color: #808080;
}
input[type='color']::-webkit-color-swatch-wrapper {
	padding: 0;
}
input[type='color']::-moz-color-swatch {
	height: 0;
	width: 0;
	visibility: hidden;
}
input[type='color']::-webkit-color-swatch {
	height: 100%;
	border: none;
}

/* 自定义颜色选择器的外观 */
.color-picker {
	position: relative;
	display: inline-block;
	width: 3vw;
	height: 3vw;
	border-radius: 50%;
	background-color: #fff;
	border: 1px solid #ccc;
	cursor: pointer;
}
.color-picker input[type='color'] {
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
}
@media (max-width: 420px) {
	div.progress-clock {
		font-size: 6.5vw;
		height: 95vh;
	}
}
.progress-clock {
	display: grid;
	justify-content: center;
	align-content: center;
	position: relative;
	text-align: center;
	height: 60vh;
	min-width: 60vw;
	font-size: 2.2vw;
}

.progress-clock button {
	padding: 0;
	border: none;
}
.progress-clock button:hover {
	background-color: transparent;
}
.progress-clock__time-date,
.progress-clock__time-digit,
.progress-clock__time-colon,
.progress-clock__time-ampm {
	font: 1em/1.5 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
	transition: color 0.2s linear;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}
.progress-clock__time-date,
.progress-clock__time-digit {
	background: transparent;
}
.progress-clock__time-date,
.progress-clock__time-ampm {
	grid-column: 1 / 6;
}
.progress-clock__time-date {
	font-size: 0.75em;
	line-height: 1.33;
}
.progress-clock__time-digit,
.progress-clock__time-colon {
	font-weight: 400;
	grid-row: 2;
	margin: 0;
}
.progress-clock__time-colon {
	line-height: 1.275;
}

.is-mobile .progress-clock__time-colon {
	line-height: 2.5em;
	font-size: 2.133vw;
}

.progress-clock__time-ampm {
	cursor: default;
	grid-row: 3;
}
.progress-clock__rings {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 0.6;
}
.progress-clock__ring {
	opacity: 0.1;
}
.progress-clock__ring-fill {
	transition: opacity 0s 0.3s linear, stroke-dashoffset 0.3s ease-in-out;
}
.progress-clock__ring-fill--360 {
	opacity: 0;
	stroke-dashoffset: 0;
	transition-duration: 0.3s;
}
[data-group]:focus {
	outline: transparent;
}
[data-units] {
	transition: opacity 0.2s linear;
}
[data-group='d']:focus,
[data-group='d']:hover {
	color: hsl(333, 90%, 55%);
}
[data-group='h']:focus,
[data-group='h']:hover {
	color: hsl(33, 90%, 55%);
}
[data-group='m']:focus,
[data-group='m']:hover {
	color: hsl(213, 90%, 55%);
}
[data-group='s']:focus,
[data-group='s']:hover {
	color: hsl(273, 90%, 55%);
}
[data-group]:focus ~ .progress-clock__rings [data-units],
[data-group]:hover ~ .progress-clock__rings [data-units] {
	opacity: 0.2;
}
[data-group='d']:focus ~ .progress-clock__rings [data-units='d'],
[data-group='d']:hover ~ .progress-clock__rings [data-units='d'],
[data-group='h']:focus ~ .progress-clock__rings [data-units='h'],
[data-group='h']:hover ~ .progress-clock__rings [data-units='h'],
[data-group='m']:focus ~ .progress-clock__rings [data-units='m'],
[data-group='m']:hover ~ .progress-clock__rings [data-units='m'],
[data-group='s']:focus ~ .progress-clock__rings [data-units='s'],
[data-group='s']:hover ~ .progress-clock__rings [data-units='s'] {
	opacity: 1;
}
</style>
