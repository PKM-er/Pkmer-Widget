<script lang="ts" setup>
const isLogin = ref(false);

onMounted(() => {
    //从url中的user参数获取用户名
    const url = new URL(window.location.href);
    const user = url.searchParams.get("user");
    const userParam: {
        email?: string;
        uuid?: string;
        phone?: string;
    } = {};
    //如果userParam是邮箱，则存为邮箱，如果是uuid，则存为uuid，如果是手机号，则存为手机号
    if (!user) {
        isLogin.value = false;
        return
    } else if (user.includes("@")) {
        userParam.email = user;
    } else if (user.length == 36) {
        userParam.uuid = user;
    } else if (user.length == 11) {
        userParam.phone = user;
    }

    fetch("https://api.pkmer.cn/api/v1/auth/register/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userParam),
    })
        .then((res) => res.json())
        .then((res) => {
            isLogin.value = res.payload.userExists;
            console.log(isLogin.value);
        });
});
</script>
<template>
    <div v-if="isLogin">
        <NuxtPage />
    </div>
    <div v-else>请到<a href="https://pkmer.cn">pkmer</a>免费注册会员以使用此挂件！</div>
</template>
