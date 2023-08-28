<script setup lang="ts">
import tinycolor from 'tinycolor2';
import { onMounted, ref, watchEffect, watch, onBeforeUnmount, nextTick } from 'vue';
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
	widgetConfig: {
		[index: string]: any;
	};
}
// 从父组件读取配置
const props = defineProps<Props>();
const week_ZN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const start_p = ref(props.widgetConfig?.['date-picker']);

const days = ref(0);
const minute = ref(0);
const second = ref(0);

const hours = ref(0);
const nowhours = ref(0);
const nowminute = ref(0);
const nowsecond = ref(0);

const _now = ref(new Date());
const dateString = ref('');
const weekdayString = ref('');
const displayValue = ref('');
const textValue = ref('');
const isEditing = ref(false);
const inputRef = ref<HTMLElement | null>(null);
const inputDateRef = ref<HTMLElement | null>(null);
const selectedDate = ref('');
const showPicker = ref(false);
const themeColor_B = ref(''); //basic
const themeColor_L = ref(''); //light
const themeColor_D = ref(''); //dark
//input默认值
const defaultdate = new Date(props.widgetConfig?.['date-picker'])
	.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	})
	.replace('/', '-')
	.replace('/', '-');

const handleClickDate = () => {
	showPicker.value = true;
	nextTick(function () {
		inputDateRef.value?.focus();
	});
};
const handleClick = () => {
	isEditing.value = true;
	nextTick(function () {
		inputRef.value?.focus();
	});
};

const handleBlur = () => {
	localStorage.setItem('CartoonCountdown-textValue', textValue.value);
	isEditing.value = false;
};
const handleBlurDate = () => {
	localStorage.setItem('CartoonCountdown-selectedDate', selectedDate.value);
	showPicker.value = false;
};
watch(start_p, (newValue, oldValue) => {
	selectedDate.value = new Date(newValue as Date)
		.toLocaleDateString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		})
		.replace('/', '-')
		.replace('/', '-');
});
watchEffect(() => {
	const themeColor = props.widgetConfig['theme-color'];
	themeColor_B.value = themeColor;

	themeColor_L.value = themeColor;
	themeColor_D.value = tinycolor(themeColor_B.value).darken(50).toString();
	if (props.widgetConfig['select-theme'] == 'Pinktheme') {
		themeColor_D.value = tinycolor(themeColor_B.value)
			.darken(50)
			.brighten(20)
			.setAlpha(0.5)
			.toString();
		themeColor_L.value = tinycolor(themeColor_B.value).lighten(20).toString();
	}
	displayValue.value = props.widgetConfig['input-text'];

	if (textValue.value) {
		displayValue.value = textValue.value;
	}

	start_p.value = props.widgetConfig?.['date-picker'];

	// 设置时间

	let myDate;
	if (selectedDate.value && selectedDate.value != defaultdate) {
		myDate = new Date(selectedDate.value);
	} else {
		myDate = new Date(start_p.value);
		selectedDate.value = defaultdate;
	}

	let times = myDate.getTime() - _now.value.getTime();
	days.value = Math.floor(times / 1000 / 60 / 60 / 24);

	times = Math.abs(times % (1000 * 24 * 60 * 60));
	hours.value = Math.floor(times / 1000 / 60 / 60);
	times = times % (1000 * 60 * 60);
	minute.value = Math.floor(times / 1000 / 60);
	times = times % (1000 * 60);
	second.value = Math.floor(times / 1000);

	const dayOfWeek = _now.value.getDay();
	weekdayString.value = week_ZN[dayOfWeek];
	dateString.value = _now.value.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	nowhours.value = _now.value.getHours();
	nowminute.value = _now.value.getMinutes();
	nowsecond.value = _now.value.getSeconds();
});
let timerId: any = null;
// 前置补零函数
function padTime(val: { toString: () => string }) {
	return val.toString().padStart(2, '0');
}
onMounted(() => {
	const storedValue = localStorage.getItem('CartoonCountdown-textValue');
	if (storedValue) {
		textValue.value = storedValue;
	}

	const storedSelectedDate = localStorage.getItem('CartoonCountdown-selectedDate');
	if (storedSelectedDate) {
		selectedDate.value = storedSelectedDate;
	}

	timerId = setInterval(() => {
		_now.value = new Date();
	}, 1000);
});

onBeforeUnmount(() => {
	clearInterval(timerId);
});
</script>
<template>
	<div class="sub-container">
		<div class="matter">
			<p id="text">
				<input ref="inputRef" v-if="isEditing" v-model="textValue" @blur="handleBlur" />

				<span v-if="!isEditing" @click="handleClick"> {{ displayValue }}</span>
			</p>
			<h2 id="days">{{ days }}天</h2>
			<p id="other" v-if="!showPicker" @click="handleClickDate">
				{{ padTime(hours) }}小时{{ padTime(minute) }}分{{ padTime(second) }}秒
			</p>
			<input
				ref="inputDateRef"
				type="date"
				v-if="showPicker"
				id="date-input"
				@blur="handleBlurDate"
				v-model="selectedDate"
			/>
			<svg
				v-if="props.widgetConfig['select-theme'] == 'Pinktheme'"
				id="co-2"
				style="transform: rotate(45deg); left: -5px; bottom: -15px"
				version="1.0"
				xmlns="http://www.w3.org/2000/svg"
				width="50.000000pt"
				height="50.000000pt"
				viewBox="0 0 50.000000 50.000000"
				preserveAspectRatio="xMidYMid meet"
			>
				<g
					transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
					fill="#000000"
					stroke="none"
				>
					<path
						d="M217 423 c-13 -21 -41 -68 -63 -105 -21 -38 -42 -68 -47 -68 -14 0
-50 21 -74 43 -13 11 -26 18 -29 14 -9 -9 51 -67 70 -67 26 0 27 -17 1 -61
-33 -58 -22 -69 68 -69 l70 0 -6 -35 c-4 -26 -2 -35 9 -35 9 0 14 11 14 35 0
31 3 35 25 35 22 0 25 -4 25 -35 0 -24 5 -35 14 -35 11 0 13 9 9 35 l-6 35 65
0 c85 0 95 12 63 69 -26 44 -25 61 1 61 19 0 79 58 70 67 -3 4 -16 -3 -29 -14
-24 -22 -60 -43 -74 -43 -5 0 -29 35 -53 78 -54 96 -79 132 -91 132 -5 0 -19
-17 -32 -37z m115 -145 l75 -133 -78 -3 c-44 -2 -115 -2 -158 0 l-79 3 77 132
c42 73 78 133 81 133 3 0 40 -60 82 -132z"
					/>
					<path
						d="M197 273 c-4 -3 -7 -12 -7 -20 0 -15 26 -18 34 -4 7 11 -18 33 -27
24z"
					/>
					<path d="M281 266 c-12 -14 -5 -26 16 -26 15 0 18 26 4 34 -5 3 -14 0 -20 -8z" />
					<path d="M214 219 c-3 -5 1 -12 10 -15 20 -8 61 -1 61 10 0 12 -64 16 -71 5z" />
				</g>
			</svg>
			<img
				v-else
				src="data:image/png;base64,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"
				id="co-2"
			/>
		</div>
		<div class="time">
			<div id="cur-time">
				<span class="hour">{{ padTime(nowhours) }}</span>
				<span class="colon">:</span>
				<span class="minute">{{ padTime(nowminute) }}</span>
			</div>
			<p id="date">{{ dateString }} {{ weekdayString }}</p>
		</div>
		<svg
			v-if="props.widgetConfig['select-theme'] == 'Pinktheme'"
			style="right: 0px; bottom: -15px"
			id="co"
			version="1.0"
			xmlns="http://www.w3.org/2000/svg"
			width="50.000000pt"
			height="50.000000pt"
			viewBox="0 0 50.000000 50.000000"
			preserveAspectRatio="xMidYMid meet"
		>
			<g
				transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
				fill="#000000"
				stroke="none"
			>
				<path
					d="M217 423 c-13 -21 -41 -68 -63 -105 -21 -38 -42 -68 -47 -68 -14 0
-50 21 -74 43 -13 11 -26 18 -29 14 -9 -9 51 -67 70 -67 26 0 27 -17 1 -61
-33 -58 -22 -69 68 -69 l70 0 -6 -35 c-4 -26 -2 -35 9 -35 9 0 14 11 14 35 0
31 3 35 25 35 22 0 25 -4 25 -35 0 -24 5 -35 14 -35 11 0 13 9 9 35 l-6 35 65
0 c85 0 95 12 63 69 -26 44 -25 61 1 61 19 0 79 58 70 67 -3 4 -16 -3 -29 -14
-24 -22 -60 -43 -74 -43 -5 0 -29 35 -53 78 -54 96 -79 132 -91 132 -5 0 -19
-17 -32 -37z m115 -145 l75 -133 -78 -3 c-44 -2 -115 -2 -158 0 l-79 3 77 132
c42 73 78 133 81 133 3 0 40 -60 82 -132z"
				/>
				<path
					d="M197 273 c-4 -3 -7 -12 -7 -20 0 -15 26 -18 34 -4 7 11 -18 33 -27
24z"
				/>
				<path d="M281 266 c-12 -14 -5 -26 16 -26 15 0 18 26 4 34 -5 3 -14 0 -20 -8z" />
				<path d="M214 219 c-3 -5 1 -12 10 -15 20 -8 61 -1 61 10 0 12 -64 16 -71 5z" />
			</g>
		</svg>
		<img
			v-else
			src="data:image/png;base64,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"
			id="co"
		/>
	</div>
</template>
<style scoped>
input {
	width: 70%;
	padding: 6px 10px;
	margin: 8.002px 0;
	border: none;
	border-radius: 8.002px;
	font-size: 14px;
	background: transparent;
	color: v-bind(themeColor_B);
}
.sub-container,
.sub-container h2,
.sub-container p {
	margin: 0;
}
.sub-container {
	width: 200px;
	border-radius: 20px;
	background-color: v-bind(themeColor_B);
	padding: 10px;
	position: relative;
	/* overflow: hidden; */
	margin: 10px auto;
}
.matter {
	text-align: center;
	width: 100%;
	background-color: v-bind(themeColor_D);
	color: v-bind(themeColor_L);
	border-radius: 20px;
	padding: 10px 0;
	position: relative;
}
#days {
	font-size: 30px;
}
.time {
	padding: 10px 20px;
	color: v-bind(themeColor_D);
	text-align: center;
}

.colon {
	margin-top: -0.1em;
}
.sub-container img,
.sub-container svg {
	display: block;
	width: 40px;
	position: absolute;
}
#co {
	/* transform: rotate(60deg); */
	right: -4px;
	bottom: -6px;
}
#co-1 {
	transform: rotate(30deg);
	/* right: 50px; */
	/* left: unset; */
	bottom: 22px;
}
#co-2 {
	/* transform: rotate(45deg); */
	/* right: 10px; */
	/* left: unset; */
	bottom: -8px;
}
#co-3 {
	transform: rotate(0);
	right: 10px;
	left: unset;
	bottom: 0px;
}
#co-4 {
	transform: rotate(0);
	right: 40px;
	left: unset;
	bottom: -8px;
}
#co-5 {
	transform: rotate(-30deg);
	right: -10px;
	left: unset;
	bottom: 0px;
}
#cur-time {
	font-size: 40px;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
