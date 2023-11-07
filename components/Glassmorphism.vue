<script setup lang="ts">
import { ref } from "vue";
import { NInput } from "naive-ui";

const headerText = ref("");
const text = ref("");
const isHeaderEditing = ref(false);
const isTextEditing = ref(false);

const handleInputHeader = (e: any) => {
    isHeaderEditing.value = true;
};

const handleInputText = (e: any) => {
    isTextEditing.value = true;
};

const handleBlur = (e: any) => {
    isHeaderEditing.value = false;
    isTextEditing.value = false;
    saveToLocal();
};

const handleEnterKey = (e: any) => {
    if (e.key === "Enter") {
        isHeaderEditing.value = false;
        isTextEditing.value = false;
        saveToLocal();
    }
};

const saveToLocal = () => {
    const content = {
        headerText: headerText.value,
        text: text.value,
    };
    localStorage.setItem("Glassmorphism", JSON.stringify(content));
};

const getFromLocal = () => {
    const defaultContent = {
        headerText: "满江红",
        text: "怒发冲冠，凭阑处、潇潇雨歇。抬望眼、仰天长啸，壮怀激烈。三十功名尘与土，八千里路云和月。莫等闲，白了少年头，空悲切。\n靖康耻，犹未雪；臣子恨，何时灭。驾长车，踏破贺兰山缺。壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头、收拾旧山河，朝天阙。",
    };
    const content = JSON.parse(
        localStorage.getItem("Glassmorphism") || JSON.stringify(defaultContent)
    );
    headerText.value = content.headerText;
    text.value = content.text;
};

onMounted(() => {
    getFromLocal();
});
</script>

<template>
    <div class="bg">
        <section class="panel">
            <h2 v-if="!isHeaderEditing" @dblclick="handleInputHeader">
                {{ headerText }}
            </h2>
            <n-input
                v-else
                v-model:value="headerText"
                @blur="handleBlur"
                @keyup="handleEnterKey"
                type="text"
                placeholder="输入标题"
            />
            <div class="card__text">
                <p v-if="!isTextEditing" @dblclick="handleInputText">
                    {{ text }}
                </p>
                <n-input
                    v-else
                    v-model:value="text"
                    @blur="handleBlur"
                    type="textarea"
                    placeholder="输入内容"
                />
            </div>
        </section>
    </div>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap");

body {
    font-family: "Space Grotesk", Helvetica, Arial, sans-serif;
    color: rgba(9, 19, 60, 1);
}

.bg {
    background-image: url(https://source.unsplash.com/n7a2OJDSZns/2200x1100);
    background-position: center;
    background-size: cover;
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

.panel {
    background-image: linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0.1) 100%
    );
    backdrop-filter: blur(6px);
    border-radius: 12px;
    width: 320px;
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    padding: 60px;
    box-shadow: rgba(255, 255, 255, 0.5) -20px -20px 45px inset,
        rgba(0, 0, 0, 0.1) 10px 10px 20px, rgba(0, 0, 0, 0.06) 5px 5px 10px;
    position: relative;
}

.panel::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.05) 40%,
        rgba(255, 255, 255, 0) 40%
    );
    pointer-events: none;
}

h2 {
    font-size: 2em;
    font-weight: 1000;
    margin-top: 0;
}

.card__text {
    font-size: 14px;
    line-height: 1.45;
    opacity: 0.8;
}

.button {
    display: inline-block;
    padding: 1.5em 3em;
    background-image: linear-gradient(
        -45deg,
        rgba(9, 28, 60, 1) 0%,
        rgba(67, 46, 103, 1) 100%
    );
    text-decoration: none;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 0.2em;
    border-radius: 10em;
    color: white;
}
</style>
