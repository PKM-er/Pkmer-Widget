<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
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
const themeColor_B = ref(''); //basic
const themeColor_L = ref(''); //light
const themeColor_D = ref(''); //dark

watchEffect(() => {
	const themeColor = props.widgetConfig['theme-color'];
	themeColor_B.value = themeColor;
	themeColor_L.value = tinycolor(themeColor_B.value).lighten(90).toString();
	themeColor_D.value = tinycolor(themeColor_B.value).darken(15).toString();
});
const currentDate = new Date();

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const week_day = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const monthNames_zh = [
	'一月',
	'二月',
	'三月',
	'四月',
	'五月',
	'六月',
	'七月',
	'八月',
	'九月',
	'十月',
	'十一月',
	'十二月',
];

const currentMonthIndex = computed(() => currentDate.getMonth());
const currentYear = computed(() => currentDate.getFullYear());

const daysInMonth = computed(() =>
	new Date(currentYear.value, currentMonthIndex.value + 1, 0).getDate()
);
const firstDayOfMonthIndex = computed(() =>
	new Date(currentYear.value, currentMonthIndex.value, 1).getDay()
);
const dayOfMonth = currentDate.getDate();
const isToday = (dayOfMonth: number) => {
	const today = new Date();
	return (
		today.getDate() === dayOfMonth &&
		today.getMonth() === currentMonthIndex.value &&
		today.getFullYear() === currentYear.value
	);
};

const weeks = ref([]);
let currentWeek: ({ dayOfMonth: number; isActive: boolean } | null)[] = [];
for (let i = 0; i < firstDayOfMonthIndex.value; i++) {
	currentWeek.push(null);
}
for (let i = 1; i <= daysInMonth.value; i++) {
	currentWeek.push({
		dayOfMonth: i,
		isActive: isToday(i),
	});
	if (currentWeek.length === 7) {
		weeks.value.push(currentWeek as never);
		currentWeek = [];
	}
}
if (currentWeek.length > 0) {
	for (let i = currentWeek.length; i < 7; i++) {
		currentWeek.push(null);
	}
	weeks.value.push(currentWeek as never);
}

const dayOfWeek =
	daysOfWeek[new Date(currentYear.value, currentMonthIndex.value, currentDate.getDate()).getDay()];

const monthName = monthNames_zh[currentMonthIndex.value];
</script>
<template>
	<div class="sub-container">
		<div id="d-day">
			<h3>
				{{ week_day[new Date(currentYear, currentMonthIndex, currentDate.getDate()).getDay()] }}
			</h3>
			<h1>{{ dayOfMonth }}</h1>
		</div>
		<div class="inner">
			<h2 id="month">{{ monthName }}</h2>
			<div class="week-days head">
				<span v-for="day in daysOfWeek" :key="day">{{ day }}</span>
			</div>
			<div id="content">
				<div
					class="week-days"
					v-for="(week, index) in weeks"
					:id="'week-days_' + index"
					:key="'week-' + index"
				>
					<span
						v-for="day in week"
						:key="day?.dayOfMonth"
						:id="'d-' + day?.dayOfMonth"
						:class="{ active: day?.isActive }"
					>
						{{ day ? day.dayOfMonth : '' }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
@media (max-width: 768px) {
	div.sub-container {
		width: 90vw; /* 9.2rem */
	}
	div .week-days span {
		font-size: 1em;
		line-height: 6.32vw;
		width: 6.32vw;
		height: 6.32vw;
	}
	div#d-day {
		width: 30vw; /* 2.666667rem */
	}

	div#d-day h3 {
		font-size: 6.608vw; /* .64rem */
		margin: 1.92vw 0 0 0;
	}

	div#d-day h1 {
		font-size: 13.824vw; /* 1.92rem */
		margin: 2.592vw 0;
	}
}

@media (max-width: 320px) {
	div .week-days span {
		font-size: 0.7em;
	}
}
.sub-container {
	width: 66.24vw; /* 9.2rem */
	margin: 0 auto;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: v-bind(themeColor_B);
	color: v-bind(themeColor_L);
	border-radius: 2.88vw; /* .4rem */
	box-sizing: border-box;
	padding: 2.88vw; /* .4rem */
}

#month {
	font-weight: bold;
	font-size: 4.32vw; /* .6rem */
	text-align: right;
	margin: 0;
}

.week-days {
	width: 100%;
	display: flex;
	align-items: center;
}

.week-days.head {
	font-weight: bold;
	font-size: 3.072vw; /* .426667rem */
	margin-bottom: 8.88px; /* .133333rem */
}
.week-days.head span {
	font-size: 0.8em;
}

.week-days.week {
	margin-bottom: 4.44px; /* .066667rem */
}

.week-days span {
	line-height: 4.32vw; /* .6rem */
	font-size: 1.5em;
	width: 4.32vw; /* .6rem */
	height: 4.32vw; /* .6rem */
	display: inline-block;
	text-align: center;
}

.start,
.active,
.end {
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 27px; /* 50% */
	color: v-bind(themeColor_B);
	font-weight: bold;
}

#d-day {
	width: 144px; /* 2.666667rem */
}

#d-day h3 {
	font-size: 34.56px; /* .64rem */
	margin: 14.4px 0 0 0;
}

#d-day h1 {
	font-size: 103.68px; /* 1.92rem */
	margin: 19.44px 0;
}

html[theme='dark'],
html[theme='dark'] body {
	background-color: #191919;
	color: #ffffff;
}
</style>
