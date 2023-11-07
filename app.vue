<!--
 * @Author: cumany cuman@qq.com
 * @Date: 2023-09-04 16:18:06
 * @LastEditors: cumany cuman@qq.com
 * @LastEditTime: 2023-11-03 23:00:59
 * @Description: 
-->
<script lang="ts" setup>
const isLogin = ref<null | boolean>(null);
const isPro = ref(false); //是否越权访问
const isExpir = ref(false); //是否过期
const userInfo = ref();
const vertifyWidgetUser = async (userParam: any) => {
    try {
        const response = await fetch(
            "https://check.api.pkmer.cn/v1/vertifyWidgetUser/" + userParam,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.log(error);
        // 处理错误情况
    }
};

onMounted(async () => {
    //从url中的user参数获取用户名
    const url = new URL(window.location.href);
    // 获取当前日期
    const currentDate = new Date();

    const user = url.searchParams.get("user");
    // await getLogin(userParam);
    if (!user) {
        isLogin.value = false;
    }
    userInfo.value = await vertifyWidgetUser(user);

    if (userInfo.value) {
        if (userInfo.value.expirationDate) {
            // 获取会员过期日期
            const expirationDate = new Date(userInfo.value.expirationDate);
            // 比较当前日期和会员过期日期
            if (currentDate > expirationDate) {
                // 会员未过期
                isExpir.value = true;
            }
        }

        if (["user", "insider"].includes(userInfo.value.type)) {
            isLogin.value = true;
        }
        if (
            url.pathname.includes("/pro/") &&
            userInfo.value.type != "insider"
        ) {
            isPro.value = true;
        }
    } else {
        isLogin.value = false;
    }
});
</script>

<template>
    <div v-if="isLogin !== null">
        <template v-if="isLogin && !isPro && !isExpir">
            <NuxtPage />
        </template>

        <div v-else-if="isLogin && isPro">
            <!-- 越权访问提示 -->
            <div>
                此挂件为收费挂件，请到<a href="https://pkmer.cn">pkmer</a
                >升级会员级别。
            </div>
        </div>
        <div v-else-if="isLogin && isExpir">
            <!-- 到期提示 -->
            <div>
                会员权益已到期，请到<a href="https://pkmer.cn">pkmer</a
                >进行延期。
            </div>
        </div>
        <div v-else>
            <!-- 未登录提示 -->
            <div>
                请到<a href="https://pkmer.cn">pkmer</a
                >免费注册会员以使用此挂件！
            </div>
        </div>
    </div>
</template>
<style>
body {
    margin: 0;
}
</style>
