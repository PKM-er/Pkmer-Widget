<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-03-13 18:10:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-05-10 11:07:24
 * @Description: 
-->
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue';
import tinycolor from 'tinycolor2';
//这个文件是实际生成iframe用到的文件，读取配置信息，完整的功能
// 设置的类型定义
interface Props {
	widgetConfig: {
		[index: string]: any;
	};
}
// 从父组件读取配置
interface ListItem {
	id: number;
	uuid: string;
	hitokoto: string;
	type: string;
	from: string;
	from_who: string;
	creator: string;
	creator_uid: number;
	reviewer: number;
	commit_from: string;
	created_at: string;
	length: number;
}

const quote = ref<ListItem[]>([]);
const props = defineProps<Props>();
const currentDate = ref('');
const picUrl = ref(''); //basic
const themeColor_B = ref(''); //basic
const themeColor_L = ref(''); //light
const themeColor_D = ref(''); //dark
const fontColor = ref('#fff'); //dark
let themeColor_DD: string;
let themeColor_LL: string;
watchEffect(() => {
	const themeColor = props.widgetConfig['theme-color'];
	themeColor_B.value = themeColor;
	themeColor_L.value = tinycolor(themeColor_B.value).lighten(5).setAlpha(0.9).toString();
	themeColor_LL = tinycolor(themeColor_B.value).lighten(15).toString();
	themeColor_DD = tinycolor(themeColor_B.value).darken(5).toString();
	themeColor_D.value = tinycolor(themeColor_B.value).greyscale().setAlpha(0.3).toString();
	tinycolor(themeColor_D.value).isLight()
		? (fontColor.value = '#333')
		: (fontColor.value = '#FFFF');
	if (props.widgetConfig['select-background'] == 'Color') props.widgetConfig['input-url'] = '';
	if (!props.widgetConfig['input-url']) {
		if (props.widgetConfig['select-background'] == 'Picture')
			picUrl.value = 'https://cdn.pkmer.cn/images/202305061728633.jpg!pkmer';
		if (props.widgetConfig['select-background'] == 'Random')
			picUrl.value = 'https://api.dujin.org/bing/m.php';
	} else picUrl.value = props.widgetConfig['input-url'];
	if (props.widgetConfig['select-background'] != 'Color') fontColor.value = '#eeee';
});
onMounted(() => {
	fetch('https://v1.hitokoto.cn/?encode=json')
		.then((response) => response.json())
		.then((data) => {
			quote.value = data;
		})
		.catch(console.error);
	let now = new Date();
	currentDate.value = `${now.getMonth() + 1}/${now.getDate()}`;
});
</script>
<template>
	<div
		class="sub-container"
		:style="{
			margin: 'auto',
			background: props.widgetConfig['layout-style'] == 'Note' ? themeColor_DD : '',
			width: props.widgetConfig['layout-style'] == 'Note' ? '220px' : '',
		}"
	>
		<div
			class="sticky"
			v-if="
				props.widgetConfig['layout-style'] == 'Default' &&
				props.widgetConfig['select-background'] == 'Color'
			"
		>
			<h1>{{ quote.from_who ?? quote.from }}</h1>
			<p>{{ quote.hitokoto }}</p>
			<span id="date">{{ currentDate }}</span>
		</div>
		<div
			class="notepaper"
			v-if="props.widgetConfig['layout-style'] == 'Note'"
			:style="{
				background:
					props.widgetConfig['select-background'] != 'Color'
						? `url('${picUrl}') no-repeat`
						: ` -webkit-radial-gradient(center, cover, ${tinycolor(themeColor_B)
								.brighten(35)
								.setAlpha(0.7)
								.toString()} 0%, rgba(255, 255, 255, 0.1) 90%), -webkit-repeating-linear-gradient(top, transparent 0%, transparent 29px, ${tinycolor(
								themeColor_L
						  ).setAlpha(0.7)} 29px, ${tinycolor(themeColor_L).setAlpha(0.7)} 30px)`,
				backgroundSize: 'cover',
			}"
		>
			<figure class="quote">
				<blockquote class="curly-quotes">
					{{ quote.hitokoto }}
				</blockquote>
				<figcaption class="quote-by">—{{ quote.from_who ?? quote.from }}</figcaption>
			</figure>
		</div>
		<div
			v-if="
				props.widgetConfig['layout-style'] == 'Default' &&
				props.widgetConfig['select-background'] != 'Color'
			"
			class="box"
			:style="{
				background: `url('${picUrl}') no-repeat`,
				backgroundSize: 'cover',
			}"
		>
			<p id="hitokoto">{{ quote.hitokoto }}</p>
			<span id="date">{{ currentDate }}</span>
		</div>
	</div>
</template>

<style scoped>
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */

@media (max-width: 320px) {
	div.notepaper {
		margin: 8px auto;
	}
}
.box {
	margin: 0 auto;
	font-family: webfont_eo6ITiUZazbN_400, '仓耳渔阳体 W02';

	background-size: 100% 100%;
	color: v-bind(fontColor);
	border-radius: 10px;
	width: 200px;
	height: 260px;
	box-sizing: border-box;
	padding: 20px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	position: relative;
	z-index: -1;
}

.box::before {
	content: '';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.2);
	z-index: -1; /* 将蒙版放置到背景图片下面 */
	border-radius: 10px;
}

#hitokoto {
	line-height: 1.5;
}
#date {
	position: absolute;
	font-size: 14px;
	bottom: 20px;
	right: 20px;
}

.notepaper {
	position: relative;
	margin: 30px auto;
	padding: 29px 16px 20px 45px;
	width: 220px;
	line-height: 30px;
	color: v-bind(fontColor);

	border: 1px solid;
	border-color: v-bind(themeColor_D);
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-box-shadow: inset 0 1px v-bind(themeColor_D),
		inset 0 0 5px v-bind(themeColor_B) 0 0 1px rgba(0, 0, 0, 0.1), 0 2px rgba(0, 0, 0, 0.02);
	box-shadow: inset 0 1px v-bind(themeColor_D), inset 0 0 5px v-bind(themeColor_B),
		0 0 1px rgba(0, 0, 0, 0.1), 0 2px rgba(0, 0, 0, 0.02);
}

.notepaper:before,
.notepaper:after {
	content: '';
	position: absolute;
	top: 0;
	bottom: 0;
}

.notepaper:before {
	left: 28px;
	width: 1px;
	border: solid;
	border-color: v-bind(themeColor_D);
	border-width: 0 1px;
}

.notepaper:after {
	z-index: -1;
	left: 0;
	right: 0;
	background: v-bind(themeColor_L);
	border: 1px solid v-bind(themeColor_D);
	-webkit-transform: rotate(2deg);
	-moz-transform: rotate(2deg);
	-ms-transform: rotate(2deg);
	-o-transform: rotate(2deg);
	transform: rotate(2deg);
}

.quote {
	font-family: '仓耳渔阳体 W02';
	font-size: 14px;
}

.curly-quotes:before,
.curly-quotes:after {
	display: inline-block;
	vertical-align: top;
	height: 30px;
	line-height: 48px;
	font-size: 50px;
	opacity: 0.2;
}

.curly-quotes:before {
	font-family: Georgia, serif;
	content: '\201C';
	margin-right: 4px;
	margin-left: -8px;
}

.curly-quotes:after {
	font-family: Georgia, serif;
	content: '\201D';

	margin-right: -8px;
}

.quote-by {
	display: block;
	padding-right: 10px;
	text-align: right;
	font-size: 13px;
	font-style: italic;
}

.lt-ie8 .notepaper {
	padding: 15px 25px;
}

.sticky {
	color: v-bind(fontColor);
	text-align: center;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	flex-wrap: wrap;
	background: linear-gradient(v-bind(themeColor_B), v-bind(themeColor_LL));
	padding: 5px 20px 10px 20px;
	width: 200px;
	height: 260px;
	margin: 30px auto;
	box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
	border-radius: 10px;
	position: relative;
	font: 13px '仓耳渔阳体 W02', 'Lucida Grande', Serif;
}
.sticky h1 {
	flex: none;
	font-size: 2em;
	margin: 0.67em 0;
}
.sticky p {
	margin-top: -3.5em;
	font-size: 18px;
	line-height: 1.5;
}

.sticky h1 {
	font-family: 'Permanent Marker', cursive;
}

.sticky:before,
.sticky:after {
	content: '';
	z-index: -1;
	position: absolute;
	left: 20px;
	bottom: 10px;
	width: 70%;
	max-width: 300px;
	max-height: 100px;
	height: 55%;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	transform: skew(-15deg) rotate(-6deg);
}

.sticky:after {
	left: auto;
	right: 20px;
	transform: skew(15deg) rotate(6deg);
}
</style>
