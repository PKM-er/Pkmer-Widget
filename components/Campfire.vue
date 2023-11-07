<script setup lang="ts"></script>

<template>
    <div class="container">
        <div class="campfire-wrapper">
            <div class="tree-container-back">
                <div class="tree-8"></div>
                <div class="tree-9"></div>
                <div class="tree-10"></div>
            </div>
            <div class="rock-container">
                <div class="rock-big"></div>
                <div class="rock-small">
                    <div class="rock-1"></div>
                    <div class="rock-2"></div>
                    <div class="rock-3"></div>
                    <div class="rock-4"></div>
                </div>
            </div>
            <div class="smoke-container">
                <svg>
                    <path
                        d="M 150 0 Q 200 100 100 250 C 0 450 120 400 50 600  "
                    />
                </svg>
                <div class="fire-container">
                    <div class="flame-1"></div>
                    <div class="flame-2"></div>
                    <div class="flame-3"></div>
                </div>
            </div>
            <div class="tree-container-front">
                <div class="tree-1"></div>
                <div class="tree-2"></div>
                <div class="tree-3"></div>
                <div class="tree-4"></div>
                <div class="tree-5"></div>
                <div class="tree-6"></div>
                <div class="tree-7"></div>
            </div>
        </div>
    </div>
</template>

<style>
:root {
    --color-sky-light: #FFD2BC;
    --color-sky-dark: #F8B9AE;
    --color-tree-dark: #365E57;
    --color-rock-dark: #2F484F;
    --color-rock-light: #917472;
    --color-flame-yellow: #FDE26C;
    --color-flame-orange: #FDA263;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: all 0.2s ease;
}

*:before,
*:after {
    content: "";
    position: absolute;
}

.container {
    background: linear-gradient(var(--color-sky-light), var(--color-sky-dark));
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container:before {
    width: 100%;
    height: 100vh;
    background-image: url(data:image/png;base64,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);
    opacity: 0.4;
    z-index: 1000;
}

.campfire-wrapper {
    width: 500px;
    height: 400px;
    position: relative;
}

.tree-container-front,
.tree-container-back {
    bottom: 0;
    height: 200px;
    position: absolute;
}

.tree-container-front {
    width: 390px;
}

.tree-container-back {
    width: 110px;
    right: 0;
}


.tree-container-front > div,
.tree-container-back > div {
    border-bottom-color: var(--color-tree-dark);
    border-bottom-style: solid;
    position: absolute;
    width: 0;
    height: 0;
    border-left-color: transparent;
    border-right-color: transparent;
    border-right-style: solid;
    border-left-style: solid;
}

.tree-container-front > div:before,
.tree-container-back > div:before {
    border-top-color: var(--color-tree-dark);
    border-top-style: solid;
    position: absolute;
    width: 0;
    height: 0;
    border-left-color: transparent;
    border-right-color: transparent;
    border-right-style: solid;
    border-left-style: solid;
    transform: skewX(-70deg);
    opacity: 0.5;
}

.tree-1,
.tree-2,
.tree-10 {
    border-left-width: 6px;
    border-right-width: 6px;
    border-bottom-width: 32px;
    bottom: 68px;
    left: 80px;
}

.tree-1:before,
.tree-2:before,
.tree-10:before {
    margin-top: 32px;
    border-left-width: 6px;
    border-right-width: 6px;
    border-top-width: 13px;
    left: -24px;
}

.tree-2 {
    left: 160px;
}

.tree-3,
.tree-4,
.tree-5,
.tree-6,
.tree-7,
.tree-8,
.tree-9 {
    border-left-width: 6px;
    border-right-width: 6px;
    border-bottom-width: 56px;
    bottom: 72px;
    left: 172px;
}

.tree-3:before,
.tree-4:before,
.tree-5:before,
.tree-6:before,
.tree-7:before,
.tree-8:before,
.tree-9:before {
    margin-top: 56px;
    border-left-width: 6px;
    border-right-width: 6px;
    border-top-width: 23px;
    left: -38px;
}

.tree-4 {
    bottom: 64px;
    left: 238px;
}

.tree-4:before {
    border-top-width: 13px;
    left: -24px;
}

.tree-5 {
    bottom: 76px;
    left: 334px;
}

.tree-5:before {
    border-top-width: 18px;
    left: -31px;
}

.tree-6 {
    bottom: 100px;
    left: 362px;
}

.tree-6:before {
    border-top-width: 12px;
    left: -22px;
}

.tree-7 {
    bottom: 110px;
    left: 368px;
}

.tree-7:before {
    border-top-width: 15px;
    left: -26px;
}

.tree-8 {
    bottom: 120px;
    left: 6px;
}

.tree-9 {
    bottom: 115px;
    left: 12px;
}

.tree-9:before, .tree-8:before {
    border-top-width: 0px;
}

.tree-10 {
    bottom: 130px;
    left: 34px;
}

.tree-10:before {
    border-top-width: 10px;
    left: -20px;
}

.rock-container {
    position: absolute;
    width: 180px;
    height: 100px;
    bottom: 66px;
    right: 40px;
}

.rock-big {
    position: absolute;
    height: 38px;
    width: 74px;
    border-radius: 74px 74px 0 0;
    left: 80px;
    bottom: 46px;
    background-image: radial-gradient( circle at bottom right,
    var(--color-rock-light)20%,
    var(--color-rock-dark) 60%);
}

.rock-big:before {
    position: absolute;
    background-color: var(--color-rock-light);
    transform: skewX(-70deg);
    opacity: 0.6;
    margin-top: 38px;
    height: 18px;
    width: 74px;
    border-radius: 0 0 74px 74px;
    left: -25px;
}

.rock-small > div {
    position: absolute;
    height: 6px;
    width: 12px;
    border-radius: 6px 6px 0 0;
}

.rock-small > div:before {
    position: absolute;
    background-color: var(--color-rock-light);
    transform: skewX(-70deg);
    opacity: 0.5;
}

.rock-1,
.rock-2,
.rock-3,
.rock-4 {
    background-image: radial-gradient( circle at bottom right,
    var(--color-rock-light)20%,
    var(--color-rock-dark) 90%);
    left: 70px;
    bottom: 44px;
}

.rock-1:before,
.rock-2:before,
.rock-3:before,
.rock-4:before {
    margin-top: 6px;
    height: 6px;
    width: 12px;
    border-radius: 0 0 6px 6px;
    left: -8px;
}

.rock-2,
.rock-3 {
    background-image: radial-gradient( circle at bottom right,
    var(--color-rock-light)60%,
    var(--color-rock-dark));

}

.rock-2 {
    left: 48px;
    bottom: 36px;
}

.rock-3 {
    left: 30px;
    bottom: 28px;
}

.rock-4 {
    left: 24px;
    bottom: 16px;
}

.smoke-container {
	position: absolute;
	height: 630px;
	width: 200px;
	bottom: 86px;
	left: 270px;
	-webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0));
	-webkit-mask-size: 100% 100%;
	-webkit-mask-repeat: no-repeat;
	-webkit-mask-position: center bottom;
}
.fire-container {
    position: absolute;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: transparent;
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.7);
    bottom: 0px;
    left: 30px;
    transform-origin: center center;
    transform: rotate(-5deg);
    animation: flicker 3s ease alternate infinite;
}

.flame-1 {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom: 34px solid var(--color-flame-yellow);
    position: absolute;
    top: -30px;
    left: 10px;
    opacity: 0.4;
}

.flame-1:after {
    content: '';
    position: absolute;
    left: -10px;
    top: 34px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top: 16px solid var(--color-flame-yellow);
}

.flame-2 {
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-bottom: 12px solid var(--color-flame-orange);
    position: absolute;
    top: 6px;
    left: 16px;
    opacity: 0.8;
}

.flame-2:after {
    content: '';
    position: absolute;
    left: -4px;
    top: 12px;
    width: 0;
    height: 0;
    border: 4px solid transparent;
    border-top: 8px solid var(--color-flame-orange);
}

.flame-3 {
    width: 0;
    height: 0;
    border: 1px solid transparent;
    border-bottom: 4px solid var(--color-sky-light);
    position: absolute;
    top: 20px;
    left: 19px;
    opacity: 0.9;
}

.flame-3:after {
    content: '';
    position: absolute;
    left: -1px;
    top: 4px;
    width: 0;
    height: 0;
    border: 1px solid transparent;
    border-top: 4px solid var(--color-sky-light);
}

@keyframes flicker{
  0%   {transform: rotate(-1deg);}
  20%  {transform: rotate(1deg);}
  40%  {transform: rotate(-1deg);}
  60%  {transform: rotate(1deg) scale(1.1);}
  80%  {transform: rotate(-2deg) scale(1);}
  100% {transform: rotate(1deg);}
}

svg {
	position: absolute;
	top: 0;
	height: 600px;
	width: 200px;
}

svg path {
	fill: none;
	stroke: white;
	opacity: 0.3;
	stroke-width: 5px;
	stroke-dasharray: 500 100;
	stroke-linecap: round;
	animation: dash 3s linear infinite;
}

@keyframes dash {
	  from {
	stroke-dashoffset: 0;
  }
  to {
	stroke-dashoffset: 600;
  }
}
</style>
